import { ArrowUpRight, CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  HintButton,
  Section,
  SectionItem,
  SectionSeparator,
  Select,
} from "../_components";
import { myNotifications, slackOptions } from "./notifications.data";

export const Notifications = () => {
  return (
    <>
      <Section title="My notifications">
        <SectionItem {...myNotifications.mobile}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myNotifications.slack}>
          <Select options={slackOptions} defaultValue="off" />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Email notifications">
        <SectionItem {...myNotifications.activity}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myNotifications.emailDigests}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myNotifications.emailAnnouncements}>
          <Button variant="notion" size="sm">
            <ArrowUpRight className="mr-2 size-4" />
            Manage Settings
          </Button>
        </SectionItem>
      </Section>
      <SectionSeparator />
      <HintButton icon={CircleHelp} label="Learn about notifications" />
    </>
  );
};
