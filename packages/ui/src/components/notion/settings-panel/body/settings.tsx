import { useTranslation } from "@acme/i18n";

import { Select } from "@/components/custom/select";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, SectionSeparator } from "../_components";
import { useSettings } from "../settings-context";

export const Settings = () => {
  const { theme, setTheme } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const {
    title,
    "my-settings": mySettings,
    "date-time": dateTime,
    privacy,
  } = t("my-settings", { returnObjects: true });

  return (
    <>
      <Section title={title}>
        <SectionItem {...mySettings.appearance}>
          <Select
            options={mySettings.appearance.options}
            defaultValue={theme ?? "system"}
            onChange={setTheme}
            side="left"
          />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings["open-on-start"]}>
          <Select
            options={mySettings["open-on-start"].options}
            defaultValue="top"
            side="left"
          />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...mySettings["open-links"]}>
          <Switch size="sm" />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Date & time">
        <SectionItem {...dateTime["set-timezone"]}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...dateTime.timezone}></SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Privacy">
        <SectionItem {...privacy.cookie}></SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...privacy["view-history"]}>
          <Select
            options={privacy["view-history"].options}
            defaultValue="yes"
            side="left"
          />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...privacy["discover-profile"]}>
          <Switch size="sm" />
        </SectionItem>
      </Section>
    </>
  );
};
