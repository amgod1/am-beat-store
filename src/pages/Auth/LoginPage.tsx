import { FC } from "react"
import { Authorization, AuthorizationForm } from "@/modules/Auth"
import { useLoginMutation } from "@/modules/Auth/store/api"

export const LoginPage: FC = () => {
  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = (formInput: AuthorizationForm) => {
    login(formInput)
  }

  return (
    <Authorization
      isLogin={true}
      isLoading={isLoading}
      submitCallback={handleLogin}
    />
  )
}
