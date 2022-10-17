import { LogBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppRouter from './src/AppRouter';
import { Provider } from 'react-redux';
import store from './src/store-redux/store';

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
    darkGreen: '#76ffbc',
    darkBlue: '#76dfff',
    darkGrey: '#ced2d6',
    veryDarkBlue: '#00abdf',
    veryDarkGrey: '#a0a7af',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppRouter />
      </PaperProvider>
    </Provider>
  );
}

LogBox.ignoreAllLogs();
