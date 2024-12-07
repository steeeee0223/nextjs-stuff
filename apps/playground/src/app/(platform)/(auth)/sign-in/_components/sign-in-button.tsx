/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

interface SignInButtonProps {
  name: string;
  githubAccount: string;
  avatarUrl: string;
  onClick: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  name,
  githubAccount,
  avatarUrl,
  onClick,
}) => {
  return (
    <Button
      variant="hint"
      className="flex h-fit w-full justify-between gap-2.5"
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <Image
          src={avatarUrl}
          alt="I"
          className="size-7 rounded-full border border-border"
          width={28}
          height={28}
        />
      </div>
      <div className="flex-1 text-left">
        <div className="truncate text-sm text-primary dark:text-primary/80">
          {name}
        </div>
        <div className="truncate text-xs text-secondary dark:text-secondary-dark">
          {githubAccount}
        </div>
      </div>
      <div className="flex-shrink-0 grow-0">
        <Hint description="Support on Github">
          <div
            role="button"
            tabIndex={0}
            className="flex size-7 items-center justify-center rounded-sm text-icon hover:bg-primary/5 dark:text-icon-dark"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://github.com/${githubAccount}`);
            }}
          >
            <SquareArrowOutUpRight className="size-4" />
          </div>
        </Hint>
      </div>
    </Button>
  );
};
