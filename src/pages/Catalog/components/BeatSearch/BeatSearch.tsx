import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectTagsInfo } from "@/modules/Tags"
import {
  clearFilteredBeats,
  selectAllBeats,
  searchBeatsByTags,
} from "@/modules/Beats"
import { MdClose } from "react-icons/md"

export const BeatSearch: FC = () => {
  const [filteredTagIds, setFilteredTagIds] = useState<string[]>([])
  const { allTagsArray } = useAppSelector(selectTagsInfo)
  const { filteredBeats } = useAppSelector(selectAllBeats)
  const [searchParams, setSearchParams] = useSearchParams({ q: "" })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()

  const q = (searchParams.get("q") as string) || ""

  const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("q", e.target.value)
        return prev
      },
      { replace: true }
    )

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      startSearching(e.target.value.trim())
    }, 500)
  }

  const startSearching = (searchValue: string) => {
    if (searchValue && searchValue.trim() !== "") {
      const filterTagIds = allTagsArray
        .filter((tag) => tag.value.includes(searchValue.trim()))
        .map((tag) => tag.id)

      if (filterTagIds.length) {
        setFilteredTagIds(filterTagIds)
        dispatch(searchBeatsByTags(filterTagIds))
      } else {
        setFilteredTagIds([])
        dispatch(clearFilteredBeats())
      }
    }
  }

  const clearAllFilters = () => {
    setSearchParams({ q: "" })
  }

  useEffect(() => {
    if (q.trim() && !timeoutRef.current) {
      startSearching(q)
    } else if (q.trim() === "") {
      dispatch(clearFilteredBeats())
      setFilteredTagIds([])
    }
  }, [q])

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full h-80">
        <div className="flex flex-row w-2/3">
          <input
            value={q}
            onChange={updateSearchValue}
            placeholder="what type of track are you looking for?"
            className="bg-accent h-20 w-full p-4 placeholder-green-800 outline-none border-t-2 border-b-2 border-l-2 border-primary disabled:opacity-50"
          />
          <button
            tabIndex={-1}
            onClick={clearAllFilters}
            className="border-t-2 border-b-2 border-r-2 border-primary bg-accent p-4 hover:text-warning"
          >
            <MdClose size="2.5rem" />
          </button>
        </div>
        <p className="h-5 w-2/3 text-sm">
          {filteredTagIds.length
            ? `filtered by ${filteredTagIds.length} ${
                filteredTagIds.length === 1 ? "tag" : "tags"
              }`
            : q
            ? "no tags found"
            : ""}
        </p>
        <p className="h-5 w-2/3 text-sm">
          {filteredBeats.length
            ? `found ${filteredBeats.length} beats`
            : q
            ? "no beats found with this tags"
            : ""}
        </p>
      </div>
    </div>
  )
}
