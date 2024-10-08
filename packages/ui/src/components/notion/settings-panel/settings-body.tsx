import { useTranslation } from "@swy/i18n";

import { NotImplemented, Section } from "./_components";
import {
  Account,
  Connections,
  Identity,
  Notifications,
  People,
  Plans,
  Region,
  Security,
  Settings,
  Settings2,
} from "./body";
import { workspace, type TabType } from "./sidebar";

interface SettingsBodyProps {
  activeTab: TabType;
}

const SettingsBody = ({ activeTab }: SettingsBodyProps) => {
  const { t } = useTranslation();
  const tab = workspace.find(({ value }) => value === activeTab)!;

  switch (activeTab) {
    case "my-account":
      return <Account />;
    case "my-settings":
      return <Settings />;
    case "my-notifications":
      return <Notifications />;
    case "my-connections":
      return <Connections />;
    case "language-region":
      return <Region />;
    case "workspace-settings":
      return <Settings2 />;
    case "people":
      return <People />;
    case "security":
      return <Security />;
    case "identity":
      return <Identity />;
    case "plans":
      return <Plans />;
    default:
      return (
        <Section title={t(`${tab.value}.title`)}>
          <NotImplemented />
        </Section>
      );
  }
};

export default SettingsBody;
