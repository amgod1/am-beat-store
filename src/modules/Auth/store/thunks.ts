// import { createAsyncThunk } from "@reduxjs/toolkit"
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   getAuth,
// } from "firebase/auth"
// import { AuthorizationForm } from "../validation"
// import { generateUserInfo } from "../helpers"

// export const login = createAsyncThunk(
//   "user/login",
//   async (
//     formInput: AuthorizationForm,
//     { fulfillWithValue, rejectWithValue }
//   ) => {
//     try {
//       const auth = getAuth()
//       const { user } = await signInWithEmailAndPassword(
//         auth,
//         formInput.email,
//         formInput.password
//       )

//       fulfillWithValue(generateUserInfo(user.uid, user.email!))
//     } catch (error: Error | unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message)
//       }

//       return rejectWithValue(error)
//     }
//   }
// )

// export const signUp = createAsyncThunk(
//   "user/signUp",
//   async (
//     formInput: AuthorizationForm,
//     { fulfillWithValue, rejectWithValue }
//   ) => {
//     try {
//       const auth = getAuth()
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         formInput.email,
//         formInput.password
//       )

//       fulfillWithValue(generateUserInfo(user.uid, user.email!))
//     } catch (error: Error | unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message)
//       }

//       return rejectWithValue(error)
//     }
//   }
// )
