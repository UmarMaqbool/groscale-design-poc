'use client'

import { useMemo } from 'react'
import { MOCK_PACKAGES } from '@/mocks/packages'
import { usePackages } from '../PackagesContext'

export function useFilteredPackages() {
  const { appliedSearch, statusFilter, appliedAdvanced } = usePackages()

  return useMemo(() => {
    const search = appliedSearch.trim().toLowerCase()

    return MOCK_PACKAGES.filter((p) => {
      if (statusFilter && p.status !== statusFilter) return false

      if (search) {
        const haystack = [
          p.shipper,
          p.packageId,
          p.shipmentId,
          p.carrierGroup,
          p.company,
          p.contact,
          p.address1,
          p.address2,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(search)) return false
      }

      if (
        appliedAdvanced.shipperIds.length > 0 &&
        !appliedAdvanced.shipperIds.some((id) =>
          p.shipper.toLowerCase().includes(id.toLowerCase())
        )
      ) {
        return false
      }

      if (
        appliedAdvanced.carrierIds.length > 0 &&
        !appliedAdvanced.carrierIds.some((id) =>
          p.carrierGroup.toLowerCase().includes(id.toLowerCase())
        )
      ) {
        return false
      }

      return true
    })
  }, [appliedSearch, statusFilter, appliedAdvanced])
}
