import { MoreHorizontalIcon } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";

import { cards } from "../../settings-panel/body/connections.data";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="truncate text-xs text-secondary dark:text-secondary-dark">
      {title}
    </div>
  );
};

interface ConnectionCellProps {
  type: string;
  account: string;
}

export const ConnectionCell = ({ type, account }: ConnectionCellProps) => {
  const connection = cards.find(({ id }) => id === type);

  if (!connection) return null;
  return (
    <div className="mr-3 flex items-center">
      <img src={connection.imageUrl} alt={type} className="size-7" />
      <div className="ml-[15px]">
        <div className="truncate text-sm text-primary dark:text-primary/80">
          {connection.title}
        </div>
        <div className="truncate text-xs text-secondary dark:text-secondary-dark">
          {account}
        </div>
      </div>
    </div>
  );
};

interface ActionCellProps {
  onDisconnect?: (() => void) | false;
}

export const ActionCell = ({ onDisconnect }: ActionCellProps) => {
  const disabledDisconnect = onDisconnect === false;
  const handleDisconnect = () => {
    if (onDisconnect) onDisconnect();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="hint" size="icon-sm">
          <MoreHorizontalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {/* <DropdownMenuItem onClick={onConnect}>
          Connect another account
        </DropdownMenuItem> */}
        <DropdownMenuItem
          variant="warning"
          disabled={disabledDisconnect}
          onClick={handleDisconnect}
        >
          Disconnect account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
