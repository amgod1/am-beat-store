import { FC, PropsWithChildren, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getUserProfile, clearProfile } from "@/modules/Profile"
import { useAppDispatch } from "@/hooks"
import { ShortUserInfo, generateUserInfo } from "../helpers"

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = getAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          getUserProfile(
            generateUserInfo(user.uid, user.email!) as ShortUserInfo
          )
        )
      } else {
        dispatch(clearProfile())
      }
    })
  }, [])

  return children
}
