import { FC } from "react"
import { DownloadButton as DownloadButtonProps } from "./DownloadButton.interface"

export const DownloadButton: FC<DownloadButtonProps> = ({ beat, leaseId }) => {
  let href: string

  switch (leaseId) {
    case 1: {
      href = beat.url
      break
    }
    case 2: {
      href = beat.fileLinks.pro
      break
    }
    case 3: {
      href = beat.fileLinks.exclusive
      break
    }
    default: {
      href = beat.url
    }
  }

  return (
    <button className="w-full bg-dark border border-primary h-11 transition-all duration-200 hover:text-dark hover:bg-warning">
      <a className="w-full h-full" href={href} target="_blank">
        download
      </a>
    </button>
  )
}
