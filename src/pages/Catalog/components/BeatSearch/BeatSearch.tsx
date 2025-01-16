import { ChangeEvent, FC, useEffect, useState } from "react"
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

    startSearching(e.target.value.trim())
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
    if (q.trim()) {
      startSearching(q)
    } else {
      dispatch(clearFilteredBeats())
      setFilteredTagIds([])
    }
  }, [q])

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-1 justify-center items-center w-full h-80">
        <div className="flex flex-row w-2/3">
          <input
            value={q}
            onChange={updateSearchValue}
            placeholder="what type of track are you looking for?"
            className="bg-accent h-16 sm:h-20 w-full py-4 pl-4 text-base sm:text-lg placeholder-green-800 outline-none border-t-2 border-b-2 border-l-2 border-primary disabled:opacity-50"
          />
          <button
            tabIndex={-1}
            onClick={clearAllFilters}
            className="border-t-2 border-b-2 border-r-2 border-primary bg-accent h-16 sm:h-20 p-4 hover:text-warning flex justify-center items-center"
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
