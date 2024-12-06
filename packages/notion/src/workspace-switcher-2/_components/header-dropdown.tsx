import React from "react";
import { MoreHorizontal, PlusSquare, XCircle } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";

interface HeaderDropdownProps {
  onLogout?: () => void;
  onCreateWorkspace?: () => void;
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  onCreateWorkspace,
  onLogout,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="subitem" size="icon-sm">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="h-7 gap-x-2" onClick={onCreateWorkspace}>
          <PlusSquare className="size-4" />
          <p>Join or create workspace</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-7 gap-x-2" onClick={onLogout}>
          <XCircle className="size-4" />
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
