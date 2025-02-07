import { ProfileInfo } from "../interfaces"
import { ShortUserInfo } from "./../../Auth/helpers/generateUserInfo"

export const generateUserProfile = (shortInfo: ShortUserInfo): ProfileInfo => ({
  ...shortInfo,
  admin: false,
  cart: [],
  purchasedBeats: [],
})
