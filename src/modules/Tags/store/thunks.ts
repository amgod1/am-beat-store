import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore"
import { db } from "@/app/firebase.config"
import { Tag } from "../interfaces"
import { nanoid } from "nanoid"

const COLLECTION_NAME = "tags"
const DOC_NAME = "singer"

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

export const addTag = createAsyncThunk(
  "tags/addTag",
  async (tag: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_NAME)

      const id = nanoid()

      const newTag = {
        [id]: tag,
      }

      await updateDoc(docRef, newTag)

      return fulfillWithValue(newTag)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async (updatedTag: Tag, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_NAME)

      await updateDoc(docRef, updatedTag)

      return fulfillWithValue(updatedTag)
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }

      return rejectWithValue(error)
    }
  }
)

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_NAME)

      await updateDoc(docRef, {
        [id]: deleteField(),
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
