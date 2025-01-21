import { createAsyncThunk } from "@reduxjs/toolkit"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebase.config"
import { ShortUserInfo } from "@/modules/Auth"
import { generateUserProfile, getUpdatedProfileBeats } from "../helpers"
import { CartItem, ProfileInfo } from "./InitialState.interface"
import { RootState } from "@/store"
import { makeBeatUnavailable } from "@/modules/Beats"

const COLLECTION_NAME = "users"

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (
    shortInfo: ShortUserInfo,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const userDocRef = doc(db, COLLECTION_NAME, shortInfo.id)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        const profileInfo = docSnap.data() as ProfileInfo
        const { cart } = profileInfo
        const { allBeats } = (getState() as RootState).beats

        const availableCart = cart.filter((cartItem) =>
          allBeats.find((beat) => beat.id === cartItem.beatId)
        )

        if (cart.length !== availableCart.length) {
          await updateDoc(userDocRef, {
            cart: availableCart,
          })
        }

        profileInfo.cart = availableCart

        return fulfillWithValue(profileInfo)
      } else {
        dispatch(createUserProfile(shortInfo))

        return fulfillWithValue(null)
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const createUserProfile = createAsyncThunk(
  "user/createUserProfile",
  async (shortInfo: ShortUserInfo, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, shortInfo.id)
      await setDoc(docRef, generateUserProfile(shortInfo))

      return fulfillWithValue(shortInfo)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (
    newCartItem: CartItem,
    { getState, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const userId = (getState() as RootState).profile.info.id as string
      const cart = (getState() as RootState).profile.info.cart

      const userDocRef = doc(db, COLLECTION_NAME, userId)

      const updateIndex = cart.findIndex(
        (el) => el.beatId === newCartItem.beatId
      )
      if (updateIndex >= 0) {
        const updatedCart = JSON.parse(JSON.stringify(cart))
        updatedCart[updateIndex].leasePlanId = newCartItem.leasePlanId

        await updateDoc(userDocRef, {
          cart: updatedCart,
        })

        return fulfillWithValue(updatedCart)
      } else {
        await updateDoc(userDocRef, {
          cart: arrayUnion(newCartItem),
        })

        return fulfillWithValue([...cart, newCartItem])
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async (beatId: string, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).profile.info.id as string
      const cart = (getState() as RootState).profile.info.cart

      let updatedCart: CartItem[] = JSON.parse(JSON.stringify(cart))
      updatedCart = updatedCart.filter((el) => el.beatId !== beatId)

      const userDocRef = doc(db, COLLECTION_NAME, userId)

      await updateDoc(userDocRef, {
        cart: updatedCart,
      })

      return fulfillWithValue(updatedCart)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const purchaseBeats = createAsyncThunk(
  "user/purchaseBeats",
  async (_, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).profile.info.id as string
      const { cart, purchasedBeats } = (getState() as RootState).profile.info

      const userDocRef = doc(db, COLLECTION_NAME, userId)

      const updatedBeats = getUpdatedProfileBeats(purchasedBeats, cart)

      await updateDoc(userDocRef, {
        purchasedBeats: updatedBeats,
        cart: [],
      })

      const exclusiveLeases = cart.filter(
        (cartItem) => cartItem.leasePlanId === 3
      )

      if (exclusiveLeases.length) {
        await Promise.all(
          exclusiveLeases.map((cartItem) => {
            dispatch(makeBeatUnavailable(cartItem.beatId))
          })
        )
      }

      return fulfillWithValue(updatedBeats)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)
