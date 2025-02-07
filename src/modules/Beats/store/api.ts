import { db, storage } from "@/app/firebase.config"
import { firebaseApi } from "@/app/store/store"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { BeatFileInfo, BeatInfo } from "../interfaces/BeatInfo.interface"
import { FileLinks } from "../interfaces/FileLinks.interface"
import { nanoid } from "nanoid"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { setProgress } from "./slice"
import { CartItem } from "@/modules/Profile"

const COLLECTION_NAME = "beats"

export const beatsApi = firebaseApi
  .enhanceEndpoints({
    addTagTypes: ["beat"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBeats: builder.query<BeatInfo[], void>({
        queryFn: async () => {
          try {
            const beatsRef = collection(db, COLLECTION_NAME)
            const q = query(beatsRef, orderBy("createdAt"))
            const querySnapshot = await getDocs(q)

            const beats = querySnapshot.docs.map((doc) =>
              doc.data()
            ) as BeatInfo[]

            return { data: beats }
          } catch (error) {
            return { error }
          }
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "beat" as const,
                  id: id as string,
                })),
                { type: "beat", id: "LIST" },
              ]
            : [{ type: "beat", id: "LIST" }],
      }),
      uploadFileAndInfo: builder.mutation<string, BeatFileInfo>({
        queryFn: async (beat, { dispatch }) => {
          try {
            const id = nanoid()
            const storageRef = ref(storage, `${COLLECTION_NAME}/${id}`)

            const uploadTask = uploadBytesResumable(storageRef, beat.file!, {
              contentType: "audio/mpeg",
            })

            return new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  )

                  if (isNaN(progress)) {
                    reject({ error: "Firebase upload error" })
                  }

                  dispatch(setProgress(progress))
                },
                (error) => {
                  reject({ error })
                },
                async () => {
                  try {
                    const url = await getDownloadURL(storageRef)

                    const info = {
                      title: beat.title,
                      bpm: beat.bpm,
                      id,
                      url,
                      tagIds: beat.tagIds,
                      createdAt: Date.now(),
                      available: beat.available,
                      fileLinks: beat.fileLinks,
                    }

                    const docRef = doc(db, COLLECTION_NAME, info.id)
                    await setDoc(docRef, info)

                    resolve({ data: id })
                  } catch (error) {
                    reject({ error })
                  }
                }
              )
            })
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: [{ type: "beat", id: "LIST" }],
      }),
      updateBeatInfo: builder.mutation<
        null,
        { id: string; tagIds: string[]; fileLinks: FileLinks }
      >({
        queryFn: async ({ id, tagIds, fileLinks }) => {
          try {
            const docRef = doc(db, COLLECTION_NAME, id)
            await updateDoc(docRef, {
              tagIds,
              fileLinks,
            })

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: (_, __, { id }) => {
          return [{ type: "beat", id }]
        },
      }),
      deleteBeatFileAndInfo: builder.mutation<null, string>({
        queryFn: async (id) => {
          try {
            const beatFileRef = ref(storage, `${COLLECTION_NAME}/${id}`)
            const beatInfoRef = doc(db, COLLECTION_NAME, id)

            await Promise.all([
              deleteObject(beatFileRef),
              deleteDoc(beatInfoRef),
            ])

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: (_, __, id) => {
          return [{ type: "beat", id }]
        },
      }),
      makeBeatsUnavailable: builder.mutation<null, CartItem[]>({
        queryFn: async (cart) => {
          try {
            await Promise.all(
              cart
                .filter((cartItem) => cartItem.leasePlanId === 3)
                .map(({ beatId }) => {
                  const beatInfoRef = doc(db, COLLECTION_NAME, beatId)

                  return updateDoc(beatInfoRef, { available: false })
                })
            )

            return { data: null }
          } catch (error) {
            return { error }
          }
        },
        invalidatesTags: (_, __, cart) =>
          cart.map(({ beatId }) => ({ type: "beat", beatId })),
      }),
    }),
  })

export const {
  useGetBeatsQuery,
  useUploadFileAndInfoMutation,
  useUpdateBeatInfoMutation,
  useDeleteBeatFileAndInfoMutation,
  useMakeBeatsUnavailableMutation,
} = beatsApi
