import { FC } from "react"
import { useAppDispatch } from "@/hooks"
import { AuthorizationForm, signUp } from "@/modules/Auth"
import { Authorization } from "./components"

export const SignUpPage: FC = () => {
  const dispatch = useAppDispatch()

  const handleSignUp = (formInput: AuthorizationForm) => {
    dispatch(signUp(formInput))
  }

  return <Authorization isLogin={false} submitCallback={handleSignUp} />
}
