import type { ColumnDef } from "@tanstack/react-table";

import { SortingToggle } from "./cells";
import * as Icon from "./icons";

export interface TableRow {
  title: string;
}

export const createTableColumns = (): ColumnDef<TableRow>[] => [
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <SortingToggle
          title="Title"
          icon={
            <Icon.Trans className="block size-4 flex-shrink-0 fill-primary/45" />
          }
          isSorted={isSorted}
          toggle={() => column.toggleSorting(isSorted === "asc")}
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
    filterFn: (row, _columnId, filterValue) =>
      row
        .getValue<TableRow["title"]>("title")
        .trim()
        .toLowerCase()
        .includes(filterValue as string),
  },
];
