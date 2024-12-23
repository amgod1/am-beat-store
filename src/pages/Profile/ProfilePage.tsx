import { FC } from "react"
import { Button, Loader } from "@/components"
import { useAppSelector } from "@/hooks"
import {
  getUserNameFromEmail,
  selectProfileInfo,
  selectProfileStatus,
} from "@/modules/Profile"

export const ProfilePage: FC = () => {
  const { email } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)

  return (
    <div className="bg-accent border border-primary p-8 flex gap-2 justify-between items-center w-full min-h-40">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-primary text-dark rounded-full flex justify-center items-center select-none text-3xl">
              {email && email![0]}
            </div>
            {email && (
              <p className="hidden sm:block">{getUserNameFromEmail(email)}</p>
            )}
          </div>
          <Button children={"delete"} danger={true} />
        </>
      )}
    </div>
  )
}
