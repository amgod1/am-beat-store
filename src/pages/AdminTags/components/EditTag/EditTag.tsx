import { FC, ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  TagForm,
  tagSchema,
  updateTag,
  deleteTag,
  selectTagsStatus,
  selectTagsInfo,
} from "@/modules/Tags"
import { Button, Input } from "@/components"
import { useAppDispatch, useAppSelector } from "@/hooks"

export const EditTag: FC = () => {
  const { allTagsArray, allTagsObject } = useAppSelector(selectTagsInfo)

  const { loading } = useAppSelector(selectTagsStatus)
  const [selectedOption, setSelectedOption] = useState<string>(
    allTagsArray[0]?.id
  )

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TagForm>({
    defaultValues: {
      tag: allTagsArray[0]?.value,
    },
    mode: "onChange",
    resolver: yupResolver(tagSchema(allTagsObject)),
  })

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
    setValue(
      "tag",
      allTagsArray.find((tag) => tag.id === e.target.value)!.value
    )
  }

  const onSubmitHandler = () => {
    dispatch(
      updateTag({
        [selectedOption]: getValues("tag"),
      })
    )
  }

  const deleteHandler = async () => {
    await dispatch(deleteTag(selectedOption))

    const firstTag = allTagsArray[0]
    setSelectedOption(firstTag.id)
    setValue("tag", firstTag.value)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-2"
    >
      <p>from:</p>
      <select
        value={selectedOption}
        disabled={loading}
        onChange={onChangeHandler}
        className="bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50 cursor-pointer"
      >
        {allTagsArray.map(({ id, value }) => (
          <option className="cursor-pointer" key={id} value={id}>
            {value}
          </option>
        ))}
      </select>
      <p>to:</p>
      <Input
        type="text"
        title="tag"
        disabled={loading}
        register={register}
        errors={errors}
      />
      <div className="flex justify-between gap-2 sm:flex-row flex-col">
        <Button type="submit" loading={loading} fullWidth={true}>
          save
        </Button>
        <Button
          onClick={deleteHandler}
          danger={true}
          loading={loading}
          fullWidth={true}
        >
          delete
        </Button>
      </div>
    </form>
  )
}
