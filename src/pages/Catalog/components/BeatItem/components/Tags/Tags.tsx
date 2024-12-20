import { FC } from "react"
import { TagsInterface } from "./Tags.interface"
import { useAppSelector } from "@/hooks"
import { selectTagsInfo } from "@/modules/Tags"

export const Tags: FC<TagsInterface> = ({ tagIds }) => {
  const TAGS_BREAKPOINT = 2

  const { allTagsObject } = useAppSelector(selectTagsInfo)

  return (
    <div className="flex gap-2 xl:flex-row flex-wrap justify-start flex-col p-3">
      {tagIds.slice(0, TAGS_BREAKPOINT).map((tag) => (
        <p
          key={tag}
          className="text-nowrap border border-primary p-2 bg-dark hover:bg-info"
        >
          {allTagsObject[tag]}
        </p>
      ))}
      <p className="text-nowrap border border-primary p-2 bg-dark hover:bg-info">{`${
        tagIds.length - TAGS_BREAKPOINT
      } more`}</p>
    </div>
  )
}
