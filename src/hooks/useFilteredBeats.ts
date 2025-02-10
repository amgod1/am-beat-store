import { useDeferredValue } from "react"
import { useSearchParams } from "react-router-dom"

import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { useGetTagsQuery } from "@/modules/Tags/store/api"

export const useFilteredBeats = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")?.trim() || ""

  const { data: tags } = useGetTagsQuery()
  const { data: beats } = useGetBeatsQuery()

  const deferredQuery = useDeferredValue(query.trim())

  const filteredTagIds =
    !deferredQuery || !tags
      ? []
      : tags.tagsArray
          .filter((tag) => tag.value.includes(deferredQuery))
          .map((tag) => tag.id)

  const filteredBeats =
    !filteredTagIds.length || !beats
      ? beats || []
      : beats.filter((beat) =>
          beat.tagIds.some((tagId) => filteredTagIds.includes(tagId)),
        )

  return { filteredBeats, filteredTagIds }
}
