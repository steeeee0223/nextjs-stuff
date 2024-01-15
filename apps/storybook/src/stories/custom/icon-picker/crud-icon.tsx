import { useState } from "react";
import { Smile, X } from "lucide-react";

import { Button, IconPicker } from "@acme/ui/components";

const CrudIcon = () => {
  const [icon, setIcon] = useState("");
  const onUpdateIcon = (icon: string) => {
    setIcon(icon);
  };
  const onRemoveIcon = () => setIcon("");

  return (
    <div className="group relative pl-[54px]">
      {icon ? (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onUpdateIcon}>
            <p className="text-6xl transition hover:opacity-75">{icon}</p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
            variant="outline"
            size="icon"
          >
            <X className="w04 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-2 py-4">
          <IconPicker asChild onChange={onUpdateIcon}>
            <Button
              className="text-xs text-muted-foreground"
              variant="ghost"
              size="sm"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        </div>
      )}
    </div>
  );
};

export default CrudIcon;
