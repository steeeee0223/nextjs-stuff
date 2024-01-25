import type { PlopTypes } from "@turbo/gen";

export const nextAction = {
  description: "Nextjs Server Action",
  prompts: [
    {
      type: "input",
      name: "app",
      message: "📁 Which app do you want to add to?",
      default: "nextjs",
      validate: (value) => !!value || `App name is required`,
    },
    {
      type: "input",
      name: "name",
      message: "🐫 Action Name:",
      default: "create action",
      validate: (value) => !!value || `Action name is required`,
    },
  ],
  actions: [
    {
      type: "add",
      path: "apps/{{app}}/src/actions/index.ts",
      skipIfExists: true,
    },
    {
      type: "add",
      path: "apps/{{app}}/src/actions/{{dashCase name}}.ts",
      templateFile: "templates/action/index.ts.hbs",
      abortOnFail: true,
    },
    {
      type: "append",
      path: "apps/{{app}}/actions/index.ts",
      template: 'export * from "./{{dashCase name}}"',
    },
    {
      type: "add",
      path: "packages/validators/src/actions/{{dashCase name}}.ts",
      templateFile: "templates/action/schema.ts.hbs",
      abortOnFail: true,
    },
    {
      type: "append",
      path: "packages/validators/src/actions/index.ts",
      template: 'export * from "./{{dashCase name}}"',
    },
  ],
} satisfies PlopTypes.PlopGeneratorConfig;
