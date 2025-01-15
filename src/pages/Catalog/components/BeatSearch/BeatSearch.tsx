import { ChangeEvent, FC, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"

export const BeatSearch: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
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
      startSearching(e.target.value)
    }, 500)
  }

  const startSearching = (searchValue: string) => {
    if (searchValue && searchValue.trim() !== "") {
      console.log("EXECURE SEARCHING FOR: ", searchValue)
    }
  }

  useEffect(() => {
    if (q && !timeoutRef.current) {
      startSearching(q)
    }
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-80">
      <input
        value={q}
        onChange={updateSearchValue}
        placeholder="what type of track are you looking for?"
        className="bg-accent h-20 w-2/3 p-4 placeholder-green-800 outline-none border border-primary disabled:opacity-50"
      />
    </div>
  )
}
