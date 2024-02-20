import { Account, Settings } from "./panels";
import { type TabType } from "./sidebar-data";

interface SettingsBodyProps {
  activeTab: TabType;
}

const SettingsBody = ({ activeTab }: SettingsBodyProps) => {
  switch (activeTab) {
    case "my-account":
      return <Account />;
    case "my-settings":
      return <Settings />;
  }
};

export default SettingsBody;
