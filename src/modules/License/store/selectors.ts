import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

const selectLicense = (state: RootState) => state.license

export const selectShowLicenseModal = createSelector(
  [selectLicense],
  (license) => license.show
)

export const selectCartItem = createSelector([selectLicense], (license) => ({
  beatId: license.selectedBeatId,
  leasePlanId: license.selectedLeasePlanId,
}))
