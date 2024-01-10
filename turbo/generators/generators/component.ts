import type { PlopTypes } from "@turbo/gen";

export const component = {
  description: "React UI Component",
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
      type: "addMany",
      destination:
        "packages/ui/src/components/{{dashCase dest}}/{{dashCase name}}",
      templateFiles: "templates/component/",
      base: "templates/component",
      abortOnFail: true,
    },
    {
      type: "add",
      path: "apps/storybook/src/stories/{{dashCase dest}}/{{dashCase name}}.stories.tsx",
      templateFile: "templates/story/index.stories.tsx.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: "packages/ui/src/components/{{dashCase dest}}/index.ts",
      skipIfExists: true,
    },
    // {
    //   type: 'append',
    //   path: 'packages/ui/src/components/index.ts',
    //   template: 'export * from "./{{dashCase dest}}";',
    // },
    {
      type: "append",
      path: "packages/ui/src/components/{{dashCase dest}}/index.ts",
      template: 'export * from "./{{dashCase name}}";',
    },
  ],
} satisfies PlopTypes.PlopGeneratorConfig;
