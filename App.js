import AppRouter from "./src/AppRouter";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fd3667",
    secondary: "#473f97",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppRouter />
    </PaperProvider>
  );
}
