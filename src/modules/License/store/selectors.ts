import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "@/app/store/store"

const selectLicense = (state: RootState) => state.license

export const selectShowLicenseModal = createSelector(
  [selectLicense],
  (license) => license.show,
)

export const selectCartItem = createSelector([selectLicense], (license) => ({
  beatId: license.selectedBeatId,
  leasePlanId: license.selectedLeasePlanId,
}))
