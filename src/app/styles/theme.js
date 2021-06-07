import { DefaultTheme } from "react-native-paper";

export default function Theme() {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#007AFF",
      background: "white",
    },
  };
}
