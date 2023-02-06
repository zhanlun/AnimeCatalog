import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import routes from './tabRoutes';

type Props = {
  focused: boolean;
  color: string;
  size: number;
  route: any;
};

const iconMap = routes.reduce<{[k: string]: string}>(
  (prev, curr) => ({
    ...prev,
    [curr.name]: curr.icon,
  }),
  {},
);

const TabBarIcon = ({color, route}: Props) => {
  let iconName = iconMap[route.name];

  return <Icon name={iconName} size={18} color={color} />;
};

export default TabBarIcon;
