'use client'

import { useMemo } from 'react'
import { GripVertical, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DataGrid,
  type DataGridColumn,
} from '@/components/ui/data-grid/DataGrid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PACKAGE_COLUMNS } from '@/mocks/packages'
import type { Package, PackageColumnKey } from '../types'
import { usePackages } from '../PackagesContext'
import { useFilteredPackages } from '../hooks/useFilteredPackages'

const renderCell = (pkg: Package, key: PackageColumnKey): string | number => {
  switch (key) {
    case 'shipper':
      return pkg.shipper
    case 'deliveryDate':
      return pkg.deliveryDate
    case 'packageId':
      return pkg.packageId
    case 'shipmentId':
      return pkg.shipmentId
    case 'carrierGroup':
      return pkg.carrierGroup
    case 'company':
      return pkg.company
    case 'contact':
      return pkg.contact
    case 'stopNumber':
      return pkg.stopNumber
    case 'address1':
      return pkg.address1
    case 'address2':
      return pkg.address2
  }
}

export function PackagesTable() {
  const { visibleColumns, selectedIds, toggleRow, toggleAll } = usePackages()
  const rows = useFilteredPackages()

  const allRowIds = useMemo(() => rows.map((r) => r.id), [rows])
  const allSelected = allRowIds.length > 0 && allRowIds.every((id) => selectedIds.has(id))
  const someSelected = !allSelected && allRowIds.some((id) => selectedIds.has(id))

  const columns = useMemo<DataGridColumn<Package>[]>(() => {
    const leading: DataGridColumn<Package>[] = [
      {
        key: '__actions',
        label: '',
        width: 40,
        minWidth: 40,
        align: 'center',
        render: (row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Row actions"
                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => toast.success(`Viewing ${row.packageId}`)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success(`Tracking ${row.packageId}`)}>
                Track shipment
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast(`Marked ${row.packageId} as delivered`)}
              >
                Mark as delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.error(`Cancelled ${row.packageId}`)}
                className="text-destructive focus:text-destructive"
              >
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        colDefOverrides: {
          headerComponent: () => (
            <span className="flex h-full w-full items-center justify-center text-muted-foreground">
              <GripVertical className="h-4 w-4" />
            </span>
          ),
          cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
        },
      },
      {
        key: '__select',
        label: '',
        width: 40,
        minWidth: 40,
        align: 'center',
        render: (row) => (
          <Checkbox
            checked={selectedIds.has(row.id)}
            onCheckedChange={() => toggleRow(row.id)}
            aria-label={`Select ${row.packageId}`}
          />
        ),
        colDefOverrides: {
          headerComponent: () => (
            <span className="flex h-full w-full items-center justify-center">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={() => toggleAll(allRowIds)}
                aria-label="Select all"
              />
            </span>
          ),
          cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
        },
      },
    ]

    const dataCols: DataGridColumn<Package>[] = PACKAGE_COLUMNS.filter((c) =>
      visibleColumns.has(c.key)
    ).map((col) => ({
      key: col.key,
      label: col.label,
      width: col.width,
      render: (row) => String(renderCell(row, col.key)),
    }))

    return [...leading, ...dataCols]
  }, [visibleColumns, selectedIds, toggleRow, toggleAll, allRowIds, allSelected, someSelected])

  return (
    <DataGrid<Package>
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      emptyMessage="No packages match your filters."
      pinnedLeft={2}
      rowClassName={(row) => (selectedIds.has(row.id) ? 'gro-row-selected' : '')}
    />
  )
}
