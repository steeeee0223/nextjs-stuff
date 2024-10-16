# Changelog

## Version `1.3.0`

### 🆕 Core Updates

- 🆕 `liveblocks`
  - New package for managing `liveblocks` setups
- `worxpace`
  - Fix: collaborative rooms
  - Fix: `<TreeProvider />` causes infinitly re-renders
  - Refactor `/workspace` route due to the error: "Rendered more hooks than during the previous render"
  - Invite members with email/link
- `storybook`
  - Add stories with `liveblocks`
- `ui`
  - Fix people table: avatar in `UserCell`
- `prisma`
  - Migrate collection: `Workspace`
  - Add new collection: `Invitation`

## Version `1.2.0`

### 🆕 Core Updates

- Migrate repo to commit [`create-t3-turbo:86c5f8`](https://github.com/t3-oss/create-t3-turbo/commit/86c5f8898ec67de0c1af6a893f64f1476fb40bb9)
  - Upgrade `nodejs` from `20.10` to `20.16`
  - Upgrade `pnpm` from `9.1.x` to `9.7`
  - Rename `@acme/*` to `@swy/*`
  - Add more lint rules & fix

## Version `1.1.0`

### 🆕 Core Updates

- `storybook`
  - Remove unused package: `@storybook/addon-onboarding`
  - Remove introduction documents
  - Add stories: workspace layout & navbar
- `worxpace`
  - Move components to `ui` package: `Navbar`, `Sidebar`, `DocsHeader`
  - Change routes:
    1. `/documents/*` to `/document/*`
    2. `/workflows/*` to `/workflow/*`
  - Remove `revalidatePath` from server actions
- `ui`
  - Remove `shadcn`'s default styles
  - Unify variants: button, content, input & separator
  - Add shadcn component: `Resizable`
  - Add notion components: `PageProvider`, `Navbar`, `Sidebar`, `PageHeader` (from `DocsHeader`)
- `tailwind-config`
  - Unify color, theming & styles

### 🚧 Known Issues

- Wrapping `PageProvider` with `Room` will crash!

## Version `1.0.4`

- `worxpace`
  - Manage role: add, upgrade, downgrade, remove
  - Display current plan
- `ui`
  - Add components: `Checkbox`, `TagInput`
  - Implement settings panel: People & Plan
  - Configure user scopes for each role & plan

## Version `1.0.3`

- `worxpace`
  - Add keyboard shortcuts: settings panel, search palate, theme toggle
  - Support slack connections
- `ui`
  - Add components: `(Data) Table`
  - Update components: `Tabs`, `DropdownMenu`, `Popover`
  - Implement settings panel: My connections
- `repo`
  - Upgrade packages: `react`, `typescript`, `turbo`, `vitest`, `testing-library`, `eslint` plugins
  - Setup test coverage

## Version `1.0.2`

- `worxpace`
  - Upgrade package: `clerk`
  - Fix auth errors
- `i18n`
  - Setup locales: `en`/`es`/`de`
- `ui`
  - Add `Select (custom)`, `Badge`, `VisuallyHidden`
  - Fix ARIA rules for `DialogContent`
  - Applied `i18n` to `SettingsPanel`

## Version `1.0.1`

- `repo`
  - Remove unused apps: `nextjs`, `dev`
  - Upgrade packages: `lucide-react`, `uuid`, `blocknote`

## Version `1.0.0`

- `prisma` Implement new collections: `account`/`workspace`
- `worxpace` Migrate & fix all server actions
