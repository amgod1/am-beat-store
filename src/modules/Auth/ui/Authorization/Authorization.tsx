import { yupResolver } from "@hookform/resolvers/yup"
import { FC } from "react"
import { useForm } from "react-hook-form"

import { authorizationSchema } from "@/modules/Auth/validation/Authorization.schema"
import { AuthorizationForm } from "@/modules/Auth/validation/AuthorizationForm.interface"

import { Input } from "@/components/Input"

import { AUTH_TITLES } from "@/constants/AuthTitles"

import { Authorization as AuthorizationProps } from "./Authorization.interface"
import {
  AdditionalProvider,
  AuthButton,
  AuthHeading,
  AuthSwitch,
} from "./components"

export const Authorization: FC<AuthorizationProps> = ({
  isLogin,
  isLoading,
  submitCallback,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(authorizationSchema),
  })

  return (
    <section className="flex flex-grow items-center">
      <form
        onSubmit={handleSubmit(submitCallback)}
        className="flex flex-col gap-2"
      >
        <AuthHeading isLogin={isLogin} />
        <AuthSwitch isLogin={isLogin} />
        <Input
          type="text"
          title={AUTH_TITLES.Email}
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          title={AUTH_TITLES.Password}
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <AuthButton isLogin={isLogin} loading={isLoading} />
        <p className="text-center">- or -</p>
        <div className="flex flex-row justify-between gap-2 sm:flex-col">
          <AdditionalProvider provider="Google" isLoading={isLoading} />
          <AdditionalProvider provider="Apple" isLoading={isLoading} />
        </div>
      </form>
    </section>
  )
}
