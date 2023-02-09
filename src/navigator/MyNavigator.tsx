import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from 'react-native-paper';
import EntryPoint from '../screens/EntryPoint';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="EntryPoint" screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="EntryPoint" component={EntryPoint} />
      <Stack.Screen name="DrawerEntry" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MyNavigator;
