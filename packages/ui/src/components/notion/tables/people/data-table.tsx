"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const styles = {
  bg: "bg-white dark:bg-[#202020]",
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: string;
  emptyResult?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  search,
  emptyResult,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  useEffect(() => {
    table.getColumn("account")?.setFilterValue(search);
  }, [table, search]);

  return (
    <Table variant="notion" className="border-t-0">
      <TableHeader variant="notion">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            variant="notion"
            className="border-none"
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                variant="notion"
                className={cn(
                  styles.bg,
                  "sticky top-0 h-8 py-0",
                  header.id === "account" &&
                    "left-0 z-40 min-w-[220px] border-r border-primary/10",
                  header.id === "teamspaces" && "z-30 w-[175px] pl-3 pr-1",
                  header.id === "access" && "z-30 w-[180px] pl-4 pr-1",
                  header.id === "groups" && "w-[120px] px-1",
                  header.id === "role" && "min-w-[120px] px-1",
                  header.id === "actions" && "w-[52px] px-1",
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody variant="notion">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              variant="notion"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  variant="notion"
                  className={cn(
                    styles.bg,
                    "h-[42px] py-0",
                    cell.column.id === "account" &&
                      "sticky left-0 z-20 w-[220px] border-r border-primary/10",
                    cell.column.id === "teamspaces" && "w-[175px] pl-3 pr-1",
                    cell.column.id === "access" && "z-30 w-[180px] pl-4 pr-1",
                    cell.column.id === "groups" && "w-[120px] px-1",
                    cell.column.id === "role" && "w-[120px] px-1",
                    cell.column.id === "actions" && "w-[52px] px-1",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow variant="notion">
            <TableCell
              variant="notion"
              colSpan={columns.length}
              className="sticky left-0 h-6 text-start text-primary/65"
            >
              {emptyResult ?? "No results."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
