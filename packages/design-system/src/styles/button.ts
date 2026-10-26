import type { PressableStateCallbackType } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import type { Theme } from "../themes";

type Appearance = "filled" | "outline" | "ghost";
type Status = keyof Theme["tints"];
type Interaction = "default" | "hover" | "active" | "focus" | "disabled";

const appearances: Appearance[] = ["filled", "outline", "ghost"];
const statuses: Status[] = ["basic", "primary", "accent", "success", "info", "warning", "danger"];

const appearanceVariant = { filled: {}, outline: {}, ghost: {} };
const statusVariant = {
  basic: {},
  primary: {},
  accent: {},
  success: {},
  info: {},
  warning: {},
  danger: {},
};
const flag = { true: {} };

const pairs = appearances.flatMap((appearance) =>
  statuses.map((status) => ({ appearance, status })),
);

const fill = (theme: Theme, appearance: Appearance, status: Status, state: Interaction) => {
  const tint = theme.tints[status];
  if (appearance === "filled") {
    return { backgroundColor: tint[state], borderColor: tint[`border-${state}`] };
  }
  if (appearance === "outline") {
    return {
      backgroundColor: tint[`transparent-${state}`],
      borderColor: tint[`transparent-border-${state}`],
    };
  }
  const ghost = {
    default: { backgroundColor: "transparent", borderColor: "transparent" },
    hover: { backgroundColor: theme.colors["basic-transparent-100"], borderColor: "transparent" },
    active: { backgroundColor: theme.colors["basic-transparent-200"], borderColor: "transparent" },
    focus: {
      backgroundColor: theme.colors["basic-transparent-200"],
      borderColor: theme.colors["basic-transparent-500"],
    },
    disabled: { backgroundColor: "transparent", borderColor: "transparent" },
  };
  return ghost[state];
};

const ink = (theme: Theme, appearance: Appearance, status: Status) => {
  if (appearance === "filled") {
    return status === "basic" ? theme.ink.basic : theme.colors[`${status}-50`];
  }
  return status === "basic" ? theme.ink.hint : theme.ink[status];
};

// The callback MUST return an object literal: the Unistyles transform skips a block body.
export const button = StyleSheet.create((theme: Theme) => ({
  // Pressable passes its state to a style function, so the pressed look needs no React state.
  container: ({ pressed }: PressableStateCallbackType) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius[2],
    borderWidth: 1,
    // Vertical padding plus the label line height MUST stay at or under minHeight on native
    // and web, so minHeight alone sets the height and each size lands on its size token.
    variants: {
      appearance: appearanceVariant,
      status: statusVariant,
      focused: flag,
      disabled: flag,
      size: {
        xs: {
          minWidth: theme.size["1-5"],
          minHeight: theme.size["1-5"],
          paddingHorizontal: theme.space["1-5"],
          paddingVertical: theme.space["0-25"],
        },
        sm: {
          minWidth: theme.size["2-5"],
          minHeight: theme.size["2-5"],
          paddingHorizontal: theme.space[2],
          paddingVertical: theme.space["0-75"],
        },
        md: {
          minWidth: theme.size["3-5"],
          minHeight: theme.size["3-5"],
          paddingHorizontal: theme.space["2-5"],
          paddingVertical: theme.space["1-5"],
        },
        lg: {
          minWidth: theme.size["4-5"],
          minHeight: theme.size["4-5"],
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[2],
        },
        xl: {
          minWidth: theme.size[5],
          minHeight: theme.size[5],
          paddingHorizontal: theme.space["3-5"],
          paddingVertical: theme.space["2-5"],
        },
      },
    },
    // Order sets precedence: resting, then focused, then disabled.
    compoundVariants: [
      ...pairs.map(({ appearance, status }) => ({
        appearance,
        status,
        styles: {
          ...fill(theme, appearance, status, pressed ? "active" : "default"),
          _web: {
            _hover: fill(theme, appearance, status, "hover"),
            _active: fill(theme, appearance, status, "active"),
            _focus: fill(theme, appearance, status, "focus"),
          },
        },
      })),
      ...pairs.map(({ appearance, status }) => ({
        appearance,
        status,
        focused: true,
        styles: fill(theme, appearance, status, pressed ? "active" : "focus"),
      })),
      ...pairs.map(({ appearance, status }) => ({
        appearance,
        status,
        disabled: true,
        styles: {
          ...fill(theme, appearance, status, "disabled"),
          _web: {
            _hover: fill(theme, appearance, status, "disabled"),
            _active: fill(theme, appearance, status, "disabled"),
            _focus: fill(theme, appearance, status, "disabled"),
          },
        },
      })),
    ],
  }),
  label: {
    fontFamily: theme.fonts.body.face["600"],
    fontWeight: "600",
    // flexGrow 1 pushes text to the start of its parent on native
    flexGrow: 0,
    flexShrink: 1,
    variants: {
      appearance: appearanceVariant,
      status: statusVariant,
      focused: flag,
      disabled: flag,
      size: {
        xs: {
          fontSize: theme.fonts.body.size[1],
          lineHeight: theme.fonts.body.lineHeight[1],
          marginHorizontal: theme.space[2],
        },
        sm: {
          fontSize: theme.fonts.body.size[2],
          lineHeight: theme.fonts.body.lineHeight[2],
          marginHorizontal: theme.space[2],
        },
        md: {
          fontSize: theme.fonts.body.size[4],
          lineHeight: theme.fonts.body.lineHeight[4],
          marginHorizontal: theme.space["2-5"],
        },
        lg: {
          fontSize: theme.fonts.body.size[5],
          lineHeight: theme.fonts.body.lineHeight[5],
          marginHorizontal: theme.space["2-5"],
        },
        xl: {
          fontSize: theme.fonts.body.size[6],
          lineHeight: theme.fonts.body.lineHeight[6],
          marginHorizontal: theme.space[3],
        },
      },
    },
    // The disabled entry comes last so it overrides the status color.
    compoundVariants: [
      ...pairs.map(({ appearance, status }) => ({
        appearance,
        status,
        styles: { color: ink(theme, appearance, status) },
      })),
      { disabled: true, styles: { color: theme.ink.disabled } },
    ],
  },
  // Icon fonts render as Text, so color and fontSize style the glyph. Setting fontFamily
  // here would replace the icon font. The label margin already spaces the icon from the text.
  icon: {
    variants: {
      appearance: appearanceVariant,
      status: statusVariant,
      focused: flag,
      disabled: flag,
      size: {
        xs: { fontSize: theme.fonts.body.size[2], lineHeight: theme.fonts.body.size[2] },
        sm: { fontSize: theme.fonts.body.size[3], lineHeight: theme.fonts.body.size[3] },
        md: { fontSize: theme.fonts.body.size[5], lineHeight: theme.fonts.body.size[5] },
        lg: { fontSize: theme.fonts.body.size[6], lineHeight: theme.fonts.body.size[6] },
        xl: { fontSize: theme.fonts.body.size[7], lineHeight: theme.fonts.body.size[7] },
      },
    },
    compoundVariants: [
      ...pairs.map(({ appearance, status }) => ({
        appearance,
        status,
        styles: { color: ink(theme, appearance, status) },
      })),
      { disabled: true, styles: { color: theme.ink.disabled } },
    ],
  },
  // Merge after container for an icon-only button: minWidth equals minHeight at every size,
  // so dropping the horizontal padding leaves a square.
  iconContainer: {
    paddingHorizontal: 0,
  },
}));
