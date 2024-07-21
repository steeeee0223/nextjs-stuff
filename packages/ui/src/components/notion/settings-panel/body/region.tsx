import { LOCALE, useTranslation } from "@acme/i18n";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, Select } from "../_components";
import { useSettings } from "../settings-context";
import { languageOptions, region } from "./region.data";

export const Region = () => {
  const {
    settings: { account },
    updateSettings,
  } = useSettings();
  const { i18n } = useTranslation();

  const onSwitchLanguage = async (language: string) => {
    await updateSettings({ account: { language: language as LOCALE } });
    await i18n.changeLanguage(language);
  };

  return (
    <>
      <Section title="Language & region">
        <SectionItem {...region.language}>
          <Select
            options={languageOptions}
            defaultValue={account.language ?? "en"}
            onChange={onSwitchLanguage}
            side="bottom"
            align="end"
          />
        </SectionItem>
        <Separator className="my-4 bg-primary/15" />
        <SectionItem {...region.startWeek}>
          <Switch size="sm" defaultChecked />
        </SectionItem>
      </Section>
    </>
  );
};
