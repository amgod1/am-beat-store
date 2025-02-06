import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { InputLink, TagSelect } from "./components"
import {
  BeatInfo,
  removeFileFromEditor,
  selectBeatsInfo,
  selectUploadProgress,
  setEditorInfo,
} from "../../store"
import {
  useGetBeatsQuery,
  useUploadFileAndInfoMutation,
  useUpdateBeatInfoMutation,
  useDeleteBeatFileAndInfoMutation,
} from "../../store/api"

export const BeatEditor: FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const beat = useAppSelector(selectBeatsInfo)
  const progress = useAppSelector(selectUploadProgress)
  const { data: allBeats } = useGetBeatsQuery()
  const [uploadFileAndInfo, { isLoading: isUploadLoading }] =
    useUploadFileAndInfoMutation()
  const [updateBeatInfo, { isLoading: isUpdateLoading }] =
    useUpdateBeatInfoMutation()
  const [deleteBeatFileAndInfo, { isLoading: isDeleteLoading }] =
    useDeleteBeatFileAndInfoMutation()

  const isLoading = isUploadLoading || isUpdateLoading || isDeleteLoading

  const uploadFileHandler = async () => {
    await uploadFileAndInfo(beat)
    dispatch(removeFileFromEditor())
  }

  const removeFileHandler = async () => {
    if (id) {
      await deleteBeatFileAndInfo(id)

      navigate(ROUTES.Catalog)
    } else {
      dispatch(removeFileFromEditor())
    }
  }

  const updateBeatInfoHandler = async () => {
    const updatedBeatInfo = {
      id: id!,
      tagIds: beat.tagIds,
      fileLinks: beat.fileLinks,
    }

    await updateBeatInfo(updatedBeatInfo)

    dispatch(removeFileFromEditor())

    navigate(`${ROUTES.Beat}/${id}`)
  }

  useEffect(() => {
    if (id) {
      dispatch(
        setEditorInfo(allBeats?.find((beat) => beat.id === id) as BeatInfo)
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
      <InputLink title="pro" disabled={isLoading} />
      <InputLink title="exclusive" disabled={isLoading} />
      {isLoading && !id ? (
        <div className="flex items-center justify-center gap-2 bg-dark border border-primary p-4">
          <p>{`Uploaded ${progress}%`}</p>
        </div>
      ) : (
        <div className="flex justify-between gap-2 sm:flex-row flex-col">
          <Button
            loading={isLoading}
            onClick={id ? updateBeatInfoHandler : uploadFileHandler}
            fullWidth={true}
          >
            {id ? "update" : "upload"}
          </Button>
          <Button
            loading={isLoading}
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
