import { FC } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { ROUTES } from "@/constants/Routes"
import { selectAdminStatus } from "@/modules/Profile"
import { BeatEditor } from "../UploadBeats/components"

export const EditBeatPage: FC = () => {
  const isAdmin = useAppSelector(selectAdminStatus)
  const currentBeatId = useLocation().pathname.split("/")[2]

  if (!isAdmin) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return <BeatEditor id={currentBeatId} />
}
