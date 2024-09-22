import { LOCALE, useTranslation } from "@acme/i18n";

import { Select } from "@/components/custom/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem } from "../_components";
import { useSettings } from "../settings-context";

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
            options={region.language.options}
            defaultValue={account.language ?? "en"}
            onChange={onSwitchLanguage}
            side="bottom"
            align="end"
            customDisplay={({ option }) => (
              <div className="truncate text-secondary dark:text-secondary-dark">
                {typeof option === "string" ? option : option?.label}
              </div>
            )}
          />
        </SectionItem>
        <Separator className="my-4" />
        <SectionItem {...region["start-week"]}>
          <Switch size="sm" defaultChecked />
        </SectionItem>
      </Section>
    </>
  );
};
