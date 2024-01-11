export type ACTION = "CREATE" | "UPDATE" | "DELETE";

export interface Entity {
  entityId: string;
  type: string;
  title: string;
}

export interface Log {
  username: string;
  avatar?: string;
  action: ACTION;
  entity: Entity;
  createdAt: Date;
}

export const generateLogMessage = (log: Log): string => {
  const {
    action,
    entity: { title, type },
  } = log;
  switch (action) {
    case "CREATE":
      return `created ${type.toLowerCase()} "${title}"`;
    case "UPDATE":
      return `updated ${type.toLowerCase()} "${title}"`;
    case "DELETE":
      return `deleted ${type.toLowerCase()} "${title}"`;
    default:
      return `unknown action ${type.toLowerCase()} "${title}"`;
  }
};
