import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import {
  uploadFile,
  removeFileFromEditor,
  selectBeatsInfo,
  selectBeatsStatus,
  updateBeatInfo,
  setEditorInfo,
  selectAllBeats,
  BeatInfo,
} from "@/modules/Beats"
import { ROUTES } from "@/constants/Routes"
import { TagSelect } from "./components"

export const BeatEditor: FC<{ id: string }> = ({ id = "" }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const beat = useAppSelector(selectBeatsInfo)
  const { loading, progress } = useAppSelector(selectBeatsStatus)
  const { allBeats } = useAppSelector(selectAllBeats)

  const uploadFileHandler = () => {
    beat.file && dispatch(uploadFile(beat))
  }

  const removeFileHandler = () => {
    dispatch(removeFileFromEditor())
  }

  const updateBeatInfoHandler = async () => {
    await dispatch(updateBeatInfo(id))

    navigate(`${ROUTES.Beat}/${id}`)
  }

  useEffect(() => {
    if (id) {
      dispatch(
        setEditorInfo(allBeats.find((beat) => beat.id === id) as BeatInfo)
      )
      return () => {
        dispatch(removeFileFromEditor())
      }
    }
  }, [id])

  return (
    <div className="bg-accent border border-primary p-8 flex flex-col gap-4 w-full">
      <h3 className="text-2xl">{`${beat.title}_${beat.bpm}`}</h3>
      <TagSelect />
      {loading && !id ? (
        <div className="flex items-center justify-center gap-2 bg-dark border border-primary p-4">
          <p>{`Uploaded ${progress}%`}</p>
        </div>
      ) : (
        <div className="flex justify-between gap-2 sm:flex-row flex-col">
          <Button
            loading={loading}
            onClick={id ? updateBeatInfoHandler : uploadFileHandler}
            fullWidth={true}
          >
            {id ? "update" : "upload"}
          </Button>
          {!id && (
            <Button
              loading={loading}
              onClick={removeFileHandler}
              danger={true}
              fullWidth={true}
            >
              delete
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
