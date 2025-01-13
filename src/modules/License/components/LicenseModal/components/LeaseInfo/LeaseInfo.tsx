import { FC } from "react"
import { LEASES } from "@/constants/Leases"
import { LeaseInfoInterface } from "./LeaseInfo.interface"
import { LeaseInfoIcon } from "../LeaseInfoIcon"

export const LeaseInfo: FC<LeaseInfoInterface> = ({ id }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
      {LEASES.find((lease) => lease.id === id)?.info.map((info) => (
        <div key={info.id} className="flex gap-4 flex-row items-center">
          <LeaseInfoIcon icon={info.icon} />
          <p className="text-xs sm:text-base">{info.text}</p>
        </div>
      ))}
    </div>
  )
}
