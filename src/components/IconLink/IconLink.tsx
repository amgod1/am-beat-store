import { FC } from "react"
import { Link } from "react-router-dom"
import { IconLinkInterface } from "./IconLink.interface"

export const IconLink: FC<IconLinkInterface> = ({
  Icon,
  href,
  navigation,
  callback,
  size = "1.5rem",
}) => {
  const iconClasses = "cursor-pointer hover:text-warning"

  if (href) {
    return (
      <a href={href} target="_blank">
        <Icon className={iconClasses} size={size} />
      </a>
    )
  }

  if (navigation) {
    return (
      <Link to={navigation}>
        <Icon className={iconClasses} size={size} />
      </Link>
    )
  }

  if (callback) {
    return (
      <button onClick={callback}>
        <Icon className={iconClasses} size={size} />
      </button>
    )
  }

  return null
}
