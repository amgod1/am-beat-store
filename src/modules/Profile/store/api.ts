import { getAuth, User } from "firebase/auth"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebase.config"
import { firebaseApi } from "@/app/store/store"
import { generateUserProfile } from "../helpers/generateUserProfile"
import { getUpdatedProfileBeats } from "../helpers/getUpdatedProfileBeats"
import { ProfileInfo } from "../interfaces/ProfileInfo.interface"
import { CartItem } from "../interfaces/CartItem.interface"
import { CartCheckout } from "../interfaces/CartCheckout.interface"

const COLLECTION_NAME = "users"

export const profileApi = firebaseApi
  .enhanceEndpoints({ addTagTypes: ["user"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserProfile: builder.query<ProfileInfo, void>({
        queryFn: async () => {
          try {
            const currentUser = getAuth().currentUser as User

            const shortUserInfo = {
              id: currentUser.uid,
              email: currentUser.email!,
            }

            const userDocRef = doc(db, COLLECTION_NAME, shortUserInfo.id)
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()) {
              const profileInfo = docSnap.data() as ProfileInfo
              // const { cart } = profileInfo
              // const { allBeats } = (getState() as RootState).beats

              // const availableCart = cart.filter((cartItem) =>
              //   allBeats.find((beat) => beat.id === cartItem.beatId)
              // )

              // if (cart.length !== availableCart.length) {
              //   await updateDoc(userDocRef, {
              //     cart: availableCart,
              //   })
              // }

              // profileInfo.cart = availableCart

              return { data: profileInfo }
            } else {
              const profileInfo = generateUserProfile(shortUserInfo)

              await setDoc(userDocRef, profileInfo)

              return { data: profileInfo }
            }
          } catch (error) {
            return { error }
          }
        },
        providesTags: ["user"],
      }),
      addToCart: builder.mutation<
        null,
        { prevCart: CartItem[]; newCartItem: CartItem }
      >({
        queryFn: async ({ prevCart, newCartItem }) => {
          try {
            const { uid } = getAuth().currentUser as User

            const userDocRef = doc(db, COLLECTION_NAME, uid)

            const updateIndex = prevCart.findIndex(
              (el) => el.beatId === newCartItem.beatId
            )

            if (updateIndex >= 0) {
              const updatedCart = JSON.parse(JSON.stringify(prevCart))
              updatedCart[updateIndex].leasePlanId = newCartItem.leasePlanId

              await updateDoc(userDocRef, {
                cart: updatedCart,
              })
            } else {
              await updateDoc(userDocRef, {
                cart: arrayUnion(newCartItem),
              })
            }

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: ["user"],
      }),
      removeFromCart: builder.mutation<
        null,
        { prevCart: CartItem[]; deleteBeatId: string }
      >({
        queryFn: async ({ prevCart, deleteBeatId }) => {
          try {
            const { uid } = getAuth().currentUser as User

            let updatedCart: CartItem[] = prevCart.filter(
              (el) => el.beatId !== deleteBeatId
            )

            const userDocRef = doc(db, COLLECTION_NAME, uid)

            await updateDoc(userDocRef, {
              cart: updatedCart,
            })

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: ["user"],
      }),
      purchaseBeats: builder.mutation<null, CartCheckout>({
        queryFn: async ({ purchasedBeats, cart }) => {
          try {
            const { uid } = getAuth().currentUser as User
            const userDocRef = doc(db, COLLECTION_NAME, uid)

            const updatedBeats = getUpdatedProfileBeats({
              purchasedBeats,
              cart,
            })

            await updateDoc(userDocRef, {
              purchasedBeats: updatedBeats,
              cart: [],
            })

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: ["user"],
      }),
    }),
  })

export const {
  useGetUserProfileQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  usePurchaseBeatsMutation,
} = profileApi
