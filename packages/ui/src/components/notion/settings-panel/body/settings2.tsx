"use client";

import type { ChangeEvent, PropsWithChildren } from "react";
import { CircleHelp } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { HintButton, PlanLink, Section, SectionItem } from "../_components";
import { DeleteWorkspace } from "../modals";
import { useSettings } from "../settings-context";

interface FieldProps extends PropsWithChildren {
  title: string;
  description: string;
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
    <div className="">
      <div className="mb-2 flex w-auto items-center text-sm font-normal text-primary">
        {title}
        {!!plan && <PlanLink plan={plan} />}
      </div>
      <div className="flex items-center">{children}</div>
      {!!description.length && (
        <p className="mt-2 text-xs text-primary/65">{description}</p>
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
          <Input
            variant="notion"
            value={workspace.name}
            onChange={onUpdateName}
          />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...workspaceSettings.icon}>
          <div className="rounded-md border border-primary/10 p-0.5">
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
      <Separator className="my-4 bg-primary/15" />
      <Section title={publicSettings.title}>
        <Field
          title={publicSettings.domain.title}
          description={t(
            "workspace-settings.public-settings.domain.description",
            { site, link },
          )}
        >
          <Input
            variant="notion"
            className="w-[255px]"
            value={workspace.domain}
            onChange={onUpdateDomain}
          />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field
          title={publicSettings.public.title}
          description={t(
            "workspace-settings.public-settings.public.description",
            { site },
          )}
        >
          <Input variant="search" placeholder="Select a page shared to web" />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field title={publicSettings.content.title} description="">
          <Button variant="notion" size="sm">
            {publicSettings.content.button}
          </Button>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field
          title={publicSettings.members.title}
          description=""
          plan="business"
        >
          <Button variant="notion" size="sm" disabled>
            {publicSettings.members.button}
          </Button>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field
          title={publicSettings.analytics.head}
          description=""
          hint={publicSettings.analytics.hint}
        >
          <SectionItem
            title={publicSettings.analytics.title}
            description={t(
              "workspace-settings.public-settings.analytics.description",
              { workspace: workspace.name },
            )}
          >
            <Switch size="sm" />
          </SectionItem>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...publicSettings.danger} description="">
          <Button variant="warning" size="sm" onClick={onDeleteWorkspace}>
            {publicSettings.danger.button}
          </Button>
        </Field>
      </Section>
    </>
  );
};
