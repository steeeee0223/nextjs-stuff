"use client";

import { useTranslation } from "@swy/i18n";

import { Scope } from "../types";
import SettingsBody from "./settings-body";
import { useSettings } from "./settings-context";
import { account, Tab, User, workspace } from "./sidebar";

const styles = {
  sidebar:
    "grow-0 flex-shrink-0 w-[240px] rounded-tl-lg rounded-bl-lg bg-[#fbfbfa] dark:bg-primary/5 p-1 overflow-y-auto",
  title:
    "px-4 py-1 text-xs font-extrabold text-secondary dark:text-secondary-dark",
  body: "grow-1 overflow-y-scroll w-full px-[60px] py-9 bg-modal rounded-tr-lg rounded-br-lg",
};

export const SettingsPanel = () => {
  const { settings, scopes, tab, setTab } = useSettings();

  const { t } = useTranslation();
  const workspaceTabs = workspace.filter(
    (tab) => tab.value !== "people" || scopes.has(Scope.MemberRead),
  );

  return (
    <div className="flex w-full">
      <div className={styles.sidebar}>
        <div className="py-2">
          <div className={styles.title}>{t("common.account")}</div>
          <User settings={settings} />
          {account.map(({ value, Icon }, i) => (
            <Tab
              key={i}
              name={t(`${value}.title`)}
              isActive={tab === value}
              Icon={Icon}
              onClick={() => setTab(value)}
            />
          ))}
        </div>
        <div className="py-2">
          <div className={styles.title}>{t("common.workspace")}</div>
          {workspaceTabs.map(({ value, Icon }, i) => (
            <Tab
              key={i}
              name={t(`${value}.title`)}
              isActive={tab === value}
              Icon={Icon}
              onClick={() => setTab(value)}
            />
          ))}
        </div>
      </div>
      <div className={styles.body}>
        <SettingsBody activeTab={tab} />
      </div>
    </div>
  );
};
