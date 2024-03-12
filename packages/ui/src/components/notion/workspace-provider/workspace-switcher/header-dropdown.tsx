import { MoreHorizontal, PlusSquare, XCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

const styles = {
  dropdown: "hover:bg-primary/5 hover:rounded-sm",
  icon: "text-muted-foreground h-4 w-4 mr-2",
};

interface HeaderDropdownProps {
  onLogout?: () => void;
}

const HeaderDropdown = ({ onLogout }: HeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={styles.dropdown}>
        <MoreHorizontal className={styles.icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999]">
        <DropdownMenuItem>
          <PlusSquare className={styles.icon} />
          <p>Join or create workspace</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <XCircle className={styles.icon} onClick={onLogout} />
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
