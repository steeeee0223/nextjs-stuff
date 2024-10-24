import React from "react";
import { SaveIcon } from "lucide-react";

import { Button } from "@swy/ui/shadcn";

interface SaveButtonProps {
  onClick?: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <Button size="icon" className="rounded-lg" onClick={onClick}>
      <SaveIcon className="size-4" />
    </Button>
  );
};
