import type { PlopTypes } from "@turbo/gen";

export const story = {
  description: "Component Story",
  prompts: [
    {
      type: "input",
      name: "dest",
      message: "📁 Destination:",
      default: "custom",
      validate: (value) => !!value || `Destination is required`,
    },
    {
      type: "input",
      name: "name",
      message: "🧩 Component Name:",
      default: "button",
      validate: (value) => !!value || `Component name is required`,
    },
  ],
  actions: [
    {
      type: "add",
      path: "apps/storybook/src/stories/{{dashCase dest}}/{{dashCase name}}.stories.tsx",
      templateFile: "templates/story/index.stories.tsx.hbs",
      abortOnFail: true,
    },
  ],
} satisfies PlopTypes.PlopGeneratorConfig;
