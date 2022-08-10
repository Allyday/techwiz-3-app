import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppRouter from './src/AppRouter';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fd3667',
    secondary: '#473f97',
    lightBeige: '#fff1ec',
    lightPink: '#ffd4d4',
    lightGreen: '#d4ffea',
    lightBlue: '#d4f5ff',
    lightGrey: '#e8eaec',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppRouter />
    </PaperProvider>
  );
}
