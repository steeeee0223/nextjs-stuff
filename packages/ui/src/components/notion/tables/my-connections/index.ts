import { myConnectionsColumns, type Connection } from "./columns";
import { DataTable } from "./data-table";

export { myConnectionsColumns, type Connection };
export const MyConnections = DataTable<Connection, Connection>;
