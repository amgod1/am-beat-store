import { FC } from "react"
import { useAppDispatch } from "@/hooks"
import { AuthorizationForm, login } from "@/modules/Auth"
import { Authorization } from "./components"

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()

  const handleLogin = (formInput: AuthorizationForm) => {
    dispatch(login(formInput))
  }

  return <Authorization isLogin={true} submitCallback={handleLogin} />
}
