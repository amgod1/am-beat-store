import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { FC } from "react"
import { FaApple, FaGoogle } from "react-icons/fa"

import { auth } from "@/app/firebase.config"

import { Button } from "@/components/Button"

import { AdditionalProvider as AdditionalProviderProps } from "./AdditionalProvider.interface"

export const AdditionalProvider: FC<AdditionalProviderProps> = ({
  provider,
  isLoading,
}) => {
  const onClickHandler = async () => {
    try {
      const authProvider =
        provider === "Apple"
          ? new OAuthProvider("apple.com")
          : new GoogleAuthProvider()

      await signInWithPopup(auth, authProvider)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      type="button"
      onClick={onClickHandler}
      loading={isLoading}
      fullWidth={true}
    >
      {provider === "Apple" ? (
        <FaApple size="1.5rem" />
      ) : (
        <FaGoogle size="1.3rem" />
      )}
      <p className="hidden sm:inline">{`continue with ${provider}`}</p>
    </Button>
  )
}
