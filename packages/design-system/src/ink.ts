import { colors } from "./colors";
import { tints } from "./tints";

const statusInk = {
  primary: tints.primary.default,
  "primary-focus": tints.primary.focus,
  "primary-hover": tints.primary.hover,
  "primary-active": tints.primary.active,
  "primary-disabled": colors["primary-400"],
  success: tints.success.default,
  "success-focus": tints.success.focus,
  "success-hover": tints.success.hover,
  "success-active": tints.success.active,
  "success-disabled": colors["success-400"],
  info: tints.info.default,
  "info-focus": tints.info.focus,
  "info-hover": tints.info.hover,
  "info-active": tints.info.active,
  "info-disabled": colors["info-400"],
  warning: tints.warning.default,
  "warning-focus": tints.warning.focus,
  "warning-hover": tints.warning.hover,
  "warning-active": tints.warning.active,
  "warning-disabled": colors["warning-400"],
  danger: tints.danger.default,
  "danger-focus": tints.danger.focus,
  "danger-hover": tints.danger.hover,
  "danger-active": tints.danger.active,
  "danger-disabled": colors["danger-400"],
};

export const lightInk = {
  basic: colors["basic-800"],
  alternate: colors["basic-100"],
  control: colors["basic-100"],
  disabled: colors["basic-transparent-600"],
  hint: colors["basic-600"],
  ...statusInk,
};

export type Ink = typeof lightInk;

export const darkInk: Ink = {
  basic: colors["basic-100"],
  alternate: colors["basic-900"],
  control: colors["basic-100"],
  disabled: colors["basic-transparent-600"],
  hint: colors["basic-600"],
  ...statusInk,
};
