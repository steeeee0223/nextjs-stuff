import type { PluginCreator } from "tailwindcss/types/config";

export const notionPlugin: PluginCreator = (api) => {
  api.addUtilities({
    ".notion-scrollbar": {
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-button": {
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        "min-height": "44px",
        "border-style": "solid",
        "border-color": "rgb(var(--bg-popover))",
        "border-radius": "9999px",
        "background-color": "rgba(var(--primary) / 0.50)",
        "background-clip": "padding-box",
      },
    },
    ".notion-scrollbar-dark": {
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-button": {
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        "min-height": "44px",
        "border-style": "solid",
        "border-color": "rgb(var(--bg-popover))",
        "border-radius": "9999px",
        "background-color": "rgb(var(--bg-main))",
        "background-clip": "padding-box",
      },
    },
  });
  api.addVariant(
    "radix-popper-wrapper",
    "& [data-radix-popper-content-wrapper]",
  );
};
