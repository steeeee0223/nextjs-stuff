import React from "react";
import { Shuffle } from "lucide-react";

import { Button, Input } from "@swy/ui/shadcn";

import { Hint } from "../../hint";

interface MenuSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onRandomSelect: () => void;
  Palette: React.ReactNode;
}

export const MenuSearchBar: React.FC<MenuSearchBarProps> = ({
  search,
  onSearchChange,
  onRandomSelect,
  Palette,
}) => {
  return (
    <div className="mb-1.5 flex w-full items-center gap-x-1.5">
      <div className="flex-1">
        <Input
          variant="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter..."
        />
      </div>
      <Hint asChild description="Random">
        <Button variant="secondary" size="icon-md" onClick={onRandomSelect}>
          <Shuffle size={16} />
        </Button>
      </Hint>
      {Palette}
    </div>
  );
};
