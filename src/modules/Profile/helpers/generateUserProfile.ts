import { ProfileInfo } from "./../store/InitialState.interface"
import { ShortUserInfo } from "@/modules/Auth"

export const generateUserProfile = (shortInfo: ShortUserInfo): ProfileInfo => ({
  ...shortInfo,
  admin: false,
  cart: [],
  likes: [],
})
