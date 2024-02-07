"use client";

import { MAX_SHOWN_USERS } from "~/constants/site";
import { connectionIdToColor } from "~/lib";
import { useOthers, useSelf } from "~/liveblocks.config";
import UserAvatar from "./user-avatar";

const Participants = () => {
  const currentUser = useSelf();
  const otherUsers = useOthers();
  const hasMoreUsers = otherUsers.length > MAX_SHOWN_USERS;

  return (
    <div className="flex">
      {currentUser && (
        <UserAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}
          src={currentUser.info?.picture}
          name={`${currentUser.info?.name} (You)`}
          fallback={currentUser.info?.name?.[0]}
          className="ml-[-8px]"
        />
      )}
      {otherUsers.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
        <UserAvatar
          borderColor={connectionIdToColor(connectionId)}
          key={connectionId}
          src={info?.picture}
          name={info?.name}
          fallback={info?.name?.[0] ?? "T"}
          className="ml-[-8px]"
        />
      ))}
      {hasMoreUsers && (
        <UserAvatar
          name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
          fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`}
          className="ml-[-8px]"
        />
      )}
    </div>
  );
};

export default Participants;
