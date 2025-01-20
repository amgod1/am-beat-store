import { FC } from "react"
import { useAppDispatch } from "@/hooks"
import { Authorization, AuthorizationForm, login } from "@/modules/Auth"

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()

  const handleLogin = (formInput: AuthorizationForm) => {
    dispatch(login(formInput))
  }

  return <Authorization isLogin={true} submitCallback={handleLogin} />
}
