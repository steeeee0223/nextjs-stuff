import type { ContentPlanRow, HighlightPlanRow } from "./columns";
import { DataTable } from "./data-table";

export * from "./columns";
export const HighlightTable = DataTable<HighlightPlanRow, HighlightPlanRow>;
export const ContentTable = DataTable<ContentPlanRow, ContentPlanRow>;
