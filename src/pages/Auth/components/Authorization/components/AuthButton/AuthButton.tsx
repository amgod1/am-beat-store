import { FC } from "react"
import { AuthButtonInterface } from "./AuthButton.interface"
import { Button } from "@/components"
import { AUTH_TITLES } from "@/constants/AuthTitles"
import { TbLogin2 } from "react-icons/tb"
import { FiUserPlus } from "react-icons/fi"

export const AuthButton: FC<AuthButtonInterface> = ({ isLogin, loading }) => (
  <Button type="submit" loading={loading}>
    {isLogin ? AUTH_TITLES.Login : AUTH_TITLES.SignUp}
    {isLogin ? <TbLogin2 size="1.5rem" /> : <FiUserPlus size="1.25rem" />}
  </Button>
)
