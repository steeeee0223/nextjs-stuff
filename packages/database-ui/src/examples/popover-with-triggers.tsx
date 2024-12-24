import React, { useRef, useState } from "react";

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@swy/ui/shadcn";

const randomName: Record<string, string> = {
  "1": "alpha 1!!",
  "2": "BRAVO",
  "3": "chris for 3...",
};

export function PopoverDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ height: 0 });
  const onOpenChange = (open: boolean) => {
    if (!open) setOpen(false);
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ height: rect.height });
    console.log("button position", e.currentTarget.title, rect);
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal>
      <div ref={containerRef} className="flex items-center">
        <div className="grid gap-4">
          {Array.from("abcd").map((id) => (
            <div key={id} className="flex gap-4">
              {Array.from("123").map((id) => (
                <PopoverTrigger key={id} asChild>
                  <Button onClick={onClick} className="col-start-1 row-start-1">
                    Open {randomName[id]}
                  </Button>
                </PopoverTrigger>
              ))}
            </div>
          ))}
        </div>
      </div>
      <PopoverContent
        className="p-4"
        container={containerRef.current}
        side="bottom"
        align="start"
        sideOffset={-position.height}
      >
        <Label>Popover content</Label>
        <Input placeholder="Enter something..." />
      </PopoverContent>
    </Popover>
  );
}
