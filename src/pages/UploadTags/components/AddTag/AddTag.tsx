import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { tagSchema } from "@/modules/Tags/validation/Tag.schema"
import { TagForm } from "@/modules/Tags/validation/TagForm.interface"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Loader } from "@/components/Loader"
import { useAddTagMutation, useGetTagsQuery } from "@/modules/Tags/store/api"

export const AddTag: FC = () => {
  const { data: tags, isLoading } = useGetTagsQuery()
  const [addTag, { isLoading: isAddLoading }] = useAddTagMutation()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TagForm>({
    defaultValues: {
      tag: "",
    },
    mode: "onChange",
    resolver: yupResolver(tagSchema(tags?.tagsObject || {})),
  })

  const onSubmitHandler = async () => {
    addTag(getValues("tag"))
    setValue("tag", "")
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-2"
    >
      <Input
        type="text"
        title="tag"
        disabled={isLoading || isAddLoading}
        register={register}
        errors={errors}
      />
      <Button
        type="submit"
        loading={isLoading || isAddLoading}
        fullWidth={true}
      >
        add
      </Button>
    </form>
  )
}
