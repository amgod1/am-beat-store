import { ShortUserInfo } from "./../../Auth/helpers/generateUserInfo"
import { ProfileInfo } from "../interfaces"

export const generateUserProfile = (shortInfo: ShortUserInfo): ProfileInfo => ({
  ...shortInfo,
  admin: false,
  cart: [],
  purchasedBeats: [],
})
