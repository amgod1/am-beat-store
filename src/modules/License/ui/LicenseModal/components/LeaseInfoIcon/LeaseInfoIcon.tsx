import { FC } from "react"

import { LeaseInfoItem as LeaseInfoItemProps } from "./LeaseInfoIcon.interface"

export const LeaseInfoIcon: FC<LeaseInfoItemProps> = ({ icon: Icon }) => {
  return (
    <div className="w-6">
      <Icon size="1.5rem" />
    </div>
  )
}
