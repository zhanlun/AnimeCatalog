import {useQuery} from '@tanstack/react-query';
import {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
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

const AnimeList = ({route, navigation}: Props) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const flatListRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm: string = useDebounce<string>(searchQuery, 300);

  const animeStatus = route.params.animeStatus;
  const {isLoading, isError, error, data, isFetching, isPreviousData} =
    useQuery({
      queryKey: ['anime', animeStatus, debouncedSearchTerm, page],
      queryFn: () => fetchAnimeList(page, animeStatus, debouncedSearchTerm),
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
        style={styles.verticalMargin}
        onPress={() => handleClickCard(item.mal_id)}>
        {imageUrl && (
          <Card.Cover source={{uri: imageUrl}} style={styles.cardImage} />
        )}
        <Card.Title
          title={`${item.title} ${item.year ? `(${item.year})` : ''}`}
          subtitle={item.score ? `Score: ${item.score}/10` : 'Score: -'}
        />
        <Card.Content>
          <Text variant="bodySmall">
            {item.rating ? `Rating: ${item.rating}/10` : 'Rating: -'}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  useEffect(() => {
    if (!isEmpty(animeList)) {
      flatListRef?.current?.scrollToIndex({index: 0, animated: false});
    }
  }, [page, animeList]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  if (isError) {
    return (
      <View style={styles.errorViewContainer}>
        <Text variant="bodySmall">
          An error occurred. Please try again later.
        </Text>
      </View>
    );
  }

  const isFetchingOrLoading = isLoading || isFetching;

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      {isFetchingOrLoading && (
        <ScrollView style={styles.skeletonContainer}>
          <AnimeListEmptySkeleton />
        </ScrollView>
      )}
      {!isFetchingOrLoading && isEmpty(animeList) && (
        <View style={styles.noAnimeContainer}>
          <Text variant="bodySmall">
            No anime found. Please try another search term.
          </Text>
        </View>
      )}
      {!isFetchingOrLoading && !isEmpty(animeList) && (
        <FlatList
          ref={flatListRef}
          style={styles.flatListContainer}
          data={animeList}
          renderItem={renderItem}
        />
      )}
      <SegmentedButtons
        style={styles.buttonsContainer}
        value=""
        onValueChange={() => {}}
        buttons={[
          {
            value: 'prev',
            label: 'Previous',
            disabled: page === 1 || isFetchingOrLoading,
            onPress: () => setPage(prev => Math.max(prev - 1, 1)),
          },
          {
            value: 'next',
            label: 'Next',
            disabled: !hasNextPage || isFetchingOrLoading,
            onPress: () => setPage(prev => Math.min(prev + 1, lastPage)),
          },
        ]}
      />
    </View>
  );
};

export default AnimeList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
  },
  cardImage: {borderBottomStartRadius: 0, borderBottomEndRadius: 0},
  verticalMargin: {marginVertical: 10},
  errorViewContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  skeletonContainer: {paddingVertical: 15, paddingHorizontal: 15, flexGrow: 1},
  noAnimeContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  flatListContainer: {paddingVertical: 15, paddingHorizontal: 15},
  buttonsContainer: {marginVertical: 15, paddingHorizontal: 15},
});
