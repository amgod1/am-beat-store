import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { db, storage } from "@/app/firebase.config"
import { BeatFileInfo, BeatInfo } from "./InitialState.interface"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { nanoid } from "nanoid"
import { setProgress } from "./slice"
import { RootState } from "@/store"
import { removeFromCart } from "@/modules/Profile"

const COLLECTION_NAME = "beats"

export const getBeats = createAsyncThunk(
  "beats/getBeats",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const beatsRef = collection(db, COLLECTION_NAME)
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
      const storageRef = ref(storage, `${COLLECTION_NAME}/${id}`)

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
          available: beat.available,
          fileLinks: beat.fileLinks,
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
      const docRef = doc(db, COLLECTION_NAME, info.id!)
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

export const updateBeatInfo = createAsyncThunk(
  "beats/updateBeatInfo",
  async (id: string, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const { tagIds, fileLinks } = (getState() as RootState).beats.info

      const docRef = doc(db, COLLECTION_NAME, id)
      await updateDoc(docRef, {
        tagIds,
        fileLinks,
      })

      return fulfillWithValue({ id, tagIds, fileLinks })
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const deleteBeatInfoAndFile = createAsyncThunk(
  "beats/deleteBeatInfoAndFile",
  async (
    id: string,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const beatInfoRef = doc(db, COLLECTION_NAME, id)
      const beatFileRef = ref(storage, `${COLLECTION_NAME}/${id}`)

      await Promise.all([deleteDoc(beatInfoRef), deleteObject(beatFileRef)])

      const availableBeats = (getState() as RootState).beats.allBeats.filter(
        (beat) => beat.id !== id
      )

      const { cart } = (getState() as RootState).profile.info
      const availableCart = cart.filter((cartItem) =>
        availableBeats.find((beat) => beat.id === cartItem.beatId)
      )

      if (availableCart.length !== cart.length) {
        dispatch(removeFromCart(id))
      }

      return fulfillWithValue(availableBeats)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const makeBeatUnavailable = createAsyncThunk(
  "beats/makeBeatUnavailable",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const beatInfoRef = doc(db, COLLECTION_NAME, id)

      await updateDoc(beatInfoRef, {
        available: false,
      })

      return fulfillWithValue(id)
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
