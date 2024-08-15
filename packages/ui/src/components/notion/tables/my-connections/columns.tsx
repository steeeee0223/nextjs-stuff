"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ActionCell, ConnectionCell, Header } from "./cells";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface ConnectionActions {
  onDisconnect?: (() => void) | false;
}
export interface Connection extends ConnectionActions {
  id: string;
  connection: { type: string; account: string };
  scopes: string[];
}

export const myConnectionsColumns: ColumnDef<Connection, Connection>[] = [
  {
    accessorKey: "connection",
    header: () => <Header title="Connection" />,
    cell: ({ row }) => <ConnectionCell {...row.getValue("connection")} />,
  },
  {
    accessorKey: "scopes",
    header: () => <Header title="Access" />,
    cell: ({ row }) => (
      <>
        {row.getValue<string[]>("scopes").map((scope, i) => (
          <div key={i}>{scope}</div>
        ))}
      </>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell onDisconnect={row.original.onDisconnect} />,
  },
];
