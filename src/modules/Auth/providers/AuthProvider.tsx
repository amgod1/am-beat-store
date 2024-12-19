import { useAppDispatch } from "@/hooks"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { FC, PropsWithChildren, useEffect } from "react"
import { checkUserAuth } from "../store"
import { ShortUserInfo, generateUserInfo } from "../helpers"
import { getUserProfile, clearProfile } from "@/modules/Profile"

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = getAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(checkUserAuth(user))

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
