"use client";

import type { ChangeEvent, PropsWithChildren } from "react";
import { CircleHelp } from "lucide-react";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { HintButton, PlanLink, Section, SectionItem } from "../_components";
import { useSettings } from "../settings-context";
import { settings } from "./settings2.data";
import type { Section as SectionProps } from "./utils";

type FieldProps = PropsWithChildren<SectionProps> & {
  hint?: string;
};

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
  const {
    settings: { workspace },
    updateSettings: update,
    uploadFile,
  } = useSettings();
  const site = `${workspace.domain}.notion.site`;
  const link = `www.notion.so/${workspace.domain}`;
  /** Descriptions (Dyn.) */
  const $domain = `Pages shared to web will be under ${site}.\nAnyone with an allowed email domain can join this workspace via ${link}.`;
  const $public = `Access your public home page via ${site}.`;
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

  return (
    <>
      <Section title="Workspace settings">
        <Field {...settings.name}>
          <Input
            variant="notion"
            value={workspace.name}
            onChange={onUpdateName}
          />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...settings.icon}>
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
      <Section title="Public Settings">
        <Field {...settings.domain} description={$domain}>
          <Input
            variant="notion"
            className="w-[255px]"
            value={workspace.domain}
            onChange={onUpdateDomain}
          />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...settings.public} description={$public}>
          <Input variant="search" placeholder="Select a page shared to web" />
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...settings.content} hint="Learn about exporting workspaces.">
          <Button variant="notion" size="sm">
            Export all workspace content
          </Button>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...settings.members} hint="Learn about exporting members.">
          <Button variant="notion" size="sm" disabled>
            Export members as CSV
          </Button>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field
          title="Analytics"
          description=""
          hint="Learn about workspace analytics."
        >
          <SectionItem {...settings.analytics}>
            <Switch size="sm" />
          </SectionItem>
        </Field>
        <Separator className="my-4 bg-primary/15" />
        <Field {...settings.danger} hint="Learn about deleting workspaces.">
          <Button variant="warning" size="sm">
            Delete entire workspace
          </Button>
        </Field>
      </Section>
    </>
  );
};
