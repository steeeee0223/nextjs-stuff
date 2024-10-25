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
  | "workspace-settings"
  | "people"
  | "plans"
  | "billing"
  | "sites"
  | "security"
  | "identity"
  | "connections"
  | "import";

interface Item {
  value: TabType;
  Icon: LucideIcon;
}

export const account: Item[] = [
  { Icon: CircleUserRound, value: "my-account" },
  { Icon: SlidersHorizontal, value: "my-settings" },
  { Icon: Bell, value: "my-notifications" },
  { Icon: ArrowUpRightSquare, value: "my-connections" },
  { Icon: Globe, value: "language-region" },
] as const;

export const workspace: Item[] = [
  { Icon: Settings, value: "workspace-settings" },
  { Icon: UsersRound, value: "people" },
  { Icon: Map, value: "plans" },
  { Icon: CreditCard, value: "billing" },
  { Icon: AppWindow, value: "sites" },
  { Icon: KeyRound, value: "security" },
  { Icon: ShieldCheck, value: "identity" },
  { Icon: LayoutGrid, value: "connections" },
  { Icon: ArrowDownToLine, value: "import" },
] as const;
