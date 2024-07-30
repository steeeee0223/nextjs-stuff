import { LOCALE, useTranslation } from "@acme/i18n";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, Select } from "../_components";
import { useSettings } from "../settings-context";
import { toOptions } from "./utils";

export const Region = () => {
  const {
    settings: { account },
    updateSettings,
  } = useSettings();
  /** i18n */
  const { t, i18n } = useTranslation("settings");
  const { title, region } = t("language-region", { returnObjects: true });

  const onSwitchLanguage = async (language: string) => {
    await updateSettings({ account: { language: language as LOCALE } });
    await i18n.changeLanguage(language);
  };

  return (
    <>
      <Section title={title}>
        <SectionItem {...region.language}>
          <Select
            options={toOptions(region.language.options)}
            defaultValue={account.language ?? "en"}
            onChange={onSwitchLanguage}
            side="bottom"
            align="end"
          />
        </SectionItem>
        <Separator className="my-4 bg-primary/15" />
        <SectionItem {...region["start-week"]}>
          <Switch size="sm" defaultChecked />
        </SectionItem>
      </Section>
    </>
  );
};
