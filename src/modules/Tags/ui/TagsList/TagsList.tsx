import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectTagsInfo } from "@/modules/Tags"
import { TagsList as TagsListProps } from "./TagsList.interface"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"

export const TagsList: FC<TagsListProps> = ({ tagIds, breakpoint = 0 }) => {
  const navigate = useNavigate()
  const { allTagsObject } = useAppSelector(selectTagsInfo)

  const searchByTag = (tag: string) => () => {
    navigate(`${ROUTES.Catalog}?q=${tag.replaceAll(" ", "+")}`)
  }

  return (
    <>
      {tagIds.slice(0, breakpoint || tagIds.length).map((tag) => (
        <button
          key={tag}
          tabIndex={-1}
          onClick={searchByTag(allTagsObject[tag])}
          className="text-left"
        >
          <p className="text-nowrap border border-primary p-2 bg-dark hover:bg-info cursor-pointer">
            {allTagsObject[tag]}
          </p>
        </button>
      ))}
      {!!breakpoint && (
        <p className="text-nowrap border border-primary p-2 bg-dark">{`${
          tagIds.length - breakpoint
        } more`}</p>
      )}
    </>
  )
}
