import React from "react";
import Image from "next/image";

import { Button } from "@swy/ui/shadcn";

interface SignInButtonProps {
  name: string;
  avatarUrl: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  name,
  avatarUrl,
}) => {
  return (
    <Button variant="hint" className="flex h-fit w-full justify-between">
      <div className="flex w-full items-center gap-2.5">
        <div className="relative flex-shrink-0">
          <Image
            src={avatarUrl}
            alt="I"
            className="size-7 rounded-full border border-border"
          />
        </div>
        <div className="flex-1 text-left">
          <div className="truncate text-sm text-primary dark:text-primary/80">
            {name}
          </div>
          <div className="truncate text-xs text-secondary dark:text-secondary-dark">
            Fake user
          </div>
        </div>
      </div>
    </Button>
  );
};
