import {useAtomValue} from 'jotai/react';
import React, {useMemo} from 'react';
import {Drawer} from 'react-native-paper';
import {favoritesAtom} from '../atoms/favorites';
import {selectedAnimeIdAtom} from '../atoms/selectedAnime';

function DrawerView({navigation}) {
  const favoriteIdMap = useAtomValue(favoritesAtom);
  const favoriteAnimeList = useMemo(() => {
    return Object.entries(favoriteIdMap)
      .filter(entry => !!entry[1])
      .map(entry => ({
        id: entry[0],
        title: entry[1]?.title ?? '',
      }));
  }, [favoriteIdMap]);
  const selectedAnimeId = useAtomValue(selectedAnimeIdAtom);

  return (
    <Drawer.Section title="My Favorites" showDivider={false}>
      {favoriteAnimeList.map(item => (
        <Drawer.Item
          key={item.id}
          label={item.title}
          active={selectedAnimeId === item.id}
          onPress={() => navigation.navigate('Detail', {id: item.id})}
        />
      ))}
    </Drawer.Section>
  );
}

export default DrawerView;
