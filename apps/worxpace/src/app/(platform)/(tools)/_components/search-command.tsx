"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";

import { type Document } from "@acme/prisma";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import { useClient, useSearch } from "~/hooks";
import { fetchUrl } from "~/lib";

const SearchCommand = () => {
  /** Auth */
  const { workspace: name, userId } = useClient();
  /** Search */
  const { toggle, isOpen, onClose } = useSearch();
  const { data: documents } = useSWR<Document[], string>(
    userId ? `/api/documents?archived=${false}` : null,
    fetchUrl,
    { onError: (e) => toast.error(e) },
  );
  /** Select */
  const router = useRouter();
  const handleSelect = (id: string, group: string | null) => {
    if (group === "document") router.push(`/documents/${id}`);
    if (group === "kanban") router.push(`/kanban/${id}`);
    onClose();
  };
  /** Mount */
  const [isMounted, setIsMounted] = useState(false);
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
        <CommandGroup heading="Documents">
          {documents?.map(({ id, title, icon, type }) => (
            <CommandItem
              key={id}
              value={id}
              title={title}
              onSelect={() => handleSelect(id, type)}
              className="mb-1"
            >
              {icon ? (
                <p className="mr-2 text-[18px]">{icon}</p>
              ) : (
                <File className={cn(theme.size.icon, "mr-2")} />
              )}
              <span>{title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
