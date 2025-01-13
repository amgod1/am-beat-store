import { FC } from "react"
import { LeaseItemInterface } from "./LeaseItem.interface"

export const LeaseItem: FC<LeaseItemInterface> = ({
  lease,
  selected,
  onClick,
}) => (
  <div
    key={lease.id}
    onClick={onClick}
    className={`border border-primary p-4 sm:p-4 ${
      selected
        ? "bg-warning text-dark"
        : "bg-dark hover:bg-info hover:text-dark cursor-pointer"
    }`}
  >
    <h3 className="text-base sm:text-2xl text-nowrap">{lease.title}</h3>
    <p className="text-sm sm:text-base">{lease.price}$</p>
    <p className="text-sm sm:text-base">{lease.type}</p>
  </div>
)
