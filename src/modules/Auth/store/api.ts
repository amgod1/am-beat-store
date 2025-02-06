import { firebaseApi } from "@/app/store"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { generateUserInfo, ShortUserInfo } from "../helpers"
import { AuthorizationForm } from "../validation"

export const authApi = firebaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ShortUserInfo, AuthorizationForm>({
      queryFn: async (formInput: AuthorizationForm) => {
        try {
          const auth = getAuth()
          const { user } = await signInWithEmailAndPassword(
            auth,
            formInput.email,
            formInput.password
          )

          return { data: generateUserInfo(user.uid, user.email!) }
        } catch (error) {
          return { error }
        }
      },
    }),
    signUp: builder.mutation<ShortUserInfo, AuthorizationForm>({
      queryFn: async (formInput: AuthorizationForm) => {
        try {
          const auth = getAuth()
          const { user } = await createUserWithEmailAndPassword(
            auth,
            formInput.email,
            formInput.password
          )

          return { data: generateUserInfo(user.uid, user.email!) }
        } catch (error) {
          return { error }
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useSignUpMutation } = authApi
