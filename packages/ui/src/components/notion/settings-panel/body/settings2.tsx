"use client";

import React from "react";

import { useTranslation } from "@swy/i18n";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Content, Section, SectionItem, TextLink } from "../_components";
import { DeleteWorkspace } from "../modals";
import { useSettings } from "../settings-context";

export const Settings2 = () => {
  const { setOpen } = useModal();
  const {
    settings: { workspace },
    updateSettings: update,
    uploadFile,
    deleteWorkspace,
  } = useSettings();
  const site = `${workspace.domain}.notion.site`;
  const link = `www.notion.so/${workspace.domain}`;
  /** i18n */
  const { t } = useTranslation("settings");
  const {
    "workspace-settings": workspaceSettings,
    "public-settings": publicSettings,
  } = t("workspace-settings", { returnObjects: true });
  /** Handlers */
  const onUpdateName = (e: React.ChangeEvent<HTMLInputElement>) =>
    update({ workspace: { name: e.target.value } });
  const onUpdateIcon = (icon: IconInfo) => update({ workspace: { icon } });
  const onRemoveIcon = () => update({ workspace: { icon: undefined } });
  const onUploadIcon = async (file: File) => {
    const replaceTargetUrl =
      workspace.icon.type === "file" ? workspace.icon.url : undefined;
    const url = URL.createObjectURL(file);
    update({ workspace: { icon: { type: "file", url } } });
    const res = await uploadFile?.(file, { replaceTargetUrl });
    if (res?.url)
      update({ workspace: { icon: { type: "file", url: res.url } } });
  };
  const onUpdateDomain = (e: React.ChangeEvent<HTMLInputElement>) =>
    update({ workspace: { domain: e.target.value } });
  const onDeleteWorkspace = () =>
    setOpen(
      <DeleteWorkspace
        name={workspace.name}
        onSubmit={() => deleteWorkspace?.(workspace.id)}
      />,
    );

  return (
    <>
      <Section title={workspaceSettings.title}>
        <Content {...workspaceSettings.name}>
          <Input value={workspace.name} onChange={onUpdateName} />
        </Content>
        <Separator className="my-4" />
        <Content {...workspaceSettings.icon}>
          <div className="rounded-md border border-border p-0.5">
            <IconBlock
              defaultIcon={workspace.icon}
              size="lg"
              onSelect={onUpdateIcon}
              onRemove={onRemoveIcon}
              onUpload={onUploadIcon}
            />
          </div>
        </Content>
      </Section>
      <Separator className="my-4" />
      <Section title={publicSettings.title}>
        <Content
          title={publicSettings.domain.title}
          description={
            <TextLink
              i18nKey="workspace-settings.public-settings.domain.description"
              values={{ site, link }}
            />
          }
        >
          <Input
            className="w-[255px]"
            value={workspace.domain}
            onChange={onUpdateDomain}
          />
        </Content>
        <Separator className="my-4" />
        <Content
          title={publicSettings.public.title}
          description={
            <TextLink
              i18nKey="workspace-settings.public-settings.public.description"
              values={{ site }}
            />
          }
        >
          <Input variant="search" placeholder="Select a page shared to web" />
        </Content>
        <Separator className="my-4" />
        <Content title={publicSettings.content.title}>
          <Button size="sm">{publicSettings.content.button}</Button>
        </Content>
        <Separator className="my-4" />
        <Content title={publicSettings.members.title} plan="business">
          <Button size="sm" disabled>
            {publicSettings.members.button}
          </Button>
        </Content>
        <Separator className="my-4" />
        <Content
          title={publicSettings.analytics.head}
          hint={publicSettings.analytics.hint}
        >
          <SectionItem
            title={publicSettings.analytics.title}
            description={
              <TextLink
                i18nKey="workspace-settings.public-settings.analytics.description"
                values={{ workspace: workspace.name }}
              />
            }
          >
            <Switch size="sm" />
          </SectionItem>
        </Content>
        <Separator className="my-4" />
        <Content title={publicSettings.danger.title}>
          <Button variant="red" size="sm" onClick={onDeleteWorkspace}>
            {publicSettings.danger.delete}
          </Button>
        </Content>
      </Section>
    </>
  );
};
