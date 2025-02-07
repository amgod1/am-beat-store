import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "@/components/Input"
import { authorizationSchema } from "@/modules/Auth/validation/Authorization.schema"
import { AuthorizationForm } from "@/modules/Auth/validation/AuthorizationForm.interface"
import { AUTH_TITLES } from "@/constants/AuthTitles"
import { AuthButton, AuthHeading, AuthSwitch } from "./components"
import { Authorization as AuthorizationProps } from "./Authorization.interface"

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
    <section className="flex items-center flex-grow">
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
      </form>
    </section>
  )
}
