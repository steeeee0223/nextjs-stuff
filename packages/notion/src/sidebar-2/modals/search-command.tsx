"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";

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

import { generateDefaultIcon, Icon, toDateString } from "../../common";
import { selectPages, usePlatformStore } from "../../slices";
import { useFilter } from "../use-filter";

interface SearchCommandProps {
  workspaceName: string;
  onSelect?: (id: string, group: string) => void;
  onOpenTrash?: (open: boolean) => void;
}

export const SearchCommand: React.FC<SearchCommandProps> = ({
  workspaceName,
  onSelect,
  onOpenTrash,
}) => {
  const { isOpen, setClose } = useModal();
  const pages = usePlatformStore((state) => selectPages(state, false));
  const { filteredItems, updateSearch } = useFilter(pages);
  /** Search */
  const jumpToTrash = () => {
    setClose();
    onOpenTrash?.(true);
  };
  const handleSelect = (id: string, group: string) => {
    onSelect?.(id, group);
    setClose();
  };

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
          // value={input}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder={`Search in ${workspaceName}...`}
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
                    {toDateString(lastEditedAt)}
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
