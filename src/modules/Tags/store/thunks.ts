import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase.config"

const COLLECTION_NAME = "tags"

export const getTags = createAsyncThunk(
  "tags/getTags",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))

      const tags = querySnapshot.docs.map((doc) => doc.data())[0]

      return fulfillWithValue(tags)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)
