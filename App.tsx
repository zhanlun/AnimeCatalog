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
import React, { useEffect } from 'react';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import MyNavigator from './src/navigator/MyNavigator';
import {DefaultTheme} from './src/utils/styles';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const MyDarkTheme = {
  ...MD3DarkTheme,
  ...DefaultTheme,
};

const CombinedDarkTheme = merge(DarkTheme, MyDarkTheme);

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
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received a message! =======', JSON.stringify(remoteMessage));
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
