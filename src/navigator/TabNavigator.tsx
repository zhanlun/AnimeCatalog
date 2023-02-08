import React from 'react';
import {useTheme} from 'react-native-paper';
import TabBarIcon from './TabBarIcon';
import routes from './tabRoutes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Airing"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: tProps => <TabBarIcon route={route} {...tProps} />,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inverseSurface,
        tabBarItemStyle: {padding: 4},
        headerShown: false,
      })}>
      {routes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          initialParams={{
            animeStatus: route.animeStatus,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
