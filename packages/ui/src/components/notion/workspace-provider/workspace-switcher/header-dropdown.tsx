import { MoreHorizontal, PlusSquare, XCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const styles = {
  dropdown: "p-0.5 hover:bg-primary/5 hover:rounded-sm",
  icon: "text-muted-foreground h-4 w-4",
  item: "gap-x-2 h-7 focus:bg-primary/5",
};

interface HeaderDropdownProps {
  onLogout?: () => void;
  onCreateWorkspace?: () => void;
}

const HeaderDropdown = ({
  onCreateWorkspace,
  onLogout,
}: HeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={styles.dropdown}>
        <MoreHorizontal className={styles.icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999] border-primary/15">
        <DropdownMenuItem className={styles.item} onClick={onCreateWorkspace}>
          <PlusSquare className={styles.icon} />
          <p>Join or create workspace</p>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.item} onClick={onLogout}>
          <XCircle className={styles.icon} />
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
