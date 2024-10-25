import { useCallback, useMemo, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { useTranslation } from "@swy/i18n";
import {
  Button,
  Input,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";
import { Plan, Role } from "@swy/validators";

import { Section, SectionItem, TextLink } from "../_components";
import { BaseModal, Icon } from "../../common";
import {
  getGuestColumns,
  getMemberColumns,
  groupColumns,
  GroupsTable,
  GuestsTable,
  MembersTable,
} from "../../tables";
import { Scope } from "../../types";
import { AddMembers, DeleteGuest, DeleteMember } from "../modals";
import { useSettings } from "../settings-context";
import { usePeople } from "./use-people";

export const People = () => {
  const {
    scopes,
    settings: { account, workspace },
    people,
    resetLink,
    updateSettings,
  } = useSettings();
  const [isUpdating, startTransition] = useTransition();
  /** i18n */
  const { t } = useTranslation("settings");
  const common = t("common", { returnObjects: true });
  const { title, invite, tabs, upgrade, modals } = t("people", {
    returnObjects: true,
  });
  /** Modals */
  const { setOpen } = useModal();
  /** Tables */
  const [search, setSearch] = useState("");
  const onUpdate = useCallback(
    (id: string, role: Role) => {
      void people.update?.(id, role);
      if (id === account.id) void updateSettings({ workspace: { role } });
    },
    [account.id, people, updateSettings],
  );
  const memberColumns = useMemo(() => {
    const onDelete = (id: string) =>
      setOpen(<DeleteMember onDelete={() => void people.delete?.(id)} />);
    return getMemberColumns(account.id, scopes, onUpdate, onDelete);
  }, [account.id, scopes, onUpdate, setOpen, people]);
  const guestColumns = useMemo(() => {
    const onDelete = (id: string, name: string) =>
      setOpen(
        <DeleteGuest name={name} onDelete={() => void people.delete?.(id)} />,
      );
    return getGuestColumns(scopes, onUpdate, onDelete);
  }, [scopes, onUpdate, setOpen, people]);
  const {
    memberships: { members, guests },
  } = usePeople({ load: people.load });
  /** Handlers */
  const [, copy] = useCopyToClipboard();
  const onCopy = async () => {
    await copy(workspace.inviteLink);
    toast.success("Copied link to clipboard");
  };
  const onResetLink = () =>
    setOpen(
      <BaseModal
        {...modals["reset-link"]}
        onTrigger={() => startTransition(() => resetLink?.())}
      />,
    );
  const onAddMembers = () =>
    setOpen(
      <AddMembers
        invitedMembers={[
          ...members.map(({ user }) => user),
          ...guests.map(({ user }) => user),
        ]}
        onAdd={people.add}
      />,
    );
  const onGroupsLearnMore = () =>
    window.open(
      "https://www.notion.so/help/add-members-admins-guests-and-groups",
    );

  return (
    <Section title={title}>
      {scopes.has(Scope.MemberInvite) && (
        <>
          <SectionItem
            title={invite.title}
            description={
              <TextLink
                i18nKey="people.invite.description"
                values={{ guests: guests.length }}
                onClick={onResetLink}
              />
            }
          >
            <div className="flex items-center gap-4">
              <Button
                variant="soft-blue"
                size="sm"
                className="h-7"
                disabled={isUpdating}
                onClick={onCopy}
              >
                {invite.button}
              </Button>
              <Switch disabled size="sm" />
            </div>
          </SectionItem>
          <Separator className="my-4" />
        </>
      )}
      <Tabs defaultValue="members" className="relative mt-1 w-full">
        <TabsList className="gap-3 overflow-y-auto p-0">
          <div className="flex grow">
            <TabsTrigger value="members">
              {tabs.members}{" "}
              <span className="text-muted dark:text-muted-dark">
                {members.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="guests">
              {tabs.guests}{" "}
              <span className="text-muted dark:text-muted-dark">
                {guests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="groups">{tabs.groups}</TabsTrigger>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <Input
              variant="search"
              className="w-[180px] border-none bg-transparent"
              placeholder={tabs.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="blue"
              size="sm"
              className="h-7 px-2"
              // TODO Member can send a request to invite member
              disabled={!scopes.has(Scope.MemberAdd)}
              onClick={onAddMembers}
            >
              {tabs["add-members"]}
              <ChevronDown className="ml-1 size-4" />
            </Button>
          </div>
        </TabsList>
        <TabsContent value="members" className="mt-0">
          <MembersTable
            search={search}
            columns={memberColumns}
            data={members}
            emptyResult="No members"
          />
        </TabsContent>
        <TabsContent value="guests" className="mt-0">
          <GuestsTable
            search={search}
            columns={guestColumns}
            data={guests}
            emptyResult="No guests"
          />
        </TabsContent>
        <TabsContent value="groups" className="mt-0">
          {scopes.has(Scope.Upgrade) &&
            (workspace.plan === Plan.FREE ||
              workspace.plan === Plan.EDUCATION) && (
              <>
                <section className="max-w-[300px] text-sm">
                  <Icon.Group className="mb-2 h-auto w-8 flex-shrink-0 fill-primary/45" />
                  <header className="font-semibold">{upgrade.title}</header>
                  <p className="mb-4 mt-1 text-secondary dark:text-secondary-dark">
                    {upgrade.description}
                  </p>
                  <footer className="mb-4 flex flex-wrap gap-x-3 gap-y-2">
                    <Button variant="blue" size="sm">
                      {common.upgrade}
                    </Button>
                    <Button size="sm" onClick={onGroupsLearnMore}>
                      {common.more}
                    </Button>
                  </footer>
                </section>
                <Separator />
              </>
            )}
          <GroupsTable
            search={search}
            columns={groupColumns}
            data={[]}
            emptyResult="No groups"
          />
        </TabsContent>
      </Tabs>
    </Section>
  );
};
