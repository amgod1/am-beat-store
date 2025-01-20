import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { ROUTES } from "@/constants/Routes"
import { selectAdminStatus } from "@/modules/Profile"
import { BeatEditor } from "@/modules/Beats"

export const EditBeatPage: FC = () => {
  const isAdmin = useAppSelector(selectAdminStatus)

  if (!isAdmin) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return <BeatEditor />
}
