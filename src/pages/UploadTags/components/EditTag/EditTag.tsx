import { FC, ChangeEvent, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { tagSchema } from "@/modules/Tags/validation/Tag.schema"
import { TagForm } from "@/modules/Tags/validation/TagForm.interface"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Loader } from "@/components/Loader"
import {
  useDeleteTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
} from "@/modules/Tags/store/api"

export const EditTag: FC = () => {
  const { data: tags, isLoading } = useGetTagsQuery()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [updateTag, { isLoading: isUpdateLoading }] = useUpdateTagMutation()
  const [deleteTag, { isLoading: isDeleteLoading }] = useDeleteTagMutation()

  const isMutationLoading = isUpdateLoading || isDeleteLoading

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<TagForm>({
    defaultValues: { tag: "" },
    mode: "onChange",
    resolver: yupResolver(tagSchema(tags?.tagsObject || {})),
  })

  useEffect(() => {
    if (tags?.tagsArray.length) {
      const firstTag = tags.tagsArray[0]

      setSelectedOption(firstTag.id)
      reset({ tag: firstTag.value })
    }
  }, [tags])

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = tags?.tagsArray.find(
      (tag) => tag.id === event.target.value
    )
    setSelectedOption(event.target.value)
    setValue("tag", selectedTag?.value || "")
  }

  const onSubmitHandler = async () => {
    await updateTag({ [selectedOption!]: getValues("tag") })
  }

  const deleteHandler = async () => {
    if (tags?.tagsArray.length) {
      await deleteTag(selectedOption!)

      const firstTag = tags.tagsArray[0]
      setSelectedOption(firstTag.id)
      setValue("tag", firstTag.value)
    }
  }

  if (isLoading || !tags) {
    return <Loader />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-2"
    >
      <p>from:</p>
      {tags && selectedOption && (
        <select
          value={selectedOption}
          disabled={isMutationLoading}
          onChange={onChangeHandler}
          className="bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50 cursor-pointer"
        >
          {tags?.tagsArray.map(({ id, value }) => (
            <option className="cursor-pointer" key={id} value={id}>
              {value}
            </option>
          ))}
        </select>
      )}
      <p>to:</p>
      <Input
        type="text"
        title="tag"
        disabled={isMutationLoading}
        register={register}
        errors={errors}
      />
      <div className="flex justify-between gap-2 sm:flex-row flex-col">
        <Button type="submit" loading={isMutationLoading} fullWidth={true}>
          save
        </Button>
        <Button
          onClick={deleteHandler}
          danger={true}
          loading={isMutationLoading}
          fullWidth={true}
        >
          delete
        </Button>
      </div>
    </form>
  )
}
