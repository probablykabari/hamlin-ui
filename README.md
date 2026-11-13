# hamlin-ui

A design system for React Native and React Native Web, built on [Unistyles v3](https://www.unistyl.es/v3/start/introduction). The package is published to npm as [`hamlin-ui`](https://www.npmjs.com/package/hamlin-ui).

## What this is

The package has two entry points:

- `hamlin-ui`: the light and dark themes, the `createTheme` builder, the breakpoints, the font helpers, and their types.
- `hamlin-ui/styles`: the stylesheets `typography`, `button`, `surfaces`, and `stack`.

For installation, setup, and usage, read the [package README](packages/design-system/README.md). For the visual design rules, read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Repository layout

| Path                         | Contents                                                           |
| ---------------------------- | ------------------------------------------------------------------ |
| `packages/design-system/`    | The published package. Its npm name is `hamlin-ui`.                |
| `apps/demo/`                 | The Expo demo app. The Maestro flows are in `apps/demo/.maestro/`. |
| `packages/skills/hamlin-ui/` | The agent skill for apps that use `hamlin-ui`.                     |
| `styles/`, `.vale.ini`       | The Vale prose rules.                                              |

## Contributing

### Requirements

- Node.js.
- pnpm `12.15.0`. The `devEngines` field enforces this version, so other versions fail.
- Xcode, to run the demo on iOS.
- [Maestro](https://maestro.dev), to run the UI tests.

### Setup

```sh
pnpm install --reporter=append-only
```

### Commands

Run these from the repository root:

| Task             | Command                                    |
| ---------------- | ------------------------------------------ |
| Lint             | `pnpm lint` / `pnpm lint:fix`              |
| Format           | `pnpm fmt` / `pnpm fmt:check`              |
| Test (watch)     | `pnpm test`                                |
| Test once        | `pnpm vitest run`                          |
| Single test file | `pnpm vitest run <path>`                   |
| Type check       | `pnpm tsc --noEmit`                        |
| Demo type check  | `pnpm --filter demo exec tsc --noEmit`     |
| Demo on iOS      | `pnpm --filter demo exec expo run:ios`     |
| Demo on web      | `pnpm --filter demo exec expo start --web` |

Use `--filter hamlin-ui` to target the package, not `--filter design-system`.

### Rules for changes

- Every change MUST work on both native and web.
- A `StyleSheet.create` callback MUST return an object literal: `(theme) => ({ ... })`. With a block body, the Unistyles transform skips the stylesheet on native.
- `packages/design-system/src/index.ts` MUST NOT import from `src/styles/`. That entry point calls `StyleSheet.create` on import.
- A test that imports the theme MUST mock `react-native` (`Platform`).
- Lint, format check, tests, and both type checks MUST pass before you open a pull request.

### UI tests

Start the demo on iOS or web. Then run the flow for that platform:

```sh
maestro test apps/demo/.maestro/ios.yaml
maestro test apps/demo/.maestro/web.yaml
```

The web flow expects the demo at `http://localhost:8081`.

### Pull requests

Open pull requests against `main` on [probablykabari/hamlin-ui](https://github.com/probablykabari/hamlin-ui).

### AI agents

[AGENTS.md](AGENTS.md) holds the instructions for coding agents. If you change a command, a rule, or the layout, update `AGENTS.md` too.

## License

[MIT](LICENSE)
