"use client";

import React from "react";

import { useTranslation } from "@swy/i18n";

import { Button } from "@/components/ui/button";
import { Content, Section } from "../_components";
import { useSettings } from "../settings-context";

export const Settings3 = () => {
  const { settings } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const { "public-settings": publicSettings } = t("workspace-settings", {
    returnObjects: true,
  });
  /** Handlers */
  // TODO onLeaveWorkspace

  return (
    <Section title={publicSettings.title}>
      <Content title={publicSettings.danger.title}>
        <Button variant="red" size="sm">
          {publicSettings.danger.button}
        </Button>
      </Content>
    </Section>
  );
};
