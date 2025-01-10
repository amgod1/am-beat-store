import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

const selectLicense = (state: RootState) => state.license

export const selectLicenseInfo = createSelector(
  [selectLicense],
  (license) => license.info
)

export const selectLicenseStatus = createSelector(
  [selectLicense],
  (license) => license.status
)
