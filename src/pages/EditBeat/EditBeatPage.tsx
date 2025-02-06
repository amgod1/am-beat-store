import { FC } from "react"
import { Navigate } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { BeatEditor } from "@/modules/Beats"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

const EditBeatPage: FC = () => {
  const { data: profile } = useGetUserProfileQuery()

  if (!profile?.admin) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return <BeatEditor />
}

export default EditBeatPage
