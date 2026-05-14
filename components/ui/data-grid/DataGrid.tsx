'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type RowClassParams,
  type ValueGetterParams,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { cn } from '@/lib/utils'
import { dataGridTheme } from './theme'
import './data-grid.css'

ModuleRegistry.registerModules([AllCommunityModule])

export interface DataGridColumn<TRow> {
  key: string
  label: string
  width?: number
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  /**
   * Custom cell renderer. Receives the row and the column key.
   * Return a string/number for plain text, or a ReactNode for rich content.
   */
  render?: (row: TRow) => React.ReactNode
  /**
   * Optional explicit value accessor. Defaults to `row[key]`.
   */
  valueGetter?: (row: TRow) => unknown
  /** AG Grid column overrides (sortable, filter, pinned, headerComponent, etc.) */
  colDefOverrides?: Partial<ColDef<TRow>>
}

export interface DataGridProps<TRow extends object> {
  columns: DataGridColumn<TRow>[]
  rows: TRow[]
  getRowId: (row: TRow) => string
  emptyMessage?: string
  /** Outer container classes — defaults to mx-5. Pass empty string to drop the gutter. */
  className?: string
  /**
   * Calculated grid height when not relying on `domLayout="autoHeight"`. Defaults to `auto` (uses
   * AG Grid's auto-sizing based on row count). Pass a number (px) for a fixed scrollable region.
   */
  height?: number | 'auto'
  /** Hover/selected row tint applied to a row — class name is rendered on the row's wrapper. */
  rowClassName?: (row: TRow) => string | undefined
  /** Pin first N columns (e.g. 1 for action menu, 2 for action+checkbox). */
  pinnedLeft?: number
}

export function DataGrid<TRow extends object>({
  columns,
  rows,
  getRowId,
  emptyMessage = 'No data to display.',
  className = 'mx-5',
  height = 'auto',
  rowClassName,
  pinnedLeft = 0,
}: DataGridProps<TRow>) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const gridRef = useRef<AgGridReact<TRow>>(null)

  const columnDefs = useMemo<ColDef<TRow>[]>(() => {
    return columns.map((col, idx) => {
      const cellRenderer: ColDef<TRow>['cellRenderer'] = col.render
        ? (params: { data: TRow | undefined }) =>
            params.data ? col.render!(params.data) : null
        : undefined

      const valueGetter: ColDef<TRow>['valueGetter'] = col.valueGetter
        ? (params: ValueGetterParams<TRow>) =>
            params.data ? col.valueGetter!(params.data) : undefined
        : undefined

      const isPinned = idx < pinnedLeft
      return {
        colId: col.key,
        field: col.key as ColDef<TRow>['field'],
        headerName: col.label,
        // Pinned utility columns stay at their declared width (no flex, no
        // size-to-fit, not resizable / not movable). Data columns use the
        // declared width as a minimum and flex to fill remaining width, and
        // the user can resize / reorder them.
        width: isPinned ? col.width : undefined,
        minWidth: col.minWidth ?? col.width,
        flex: isPinned ? 0 : 1,
        suppressSizeToFit: isPinned,
        resizable: !isPinned,
        suppressMovable: isPinned,
        lockPosition: isPinned ? 'left' : undefined,
        cellRenderer,
        valueGetter,
        pinned: isPinned ? 'left' : undefined,
        cellStyle: {
          display: 'flex',
          alignItems: 'center',
          textAlign: col.align ?? 'left',
          justifyContent:
            col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start',
        },
        headerClass:
          col.align === 'right'
            ? 'gro-header-right'
            : col.align === 'center'
              ? 'gro-header-center'
              : undefined,
        ...col.colDefOverrides,
      }
    })
  }, [columns, pinnedLeft])

  const defaultColDef = useMemo<ColDef<TRow>>(
    () => ({
      sortable: false,
      resizable: true,
      suppressMovable: false,
      suppressHeaderMenuButton: true,
    }),
    []
  )

  const getRowClass = useMemo(() => {
    if (!rowClassName) return undefined
    return (params: RowClassParams<TRow>) => {
      if (!params.data) return ''
      return rowClassName(params.data) ?? ''
    }
  }, [rowClassName])

  // AG Grid evaluates getRowClass only at row render time. When the closure
  // changes (e.g. selection state moves), force a redraw so row tints update.
  useEffect(() => {
    gridRef.current?.api?.redrawRows()
  }, [rowClassName])

  const containerStyle: React.CSSProperties =
    height === 'auto'
      ? {}
      : { height }

  // Avoid hydration flicker — render shell only on first paint.
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[10px] border border-border bg-card',
        className
      )}
    >
      <div
        className="gro-data-grid w-full"
        style={containerStyle}
        data-empty={rows.length === 0 ? 'true' : 'false'}
      >
        {mounted ? (
          rows.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <AgGridReact<TRow>
              ref={gridRef}
              theme={dataGridTheme}
              rowData={rows}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              getRowId={(p) => getRowId(p.data)}
              getRowClass={getRowClass}
              domLayout={height === 'auto' ? 'autoHeight' : 'normal'}
              suppressCellFocus
              suppressDragLeaveHidesColumns
              animateRows={false}
              headerHeight={48}
              rowHeight={42}
            />
          )
        ) : (
          <div className="h-12 w-full bg-card-alt" aria-hidden />
        )}
      </div>
    </div>
  )
}
