import type { ColumnDef } from "@tanstack/react-table";

import { Header } from "../cells";
import type { GroupRow } from "../types";

export const groupColumns: ColumnDef<GroupRow, GroupRow>[] = [
  {
    id: "group",
    accessorKey: "group",
    header: () => <Header title="Group" className="text-sm" />,
  },
  {
    id: "members",
    accessorKey: "members",
    header: () => <Header title="Members" className="text-sm" />,
  },
];
