import React from 'react';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {Alert} from 'react-native';

function DrawerView({ navigation }) {
  const theme = useTheme();

  return (
    <Drawer.Section title="My Favorites" showDivider={false}>
      <Drawer.Item label="First Item" onPress={() => {}} />
      <Drawer.Item
        label="Second Item long long isekai name asdfsf "
        active
        onPress={() => navigation.navigate('Detail')}
      />
    </Drawer.Section>
  );
}

export default DrawerView;
