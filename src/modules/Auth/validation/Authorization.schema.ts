import * as yup from "yup"

export const authorizationSchema = yup
  .object({
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length is 6")
      .max(50, "password max length is 50")
      .matches(/[A-Z]/, "password must include at least 1 uppercase symbol")
      .matches(/[a-z]/, "password must include at least 1 lowercase symbol")
      .matches(/[0-9]/, "password must include at least 1 number"),
  })
  .required()
