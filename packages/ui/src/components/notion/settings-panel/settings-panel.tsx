"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui";
import { mockUser } from "./mock";
import SettingsBody from "./settings-body";
import { account, workspace, type TabType } from "./sidebar-data";
import { Tab, User } from "./sidebar-items";
import { useSettings } from "./use-settings";

const styles = {
  panel:
    "min-w-full h-[720px] w-[1150px] rounded shadow flex z-[99999] p-0 border-none",
  sidebar: "min-w-[21%] rounded-tl-sm rounded-bl-sm bg-primary/5 p-2",
  sidebarSection: "py-2 text-primary",
  title: "px-4 py-1 text-xs font-extrabold text-primary/65",
  body: "w-[79%] overflow-y-scroll px-[60px] py-9",
};

export const SettingsPanel = () => {
  const settings = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>("my-settings");
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent
        forceMount
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <div className={styles.title}>Account</div>
            <User user={mockUser} />
            {account.map(({ name, value, Icon }, i) => (
              <Tab
                key={i}
                name={name}
                isActive={activeTab === value}
                Icon={Icon}
                onClick={() => setActiveTab(value)}
              />
            ))}
          </div>
          <div className={styles.sidebarSection}>
            <div className={styles.title}>Workspace</div>
            {workspace.map(({ name, value, Icon }, i) => (
              <Tab
                key={i}
                name={name}
                isActive={activeTab === value}
                Icon={Icon}
                onClick={() => setActiveTab(value)}
              />
            ))}
          </div>
        </div>
        <div className={styles.body}>
          <SettingsBody activeTab={activeTab} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
