import React from "react";

import { myConnectionsColumns, type Connection } from "./columns";
import { DataTable, type DataTableProps } from "./data-table";

export { myConnectionsColumns, type Connection };

export const MyConnections: React.FC<DataTableProps<Connection, Connection>> =
  DataTable;
