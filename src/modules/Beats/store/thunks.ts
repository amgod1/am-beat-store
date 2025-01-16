import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "@/app/firebase.config"
import { BeatFileInfo, BeatInfo } from "./InitialState.interface"
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { nanoid } from "nanoid"
import { setProgress } from "./slice"
import { RootState } from "@/store"

export const getBeats = createAsyncThunk(
  "beats/getBeats",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const beatsRef = collection(db, "beats")
      const q = query(beatsRef, limit(10), orderBy("createdAt"))
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

export const uploadFile = createAsyncThunk(
  "beats/uploadFile",
  async (beat: BeatFileInfo, { dispatch, rejectWithValue }) => {
    try {
      const id = nanoid()
      const storageRef = ref(storage, `beats/${id}`)

      const uploadTask = uploadBytesResumable(storageRef, beat.file!, {
        contentType: "audio/mpeg",
      })

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        if (isNaN(progress)) {
          throw new Error("firebase upload error")
        }

        dispatch(setProgress(progress))
      })

      uploadTask.then(async () => {
        const url = await getDownloadURL(storageRef)

        const info: BeatInfo = {
          title: beat.title,
          bpm: beat.bpm,
          id,
          url,
          tagIds: beat.tagIds,
          createdAt: Date.now(),
        }

        dispatch(uploadInfo(info))
      })
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const uploadInfo = createAsyncThunk(
  "beats/uploadInfo",
  async (info: BeatInfo, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(db, "beats", info.id!)
      await setDoc(docRef, info)

      return fulfillWithValue(info)
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

      const filteredBeats = allBeats.filter((beat) =>
        beat.tagIds.some((id) => filterTagIds.includes(id))
      )

      resolve(filteredBeats)
    })

    return fulfillWithValue(filteredBeats)
  }
)
