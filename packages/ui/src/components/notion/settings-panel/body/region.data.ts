import type { Option } from "../_components";
import { PanelData } from "./utils";

const $region = ["language", "startWeek"] as const;

export const region: PanelData<typeof $region> = {
  language: {
    title: "Language",
    description: "Change the language used in the user interface.",
  },
  startWeek: {
    title: "Start week on Monday",
    description: "This will change how all calendars in your app look.",
  },
};

export const languageOptions: Option[] = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "Spanish", value: "es" },
  // { label: "Français", value: "fr" },
];
