import { AuthorizationForm } from "@/modules/Auth"

export interface Authorization {
  isLogin: boolean
  isLoading: boolean
  submitCallback: (formInput: AuthorizationForm) => void
}
