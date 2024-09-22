import { format } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage, type Entity, type Log } from "./index.utils";

interface ActivityItemProps {
  data: Log;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  const createdAt = format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a");

  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="size-6">
        <AvatarImage src={data.avatar} alt="avatar" />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm">
          {generateLogMessage(data)}
          <span className="font-semibold">{data.entity.title}</span>
        </p>
        <p className="text-xs text-muted dark:text-muted-dark">{createdAt}</p>
      </div>
    </li>
  );
};

export type { Log, Entity, ActivityItemProps };
