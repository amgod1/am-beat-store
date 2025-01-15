import { LEASES } from "@/modules/License/constants"

export interface LeaseItemInterface {
  lease: (typeof LEASES)[number]
  selected: boolean
  onClick: () => void
}
