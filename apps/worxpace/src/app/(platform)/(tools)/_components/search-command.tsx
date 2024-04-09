"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { stableHash } from "swr/_internal";

import { type Document } from "@acme/prisma";
import { IconBlock, useTree } from "@acme/ui/custom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/shadcn";

import { useClient, useSearch } from "~/hooks";
import { fetchUrl, toIconInfo } from "~/lib";

const SearchCommand = () => {
  /** Auth */
  const { workspace: name, userId, workspaceId } = useClient();
  /** Search */
  const { toggle, isOpen, onClose } = useSearch();
  /** Select */
  const { onClickItem } = useTree();
  const handleSelect = (id: string, group: string | null) => {
    onClickItem?.(id, group);
    onClose();
  };
  /** Mount */
  const [isMounted, setIsMounted] = useState(false);
  const { data: documents } = useSWR<Document[], Error>(
    userId && isMounted ? `doc:${workspaceId}:search` : null,
    (_key) => fetchUrl(`/api/documents?archived=${false}`),
    { onError: (e) => toast.error(e.message) },
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);
  /** Keyboard event */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    addEventListener("keydown", down);
    return () => removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) return null;
  return (
    <CommandDialog
      className="z-[99999] pb-1"
      open={isOpen}
      onOpenChange={onClose}
    >
      <CommandInput placeholder={`Search ${name}'s WorXpace...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {documents?.map(({ id, title, icon, type }) => (
            <CommandItem
              key={id}
              value={title}
              title={title}
              onSelect={() => handleSelect(id, type)}
              className="mb-1"
            >
              <IconBlock
                key={stableHash(icon)}
                defaultIcon={toIconInfo(icon, type)}
                editable={false}
              />
              <span className="ml-2">{title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
