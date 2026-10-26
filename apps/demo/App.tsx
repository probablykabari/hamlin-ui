import { StatusBar } from "expo-status-bar";
import { button, stack, surfaces, typography } from "hamlin-ui/styles";
import { Pressable, ScrollView, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime, useUnistyles, withUnistyles } from "react-native-unistyles";

import { Button } from "./Button";

// contentContainerStyle only follows theme changes through withUnistyles.
const UniScrollView = withUnistyles(ScrollView);

const levels = [1, 2, 3, 4, 5, 6] as const;
const appearances = ["filled", "outline", "ghost"] as const;
const statuses = ["basic", "primary", "accent", "success", "info", "warning", "danger"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const surfaceLevels = [1, 2, 3, 4] as const;
const surfaceKinds = ["base", "alt"] as const;

function Heading({ level }: { level: (typeof levels)[number] }) {
  typography.useVariants({ level });
  return <Text style={[typography.heading, styles.text]}>Heading {level}</Text>;
}

// Maestro cannot hold a press, so this row renders the pressed look directly.
function PressedButton({ appearance }: { appearance: (typeof appearances)[number] }) {
  button.useVariants({ appearance, status: "primary", size: "md" });
  return (
    <View style={button.container({ pressed: true })}>
      <Text style={button.label}>Pressed {appearance}</Text>
    </View>
  );
}

function Surface({
  kind,
  level,
  bordered,
  lift = false,
}: {
  kind: (typeof surfaceKinds)[number];
  level: (typeof surfaceLevels)[number];
  bordered: boolean;
  lift?: boolean;
}) {
  surfaces.useVariants({ level, bordered });
  return (
    <View style={[surfaces[kind], lift && surfaces.lift, stack.ystack({ gap: 1 }), styles.box]}>
      <Text style={[typography.label, kind === "base" ? styles.text : styles.altText]}>
        Surface {kind} {level}
        {bordered ? " bordered" : ""}
        {lift ? " lift" : ""}
      </Text>
    </View>
  );
}

function PressedRow() {
  return (
    <View style={stack.xstack({ gap: 2 })}>
      {appearances.map((appearance) => (
        <PressedButton key={appearance} appearance={appearance} />
      ))}
    </View>
  );
}

export default function App() {
  const { theme, rt } = useUnistyles();
  const toggleTheme = () => UnistylesRuntime.setTheme(rt.themeName === "light" ? "dark" : "light");

  return (
    <UniScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={[typography.label, styles.text]}>Theme: {rt.themeName}</Text>
      <Text style={[typography.label, styles.text]}>
        Body line height: {theme.fonts.body.lineHeight[5]}
      </Text>
      <Pressable onPress={toggleTheme} style={styles.button}>
        <Text style={[typography.label, styles.buttonText]}>Toggle theme</Text>
      </Pressable>
      {levels.map((level) => (
        <Heading key={level} level={level} />
      ))}
      <Text style={[typography.body, styles.text]}>Body text sample</Text>
      <Text style={[typography.label, styles.text]}>Label text sample</Text>
      <Text style={[typography.caption, styles.text]}>Caption text sample</Text>
      {appearances.map((appearance) => (
        <View key={appearance} style={stack.xstack({ gap: 2 })}>
          {statuses.map((status) => (
            <Button
              key={status}
              title={`${appearance} ${status}`}
              appearance={appearance}
              status={status}
              size="sm"
            />
          ))}
        </View>
      ))}
      <View style={stack.xstack({ gap: 2 })}>
        {sizes.map((size) => (
          <Button
            key={size}
            title={`Size ${size}`}
            appearance="filled"
            status="primary"
            size={size}
          />
        ))}
      </View>
      {sizes.map((size) => (
        <View key={size} style={stack.xstack({ gap: 2 })}>
          <Button
            title={`Start ${size}`}
            iconStart="plus"
            appearance="filled"
            status="primary"
            size={size}
          />
          <Button
            title={`End ${size}`}
            iconEnd="arrow-right"
            appearance="filled"
            status="primary"
            size={size}
          />
          <Button iconStart="settings" appearance="filled" status="primary" size={size} />
        </View>
      ))}
      <View style={stack.xstack({ gap: 2 })}>
        {appearances.map((appearance) => (
          <Button
            key={appearance}
            title={`Icon ${appearance}`}
            iconStart="star"
            appearance={appearance}
            status="primary"
            size="md"
          />
        ))}
        <Button
          title="Icon disabled"
          iconStart="star"
          appearance="filled"
          status="primary"
          size="md"
          disabled
        />
      </View>
      <View style={stack.xstack({ gap: 2 })}>
        {appearances.map((appearance) => (
          <Button
            key={appearance}
            title={`Disabled ${appearance}`}
            appearance={appearance}
            status="primary"
            size="md"
            disabled
          />
        ))}
      </View>
      <PressedRow />
      {surfaceKinds.map((kind) =>
        [false, true].map((bordered) => (
          <View key={`${kind}-${bordered}`} style={stack.xstack({ gap: 2 })}>
            {surfaceLevels.map((level) => (
              <Surface key={level} kind={kind} level={level} bordered={bordered} />
            ))}
          </View>
        )),
      )}
      {surfaceKinds.map((kind) => (
        <View key={`${kind}-lift`} style={stack.xstack({ gap: 2 })}>
          {surfaceLevels.map((level) => (
            <Surface key={level} kind={kind} level={level} bordered={false} lift />
          ))}
        </View>
      ))}
      <StatusBar style={rt.themeName === "light" ? "dark" : "light"} />
    </UniScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    // Surfaces are for components, so the app background sits at the ends of the basic ramp.
    backgroundColor: rt.themeName === "dark" ? theme.colors["basic-700"] : theme.colors["basic-50"],
  },
  content: {
    gap: theme.space[2],
    paddingTop: rt.insets.top + theme.space[4],
    paddingHorizontal: theme.space[4],
    paddingBottom: theme.space[6],
  },
  text: {
    color: theme.ink.basic,
  },
  altText: {
    color: theme.ink.alternate,
  },
  box: {
    padding: theme.space[3],
    borderRadius: theme.radius[4],
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: theme.space[1],
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radius[4],
    backgroundColor: theme.tints.primary.default,
  },
  buttonText: {
    color: theme.colors["primary-50"],
  },
}));
