import type { Option } from "../_components";
import type { PanelData } from "./utils";

const $notifications = [
  "mobile",
  "slack",
  "activity",
  "emailDigests",
  "emailAnnouncements",
] as const;

export const myNotifications: PanelData<typeof $notifications> = {
  mobile: {
    title: "Mobile push notifications",
    description:
      "Receive push notifications on mentions and comments via your mobile app",
  },
  slack: {
    title: "Slack notifications",
    description:
      "Receive notifications in your Slack workspace when you're mentioned in a page, database property, or comment",
  },
  activity: {
    title: "Activity in your workspace",
    description:
      "Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes",
  },
  emailDigests: {
    title: "Email digests",
    description:
      "Receive email digests every 8 hours for changes to pages you’re subscribed to",
  },
  emailAnnouncements: {
    title: "Announcements and update emails",
    description:
      "Receive occasional emails about product launches and new features from Notion",
  },
};

export const slackOptions: Option[] = [{ label: "Off", value: "off" }];
