import { FC } from "react"
import { LeaseInfoItemInterface } from "./LeaseInfoIcon.interface"

export const LeaseInfoIcon: FC<LeaseInfoItemInterface> = ({ icon: Icon }) => {
  return (
    <div className="w-6">
      <Icon size="1.5rem" />
    </div>
  )
}
