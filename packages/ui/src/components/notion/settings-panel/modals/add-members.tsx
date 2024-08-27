"use client";

import { useState, useTransition } from "react";
import { CircleHelp, Mail } from "lucide-react";
import { z } from "zod";

import { useModal } from "@/components/custom/modal-provider";
import { Select } from "@/components/custom/select";
import { Spinner } from "@/components/custom/spinner";
import { TagInput } from "@/components/custom/tag-input";
import type { Account } from "@/components/notion/tables";
import { Role } from "@/components/notion/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { HintButton } from "../_components";

enum Heading {
  Select = "Select a person",
  Type = "Keep typing to invite email",
}

const emailSchema = z.string().email();

type DetailedAccount = Account & { invited?: boolean };
interface AddMembersProps {
  invitedMembers: Account[];
  onAdd?: (emails: string[], role: Role) => void;
}

export const AddMembers = ({ invitedMembers, onAdd }: AddMembersProps) => {
  const { isOpen, setClose } = useModal();

  const [heading, setHeading] = useState(Heading.Select);
  const [filteredItems, setFilteredItems] = useState<DetailedAccount[] | null>(
    null,
  );
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState<Role>(Role.OWNER);
  const [loading, startTransition] = useTransition();

  const updateFilteredItems = (input: string) => {
    const v = input.trim();
    const result = invitedMembers.filter(
      ({ name, email }: Account) => name.includes(v) || email.includes(v),
    );
    setFilteredItems(
      v.length > 0
        ? result.length > 0
          ? result.map((account) => ({ ...account, invited: true }))
          : [{ id: v, email: v, name: v[0]!.toUpperCase(), avatarUrl: "" }]
        : null,
    );
  };
  const onInputChange = (input: string) => {
    if (input.length > 0) {
      const result = emailSchema.safeParse(input);
      setHeading(result.success ? Heading.Select : Heading.Type);
    }
    setInput(input);
    updateFilteredItems(input);
  };
  const onTagSelect = (value: string) => {
    const result = emailSchema.safeParse(value);
    if (result.success) {
      setEmails((prev) => Array.from(new Set([...prev, value])));
      onInputChange("");
    }
  };
  const onInvite = () =>
    startTransition(() => {
      onAdd?.(emails, role);
      onClose();
    });
  const onClose = () => {
    setClose();
    setHeading(Heading.Select);
    setInput("");
    setEmails([]);
    setRole(Role.OWNER);
    setFilteredItems(null);
  };

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={onClose}
      className="flex w-[480px] min-w-[180px] flex-col"
      shouldFilter={false}
    >
      <div className="z-10 max-h-[240px] flex-shrink-0 overflow-hidden overflow-y-auto border-b border-primary/15">
        <div className="flex min-w-0 flex-[1_1_0%] flex-col items-stretch">
          <div className="z-10 mb-0 mr-0 flex min-h-[34px] w-full cursor-text flex-nowrap items-start overflow-auto bg-[rgba(242,241,238,0.6)] p-[4px_9px] text-sm dark:bg-modal-dark/5">
            <TagInput
              role="combobox"
              type="email"
              size={1}
              placeholder="Search name or emails"
              autoComplete="off"
              value={{ tags: emails, input }}
              inputSchema={emailSchema}
              onTagsChange={setEmails}
              onInputChange={onInputChange}
              className="min-h-[34px] min-w-0 flex-grow border-none bg-transparent px-0"
            />
            <div className="ml-2 flex flex-shrink-0 items-center gap-2 py-0.5">
              <Select
                defaultValue={role}
                onChange={(value) => setRole(value as Role)}
                options={{ owner: "Workspace Owner", member: "Member" }}
                className="m-0 w-fit min-w-0 bg-transparent text-primary/50"
              />
              <Button
                tabIndex={0}
                variant="blue"
                size="sm"
                disabled={emails.length < 1}
                onClick={onInvite}
                className="h-7 min-w-[70px] font-medium"
              >
                Invite
                {loading && <Spinner className="ml-2 text-white" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CommandList className="min-h-0 flex-grow transform overflow-auto overflow-x-hidden">
        <CommandGroup className="min-h-[200px]" style={{ padding: 4 }}>
          <div className="my-1.5 flex select-none fill-current px-2 text-xs font-medium leading-5 text-primary/45">
            <div className="self-center overflow-hidden overflow-ellipsis whitespace-nowrap">
              {heading}
            </div>
          </div>
          <CommandEmpty className="flex min-h-7 select-none items-center px-2 py-0 leading-[1.2] text-primary/65">
            <span>Type or paste in emails above, separated by commas.</span>
          </CommandEmpty>
          {filteredItems?.map((user) => (
            <Item key={user.id} user={user} onSelect={onTagSelect} />
          ))}
        </CommandGroup>
      </CommandList>
      <CommandSeparator />
      <a
        href="https://www.notion.so/help/add-members-admins-guests-and-groups"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full select-none p-1 text-inherit no-underline"
      >
        <HintButton
          icon={CircleHelp}
          label="Learn how to invite people and set permissions"
          className="w-full justify-start px-3"
        />
      </a>
    </CommandDialog>
  );
};

const Item = ({
  user: { name, email, avatarUrl, invited },
  onSelect,
}: {
  user: DetailedAccount;
  onSelect?: (value: string) => void;
}) => {
  return (
    <CommandItem
      className="min-h-7 w-full cursor-pointer leading-[1.2] transition"
      style={{ padding: 0 }}
      key={email}
      value={email}
      onSelect={onSelect}
      disabled={invited}
    >
      <div className="ml-2.5 mr-1 flex items-center justify-center">
        {invited ? (
          <div className="relative">
            <img
              src={avatarUrl}
              alt={name.at(0)?.toUpperCase()}
              className="size-5 rounded-full border border-primary/10"
            />
          </div>
        ) : (
          <Mail className="size-6 flex-shrink-0 text-primary" />
        )}
      </div>
      <div className="ml-1.5 mr-3 min-w-0 flex-1">
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {invited ? name : email}
        </div>
      </div>
      {invited && (
        <Badge
          variant="gray"
          size="sm"
          className="mr-3 uppercase tracking-wide"
        >
          Invited
        </Badge>
      )}
    </CommandItem>
  );
};
