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
      // Pressable rejects an array that holds its style function, so the merge happens inside one.
      style={(state) => [button.container(state), iconOnly && button.iconContainer]}
    >
      {iconStart && <Lucide name={iconStart} style={button.icon} />}
      {title !== undefined && <Text style={button.label}>{title}</Text>}
      {iconEnd && <Lucide name={iconEnd} style={button.icon} />}
    </Pressable>
  );
}
