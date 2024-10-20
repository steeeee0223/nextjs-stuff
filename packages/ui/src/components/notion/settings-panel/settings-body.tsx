import { useTranslation } from "@swy/i18n";

import { Scope } from "../types";
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
  Settings3,
} from "./body";
import { useSettings } from "./settings-context";

const SettingsBody = () => {
  const { scopes, tab } = useSettings();
  const { t } = useTranslation();

  switch (tab) {
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
      return scopes.has(Scope.WorkspaceUpdate) ? <Settings2 /> : <Settings3 />;
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
        <Section title={t(`${tab}.title`)}>
          <NotImplemented />
        </Section>
      );
  }
};

export default SettingsBody;
