import { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import {
  uploadFile,
  removeFileFromEditor,
  selectBeatsInfo,
  selectBeatsStatus,
} from "@/modules/Beats"
import { Button } from "@/components"
import { TagSelect } from "./components"

export const BeatEditor: FC = () => {
  const dispatch = useAppDispatch()
  const beat = useAppSelector(selectBeatsInfo)
  const { loading, progress } = useAppSelector(selectBeatsStatus)

  const uploadFileHandler = () => {
    beat.file && dispatch(uploadFile(beat))
  }

  const removeFileHandler = () => {
    dispatch(removeFileFromEditor())
  }

  return (
    <div className="bg-accent border border-primary p-8 flex flex-col gap-4 w-full">
      <h3 className="text-2xl">{`${beat.title}_${beat.bpm}`}</h3>
      <TagSelect />
      {loading ? (
        <div className="flex items-center justify-center gap-2 bg-dark border border-primary p-4">
          <p>{`Uploaded ${progress}%`}</p>
        </div>
      ) : (
        <div className="flex justify-between gap-2 sm:flex-row flex-col">
          <Button
            loading={loading}
            onClick={uploadFileHandler}
            fullWidth={true}
          >
            upload
          </Button>
          <Button
            loading={loading}
            onClick={removeFileHandler}
            danger={true}
            fullWidth={true}
          >
            delete
          </Button>
        </div>
      )}
    </div>
  )
}
