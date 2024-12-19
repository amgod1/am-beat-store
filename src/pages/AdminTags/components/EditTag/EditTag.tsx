import { ChangeEvent, FC, useState } from "react"
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
  const tagsInfo = useAppSelector(selectTagsInfo)
  const tags = Object.entries(tagsInfo).map(
    ([id, value]): { id: string; value: string } => ({ id, value })
  )
  const { loading } = useAppSelector(selectTagsStatus)
  const [selectedOption, setSelectedOption] = useState<string>(tags[0].id)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TagForm>({
    defaultValues: {
      tag: tags[0].value,
    },
    mode: "onChange",
    resolver: yupResolver(tagSchema(tagsInfo)),
  })

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
    setValue("tag", tags.find((tag) => tag.id === e.target.value)!.value)
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

    const firstTag = tags[0]
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
        {tags.map(({ id, value }) => (
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
