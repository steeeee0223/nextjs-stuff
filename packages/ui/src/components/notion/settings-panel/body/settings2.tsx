"use client";

import type { ChangeEvent, PropsWithChildren } from "react";
import React from "react";
import { CircleHelp } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  HintButton,
  PlanLink,
  Section,
  SectionItem,
  TextLink,
} from "../_components";
import { DeleteWorkspace } from "../modals";
import { useSettings } from "../settings-context";

interface FieldProps extends PropsWithChildren {
  title: string;
  description?: React.ReactNode;
  plan?: string;
  hint?: string;
}

export const Field = ({
  children,
  title,
  description,
  plan,
  hint,
}: FieldProps) => {
  return (
    <div>
      <div className="mb-2 flex w-auto items-center text-sm font-normal">
        {title}
        {!!plan && <PlanLink plan={plan} />}
      </div>
      <div className="flex items-center">{children}</div>
      {description && (
        <p className="mt-2 text-xs text-secondary dark:text-secondary-dark">
          {description}
        </p>
      )}
      {hint && (
        <div className="mt-3">
          <HintButton icon={CircleHelp} label={hint} />
        </div>
      )}
    </div>
  );
};

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
  const onUpdateName = (e: ChangeEvent<HTMLInputElement>) =>
    update({ workspace: { name: e.target.value } });
  const onUpdateIcon = (icon: IconInfo) => update({ workspace: { icon } });
  const onRemoveIcon = () => update({ workspace: { icon: undefined } });
  const onUploadIcon = async (file: File) => {
    const replaceTargetUrl =
      workspace.icon.type === "file" ? workspace.icon.url : undefined;
    const url = URL.createObjectURL(file);
    await update({ workspace: { icon: { type: "file", url } } });
    const res = await uploadFile?.(file, { replaceTargetUrl });
    if (res?.url)
      await update({ workspace: { icon: { type: "file", url: res.url } } });
  };
  const onUpdateDomain = (e: ChangeEvent<HTMLInputElement>) =>
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
        <Field {...workspaceSettings.name}>
          <Input value={workspace.name} onChange={onUpdateName} />
        </Field>
        <Separator className="my-4" />
        <Field {...workspaceSettings.icon}>
          <div className="rounded-md border border-border p-0.5">
            <IconBlock
              defaultIcon={workspace.icon}
              size="lg"
              onSelect={onUpdateIcon}
              onRemove={onRemoveIcon}
              onUpload={onUploadIcon}
            />
          </div>
        </Field>
      </Section>
      <Separator className="my-4" />
      <Section title={publicSettings.title}>
        <Field
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
        </Field>
        <Separator className="my-4" />
        <Field
          title={publicSettings.public.title}
          description={
            <TextLink
              i18nKey="workspace-settings.public-settings.public.description"
              values={{ site }}
            />
          }
        >
          <Input variant="search" placeholder="Select a page shared to web" />
        </Field>
        <Separator className="my-4" />
        <Field title={publicSettings.content.title}>
          <Button size="sm">{publicSettings.content.button}</Button>
        </Field>
        <Separator className="my-4" />
        <Field title={publicSettings.members.title} plan="business">
          <Button size="sm" disabled>
            {publicSettings.members.button}
          </Button>
        </Field>
        <Separator className="my-4" />
        <Field
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
        </Field>
        <Separator className="my-4" />
        <Field title={publicSettings.danger.title}>
          <Button variant="red" size="sm" onClick={onDeleteWorkspace}>
            {publicSettings.danger.button}
          </Button>
        </Field>
      </Section>
    </>
  );
};
