import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cards } from "../../settings-panel/body/connections.data";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary/65">
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
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary">
          {connection.title}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary/65">
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
          <MoreHorizontal className="size-[14px] flex-shrink-0 fill-primary/45" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        variant="notion"
        align="center"
        className="z-[99999]"
      >
        {/* <DropdownMenuItem variant="notion" onClick={onConnect}>
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
