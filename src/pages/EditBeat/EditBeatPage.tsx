import { FC } from "react"
import { Navigate } from "react-router-dom"

import { BeatEditor } from "@/modules/Beats/ui/BeatEditor"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

import { ROUTES } from "@/constants/Routes"

const EditBeatPage: FC = () => {
  const { data: profile } = useGetUserProfileQuery()

  if (!profile?.admin) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return <BeatEditor />
}

export default EditBeatPage
