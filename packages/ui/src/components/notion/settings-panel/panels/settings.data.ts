import type { Option } from "../section";
import { PanelData } from "./utils";

const $settings = [
  "appearance",
  "openStart",
  "openLinks",
  "setTimezone",
  "timezone",
  "cookie",
  "viewHistory",
  "profile",
] as const;

export const mySettings: PanelData<typeof $settings> = {
  appearance: {
    title: "Appearance",
    description: "Customize how Notion looks on your device.",
  },
  openStart: {
    title: "Open on start",
    description:
      "Choose what to show when Notion starts or when you switch workspaces.",
  },
  openLinks: {
    title: "Open links in desktop app",
    description: "You must have the Mac or Windows app installed",
  },
  setTimezone: {
    title: "Set timezone automatically using your location",
    description:
      "Reminders, notifications and emails are delivered based on your time zone.",
  },
  timezone: { title: "Time Zone", description: "Current time zone setting." },
  cookie: {
    title: "Cookie settings",
    description: "Customize cookies. See Cookie Notice for details.",
  },
  viewHistory: {
    title: "Show my view history",
    description:
      "People with edit or full access will be able to see when you’ve viewed a page. Leran more.",
  },
  profile: {
    title: "Profile discoverability",
    description:
      "Users with your email can see your name and profile picture when inviting you to a new workspace. Learn more.",
  },
};

export const appearanceOptions: Option[] = [
  { label: "Use system setting", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];
export const openStartOptions: Option[] = [
  { label: "Last visited page", value: "last" },
  { label: "Top page in sidebar", value: "top" },
];
