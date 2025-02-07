import { FC } from "react"
import { FiUserPlus } from "react-icons/fi"
import { TbLogin2 } from "react-icons/tb"

import { Button } from "@/components/Button"

import { AUTH_TITLES } from "@/constants/AuthTitles"

import { AuthButton as AuthButtonProps } from "./AuthButton.interface"

export const AuthButton: FC<AuthButtonProps> = ({ isLogin, loading }) => (
  <Button type="submit" loading={loading}>
    {isLogin ? AUTH_TITLES.Login : AUTH_TITLES.SignUp}
    {isLogin ? <TbLogin2 size="1.5rem" /> : <FiUserPlus size="1.25rem" />}
  </Button>
)
