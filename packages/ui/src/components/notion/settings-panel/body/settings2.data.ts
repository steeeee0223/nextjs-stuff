import type { PanelData } from "./utils";

const $settings = [
  "name",
  "icon",
  "domain",
  "public",
  "content",
  "members",
  "analytics",
  "danger",
] as const;

export const settings: PanelData<typeof $settings> = {
  name: {
    title: "Name",
    description:
      "You can use your organization or company name. Keep it simple.",
  },
  icon: {
    title: "Icon",
    description:
      "Upload an image or pick an emoji. It will show up in your sidebar and notifications.",
  },
  domain: {
    title: "Domain",
    description: `Pages shared to web will be under %s.
    Anyone with an allowed email domain can join this workspace via %s.`,
  },
  public: {
    title: "Public home page",
    description: "Access your public home page via %s.",
  },
  content: {
    title: "Export content",
    description: "",
  },
  members: {
    title: "Export members",
    description: "",
    plan: "business",
  },
  analytics: {
    title: "Save and display page view analytics",
    description:
      "People with edit or full access will be able to see how many views a page has. If this is turned off, page views will not be stored for all pages in %s.",
  },
  danger: {
    title: "Danger zone",
    description: "",
  },
};
