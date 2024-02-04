"use client";

import { SignOutButton, useOrganizationList, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";

import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";

interface UserItemProps {
  name?: string | null;
  imageUrl?: string | null;
}
const UserItem = ({ name, imageUrl }: UserItemProps) => {
  return (
    <div className={theme.flex.gap2}>
      <div className="rounded-md bg-secondary p-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl ?? undefined} />
        </Avatar>
      </div>
      <div className="space-y-1">
        <p className="line-clamp-1 text-sm">{name ?? "User"}&apos;s WorXpace</p>
      </div>
    </div>
  );
};

/** @deprecated */
export const UserItems = () => {
  const { user } = useUser();
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className={cn(
            theme.flex.center,
            "w-full p-3 text-sm hover:bg-primary/5",
          )}
        >
          <div className={cn(theme.flex.gap2, "max-w-[150px]")}>
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="line-clamp-1 text-start font-medium">
              {user?.fullName}
            </span>
          </div>
          <ChevronsLeftRight
            className={cn(
              theme.size.icon,
              "ml-2 rotate-90 text-muted-foreground",
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses.at(0)?.emailAddress}
          </p>
          <UserItem name={user?.fullName} imageUrl={user?.imageUrl} />
          {userMemberships.data?.map(
            ({ organization: { id, name, imageUrl } }) => (
              <UserItem key={id} name={name} imageUrl={imageUrl} />
            ),
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
