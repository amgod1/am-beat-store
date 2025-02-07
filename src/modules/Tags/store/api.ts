import {
  collection,
  deleteField,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { nanoid } from "nanoid"

import { db } from "@/app/firebase.config"
import { firebaseApi } from "@/app/store/store"

import { Tag, TagInfo } from "../interfaces/Tag.type"

const COLLECTION_NAME = "tags"
const DOC_NAME = "singer"

export const tagsApi = firebaseApi
  .enhanceEndpoints({
    addTagTypes: ["tag"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTags: builder.query<{ tagsObject: Tag; tagsArray: TagInfo[] }, void>({
        queryFn: async () => {
          try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))

            const tagsObject: Tag = querySnapshot.docs.map((doc) =>
              doc.data(),
            )[0] as Tag

            const tagsArray: TagInfo[] = Object.entries({ ...tagsObject })
              .map(([id, value]) => ({ id, value }))
              .sort((a, b) => a.value.localeCompare(b.value))

            return { data: { tagsObject, tagsArray } }
          } catch (error) {
            return { error }
          }
        },
        providesTags: (result) =>
          result
            ? [
                ...result.tagsArray.map(({ id }) => ({
                  type: "tag" as const,
                  id,
                })),
                { type: "tag", id: "LIST" },
              ]
            : [{ type: "tag", id: "LIST" }],
      }),
      addTag: builder.mutation<null, string>({
        queryFn: async (tagValue) => {
          try {
            const id = nanoid()
            const newTag = {
              [id]: tagValue,
            }

            const docRef = doc(db, COLLECTION_NAME, DOC_NAME)
            await updateDoc(docRef, newTag)

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: [{ type: "tag", id: "LIST" }],
      }),
      updateTag: builder.mutation<null, Tag>({
        queryFn: async (updatedTag) => {
          try {
            const docRef = doc(db, COLLECTION_NAME, DOC_NAME)
            await updateDoc(docRef, updatedTag)

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: (_, __, tag) => {
          const id = Object.keys(tag)[0]
          return [{ type: "tag", id }]
        },
      }),
      deleteTag: builder.mutation<null, string>({
        queryFn: async (id) => {
          try {
            const docRef = doc(db, COLLECTION_NAME, DOC_NAME)
            await updateDoc(docRef, {
              [id]: deleteField(),
            })

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: (_, __, id) => {
          return [{ type: "tag", id }]
        },
      }),
    }),
  })

export const {
  useGetTagsQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi
