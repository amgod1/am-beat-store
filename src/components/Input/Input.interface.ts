import { FieldErrors, FieldValues } from "react-hook-form"
import { UseFormRegister } from "react-hook-form"

export interface Input<T extends FieldValues>
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "disabled"
  > {
  title: keyof T
  register: UseFormRegister<T>
  errors: FieldErrors<T>
}
