import { FC, ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { addTag, removeTag, selectBeatsInfo } from "@/modules/Beats"
import { useGetTagsQuery } from "@/modules/Tags/store/api"
import { Loader } from "@/components"

export const TagSelect: FC = () => {
  const dispatch = useAppDispatch()
  const { tagIds } = useAppSelector(selectBeatsInfo)
  const { data: tags, isLoading } = useGetTagsQuery()

  const addBeatTag = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(addTag(event.target.value))
  }

  const removeBeatTag = (tagId: string) => () => {
    dispatch(removeTag(tagId))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        disabled={isLoading}
        value={""}
        onChange={addBeatTag}
        className="bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50 cursor-pointer"
      >
        <option value={""} disabled className="hidden">
          singer tags
        </option>
        {tags?.tagsArray
          ?.filter((tag) => !tagIds.includes(tag.id))
          ?.sort((a, b) => a.value.localeCompare(b.value))
          ?.map(({ id, value }) => (
            <option key={id} value={id}>
              {value}
            </option>
          ))}
      </select>
      <div className="flex flex-wrap gap-2">
        {Object.values(tagIds)?.map((id) => (
          <div
            key={id}
            onClick={isLoading ? () => {} : removeBeatTag(id)}
            className={`bg-dark border border-primary p-2 ${
              isLoading
                ? " opacity-50 cursor-default"
                : "hover:bg-danger cursor-pointer"
            }`}
          >
            <p>{tags?.tagsObject[id]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
