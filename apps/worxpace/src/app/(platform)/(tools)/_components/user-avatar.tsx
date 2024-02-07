import { Avatar, AvatarFallback, AvatarImage, Hint } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
  className?: string;
}

const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
  className,
}: UserAvatarProps) => {
  return (
    <Hint
      asChild
      description={name ?? "Teammate"}
      side="bottom"
      sideOffset={18}
    >
      <Avatar
        className={cn("h-6 w-6 border-2", className)}
        style={{ borderColor }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
