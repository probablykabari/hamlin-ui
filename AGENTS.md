# AGENTS.md

## Project

`hamlin-ui` is a design system for React Native and React Native Web, built on Unistyles v3. It is written in TypeScript and published publicly to npm.

The package ships the light and dark themes and the breakpoints as plain objects and types. Consumers modify them and call `StyleSheet.configure` themselves. Stylesheets (`typography`, later component styles) ship from `hamlin-ui/styles` (`src/styles/`). That entry point calls `StyleSheet.create` on import, so consumers MUST import it after `StyleSheet.configure`, and the root `src/index.ts` MUST NOT import from `src/styles/`. No build step exists yet.

## Layout

- pnpm workspace (`pnpm@12.15.0`, enforced by `devEngines` with `onFail: error`). Workspace globs: `packages/*` and `apps/*` (`apps/` does not exist yet).
- `packages/design-system/` is the published package. Its npm name is `hamlin-ui` (not `design-system`). Use `--filter hamlin-ui` to target it.
- The root package `hamlin-ui-workspace` holds the shared dev tooling only.
- `pnpm-workspace.yaml` declares task ordering: `build` depends on `^build` (dependencies build first), and `test` depends on `build`.

## Commands

Run from the repo root:

| Task                | Command                                |
| ------------------- | -------------------------------------- |
| Install             | `pnpm install --reporter=append-only`  |
| Lint                | `pnpm lint` (oxlint) / `pnpm lint:fix` |
| Format              | `pnpm fmt` (oxfmt) / `pnpm fmt:check`  |
| Test (watch)        | `pnpm test`                            |
| Test once           | `pnpm vitest run`                      |
| Single test file    | `pnpm vitest run <path>`               |
| Single test by name | `pnpm vitest run -t "<name>"`          |
| Type check          | `pnpm tsc --noEmit`                    |

## Tooling

- Lint: oxlint with the `typescript`, `unicorn`, and `oxc` plugins. The `correctness` category is an error.
- Format: oxfmt. Print width is 100 (120 for `*.test.ts`/`*.spec.ts`). Markdown and HTML use a tab width of 4.
- TypeScript 7 (the native Go compiler).
- Tests run in Node. A test that imports the theme MUST mock `react-native` (`Platform`), because `createFont` reads `Platform.OS`.
- `.claude/settings.json` has a PostToolUse hook that runs `oxlint --fix` and `oxfmt` on every file Claude edits or writes. Do not run the formatter by hand after each edit.

## Unistyles

- Load the `react-native-unistyles-v3` skill (`.agents/skills/react-native-unistyles-v3/`) before you write or change any styling, theme, breakpoint, or variant code. Its `references/` folder covers setup, API, styling patterns, third-party integration, and common issues.
- `skills-lock.json` pins that skill to `jpudysz/react-native-unistyles`. Do not edit the skill files by hand.
- Every component MUST work on both native and web. For web-specific behavior (CSS variables, SSR), read `references/styling-patterns.md`.
