import { AuthorizationForm } from "@/modules/Auth"

export interface Authorization {
  isLogin: boolean
  submitCallback: (formInput: AuthorizationForm) => void
}
