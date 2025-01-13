import { createAsyncThunk } from "@reduxjs/toolkit"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebase.config"
import { ShortUserInfo } from "@/modules/Auth"
import { generateUserProfile } from "../helpers"
import { CartItem, ProfileInfo } from "./InitialState.interface"
import { RootState } from "@/store"

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (
    shortInfo: ShortUserInfo,
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const docRef = doc(db, "users", shortInfo.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return fulfillWithValue(docSnap.data() as ProfileInfo)
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
      const docRef = doc(db, "users", shortInfo.id)
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

      const userDocRef = doc(db, "users", userId)

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

      const userDocRef = doc(db, "users", userId)

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
