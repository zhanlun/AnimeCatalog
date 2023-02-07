import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import DrawerView from './DrawerView';
import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailScreen from '../screens/DetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: 'AnimeCatalog',
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.inverseSurface,
        // headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <DrawerView {...props} />}>
      <Drawer.Screen name="AppBottomStack" component={TabNavigator} />
      <Drawer.Screen
        name="Detail"
        component={DetailScreen}
        options={({navigation}) => ({
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 6, padding: 8}}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color={tintColor} />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

// const MyNavigator = () => {
//   const theme = useTheme();

//   return (
//     <Stack.Navigator
//       initialRouteName="HomeDrawer"
//       screenOptions={{
//         headerTitle: 'AnimeCatalog',
//         headerTitleAlign: 'center',
//         headerTintColor: theme.colors.inverseSurface,
//         presentation: 'transparentModal',
//         contentStyle: {backgroundColor: theme.colors.surface},
//       }}>
//       <Stack.Screen name="HomeDrawer" component={DrawerNavigator} />
//       <Stack.Screen name="Detail" component={Detail} />
//     </Stack.Navigator>
//   );
// };

function Detail({route, navigation}) {
  const {id} = route?.params ?? {};
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'white'}}>hello</Text>
      <Text style={{color: 'white'}}>{id}</Text>
    </View>
  );
}

export default DrawerNavigator;
