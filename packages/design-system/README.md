# hamlin-ui

A design system for React Native and React Native Web, built on [Unistyles v3](https://www.unistyl.es/v3/start/introduction).

The package contains:

- `hamlin-ui`: the light and dark themes, the `createTheme` builder, the breakpoints, the font helpers, and their types.
- `hamlin-ui/styles`: the stylesheets `typography`, `button`, `surfaces`, and `stack`.

The themes are plain objects. You change them and give them to Unistyles yourself. To use this package, you MUST know these Unistyles concepts:

- [Configuration](https://www.unistyl.es/v3/start/configuration/) (`StyleSheet.configure`)
- [Theming](https://www.unistyl.es/v3/guides/theming/)
- [Variants](https://www.unistyl.es/v3/references/variants/)
- [Breakpoints](https://www.unistyl.es/v3/references/breakpoints/)

## Installation

Install the package and its peer dependencies:

```sh
pnpm add hamlin-ui react react-native react-native-unistyles react-native-nitro-modules@0.37.1
```

| Peer dependency              | Version    |
| ---------------------------- | ---------- |
| `react`                      | `>=19.0.0` |
| `react-native`               | `>=0.81.0` |
| `react-native-unistyles`     | `^3.6.0`   |
| `react-native-nitro-modules` | `0.37.1`   |

The package ships TypeScript source. Metro compiles it. Other bundlers MUST compile TypeScript in `node_modules`.

Follow the Unistyles [getting started guide](https://www.unistyl.es/v3/start/getting-started/) to set up the native side. Then add the Unistyles [Metro integration](https://www.unistyl.es/v3/other/metro/) to `metro.config.js`:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withUnistylesConfig } = require("react-native-unistyles/metro");

module.exports = withUnistylesConfig(getDefaultConfig(__dirname));
```

The Metro integration processes the `hamlin-ui` stylesheets in `node_modules`. If you use the [Babel plugin](https://www.unistyl.es/v3/other/babel-plugin/) instead, add `autoProcessImports: ["hamlin-ui"]` to the plugin options.

## Setup

Create `unistyles.ts`. It registers the themes and breakpoints, and it adds their types to Unistyles:

```ts
import { breakpoints, darkTheme, lightTheme } from "hamlin-ui";
import { StyleSheet } from "react-native-unistyles";

const themes = { light: lightTheme, dark: darkTheme };

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({ themes, breakpoints, settings: { initialTheme: "light" } });
```

Import `unistyles.ts` first in the app entry file:

```ts
import "./unistyles";

import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
```

`hamlin-ui/styles` calls `StyleSheet.create` when it is imported. Thus `StyleSheet.configure` MUST run before any file imports `hamlin-ui/styles`.

## Theme

### Theme keys

| Key        | Contents                                                               |
| ---------- | ---------------------------------------------------------------------- |
| `colors`   | The raw palette: solid and transparent ramps for each status.          |
| `tints`    | Fill and border colors for interactive controls, per status.           |
| `surfaces` | Backgrounds and borders for containers.                                |
| `ink`      | Text and icon colors.                                                  |
| `shadows`  | Seven shadow colors, from light to strong.                             |
| `space`    | Padding, margin, and gap values.                                       |
| `size`     | Dimensions of controls, icons, and touch targets.                      |
| `radius`   | Corner radii.                                                          |
| `fonts`    | The `body` and `heading` fonts, with sizes, line heights, and weights. |

The `Theme` type is the return type of `createTheme`. `lightTheme` and `darkTheme` have this shape.

### Layers

The color tokens are in layers. Each layer is built from the layer before it:

`colors` → `tints` → `surfaces` → `ink`

`createTheme` builds `tints`, `surfaces`, and `ink` from `colors`. To change a color, give the new palette to `createTheme` (see [Change a color](#change-a-color)).

### Palette

The palette has seven statuses: `basic`, `primary`, `accent`, `success`, `info`, `warning`, and `danger`.

- Each status has an eleven-step solid ramp: `50`, `100`–`900`, `950`. The key is `<status>-<step>`, for example `primary-500`.
- Each status has a six-step transparent ramp: the 500 color at 8%, 16%, 24%, 32%, 40%, and 48% opacity. The key is `<status>-transparent-<step>`, with steps `100`–`600`.
- Step 500 is the base color.

| Status    | 500       |
| --------- | --------- |
| `basic`   | `#70718F` |
| `primary` | `#00878D` |
| `accent`  | `#007EC5` |
| `success` | `#009025` |
| `info`    | `#1376CC` |
| `warning` | `#AB6200` |
| `danger`  | `#D90B16` |

The palette has no pure white or pure black.

### Tints

`theme.tints` has one entry for each status. Each entry has the same 20 keys:

| Group              | Keys                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Solid fill         | `default`, `hover`, `focus`, `active`, `disabled`                                                             |
| Solid border       | `border-default`, `border-hover`, `border-focus`, `border-active`, `border-disabled`                          |
| Transparent fill   | `transparent-default`, `transparent-hover`, `transparent-focus`, `transparent-active`, `transparent-disabled` |
| Transparent border | `transparent-border-default`, … `transparent-border-disabled`                                                 |

Hover makes a fill lighter. Focus and press make it darker. Disabled is always a neutral transparent color, never a faded status color.

The ramp steps for the status tints (`primary` to `danger`):

| Key                                      | Light | Dark |
| ---------------------------------------- | ----- | ---- |
| `default`, `border-default`              | 500   | 400  |
| `hover`, `border-hover`                  | 400   | 300  |
| `focus`, `active`, `border-active`       | 600   | 500  |
| `border-focus`                           | 700   | 300  |
| `transparent-border-*` (except disabled) | 500   | 400  |

The transparent fills use the transparent steps 100 (default), 200 (hover), and 300 (focus and active) in both modes.

### Surfaces

`theme.surfaces` holds background and border colors:

- `background.basic-1`–`basic-4`: levels 1 to 4.
- `background.alternative-1`–`alternative-4`: inverse backgrounds (dark in light mode, light in dark mode).
- `border.basic-1`–`basic-5` and `border.alternative-1`–`alternative-5`: borders that match each background level. Level 5 is the strongest.
- `border.<status>-1`–`<status>-5`: status borders, from the 500 step (1) to the 900 step (5).

### Ink

`theme.ink` holds the text and icon colors:

| Key                                 | Light                   | Dark                    |
| ----------------------------------- | ----------------------- | ----------------------- |
| `basic`                             | `basic-700`             | `basic-50`              |
| `alternate`                         | `basic-50`              | `basic-800`             |
| `hint`                              | `basic-500`             | `basic-500`             |
| `disabled`                          | `basic-transparent-600` | `basic-transparent-600` |
| `<status>`                          | `<status>-500`          | `<status>-300`          |
| `<status>-hover`                    | `<status>-400`          | `<status>-200`          |
| `<status>-focus`, `<status>-active` | `<status>-600`          | `<status>-400`          |
| `<status>-disabled`                 | `<status>-400`          | `<status>-600`          |

### Light and dark

Dark mode is not an inversion of colors. These tokens change between the two themes:

- `surfaces` and `ink` take their colors from the other end of the `basic` ramp.
- `tints` and the status `ink` colors use lighter steps.
- `shadows` use more opacity, so that they show on dark surfaces.

These tokens are the same in both themes: `colors`, `space`, `size`, `radius`, and `fonts`.

### Typography

The theme has two fonts: `fonts.body` and `fonts.heading`. Both use the system font by default (`"System"` on native, a system font stack on web).

Each font has a 16-step size scale. One step grows by about 8% at small sizes and by up to 19% at display sizes. The scale starts at 13 on native and at 11 on web, so one step has a similar physical size on each platform.

| Step   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Native | 13  | 14  | 15  | 17  | 19  | 22  | 25  | 30  | 35  | 42  | 50  | 60  | 71  | 84  | 100 | 119 |
| Web    | 11  | 12  | 13  | 14  | 16  | 18  | 21  | 25  | 30  | 36  | 42  | 50  | 60  | 71  | 85  | 101 |

The line height is `round(size × 1.2 + 4)` on native and `round(size × 1.35 + 3)` on web. Letter spacing is 0 at every step.

The `typography` stylesheet uses these steps:

| Style     | Font    | Step | Weight | Native size / line | Web size / line |
| --------- | ------- | ---- | ------ | ------------------ | --------------- |
| heading 1 | heading | 11   | 700    | 50 / 64            | 42 / 60         |
| heading 2 | heading | 10   | 700    | 42 / 54            | 36 / 52         |
| heading 3 | heading | 9    | 600    | 35 / 46            | 30 / 44         |
| heading 4 | heading | 8    | 600    | 30 / 40            | 25 / 37         |
| heading 5 | heading | 7    | 600    | 25 / 34            | 21 / 31         |
| heading 6 | heading | 6    | 600    | 22 / 30            | 18 / 27         |
| `body`    | body    | 5    | 400    | 19 / 27            | 16 / 25         |
| `label`   | body    | 3    | 500    | 15 / 22            | 13 / 21         |
| `caption` | body    | 2    | 400    | 14 / 21            | 12 / 19         |

### Size and space

`theme.space` is derived from `theme.size` and has the same keys.

| Key     | 0   | 0-25 | 0-5 | 0-75 | 1   | 1-5 | 2   | 2-5 | 3   | 3-5 | 4   | 4-5 | 5   | 6   |
| ------- | --- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `size`  | 0   | 2    | 4   | 8    | 20  | 24  | 28  | 32  | 36  | 40  | 44  | 48  | 52  | 64  |
| `space` | 0   | 0.5  | 1   | 1.5  | 2   | 4   | 7   | 10  | 13  | 16  | 18  | 21  | 24  | 32  |

The keys continue to `20`. Keys `7`–`20` set `size` from 74 to 284.

### Radius

| Key      | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `radius` | 0   | 2   | 4   | 5   | 7   | 9   | 12  | 16  | 19  | 22  | 26  | 34  | 42  |

### Breakpoints

| Name | Min width |
| ---- | --------- |
| `xs` | 0         |
| `sm` | 640       |
| `md` | 768       |
| `lg` | 1024      |
| `xl` | 1280      |

## Customizing the theme

### Change tokens

A theme is a plain object. Spread it, replace the keys that you want to change, and give the result to `StyleSheet.configure`. Type the result as `Theme` so that it keeps the shape that the stylesheets expect:

```ts
import { darkTheme, lightTheme, type Theme } from "hamlin-ui";

const light: Theme = {
    ...lightTheme,
    radius: { ...lightTheme.radius, 2: 6 },
};

const dark: Theme = {
    ...darkTheme,
    radius: { ...darkTheme.radius, 2: 6 },
};

const themes = { light, dark };
```

### Change a color

`createTheme(mode, options)` builds a theme. `mode` is `"light"` or `"dark"`. `options.colors` replaces keys of the default palette, and `tints`, `surfaces`, and `ink` are built from the result. Do not spread new colors into `theme.colors`: the other layers do not change.

This example replaces the `primary` ramp in both themes:

```ts
import { createTheme, type Colors } from "hamlin-ui";

const brand: Partial<Colors> = {
    "primary-50": "#ECE7FA",
    "primary-100": "#D9CFF5",
    "primary-200": "#B3A0EB",
    "primary-300": "#8E72E0",
    "primary-400": "#7A5FD8",
    "primary-500": "#5B3CC4",
    "primary-600": "#462C9E",
    "primary-700": "#352178",
    "primary-800": "#241652",
    "primary-900": "#140C2E",
    "primary-950": "#0B0719",
    "primary-transparent-100": "rgba(91, 60, 196, 0.08)",
    "primary-transparent-200": "rgba(91, 60, 196, 0.16)",
    "primary-transparent-300": "rgba(91, 60, 196, 0.24)",
    "primary-transparent-400": "rgba(91, 60, 196, 0.32)",
    "primary-transparent-500": "rgba(91, 60, 196, 0.40)",
    "primary-transparent-600": "rgba(91, 60, 196, 0.48)",
};

const themes = {
    light: createTheme("light", { colors: brand }),
    dark: createTheme("dark", { colors: brand }),
};
```

Each layer reads a set step of the ramp (see [Tints](#tints)), and the dark theme reads lighter steps. Replace the full ramp of a status, solid and transparent, so that every step matches.

To change other tokens too, spread the result of `createTheme` (see [Change tokens](#change-tokens)).

### Change the ramp steps

The `tints`, `ink`, and `surfaces` options select the ramp step that each state reads. Each option is merged over a preset:

| Option     | Type          | Preset                                 | Keys                                                             |
| ---------- | ------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `tints`    | `TintSteps`   | `tintSteps.light`, `tintSteps.dark`    | `default`, `hover`, `active`, `focusBorder`, `transparentBorder` |
| `ink`      | `InkSteps`    | `inkSteps.light`, `inkSteps.dark`      | `default`, `hover`, `active`, `disabled`                         |
| `surfaces` | `BorderSteps` | `borderSteps` (the same in both modes) | `1`–`5`: the step of each `border.<status>-<level>` color        |

This example is for a brand whose base color is step 600:

```ts
const light = createTheme("light", {
    colors: brand,
    tints: { default: "600", hover: "500", active: "700", transparentBorder: "600" },
    ink: { default: "600", hover: "500", active: "700" },
});
```

The steps apply to the status entries `primary`, `accent`, `success`, `info`, `warning`, and `danger`. The `basic` tints, the `basic` and `alternative` surfaces, and the `basic`, `alternate`, `hint`, and `disabled` ink do not change. The transparent fills always use the transparent steps 100, 200, and 300.

### Add a status

`statusTints`, `statusInk`, and `statusBorders` build the tokens of one status. Each takes a theme (any object with `colors`), a status name, and the steps:

| Helper                                | Result                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| `statusTints(theme, status, steps)`   | The 20 tint keys (see [Tints](#tints))                         |
| `statusInk(theme, status, steps)`     | `<status>`, `<status>-hover`, `-focus`, `-active`, `-disabled` |
| `statusBorders(theme, status, steps)` | `<status>-1`–`<status>-5`                                      |

The status MUST have a full ramp in `theme.colors`: `<status>-50`–`<status>-950` and `<status>-transparent-100`–`600`. The `StatusName<typeof colors>` type lists the valid names, so TypeScript rejects a status without a full ramp.

This example adds a `muted` status to the light theme:

```ts
import {
    borderSteps,
    createTheme,
    inkSteps,
    statusBorders,
    statusInk,
    statusTints,
    tintSteps,
} from "hamlin-ui";

const base = createTheme("light");
const theme = { ...base, colors: { ...base.colors, ...mutedRamp } };

const light = {
    ...theme,
    tints: { ...theme.tints, muted: statusTints(theme, "muted", tintSteps.light) },
    ink: { ...theme.ink, ...statusInk(theme, "muted", inkSteps.light) },
    surfaces: {
        ...theme.surfaces,
        border: { ...theme.surfaces.border, ...statusBorders(theme, "muted", borderSteps) },
    },
};
```

Do the same for the dark theme with `tintSteps.dark` and `inkSteps.dark`. The `button` stylesheet does not include a new status.

### Change the fonts

`createFont` builds a font for the current platform. It reads `Platform.OS`, so the font differs on native and web.

```ts
import { createFont, lightTheme, type Theme } from "hamlin-ui";

const inter = createFont({
    family: "Inter",
    webFamily: "Inter, system-ui, sans-serif",
    face: {
        "400": "Inter-Regular",
        "500": "Inter-Medium",
        "600": "Inter-SemiBold",
        "700": "Inter-Bold",
    },
});

const light: Theme = {
    ...lightTheme,
    fonts: { body: inter, heading: inter },
};
```

`createFont` options:

| Option          | Effect                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `family`        | The native font family.                                                                                |
| `webFamily`     | The web font family. The default is `family`.                                                          |
| `size`          | Replaces sizes at given steps, for example `{ 5: 18 }`.                                                |
| `lineHeight`    | Replaces line heights at given steps, or a function `(size) => lineHeight` for every step.             |
| `letterSpacing` | Sets letter spacing from a step and up.                                                                |
| `weight`        | Sets the weight from a step and up, for example `{ 1: "600", 10: "700" }`.                             |
| `face`          | Native only. Maps a weight to a named font face. On web, the browser picks the face from `fontWeight`. |

A `lineHeight` value at one step also moves all larger steps by the same offset. A `weight` or `letterSpacing` value applies to its step and all larger steps, until the next value.

`ramp(start)` builds the 16-step size scale from the size at step 1. `createFont` uses `ramp(13)` on native and `ramp(11)` on web. Use `ramp` to replace the whole scale of a font:

```ts
const large = createFont({ family: "Inter", size: ramp(15) });
```

### Change the breakpoints

Spread `breakpoints` and change or add keys. The first breakpoint MUST be 0. Use the type of your object in the `UnistylesBreakpoints` declaration:

```ts
import { breakpoints as baseBreakpoints } from "hamlin-ui";

const breakpoints = { ...baseBreakpoints, xxl: 1536 } as const;

type AppBreakpoints = typeof breakpoints;
```

### Add a theme

A new theme MUST have the `Theme` shape. Start from `lightTheme` or `darkTheme`, and add it to the `themes` object:

```ts
const highContrast: Theme = {
    ...darkTheme,
    ink: { ...darkTheme.ink, basic: "white", hint: darkTheme.colors["basic-200"] },
};

const themes = { light: lightTheme, dark: darkTheme, highContrast };
```

## Using the styles

Import the stylesheets from `hamlin-ui/styles`:

```ts
import { button, stack, surfaces, typography } from "hamlin-ui/styles";
```

Each stylesheet is a Unistyles stylesheet. Set its variants with `useVariants` in the component, before you read its styles.

### typography

The keys are `body`, `label`, `caption`, and `heading`. `heading` takes the variant `level`: `1`–`6`. The sizes are in [Typography](#typography).

The `typography` styles set no color:

```tsx
import { typography } from "hamlin-ui/styles";
import { Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

function Heading({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: string }) {
    typography.useVariants({ level });
    return <Text style={[typography.heading, styles.text]}>{children}</Text>;
}

const styles = StyleSheet.create((theme) => ({
    text: { color: theme.ink.basic },
}));
```

### button

| Key             | Use                                                                     |
| --------------- | ----------------------------------------------------------------------- |
| `container`     | A function. Give it the `Pressable` state: `button.container(state)`.   |
| `label`         | The button text.                                                        |
| `icon`          | An icon-font glyph before or after the label. It takes the label color. |
| `iconContainer` | Merge after `container` for an icon-only, square button.                |

| Variant      | Values                                                                     |
| ------------ | -------------------------------------------------------------------------- |
| `appearance` | `filled`, `outline`, `ghost`                                               |
| `status`     | `basic`, `primary`, `accent`, `success`, `info`, `warning`, `danger`       |
| `size`       | `xs` (24), `sm` (32), `md` (40), `lg` (48), `xl` (52) — the minimum height |
| `focused`    | `true` for the focus look                                                  |
| `disabled`   | `true` for the disabled look                                               |

On native, the pressed look comes from the `Pressable` state. On web, hover, press, and focus use CSS pseudo-states.

A `Button` component. This example uses `@react-native-vector-icons/lucide` for icons. Any icon font that renders as `Text` works:

```tsx
import { Lucide } from "@react-native-vector-icons/lucide";
import { button } from "hamlin-ui/styles";
import { type ComponentProps, useState } from "react";
import { Pressable, Text } from "react-native";
import type { UnistylesVariants } from "react-native-unistyles";

type Variants = Required<UnistylesVariants<typeof button>>;
type IconName = ComponentProps<typeof Lucide>["name"];

type Props = {
    title?: string;
    iconStart?: IconName;
    iconEnd?: IconName;
    appearance: Variants["appearance"];
    status: Variants["status"];
    size: Variants["size"];
    disabled?: boolean;
    onPress?: () => void;
};

export function Button({
    title,
    iconStart,
    iconEnd,
    appearance,
    status,
    size,
    disabled,
    onPress,
}: Props) {
    const [focused, setFocused] = useState(false);
    button.useVariants({ appearance, status, size, focused, disabled });
    const iconOnly = title === undefined;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={title ?? iconStart ?? iconEnd}
            disabled={disabled}
            onPress={onPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={(state) => [button.container(state), iconOnly && button.iconContainer]}
        >
            {iconStart && <Lucide name={iconStart} style={button.icon} />}
            {title !== undefined && <Text style={button.label}>{title}</Text>}
            {iconEnd && <Lucide name={iconEnd} style={button.icon} />}
        </Pressable>
    );
}
```

`Pressable` does not accept an array that contains its style function. Merge `iconContainer` inside the style function, as in the example.

The `icon` style sets no `fontFamily`, because that replaces the icon font. Do not add one.

### surfaces

| Key    | Use                                                    |
| ------ | ------------------------------------------------------ |
| `base` | A component background from `background.basic-*`.      |
| `alt`  | An inverse background from `background.alternative-*`. |
| `lift` | A shadow. Merge it after `base` or `alt`.              |

| Variant    | Values                                                        |
| ---------- | ------------------------------------------------------------- |
| `level`    | `1`–`4`                                                       |
| `bordered` | `true` adds a 1px border in the color that matches the level. |

`surfaces` sets no radius and no text color.

```tsx
function Card({ level, children }: { level: 1 | 2 | 3 | 4; children: React.ReactNode }) {
    surfaces.useVariants({ level, bordered: true });
    return <View style={[surfaces.base, stack.ystack({ gap: 1 }), styles.card]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
    card: { padding: theme.space[3], borderRadius: theme.radius[4] },
}));
```

### stack

| Key      | Use                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------- |
| `ystack` | A vertical column: `stack.ystack({ gap })`.                                                    |
| `xstack` | A horizontal row that wraps: `stack.xstack({ gap })`. Children are centered on the cross axis. |

`gap` is a `space` key, for example `stack.xstack({ gap: 2 })`. The default is `0`.

```tsx
<View style={stack.xstack({ gap: 2 })}>
    <Button title="Cancel" appearance="ghost" status="basic" size="md" />
    <Button title="Save" appearance="filled" status="primary" size="md" />
</View>
```
