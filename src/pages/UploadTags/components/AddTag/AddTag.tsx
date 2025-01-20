import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  TagForm,
  tagSchema,
  addTag,
  selectTagsStatus,
  selectTagsInfo,
} from "@/modules/Tags"
import { Button, Input } from "@/components"
import { useAppDispatch, useAppSelector } from "@/hooks"

export const AddTag: FC = () => {
  const { allTagsObject: tags } = useAppSelector(selectTagsInfo)
  const { loading } = useAppSelector(selectTagsStatus)
  const dispatch = useAppDispatch()

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
    resolver: yupResolver(tagSchema(tags)),
  })

  const onSubmitHandler = async () => {
    await dispatch(addTag(getValues("tag")))
    setValue("tag", "")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-2"
    >
      <Input
        type="text"
        title="tag"
        disabled={loading}
        register={register}
        errors={errors}
      />
      <Button type="submit" loading={loading} fullWidth={true}>
        add
      </Button>
    </form>
  )
}
