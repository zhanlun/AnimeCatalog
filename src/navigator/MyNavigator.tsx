import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailScreen from '../screens/DetailScreen';
import DrawerView from './DrawerView';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

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
          // eslint-disable-next-line react/no-unstable-nested-components
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

export default DrawerNavigator;
