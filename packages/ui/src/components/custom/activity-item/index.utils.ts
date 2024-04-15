export interface Entity {
  entityId: string;
  type: string;
  title: string;
}

export interface Log {
  username: string;
  avatar?: string;
  action: string;
  entity: Entity;
  createdAt: Date;
}

export const generateLogMessage = (log: Log): string => {
  const {
    action,
    entity: { title, type },
  } = log;
  switch (action.toLowerCase()) {
    case "update":
      return `edited ${type.toLowerCase()} "${title}"`;
    case "create":
    case "restore":
    case "delete":
      return `${action.toLowerCase()}d ${type.toLowerCase()} "${title}"`;
    default:
      return `unknown action ${type.toLowerCase()} "${title}"`;
  }
};
