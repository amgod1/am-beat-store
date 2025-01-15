import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { Loader } from "@/components"
import { selectTagsInfo, selectTagsStatus } from "@/modules/Tags"
import { TagsListInterface } from "./TagsList.interface"

export const TagsList: FC<TagsListInterface> = ({ tagIds, breakpoint = 2 }) => {
  const { allTagsObject } = useAppSelector(selectTagsInfo)
  const { loading } = useAppSelector(selectTagsStatus)

  return loading ? (
    <Loader />
  ) : (
    <div className="flex gap-2 lg:flex-row flex-wrap justify-start flex-col p-3">
      {tagIds.slice(0, breakpoint).map((tag) => (
        <p
          key={tag}
          className="text-nowrap border border-primary p-2 bg-dark hover:bg-info"
        >
          {allTagsObject[tag]}
        </p>
      ))}
      {tagIds.length > breakpoint && (
        <p className="text-nowrap border border-primary p-2 bg-dark hover:bg-info">{`${
          tagIds.length - breakpoint
        } more`}</p>
      )}
    </div>
  )
}
