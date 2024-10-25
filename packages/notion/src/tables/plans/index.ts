import React from "react";

import type { ContentPlanRow, HighlightPlanRow } from "./columns";
import { DataTable, type DataTableProps } from "./data-table";

export * from "./columns";
export const HighlightTable: React.FC<
  DataTableProps<HighlightPlanRow, HighlightPlanRow>
> = DataTable;
export const ContentTable: React.FC<
  DataTableProps<ContentPlanRow, ContentPlanRow>
> = DataTable;
