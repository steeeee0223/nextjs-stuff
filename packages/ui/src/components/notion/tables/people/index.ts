import { DataTable } from "./data-table";
import type { GroupRow, GuestRow, MemberRow } from "./types";

export const MembersTable = DataTable<MemberRow, MemberRow>;
export const GuestsTable = DataTable<GuestRow, GuestRow>;
export const GroupsTable = DataTable<GroupRow, GroupRow>;

export * from "./columns";
export * from "./types";
