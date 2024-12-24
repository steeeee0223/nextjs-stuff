import React from "react";

import { Button } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import "./view.css";

import { CellActionPopover } from "./cell-action-provider";

const randomName: Record<string, string> = {
  "1": "alpha 1!!",
  "2": "BRAVO",
  "3": "chris for 3...",
};

export function PopoverDemo2() {
  const { setOpen } = useModal();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log("button position", e.currentTarget.title, rect);
    setOpen(
      <CellActionPopover
        type="text"
        value="Input..."
        position={{ top: rect.top, left: rect.left }}
      />,
    );
  };
  return (
    <div className="flex items-center">
      <div className="grid gap-4">
        {Array.from("abcd").map((id) => (
          <div key={id} className="flex gap-4">
            {Array.from("123").map((id) => (
              <Button
                key={id}
                onClick={onClick}
                className="col-start-1 row-start-1"
              >
                Open {randomName[id]}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
