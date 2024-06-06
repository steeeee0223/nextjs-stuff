import {
  AppWindow,
  ArrowDownToLine,
  ArrowUpRightSquare,
  Bell,
  CircleUserRound,
  CreditCard,
  Globe,
  KeyRound,
  LayoutGrid,
  Map,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type TabType =
  | "my-account"
  | "my-settings"
  | "my-notifications"
  | "my-connections"
  | "language-region"
  | "settings"
  | "people"
  | "plans"
  | "billing"
  | "sites"
  | "security"
  | "identity"
  | "connections"
  | "import";

interface Item {
  name: string;
  value: TabType;
  Icon: LucideIcon;
}

export const account: Item[] = [
  { name: "My account", Icon: CircleUserRound, value: "my-account" },
  { name: "My settings", Icon: SlidersHorizontal, value: "my-settings" },
  { name: "My notifications", Icon: Bell, value: "my-notifications" },
  { name: "My connections", Icon: ArrowUpRightSquare, value: "my-connections" },
  { name: "Language & region", Icon: Globe, value: "language-region" },
] as const;

export const workspace: Item[] = [
  { name: "Settings", Icon: Settings, value: "settings" },
  { name: "People", Icon: UsersRound, value: "people" },
  { name: "Plans", Icon: Map, value: "plans" },
  { name: "Billing", Icon: CreditCard, value: "billing" },
  { name: "Sites", Icon: AppWindow, value: "sites" },
  { name: "Security", Icon: KeyRound, value: "security" },
  { name: "Identity & provisioning", Icon: ShieldCheck, value: "identity" },
  { name: "Connections", Icon: LayoutGrid, value: "connections" },
  { name: "Import", Icon: ArrowDownToLine, value: "import" },
] as const;
