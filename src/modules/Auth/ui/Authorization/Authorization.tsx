import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppSelector } from "@/hooks"
import { Input } from "@/components"
import {
  AuthorizationForm,
  authorizationSchema,
  selectUserStatus,
} from "@/modules/Auth"
import { AUTH_TITLES } from "@/constants/AuthTitles"
import { AuthButton, AuthHeading, AuthSwitch } from "./components"
import { Authorization as AuthorizationProps } from "./Authorization.interface"

export const Authorization: FC<AuthorizationProps> = ({
  isLogin,
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

  const { loading } = useAppSelector(selectUserStatus)

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
          disabled={loading}
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          title={AUTH_TITLES.Password}
          disabled={loading}
          register={register}
          errors={errors}
        />
        <AuthButton isLogin={isLogin} loading={loading} />
      </form>
    </section>
  )
}
