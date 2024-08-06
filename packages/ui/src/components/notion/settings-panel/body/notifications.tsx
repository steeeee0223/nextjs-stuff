import { ArrowUpRight, CircleHelp } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { Select } from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  HintButton,
  Section,
  SectionItem,
  SectionSeparator,
} from "../_components";

export const Notifications = () => {
  /** i18n */
  const { t } = useTranslation("settings");
  const {
    title,
    "my-notifications": myNotifications,
    "slack-notifications": slackNotifications,
    "email-notifications": emailNotifications,
    buttons,
  } = t("my-notifications", { returnObjects: true });

  return (
    <>
      <Section title={title}>
        <SectionItem {...myNotifications.mobile}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...slackNotifications.slack}>
          <Select
            options={slackNotifications.slack.options}
            defaultValue="off"
          />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title={emailNotifications.title}>
        <SectionItem {...emailNotifications.activity}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...emailNotifications.digests}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...emailNotifications.announcements}>
          <Button variant="notion" size="sm">
            <ArrowUpRight className="mr-2 size-4" />
            {emailNotifications.announcements.button}
          </Button>
        </SectionItem>
      </Section>
      <SectionSeparator />
      <HintButton icon={CircleHelp} label={buttons.more} />
    </>
  );
};
