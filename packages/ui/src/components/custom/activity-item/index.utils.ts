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
  const { action, username } = log;
  switch (action.toLowerCase()) {
    case "create":
    case "restore":
    case "delete":
      return `${username} ${action.toLowerCase()}d `;
    default:
      return `${username} edited `;
  }
};
