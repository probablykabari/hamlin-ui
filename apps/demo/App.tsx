import { StatusBar } from "expo-status-bar";
import { typography } from "hamlin-ui/styles";
import { Pressable, ScrollView, Text } from "react-native";
import { StyleSheet, UnistylesRuntime, useUnistyles, withUnistyles } from "react-native-unistyles";

// contentContainerStyle only follows theme changes through withUnistyles.
const UniScrollView = withUnistyles(ScrollView);

const levels = [1, 2, 3, 4, 5, 6] as const;

function Heading({ level }: { level: (typeof levels)[number] }) {
  typography.useVariants({ level });
  return <Text style={[typography.heading, styles.text]}>Heading {level}</Text>;
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
      <StatusBar style={rt.themeName === "light" ? "dark" : "light"} />
    </UniScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.surfaces.background["basic-1"],
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
  button: {
    alignSelf: "flex-start",
    paddingVertical: theme.space[1],
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radius[4],
    backgroundColor: theme.tints.primary.default,
  },
  buttonText: {
    color: theme.ink.control,
  },
}));
