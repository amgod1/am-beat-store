import { LEASES } from "@/modules/License/constants"

export interface LeaseItem {
  lease: (typeof LEASES)[number]
  selected: boolean
  disabled: boolean
  onClick: () => void
}
