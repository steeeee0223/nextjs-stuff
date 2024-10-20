/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { useEffect, useState } from "react";
import { HelpCircle, Trash, Undo } from "lucide-react";
import { toast } from "sonner";
import stableHash from "stable-hash";

import { Hint } from "@/components/custom/hint";
import { IconBlock } from "@/components/custom/icon-block";
import { useModal } from "@/components/custom/modal-provider";
import { BaseModal } from "@/components/notion/common";
import type { Page } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/variants";
import { cn } from "@/lib/utils";
import { HintItem } from "./hint-item";

interface TrashBoxProps {
  isOpen: boolean;
  isMobile?: boolean;
  onOpenChange: (open: boolean) => void;
  fetchPages?: () => Promise<Page[]>;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string, type: string) => void;
}

export const TrashBox = ({
  isOpen,
  onOpenChange,
  fetchPages,
  onRestore,
  onDelete,
  onSelect,
}: TrashBoxProps) => {
  const { setOpen } = useModal();
  /** Select */
  const [pages, setPages] = useState<Page[]>([]);
  const handleSelect = (id: string, type: string) => {
    onSelect?.(id, type);
    onOpenChange(false);
  };
  /** Filter */
  const [input, setInput] = useState("");
  const [filteredItems, setFilteredItems] = useState<Page[] | null>(null);
  const updateFilteredItems = (input: string) => {
    const v = input.trim().toLowerCase();
    const result = pages.filter((page) => page.title.toLowerCase().includes(v));
    setFilteredItems(
      v.length > 0 ? (result.length > 0 ? result : null) : pages,
    );
  };
  const onInputChange = (input: string) => {
    setInput(input);
    updateFilteredItems(input);
  };
  /** Docs Actions */
  const handleRestore = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    onRestore?.(id);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setOpen(
      <BaseModal
        title="Are you sure you want to delete this page from Trash?"
        primary="Yes. Delete this page"
        secondary="Cancel"
        onTrigger={() => onDelete?.(id)}
      />,
    );
  };

  useEffect(() => {
    void fetchPages?.()
      .then((data) => {
        const pages = data.filter((page) => page.isArchived);
        setPages(pages);
        setFilteredItems(pages);
      })
      .catch(() => toast.message("Error while fetching pages"));
  }, [fetchPages]);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <HintItem
          className="mt-4"
          label="Trash"
          hint="Restore deleted pages"
          icon={Trash}
        />
      </PopoverTrigger>
      <PopoverContent
        forceMount
        className="relative bottom-10 flex h-[50vh] w-[400px] flex-col"
        side="right"
        sideOffset={-4}
        align="start"
      >
        <div className="flex w-full items-center px-3 py-2.5">
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Search pages in Trash"
          />
        </div>
        <div className="flex h-full flex-grow overflow-y-auto py-1.5">
          {!filteredItems || filteredItems.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Trash className="block size-9 flex-shrink-0 text-[#c7c6c4]" />
              <div className="flex flex-col text-center text-sm text-[#787774]">
                <span className="font-semibold">No results</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex w-full flex-col px-1 pb-1 text-sm">
              {filteredItems.map(({ id, title, type, icon }) => (
                <div
                  key={id}
                  role="button"
                  onClick={() => handleSelect(id, type)}
                  className={cn(
                    buttonVariants({ variant: "item" }),
                    "w-full justify-between px-2",
                  )}
                >
                  <div className="flex items-center gap-x-1 pl-2">
                    <IconBlock
                      key={stableHash(icon)}
                      defaultIcon={icon ?? { type: "emoji", emoji: " " }}
                      editable={false}
                    />
                    <span className="truncate">{title}</span>
                  </div>
                  <div className="flex items-center gap-x-1 p-1">
                    <Hint asChild side="bottom" description="Restore">
                      <Button
                        variant="hint"
                        size="icon-sm"
                        className="p-1"
                        onClick={(e) => handleRestore(e, id)}
                      >
                        <Undo className="size-4" />
                      </Button>
                    </Hint>
                    <Hint asChild side="bottom" description="Delete from Trash">
                      <Button
                        variant="hint"
                        size="icon-sm"
                        className="p-1"
                        onClick={(e) => handleDelete(e, id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </Hint>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <footer className="mt-0.5 flex-shrink-0 border-t bg-blue/5 px-2 py-1.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-secondary dark:text-secondary-dark">
            <span>
              Pages in Trash for over 30 days will be automatically deleted
            </span>
            <a
              href="https://www.notion.so/help/duplicate-delete-and-restore-content"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0.5 select-none no-underline"
            >
              <Button variant="hint" size="icon-sm">
                <HelpCircle className="size-3.5 flex-shrink-0" />
              </Button>
            </a>
          </div>
        </footer>
      </PopoverContent>
    </Popover>
  );
};
