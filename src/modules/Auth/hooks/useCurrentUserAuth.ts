import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export const useCurrentUserAuth = () => {
  const auth = getAuth()

  const [user, setUser] = useState<boolean>(!!auth.currentUser)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => setUser(!!user))

    return unSubscribe
  }, [auth])

  return { user }
}
