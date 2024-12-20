import { createAsyncThunk } from "@reduxjs/toolkit"
import { ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "@/app/firebase.config"
import { BeatInfo } from "./InitialState.interface"
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { setProgress } from "./slice"
import { nanoid } from "nanoid"

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
  async (beat: BeatInfo, { dispatch, rejectWithValue }) => {
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

        dispatch(setProgress(progress))
      })

      await uploadTask.then(() => {
        const info = JSON.parse(JSON.stringify(beat)) as BeatInfo

        info.id = id
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
      info.createdAt = Date.now()

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
