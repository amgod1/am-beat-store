import { FC } from "react"
import { BiLogoGmail } from "react-icons/bi"
import { BsInstagram } from "react-icons/bs"

import { IconLink } from "@/components/IconLink"

export const Footer: FC = () => (
  <footer className="my-8 flex h-8 justify-between">
    <div className="flex items-center gap-4">
      <IconLink Icon={BsInstagram} href="https://www.instagram.com/amgod_1/" />
      <IconLink Icon={BiLogoGmail} href="https://www.instagram.com/amgod_1/" />
    </div>
    <h2 className="text-2xl hidden sm:block">prod by am</h2>
  </footer>
)
