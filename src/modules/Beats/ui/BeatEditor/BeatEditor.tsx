import { FC, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { InputLink, TagSelect } from "./components"
import {
  BeatInfo,
  deleteBeatInfoAndFile,
  removeFileFromEditor,
  selectAllBeats,
  selectBeatsInfo,
  selectBeatsStatus,
  setEditorInfo,
  updateBeatInfo,
  uploadFile,
} from "../../store"

export const BeatEditor: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const beat = useAppSelector(selectBeatsInfo)
  const { loading, progress } = useAppSelector(selectBeatsStatus)
  const { allBeats } = useAppSelector(selectAllBeats)
  const id = useLocation().pathname.split("/")[2]

  const uploadFileHandler = () => {
    beat.file && dispatch(uploadFile(beat))
  }

  const removeFileHandler = () => {
    if (id) {
      dispatch(deleteBeatInfoAndFile(id))
      navigate(ROUTES.Catalog)
    } else {
      dispatch(removeFileFromEditor())
    }
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
    <div className="bg-accent border border-primary p-8 w-full flex flex-col gap-4">
      <h3 className="text-2xl">{`${beat.title}_${beat.bpm}`}</h3>
      <TagSelect />
      <InputLink title="classic" disabled={loading} />
      <InputLink title="exclusive" disabled={loading} />
      {loading && !id ? (
        <div className="flex items-center justify-center gap-2 bg-dark border border-primary p-4">
          <p>{`Uploaded ${progress}%`}</p>
        </div>
      ) : (
        <div className="flex justify-between gap-2 sm:flex-row flex-col">
          <Button
            type="submit"
            onClick={id ? updateBeatInfoHandler : uploadFileHandler}
            loading={loading}
            fullWidth={true}
          >
            {id ? "update" : "upload"}
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
