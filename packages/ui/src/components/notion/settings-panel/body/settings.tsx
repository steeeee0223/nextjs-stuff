import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, SectionSeparator, Select } from "../_components";
import { useSettings } from "../settings-context";
import {
  appearanceOptions,
  mySettings,
  openStartOptions,
  viewHistoryOptions,
} from "./settings.data";

export const Settings = () => {
  const { theme, setTheme } = useSettings();

  return (
    <>
      <Section title="My settings">
        <SectionItem {...mySettings.appearance}>
          <Select
            options={appearanceOptions}
            defaultValue={theme}
            onChange={setTheme}
            side="left"
          />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.openStart}>
          <Select options={openStartOptions} defaultValue="top" side="left" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.openLinks}>
          <Switch size="sm" />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Date & time">
        <SectionItem {...mySettings.setTimezone}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.timezone}></SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Privacy">
        <SectionItem {...mySettings.cookie}></SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.viewHistory}>
          <Select options={viewHistoryOptions} defaultValue="yes" side="left" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings.profile}>
          <Switch size="sm" />
        </SectionItem>
      </Section>
    </>
  );
};
