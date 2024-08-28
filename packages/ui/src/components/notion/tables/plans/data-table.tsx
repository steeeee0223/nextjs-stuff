"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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

interface DataTableProps<TData, TValue> {
  type: "highlight" | "content";
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  type,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const tableRows = table.getRowModel().rows;

  return (
    <Table variant="notion" className="border-y-0">
      <TableHeader variant="notion">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            variant="notion"
            className={cn(
              "flex gap-3 border-t-0",
              type === "highlight" &&
                "bg-main py-5 shadow-sm dark:bg-main-dark",
              type === "content" && "border-b border-primary/10",
            )}
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                variant="notion"
                className={cn(
                  "w-full max-w-[150px] py-0",
                  header.id === "title" && " max-w-[118px]",
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
        {tableRows?.length ? (
          tableRows.map((row, i) => (
            <TableRow
              key={row.id}
              variant="notion"
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                "flex gap-3 border-t-0",
                type === "highlight" && "bg-[#f9f9f8] dark:bg-modal-dark",
                type === "content" &&
                  i % 2 === 1 &&
                  "bg-[#f9f9f8] dark:bg-modal-dark",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  variant="notion"
                  className={cn(
                    "w-[150px] py-0",
                    cell.column.id === "title" && "w-[118px]",
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
              className="h-6 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
