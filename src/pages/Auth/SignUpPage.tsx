import { FC } from "react"
import { Authorization, AuthorizationForm } from "@/modules/Auth"
import { useSignUpMutation } from "@/modules/Auth/store/api"

const SignUpPage: FC = () => {
  const [signUp, { isLoading }] = useSignUpMutation()

  const handleSignUp = (formInput: AuthorizationForm) => {
    signUp(formInput)
  }

  return (
    <Authorization
      isLogin={false}
      isLoading={isLoading}
      submitCallback={handleSignUp}
    />
  )
}

export default SignUpPage
