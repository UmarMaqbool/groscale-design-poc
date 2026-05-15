import { themeQuartz } from 'ag-grid-community'

/**
 * AG Grid theme — reads design tokens via CSS variables so it switches
 * automatically when `.dark` is toggled on `<html>`. No separate light/dark
 * theme objects to maintain.
 *
 * Token mapping:
 *   backgroundColor          → --card             (row surface)
 *   foregroundColor          → --muted-foreground (body cell text)
 *   headerTextColor          → --foreground       (header label text)
 *   headerBackgroundColor    → --card-alt         (slightly raised header)
 *   rowHoverColor            → --accent           (unified hover surface)
 *   selectedRowBackgroundColor → --primary-100    (brand soft-green tint)
 *   borderColor              → --border           (subtle divider)
 *
 * Add new params here — never inline a hex value at the call-site.
 */
export const dataGridTheme = themeQuartz.withParams({
  fontFamily: 'var(--font-sans), Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: 14,
  rowHeight: 42,
  headerHeight: 48,
  cellHorizontalPadding: 16,
  headerFontWeight: 700,
  spacing: 8,
  wrapperBorder: false,
  columnBorder: false,
  headerColumnBorderHeight: '50%',
  // Hide the resize-handle indicator so we only show the half-height
  // `headerColumnBorder` between columns. Drag-to-resize still works.
  headerColumnResizeHandleColor: 'transparent',

  backgroundColor: 'hsl(var(--card))',
  foregroundColor: 'hsl(var(--muted-foreground))',
  headerTextColor: 'hsl(var(--foreground))',
  headerBackgroundColor: 'hsl(var(--card-alt))',
  headerCellHoverBackgroundColor: 'hsl(var(--accent))',
  headerCellMovingBackgroundColor: 'hsl(var(--accent))',
  oddRowBackgroundColor: 'hsl(var(--card))',
  rowHoverColor: 'hsl(var(--accent))',
  selectedRowBackgroundColor: 'hsl(var(--primary-100))',
  borderColor: 'hsl(var(--border))',
  headerRowBorder: { style: 'solid', width: 1, color: 'hsl(var(--border))' },
  rowBorder: { style: 'solid', width: 1, color: 'hsl(var(--border))' },
  headerColumnBorder: { style: 'solid', width: 1, color: 'hsl(var(--border))' },
  iconButtonHoverBackgroundColor: 'transparent',
})
