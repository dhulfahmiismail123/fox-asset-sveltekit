import type { ColumnDef } from "@tanstack/table-core";

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };