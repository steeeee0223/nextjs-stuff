"use client";

import React from "react";

import { useTranslation } from "@swy/i18n";
import { Button } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import { Content, Section } from "../_components";
import { BaseModal } from "../../common";
import { useSettings } from "../settings-context";

export const Settings3 = () => {
  const {
    settings: { account },
    people,
  } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const { "public-settings": publicSettings, modals } = t(
    "workspace-settings",
    {
      returnObjects: true,
    },
  );
  /** Handlers */
  const { setOpen } = useModal();
  const onLeaveWorkspace = () =>
    setOpen(
      <BaseModal
        {...modals.leave}
        onTrigger={() => people.delete?.(account.id)}
      />,
    );

  return (
    <Section title={publicSettings.title}>
      <Content title={publicSettings.danger.title}>
        <Button variant="red" size="sm" onClick={onLeaveWorkspace}>
          {publicSettings.danger.leave}
        </Button>
      </Content>
    </Section>
  );
};
