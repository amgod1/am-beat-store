import { LEASES } from "@/constants/Leases"

export interface LeaseItemInterface {
  lease: (typeof LEASES)[number]
  selected: boolean
  onClick: () => void
}
