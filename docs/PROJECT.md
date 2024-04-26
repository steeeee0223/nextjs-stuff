# Project Structure

> **Note**
> OAuth deployments are now working for preview deployments. Read [deployment guide](https://github.com/t3-oss/create-t3-turbo#auth-proxy) and [check out the source](./apps/auth-proxy) to learn more!

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Create T3 Turbo](https://github.com/t3-oss/create-t3-turbo) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ auth-proxy (original setup)
  |   ├─ Nitro server to proxy OAuth requests in preview deployments
  |   └─ Uses Auth.js Core
  ├─ storybook
  |   ├─ Storybook 7.6
  |   ├─ Nextjs client components
  |   └─ Tailwind CSS
  └─ worxpace (notion clone app)
      ├─ Next.js 14 / React 18 / Tailwind CSS
      └─ Prisma / EdgeStore / LiveBlocks / Notion Style Editors
packages
  ├─ api (original setup)
  |   └─ tRPC v11 router definition
  ├─ auth (original setup)
  |   └─ Authentication using next-auth. **NOTE: Only for Next.js app, not Expo**
  ├─ db (original setup)
  |   └─ Typesafe db calls using Drizzle & Planetscale
  ├─ prisma
  |   └─ Typesafe db calls using Prisma
  └─ ui (original setup)
      └─ A UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@acme` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@acme` to something like `@my-company` or `@project-name`.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use PlanetScale and is **edge-bound** with the [database.js](https://github.com/planetscale/database-js) driver. If you're using something else, make the necesary modifications to the [schema](./packages/db/schema) as well as the [client](./packages/db/index.ts) and the [drizzle config](./packages/db/drizzle.config.ts). If you want to switch to non-edge database driver, remove `export const runtime = "edge";` [from all pages and api routes](https://github.com/t3-oss/create-t3-turbo/issues/634#issuecomment-1730240214).

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### 2. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## FAQ

### Does the starter include Solito?

No. Solito will not be included in this repo. It is a great tool if you want to share code between your Next.js and Expo app. However, the main purpose of this repo is not the integration between Next.js and Expo — it's the codesplitting of your T3 App into a monorepo. The Expo app is just a bonus example of how you can utilize the monorepo with multiple apps but can just as well be any app such as Vite, Electron, etc.

Integrating Solito into this repo isn't hard, and there are a few [offical templates](https://github.com/nandorojo/solito/tree/master/example-monorepos) by the creators of Solito that you can use as a reference.

### What auth solution should I use instead of Next-Auth.js for Expo?

I've left this kind of open for you to decide. Some options are [Clerk](https://clerk.dev), [Supabase Auth](https://supabase.com/docs/guides/auth), [Firebase Auth](https://firebase.google.com/docs/auth/) or [Auth0](https://auth0.com/docs). Note that if you're dropping the Expo app for something more "browser-like", you can still use Next-Auth.js for those. [See an example in a Plasmo Chrome Extension here](https://github.com/t3-oss/create-t3-turbo/tree/chrome/apps/chrome).

The Clerk.dev team even made an [official template repository](https://github.com/clerkinc/t3-turbo-and-clerk) integrating Clerk.dev with this repo.

During Launch Week 7, Supabase [announced their fork](https://supabase.com/blog/launch-week-7-community-highlights#t3-turbo-x-supabase) of this repo integrating it with their newly announced auth improvements. You can check it out [here](https://github.com/supabase-community/create-t3-turbo).

### Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. The Expo app, and all other apps you may add in the future, should only add the `api` package as a dev dependency. This lets you have full typesafety in your client applications, while keeping your backend code safe.

If you need to share runtime code between the client and server, such as input validation schemas, you can create a separate `shared` package for this and import it on both sides.

## Deployment

### Next.js

#### Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

### Auth Proxy

The auth proxy is a Nitro server that proxies OAuth requests in preview deployments. This is required for the Next.js app to be able to authenticate users in preview deployments. The auth proxy is not used for OAuth requests in production deployments. To get it running, it's easiest to use Vercel Edge functions. See the [Nitro docs](https://nitro.unjs.io/deploy/providers/vercel#vercel-edge-functions) for how to deploy Nitro to Vercel.

Then, there are some environment variables you need to set in order to get OAuth working:

- For the Next.js app, set `AUTH_REDIRECT_PROXY_URL` to the URL of the auth proxy.
- For the auth proxy server, set `AUTH_REDIRECT_PROXY_URL` to the same as above, as well as `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET` (or the equivalent for your OAuth provider(s)). Lastly, set `AUTH_SECRET` **to the same value as in the Next.js app** for preview environments.

Read more about the setup in [the auth proxy README](./apps/auth-proxy/README.md).

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.
