"use client";

import { Hint } from "@/components/custom/hint";
import { usePage } from "@/components/notion/page-provider";
import { idToColor } from "@/lib/utils";
import UserAvatar from "./user-avatar";

const MAX_SHOWN_USERS = 1;

export const Participants = () => {
  const { currentUser, otherUsers } = usePage();
  const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;

  return (
    <div className="flex items-center">
      {currentUser && (
        <UserAvatar
          borderColor={idToColor(currentUser.id)}
          user={currentUser}
          className="ml-[-8px]"
        />
      )}
      {otherUsers
        ?.slice(0, MAX_SHOWN_USERS)
        .map((user) => (
          <UserAvatar
            borderColor={idToColor(user.id)}
            key={user.id}
            user={user}
            className="ml-[-8px]"
          />
        ))}
      {hasMoreUsers && (
        <Hint
          description={`Viewed by ${otherUsers.length - MAX_SHOWN_USERS} more people`}
          sideOffset={10}
        >
          <div className="ml-2 select-none whitespace-nowrap text-sm text-secondary dark:text-secondary-dark">{`+${otherUsers.length - MAX_SHOWN_USERS}`}</div>
        </Hint>
      )}
    </div>
  );
};
