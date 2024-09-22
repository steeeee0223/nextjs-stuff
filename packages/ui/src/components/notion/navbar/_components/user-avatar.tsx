import type { User } from "@/components/notion/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: User;
  borderColor?: string;
  className?: string;
}

const UserAvatar = ({ user, borderColor, className }: UserAvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Avatar
            className={cn("size-6 border-2", className)}
            style={{ borderColor }}
          >
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="text-xs font-semibold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          <div>{user.name}</div>
          <div className="font-normal">{user.email}</div>
          {/* <div className="min-w-[150px] py-0.5 leading-tight text-[rgba(206,205,202)]/60">
            Last viewed 1 day ago
          </div> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserAvatar;
