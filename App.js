import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppRouter from './src/AppRouter';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fd3667',
    secondary: '#473f97',
    veryLightGrey: '#f4f5f6',
    lightBeige: '#fff1ec',
    lightPink: '#ffd4d4',
    lightGreen: '#d4ffea',
    lightBlue: '#d4f5ff',
    lightGrey: '#e8eaec',
    darkBeige: '#ffded3',
    darkBlue: '#76dfff',
    darkGrey: '#ced2d6',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppRouter />
    </PaperProvider>
  );
}
