import React from "react";

import { DataTable, type DataTableProps } from "./data-table";
import type { GroupRow, GuestRow, MemberRow } from "./types";

export const MembersTable: React.FC<DataTableProps<MemberRow, MemberRow>> =
  DataTable;
export const GuestsTable: React.FC<DataTableProps<GuestRow, GuestRow>> =
  DataTable;
export const GroupsTable: React.FC<DataTableProps<GroupRow, GroupRow>> =
  DataTable;

export * from "./columns";
export * from "./types";
