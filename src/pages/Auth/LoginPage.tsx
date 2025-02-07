import { FC } from "react"
import { Authorization } from "@/modules/Auth/ui/Authorization"
import { useLoginMutation } from "@/modules/Auth/store/api"
import { AuthorizationForm } from "@/modules/Auth/validation/AuthorizationForm.interface"

const LoginPage: FC = () => {
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

export default LoginPage
