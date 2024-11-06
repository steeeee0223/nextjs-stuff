"use client";

import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@swy/ui/lib";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
} from "@swy/ui/shadcn";
import { IconBlock, useModal } from "@swy/ui/shared";

import { generateDefaultIcon, Icon } from "../../common";
import { Page } from "../../types";
import { useWorkspace } from "../../workspace-provider";

interface SearchCommandProps {
  fetchPages?: () => Promise<Page[]>;
  onSelect?: (id: string, group: string) => void;
  onOpenTrash?: (open: boolean) => void;
}

export const SearchCommand = ({
  fetchPages,
  onSelect,
  onOpenTrash,
}: SearchCommandProps) => {
  const { activeWorkspace } = useWorkspace();
  /** Search */
  const { isOpen, setClose } = useModal();
  const jumpToTrash = () => {
    setClose();
    onOpenTrash?.(true);
  };
  /** Select */
  const [pages, setPages] = useState<Page[]>([]);
  const handleSelect = (id: string, group: string) => {
    onSelect?.(id, group);
    setClose();
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

  useEffect(() => {
    void fetchPages?.()
      .then((data) => {
        const pages = data.filter((page) => !page.isArchived);
        setPages(pages);
        setFilteredItems(pages);
      })
      .catch(() => toast.message("Error while fetching pages"));
  }, [fetchPages]);

  return (
    <CommandDialog
      className="max-h-[max(50vh,570px)] min-h-[max(50vh,570px)] w-full max-w-[755px] rounded-[12px] bg-modal"
      open={isOpen}
      onOpenChange={setClose}
      shouldFilter={false}
    >
      <div className="z-10 flex h-12 w-full flex-shrink-0 flex-grow-0 overflow-hidden border-b bg-transparent px-1">
        <Input
          variant="search"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={`Search in ${activeWorkspace?.name ?? ""}...`}
          className="h-full w-full min-w-0 border-none bg-transparent text-lg/[27px] dark:bg-transparent"
        />
      </div>
      <CommandList
        className={cn(
          "h-full min-h-0 flex-grow transform",
          !filteredItems && "flex flex-col justify-center",
        )}
      >
        {filteredItems ? (
          <CommandGroup heading="Best matches">
            {filteredItems.map(({ id, title, icon, type, lastEditedAt }) => (
              <CommandItem
                key={id}
                value={`${title}-${id}`}
                title={title}
                onSelect={() => handleSelect(id, type)}
                className="group mx-1.5 flex min-h-9 items-center gap-2 py-2"
              >
                <IconBlock
                  icon={icon ?? generateDefaultIcon(type)}
                  className="leading-[1.2]"
                />
                <span className="flex-1 text-sm font-medium">{title}</span>
                <div className="flex-0 flex h-3 items-center text-xs text-muted dark:text-muted-dark">
                  <span className="group-aria-selected:hidden">
                    {lastEditedAt}
                  </span>
                  <span className="hidden size-3 group-aria-selected:block">
                    <Icon.Enter className="flex-shrink-0 fill-primary/45" />
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : (
          <CommandEmpty className="my-auto flex w-full select-none items-center py-8 leading-[1.2]">
            <div className="mx-3 min-w-0 flex-auto">
              <div className="truncate">
                <div
                  role="alert"
                  className="m-0 font-medium text-secondary dark:text-secondary-dark"
                >
                  No results
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-normal text-sm">
                <div className="text-muted dark:text-muted-dark">
                  Some results may be in your deleted pages.
                  <br />
                  <button
                    onClick={jumpToTrash}
                    className="inline cursor-pointer select-none leading-6 text-blue"
                  >
                    Search deleted pages
                  </button>
                </div>
              </div>
            </div>
          </CommandEmpty>
        )}
      </CommandList>
      <CommandSeparator />
      <footer className="flex h-7 w-full flex-shrink-0 flex-grow-0 select-none items-center truncate text-sm/[1.2] text-muted dark:text-muted-dark">
        <div className="mx-3 min-w-0 flex-auto">
          <ul className="m-0 inline-flex list-none items-center gap-5 truncate p-0">
            <li className="flex h-max items-center gap-1.5">
              <ArrowUpDown className="inline size-3 flex-shrink-0 text-primary/45" />
              Select
            </li>
            <li className="flex h-max items-center gap-1.5">
              <Icon.Enter className="inline size-3 flex-shrink-0 fill-primary/45" />
              Open
            </li>
          </ul>
        </div>
      </footer>
    </CommandDialog>
  );
};
