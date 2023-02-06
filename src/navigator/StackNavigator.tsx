import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import Complete from '../screens/Complete';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="AnimeList"
      screenOptions={{
        headerShown: false,
        headerTitle: 'AnimeCatalog',
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.inverseSurface,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen name="AnimeList" component={Complete} />
      <Stack.Screen name="CompleteDetail" component={Detail} />
    </Stack.Navigator>
  );
};

function Detail() {
  return (
    <View>
      <Text style={{ color: 'white'}}>hello ce</Text>
    </View>
  );
}

export default StackNavigator;
