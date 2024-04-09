import { format } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage, type Log } from "./index.utils";

interface ActivityItemProps {
  data: Log;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  const createdAt = format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a");

  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.avatar} alt="avatar" />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-secondary-foreground">
            {data.username}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">{createdAt}</p>
      </div>
    </li>
  );
};
