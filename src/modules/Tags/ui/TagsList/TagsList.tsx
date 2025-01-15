import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectTagsInfo } from "@/modules/Tags"
import { TagsListInterface } from "./TagsList.interface"

export const TagsList: FC<TagsListInterface> = ({ tagIds, breakpoint = 0 }) => {
  const { allTagsObject } = useAppSelector(selectTagsInfo)

  return (
    <>
      {tagIds.slice(0, breakpoint || tagIds.length).map((tag) => (
        <p
          key={tag}
          className="text-nowrap border border-primary p-2 bg-dark hover:bg-info cursor-pointer"
        >
          {allTagsObject[tag]}
        </p>
      ))}
      {!!breakpoint && (
        <p className="text-nowrap border border-primary p-2 bg-dark hover:bg-info">{`${
          tagIds.length - breakpoint
        } more`}</p>
      )}
    </>
  )
}
