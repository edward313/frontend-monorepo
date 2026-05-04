# Frontend Monorepo Core

A modern frontend monorepo starter built with Turborepo, Next.js, React, Tailwind CSS, and shared internal packages for UI, i18n, and common utilities.

## What's inside?

This Turborepo includes the following apps and packages:

### Apps and Packages

- `starter`: a [Next.js](https://nextjs.org/) app using the App Router, Tailwind CSS, shared UI components, and shared workspace utilities
- `@repo/ui`: a shared React UI library built on top of [Radix UI](https://www.radix-ui.com/), Tailwind CSS, and reusable providers/components
- `@repo/i18n`: a shared internationalization package for routing, navigation, middleware, server config, and locale messages
- `@repo/shared`: shared utilities, constants, middleware helpers, and API client helpers used across apps
- `@repo/tailwind-config`: shared Tailwind CSS and PostCSS configuration
- `@repo/biome-config`: shared [Biome](https://biomejs.dev/) configuration presets
- `@repo/typescript-config`: shared `tsconfig` presets used throughout the monorepo
- `@repo/logger`: a TypeScript logger package with Jest-based tests
- `@repo/jest-presets`: shared Jest presets for Node packages

Each package and app is written in [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo comes with the following tools already set up:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Next.js](https://nextjs.org/) for the main application
- [React](https://react.dev/) for UI development
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Biome](https://biomejs.dev/) for linting and formatting
- [Turborepo](https://turborepo.com/) for task orchestration and caching
- [Jest](https://jestjs.io/) for package-level testing
- [next-intl](https://next-intl.dev/) for internationalization
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TanStack Query](https://tanstack.com/query/latest) for server state management

## Install

To install all dependencies, run:

```sh
pnpm install
```

## Build

To build all apps and packages, run:

```sh
pnpm run build
```

You can build a specific workspace by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```sh
pnpm run build --filter=starter
```

## Develop

To start development tasks across the monorepo, run:

```sh
pnpm run dev
```

To run only the starter app:

```sh
pnpm run dev --filter=starter
```

The starter app runs on [http://localhost:3000](http://localhost:3000) by default.

## Lint

To lint all workspaces:

```sh
pnpm run lint
```

## Typecheck

To run type checking across the monorepo:

```sh
pnpm run typecheck
```

## Test

To run tests across workspaces that define them:

```sh
pnpm run test
```

## Format

To format all files with Biome:

```sh
pnpm run format
```

## Clean

To run clean tasks across the monorepo:

```sh
pnpm run clean
```

## Remote Caching

> [!TIP]
> Turborepo supports [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) so your team and CI can share build artifacts and speed up repeated tasks.

By default, Turborepo caches locally. To enable Remote Caching with Vercel:

```sh
pnpm exec turbo login
pnpm exec turbo link
```

## Useful Links

Learn more about the tools used in this repository:

- [Turborepo Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Turborepo Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Turborepo Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Turborepo Filters](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Next.js Documentation](https://nextjs.org/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
