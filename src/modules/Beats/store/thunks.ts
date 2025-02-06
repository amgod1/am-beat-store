import { createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "@/app/firebase.config"
import { BeatInfo } from "./InitialState.interface"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { RootState } from "@/app/store"

const COLLECTION_NAME = "beats"

export const getBeats = createAsyncThunk(
  "beats/getBeats",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const beatsRef = collection(db, COLLECTION_NAME)
      const q = query(beatsRef, orderBy("createdAt"))
      const querySnapshot = await getDocs(q)

      const beats = querySnapshot.docs.map((doc) => doc.data()) as BeatInfo[]

      return fulfillWithValue(beats)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue(error)
    }
  }
)

export const searchBeatsByTags = createAsyncThunk(
  "beats/searchBeatsByTag",
  async (filterTagIds: string[], { getState, fulfillWithValue }) => {
    const filteredBeats: BeatInfo[] = await new Promise((resolve) => {
      const allBeats = (getState() as RootState).beats.allBeats

      const filteredBeats = allBeats.filter(
        (beat) =>
          beat.available && beat.tagIds.some((id) => filterTagIds.includes(id))
      )

      resolve(filteredBeats)
    })

    return fulfillWithValue(filteredBeats)
  }
)
