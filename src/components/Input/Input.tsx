import { FieldValues, Path } from "react-hook-form"

import { Input as InputProps } from "./Input.interface"

export const Input = <T extends FieldValues>({
  type,
  title,
  disabled,
  register,
  errors,
}: InputProps<T>) => (
  <>
    <input
      type={type}
      placeholder={String(title)}
      autoComplete="off"
      disabled={disabled}
      {...register(title as Path<T>)}
      className="bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50"
    />
    {errors?.[title]?.message && (
      <p className="text-sm text-danger">{errors[title]?.message as string}</p>
    )}
  </>
)
