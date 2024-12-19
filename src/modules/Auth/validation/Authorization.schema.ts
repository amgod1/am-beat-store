import * as yup from "yup"

export const authorizationSchema = yup
  .object({
    email: yup
      .string()
      .test(
        "email-empty",
        "email is required",
        (value) => typeof value === "string" && value.trim() !== ""
      )
      .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "email is invalid"),
    password: yup
      .string()
      .test(
        "password-empty",
        "password is required",
        (value) => typeof value === "string" && value.trim() !== ""
      )
      .min(6, "password min length is 6")
      .max(50, "password max length is 50")
      .test(
        "password-uppercase",
        "password must include at least 1 uppercase symbol",
        (value: string | undefined) => {
          if (typeof value === "string") {
            return /[A-Z]/.test(value)
          }

          return false
        }
      )
      .test(
        "password-lowercase",
        "password must include at least 1 lowercase symbol",
        (value: string | undefined) => {
          if (typeof value === "string") {
            return /[a-z]/.test(value)
          }

          return false
        }
      )
      .test(
        "password-number",
        "password must include at least 1 number",
        (value: string | undefined) => {
          if (typeof value === "string") {
            return /[0-9]/.test(value)
          }

          return false
        }
      ),
  })
  .required()
