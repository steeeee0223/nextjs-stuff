import { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { useModal } from "@/components/custom/modal-provider";
import * as Icon from "@/components/notion/icons";
import {
  getGuestColumns,
  getMemberColumns,
  groupColumns,
  GroupsTable,
  GuestsTable,
  MembersTable,
} from "@/components/notion/tables";
import { Plan, Role, Scope } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionItem } from "../_components";
import { AddMembers, DeleteGuest, DeleteMember } from "../modals";
import { useSettings } from "../settings-context";
import { usePeople } from "./use-people";

const styles = {
  tabsTrigger: "py-1",
  tabsTriggerText: "rounded-sm py-1 px-2 hover:bg-primary/5",
};

export const People = () => {
  const {
    scopes,
    settings: { account, workspace },
    people,
    updateSettings,
  } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const common = t("common", { returnObjects: true });
  const { title, invite, tabs, upgrade } = t("people", { returnObjects: true });
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
  const onAddMembers = () =>
    setOpen(
      <AddMembers
        invitedMembers={[
          ...members.map(({ account }) => account),
          ...guests.map(({ account }) => account),
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
          <SectionItem {...invite}>
            <div className="flex items-center gap-4">
              <Button variant="soft-blue" size="sm" className="h-7">
                {invite.button}
              </Button>
              <Switch disabled size="sm" />
            </div>
          </SectionItem>
          <Separator className="my-4 bg-primary/10" />
        </>
      )}
      <Tabs defaultValue="members" className="relative mt-1 w-full">
        <TabsList variant="notion" className="overflow-y-auto">
          <div className="flex grow">
            <TabsTrigger
              variant="notion"
              value="members"
              className={styles.tabsTrigger}
            >
              <p className={styles.tabsTriggerText}>
                {tabs.members}{" "}
                <span className="text-primary/50">{members.length}</span>
              </p>
            </TabsTrigger>
            <TabsTrigger
              variant="notion"
              value="guests"
              className={styles.tabsTrigger}
            >
              <p className={styles.tabsTriggerText}>
                {tabs.guests}{" "}
                <span className="text-primary/50">{guests.length}</span>
              </p>
            </TabsTrigger>
            <TabsTrigger
              variant="notion"
              value="groups"
              className={styles.tabsTrigger}
            >
              <p className={styles.tabsTriggerText}>{tabs.groups}</p>
            </TabsTrigger>
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
        <TabsContent value="members" variant="notion" className="mt-0">
          <MembersTable
            search={search}
            columns={memberColumns}
            data={members}
            emptyResult="No members"
          />
        </TabsContent>
        <TabsContent value="guests" variant="notion" className="mt-0">
          <GuestsTable
            search={search}
            columns={guestColumns}
            data={guests}
            emptyResult="No guests"
          />
        </TabsContent>
        <TabsContent value="groups" variant="notion" className="mt-0">
          {scopes.has(Scope.Upgrade) &&
            (workspace.plan === Plan.FREE ||
              workspace.plan === Plan.EDUCATION) && (
              <>
                <section className="max-w-[300px] text-sm">
                  <Icon.Group className="mb-2 h-auto w-8 flex-shrink-0 fill-primary/45" />
                  <header className="font-semibold">{upgrade.title}</header>
                  <p className="mb-4 mt-1 text-primary/65">
                    {upgrade.description}
                  </p>
                  <footer className="mb-4 flex flex-wrap gap-x-3 gap-y-2">
                    <Button variant="blue" size="sm">
                      {common.upgrade}
                    </Button>
                    <Button
                      variant="notion"
                      size="sm"
                      onClick={onGroupsLearnMore}
                    >
                      {common.more}
                    </Button>
                  </footer>
                </section>
                <Separator className="bg-primary/10" />
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
