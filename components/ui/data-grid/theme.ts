import { themeQuartz } from 'ag-grid-community'

/**
 * Pixel-perfect match of the legacy ReportTable / PackagesTable styling:
 *   header bg #fafafb · header height 48 · row height 42 ·
 *   cell padding 16 · border #e5e7eb · header text-foreground / 700 ·
 *   body text #6A7282 · font Helvetica Neue 14
 *
 * Header has vertical dividers between columns (1px @ 50% height).
 * Body rows have horizontal dividers only.
 */
const sharedParams = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: 14,
  rowHeight: 42,
  headerHeight: 48,
  cellHorizontalPadding: 16,
  headerFontWeight: 700 as const,
  spacing: 8,
  wrapperBorder: false,
  columnBorder: false,
  headerColumnBorderHeight: '50%' as const,
  // Hide the resize-handle indicator so we only show the half-height
  // `headerColumnBorder` between columns. Drag-to-resize still works.
  headerColumnResizeHandleColor: 'transparent',
} satisfies Record<string, unknown>

export const dataGridLightTheme = themeQuartz.withParams({
  ...sharedParams,
  backgroundColor: '#ffffff',
  foregroundColor: '#6A7282',
  headerTextColor: '#101828',
  headerBackgroundColor: '#fafafb',
  oddRowBackgroundColor: '#ffffff',
  rowHoverColor: 'rgba(243, 244, 246, 0.55)',
  selectedRowBackgroundColor: 'rgba(225, 239, 222, 0.4)',
  borderColor: '#e5e7eb',
  headerRowBorder: { style: 'solid', width: 1, color: '#e5e7eb' },
  rowBorder: { style: 'solid', width: 1, color: '#e5e7eb' },
  headerColumnBorder: { style: 'solid', width: 1, color: '#e5e7eb' },
})

export const dataGridDarkTheme = themeQuartz.withParams({
  ...sharedParams,
  backgroundColor: 'hsl(217 22% 13%)',
  foregroundColor: 'hsl(218 11% 65%)',
  headerTextColor: 'hsl(0 0% 98%)',
  headerBackgroundColor: 'hsl(217 22% 16%)',
  oddRowBackgroundColor: 'hsl(217 22% 13%)',
  rowHoverColor: 'hsl(217 22% 18%)',
  selectedRowBackgroundColor: 'hsl(109 38% 18%)',
  borderColor: 'hsl(217 19% 20%)',
  headerRowBorder: { style: 'solid', width: 1, color: 'hsl(217 19% 20%)' },
  rowBorder: { style: 'solid', width: 1, color: 'hsl(217 19% 20%)' },
  headerColumnBorder: { style: 'solid', width: 1, color: 'hsl(217 19% 20%)' },
})
