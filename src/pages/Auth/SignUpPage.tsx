import { FC } from "react"

import { useSignUpMutation } from "@/modules/Auth/store/api"
import { Authorization } from "@/modules/Auth/ui/Authorization"
import { AuthorizationForm } from "@/modules/Auth/validation/AuthorizationForm.interface"

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
