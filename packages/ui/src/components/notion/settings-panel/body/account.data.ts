import type { PanelData } from "./utils";

const $account = [
  "email",
  "password",
  "verification",
  "support",
  "logout",
  "del",
] as const;

export const myAccount: PanelData<typeof $account> = {
  email: { title: "Email", description: "email" },
  password: {
    title: "Password",
    description:
      "If you lose access to your school email address, you'll be able to log in using your password.",
  },
  verification: {
    title: "2-step verification",
    description:
      "Add an additional layer of security to your account during login.",
  },
  support: {
    title: "Support access",
    description:
      "Grant Notion support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time.",
  },
  logout: {
    title: "Log out of all devices",
    description:
      "Log out of all other active sessions on other devices besides this one.",
  },
  del: {
    title: "Delete my account",
    description:
      "Permanently delete the account and remove access from all workspaces.",
  },
};
