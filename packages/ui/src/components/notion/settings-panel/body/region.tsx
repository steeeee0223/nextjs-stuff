import { useTranslation, type LOCALE } from "@swy/i18n";

import { useModal } from "@/components/custom/modal-provider";
import { Select } from "@/components/custom/select";
import { BaseModal } from "@/components/notion/common";
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
  const { title, region, modals } = t("language-region", {
    returnObjects: true,
  });
  /** Handlers */
  const { setOpen } = useModal();
  const onSwitchLanguage = (language: LOCALE) => {
    const langLabel = region.language.options[language].label;
    setOpen(
      <BaseModal
        {...modals.language}
        title={t("language-region.modals.language.title", {
          language: langLabel,
        })}
        onTrigger={() => {
          updateSettings({ account: { language } });
          void i18n.changeLanguage(language);
        }}
      />,
    );
  };

  return (
    <>
      <Section title={title}>
        <SectionItem {...region.language}>
          <Select
            options={region.language.options}
            value={account.language ?? "en"}
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
