import { ChangeEvent, FC } from "react"
import { MdClose } from "react-icons/md"
import { useSearchParams } from "react-router-dom"

import { useFilteredBeats } from "@/hooks/useFilteredBeats"

export const BeatSearch: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" })
  const q = searchParams.get("q") || ""

  const { filteredBeats, filteredTagIds } = useFilteredBeats()

  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: event.target.value }, { replace: true })
  }

  const clearAllFilters = () => {
    setSearchParams({ q: "" })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-1 justify-center items-center w-full h-80">
        <div className="flex flex-row w-2/3">
          <input
            value={q}
            onChange={updateSearchValue}
            placeholder="What type of track are you looking for?"
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
            ? `filtered by ${filteredTagIds.length} ${filteredTagIds.length === 1 ? "tag" : "tags"}`
            : q
              ? "no tags found"
              : ""}
        </p>
        <p className="h-5 w-2/3 text-sm">
          {q && filteredBeats?.length
            ? `found ${filteredBeats.length} beats`
            : q
              ? "no beats found with these tags"
              : ""}
        </p>
      </div>
    </div>
  )
}
