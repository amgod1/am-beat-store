import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebase.config"
import { ShortUserInfo } from "@/modules/Auth"
import { generateUserProfile } from "../helpers"
import { ProfileInfo } from "./InitialState.interface"

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
