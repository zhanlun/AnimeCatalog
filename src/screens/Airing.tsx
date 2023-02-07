import {useQuery} from '@tanstack/react-query';
import {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Card,
  Searchbar,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';
import AnimeListEmptySkeleton from '../components/AnimeListEmptySkeleton';
import useDebounce from '../hooks/useDebounce.hook';
import {fetchAnimeList} from '../services/anime';

type Props = {
  navigation: any;
};

const Airing = ({navigation}: Props) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm: string = useDebounce<string>(searchQuery, 300);

  const {isLoading, isError, error, data, isFetching, isPreviousData} =
    useQuery({
      queryKey: ['anime', 'airing', debouncedSearchTerm, page],
      queryFn: () => fetchAnimeList(page, 'airing', debouncedSearchTerm),
      keepPreviousData: true,
    });

  const animeList = data?.data;
  const hasNextPage = data?.pagination?.has_next_page;
  const lastPage = data?.pagination?.last_visible_page;
  const onChangeSearch = q => setSearchQuery(q);

  const handleClickCard = id => {
    navigation.navigate('Detail', {
      id,
    });
  };

  const renderItem = ({item}) => {
    const imageUrl = item?.images?.jpg?.large_image_url;
    // const heartColor = !item.__selected ? theme.colors.inversePrimary : 'white';
    return (
      <Card
        style={{marginVertical: 10}}
        onPress={() => handleClickCard(item.mal_id)}>
        {imageUrl && (
          <Card.Cover
            source={{uri: imageUrl}}
            style={{borderBottomStartRadius: 0, borderBottomEndRadius: 0}}
          />
        )}
        <Card.Title
          title={`${item.title} (${item.year})`}
          subtitle={`Score: ${item.score}/10`}
        />
        <Card.Content>
          <Text variant="bodySmall">Rating: {item.rating}</Text>
        </Card.Content>
      </Card>
    );
  };

  useEffect(() => {
    if (!isEmpty(animeList)) {
      flatListRef?.current?.scrollToIndex({index: 0, animated: false});
    }
  }, [page]);

  if (isError) {
    return (
      <View
        style={{alignItems: 'center', flexGrow: 1, justifyContent: 'center'}}>
        <Text variant="bodySmall">
          An error occurred. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      {isLoading && (
        <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
          <AnimeListEmptySkeleton />
        </View>
      )}
      {!isLoading && isEmpty(animeList) && (
        <View
          style={{
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <Text variant="bodySmall">
            No anime found. Please try another search term.
          </Text>
        </View>
      )}
      {!isLoading && !isEmpty(animeList) && (
        <FlatList
          ref={flatListRef}
          style={{paddingVertical: 15, paddingHorizontal: 15}}
          data={animeList}
          renderItem={renderItem}
          ListFooterComponentStyle={{
            marginBottom: 20,
          }}
          ListFooterComponent={
            <SegmentedButtons
              style={{marginVertical: 15}}
              value=""
              onValueChange={() => {}}
              buttons={[
                {
                  value: 'prev',
                  label: 'Previous',
                  disabled: page === 1,
                  onPress: () => setPage(prev => Math.max(prev - 1, 1)),
                },
                {
                  value: 'next',
                  label: 'Next',
                  disabled: !hasNextPage,
                  onPress: () => setPage(prev => Math.min(prev + 1, lastPage)),
                },
              ]}
            />
          }
        />
      )}
    </View>
  );
};

export default Airing;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
