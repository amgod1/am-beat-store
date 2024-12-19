import { AuthorizationForm } from "@/modules/Auth"

export interface AuthorizationInterface {
  isLogin: boolean
  submitCallback: (formInput: AuthorizationForm) => void
}
