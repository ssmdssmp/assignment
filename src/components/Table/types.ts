export interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  editable: Boolean;
  renderCell: any;
}

export interface Row {
  index: number;
}

export interface Data {
  calories: number;
  carbs: number;
  name: string;
  fat: number;
  id: number;
  protein: number;
}

export interface MuiVirtualizedTableProps {
  columns: readonly ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
}
