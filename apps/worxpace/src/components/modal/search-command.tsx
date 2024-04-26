"use client";

import { toast } from "sonner";
import useSWR from "swr";
import { stableHash } from "swr/_internal";

import { type Document } from "@acme/prisma";
import { IconBlock, useModal } from "@acme/ui/custom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/shadcn";

import { useClient } from "~/hooks";
import { usePlatform } from "~/hooks/use-platform";
import { fetchUrl, toIconInfo } from "~/lib";

const SearchCommand = () => {
  /** Auth */
  const { workspace: name, userId, workspaceId } = useClient();
  /** Search */
  const { isOpen, setClose } = useModal();
  /** Select */
  const { toToolsPage } = usePlatform();
  const handleSelect = (id: string, group: string | null) => {
    toToolsPage(id, group);
    setClose();
  };
  /** Mount */
  const { data: documents } = useSWR<Document[], Error>(
    userId && isOpen ? `doc:${workspaceId}:search` : null,
    (_key) => fetchUrl(`/api/documents?archived=${false}`),
    { onError: (e) => toast.error(e.message) },
  );

  return (
    <CommandDialog
      className="z-[99999] pb-1"
      open={isOpen}
      onOpenChange={setClose}
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
