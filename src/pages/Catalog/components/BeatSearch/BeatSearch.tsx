import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectTagsInfo } from "@/modules/Tags"
import {
  clearFilteredBeats,
  searchBeatsByTag,
  selectAllBeats,
} from "@/modules/Beats"

export const BeatSearch: FC = () => {
  const [filteredTag, setFilteredTag] = useState<string>("")
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
      const tag = allTagsArray.find((tag) =>
        tag.value.includes(searchValue.trim())
      )

      if (tag) {
        setFilteredTag(tag.value)
        dispatch(searchBeatsByTag(tag.id))
      }
    }
  }

  useEffect(() => {
    if (q.trim() && !timeoutRef.current) {
      startSearching(q)
    } else if (q.trim() === "") {
      setFilteredTag("")
      dispatch(clearFilteredBeats())
    }
  }, [q])

  return (
    <div className="flex flex-col justify-center items-center w-full h-80">
      <input
        value={q}
        onChange={updateSearchValue}
        placeholder="what type of track are you looking for?"
        className="bg-accent h-20 w-2/3 p-4 placeholder-green-800 outline-none border border-primary disabled:opacity-50"
      />
      <p className="h-6 w-2/3">
        {q && filteredBeats.length
          ? `selected type: ${filteredTag}`
          : q
          ? `nothing found`
          : ""}
      </p>
    </div>
  )
}
