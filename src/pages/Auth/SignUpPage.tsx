import { FC } from "react"
import { useAppDispatch } from "@/hooks"
import { Authorization, AuthorizationForm, signUp } from "@/modules/Auth"

export const SignUpPage: FC = () => {
  const dispatch = useAppDispatch()

  const handleSignUp = (formInput: AuthorizationForm) => {
    dispatch(signUp(formInput))
  }

  return <Authorization isLogin={false} submitCallback={handleSignUp} />
}
