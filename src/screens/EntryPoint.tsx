import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text, useTheme} from 'react-native-paper';

const EntryPoint = ({navigation}) => {
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('DrawerEntry');
    }, 500);
  }, [navigation]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="titleLarge" style={styles.text}>
        My Anime Catalog
      </Text>
    </View>
  );
};

export default EntryPoint;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
