import { FC, ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import {
  addTag,
  removeTag,
  selectBeatsInfo,
  selectBeatsStatus,
} from "@/modules/Beats"
import { selectTagsInfo } from "@/modules/Tags"

export const TagSelect: FC = () => {
  const { tagIds } = useAppSelector(selectBeatsInfo)
  const { loading } = useAppSelector(selectBeatsStatus)
  const { allTagsObject, allTagsArray } = useAppSelector(selectTagsInfo)

  const dispatch = useAppDispatch()

  const addBeatTag = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(addTag(event.target.value))
  }

  const removeBeatTag = (tagId: string) => () => {
    dispatch(removeTag(tagId))
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        disabled={loading}
        value={""}
        onChange={addBeatTag}
        className="bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50 cursor-pointer"
      >
        <option value={""} disabled className="hidden">
          singer tags
        </option>
        {allTagsArray
          ?.filter((tag) => !tagIds.includes(tag.id))
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
            onClick={loading ? () => {} : removeBeatTag(id)}
            className={`bg-dark border border-primary p-2 ${
              loading
                ? " opacity-50 cursor-default"
                : "hover:bg-danger cursor-pointer"
            }`}
          >
            <p>{allTagsObject[id]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
