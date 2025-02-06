import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Loader } from "@/components"
import { TagsList as TagsListProps } from "./TagsList.interface"
import { useGetTagsQuery } from "../../store/api"

export const TagsList: FC<TagsListProps> = ({ tagIds, breakpoint = 0 }) => {
  const navigate = useNavigate()
  const { data: tags, isLoading } = useGetTagsQuery()

  const searchByTag = (tag: string) => () => {
    navigate(`${ROUTES.Catalog}?q=${tag.replaceAll(" ", "+")}`)
  }

  if (isLoading || !tags) {
    return <Loader />
  }

  return (
    <>
      {tagIds.slice(0, breakpoint || tagIds.length).map((tag) => (
        <button
          key={tag}
          tabIndex={-1}
          onClick={searchByTag(tags.tagsObject[tag])}
          className="text-left"
        >
          <p className="text-nowrap border border-primary p-2 bg-dark hover:bg-info cursor-pointer">
            {tags.tagsObject[tag]}
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
