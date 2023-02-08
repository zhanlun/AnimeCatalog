import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import merge from 'deepmerge';
import React from 'react';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import MyNavigator from './src/navigator/MyNavigator';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// generated from https://callstack.github.io/react-native-paper/theming.html
const DefaultTheme = {
  colors: {
    primary: 'rgb(255, 180, 168)',
    onPrimary: 'rgb(105, 1, 0)',
    primaryContainer: 'rgb(147, 1, 0)',
    onPrimaryContainer: 'rgb(255, 218, 212)',
    secondary: 'rgb(231, 189, 182)',
    onSecondary: 'rgb(68, 41, 37)',
    secondaryContainer: 'rgb(93, 63, 59)',
    onSecondaryContainer: 'rgb(255, 218, 212)',
    tertiary: 'rgb(222, 196, 140)',
    onTertiary: 'rgb(62, 46, 4)',
    tertiaryContainer: 'rgb(86, 68, 25)',
    onTertiaryContainer: 'rgb(251, 223, 166)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 25)',
    onBackground: 'rgb(237, 224, 221)',
    surface: 'rgb(32, 26, 25)',
    onSurface: 'rgb(237, 224, 221)',
    surfaceVariant: 'rgb(83, 67, 65)',
    onSurfaceVariant: 'rgb(216, 194, 190)',
    outline: 'rgb(160, 140, 137)',
    outlineVariant: 'rgb(83, 67, 65)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(237, 224, 221)',
    inverseOnSurface: 'rgb(54, 47, 46)',
    inversePrimary: 'rgb(192, 1, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 32)',
      level2: 'rgb(50, 38, 36)',
      level3: 'rgb(57, 43, 41)',
      level4: 'rgb(59, 45, 42)',
      level5: 'rgb(63, 48, 45)',
    },
    surfaceDisabled: 'rgba(237, 224, 221, 0.12)',
    onSurfaceDisabled: 'rgba(237, 224, 221, 0.38)',
    backdrop: 'rgba(59, 45, 43, 0.4)',
  },
};

const MyLightTheme = {
  ...MD3LightTheme,
  ...DefaultTheme,
};

const MyDarkTheme = {
  ...MD3DarkTheme,
  ...DefaultTheme,
};

const CombinedDefaultTheme = merge(LightTheme, MyLightTheme);
const CombinedDarkTheme = merge(DarkTheme, MyDarkTheme);
const CombinedDarkThemeForNavigation = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    background: 'transparent',
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function App(): JSX.Element {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <MyNavigator />
        </NavigationContainer>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
