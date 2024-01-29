"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { File } from "lucide-react";
import { toast } from "sonner";

import { type Document } from "@acme/prisma";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/components";
import { useFetch } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import { useSearch } from "~/hooks";
import { fetchUrl } from "~/lib";

const SearchCommand = () => {
  /** Auth */
  const { user } = useUser();
  const { organization } = useOrganization();
  const { userId, orgId } = useAuth();
  const name = orgId ? organization?.name : user?.fullName;
  /** Search */
  const { toggle, isOpen, onClose } = useSearch();
  const fetchDocs = async () => {
    try {
      const data = await fetchUrl<Document[]>(
        `/api/documents?archived=${false}`,
      );
      return { data };
    } catch {
      return { error: `Error occurred while fetching documents` };
    }
  };
  const { data: documents } = useFetch<Document[]>(
    fetchDocs,
    { onError: (e) => toast.error(e) },
    [userId, orgId],
  );
  /** Select */
  const router = useRouter();
  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
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
          {documents?.map(({ id, title, icon }) => (
            <CommandItem
              key={id}
              value={`${id}-${title}`}
              title={title}
              onSelect={onSelect}
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
