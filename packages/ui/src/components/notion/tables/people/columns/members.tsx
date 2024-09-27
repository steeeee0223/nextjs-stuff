"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";

import { Role, Scope } from "@/components/notion/types";
import {
  Header,
  MemberActionCell,
  RoleCell,
  SortingToggle,
  TeamspacesCell,
  UserCell,
} from "../cells";
import type { MemberRow } from "../types";

export const getMemberColumns = (
  memberId: string,
  scopes: Set<Scope>,
  onUpdate?: (id: string, role: Role) => void,
  onDelete?: (id: string) => void,
): ColumnDef<MemberRow, MemberRow>[] => [
  {
    id: "account",
    accessorKey: "account",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <SortingToggle
          title="User"
          isSorted={isSorted}
          toggle={() => column.toggleSorting(isSorted === "asc")}
        />
      );
    },
    cell: ({ row }) => <UserCell user={row.getValue("account")} />,
    filterFn: (row, _columnId, filterValue) =>
      row
        .getValue<MemberRow["account"]>("account")
        .email.trim()
        .toLowerCase()
        .includes(filterValue as string),
  },
  {
    accessorKey: "teamspaces",
    header: () => (
      <Header title="Teamspaces" className="min-w-[175px] pl-2 text-sm" />
    ),
    cell: ({ row }) => (
      <TeamspacesCell teamspaces={row.getValue("teamspaces")} />
    ),
  },
  {
    accessorKey: "groups",
    header: () => <Header title="Groups" className="min-w-[120px] text-sm" />,
    cell: () => (
      <div className="min-w-[120px] cursor-default text-sm text-primary/50">
        None
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <SortingToggle
          title="Role"
          isSorted={isSorted}
          toggle={() => column.toggleSorting(isSorted === "asc")}
        />
      );
    },
    cell: ({ row }) => (
      <RoleCell
        scopes={scopes}
        role={row.getValue("role")}
        onSelect={(role) => onUpdate?.(row.original.account.id, role)}
      />
    ),
  },
  ...(scopes.has(Scope.MemberUpdate)
    ? [
        {
          id: "actions",
          cell: ({ row }: { row: Row<MemberRow> }) => {
            const id = row.original.account.id;
            return (
              <div className="flex min-w-[52px] items-center justify-end">
                <MemberActionCell
                  isSelf={id === memberId}
                  onDelete={() => onDelete?.(id)}
                />
              </div>
            );
          },
        },
      ]
    : []),
];
