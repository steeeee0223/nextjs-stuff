import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, SectionSeparator, Select } from "../section";
import {
  appearanceOptions,
  mySettings,
  openStartOptions,
} from "./settings.data";

export const Settings = () => {
  return (
    <>
      <Section title="My settings">
        <SectionItem {...mySettings.appearance}>
          <Select
            options={appearanceOptions}
            defaultValue="system"
            side="left"
          />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.openStart}>
          <Select options={openStartOptions} defaultValue="top" side="left" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.openLinks}>
          <Switch />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Date & time">
        <SectionItem {...mySettings.setTimezone}>
          <Switch />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.timezone}>TODO</SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Privacy">
        <SectionItem {...mySettings.cookie}>TODO</SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.viewHistory}>TODO</SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.profile}>
          <Switch />
        </SectionItem>
      </Section>
    </>
  );
};
