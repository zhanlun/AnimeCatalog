import {useQuery} from '@tanstack/react-query';
import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';
import {fetchAnimeList} from '../services/anime';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};

const Airing = (props: Props) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);
  const {isLoading, isError, error, data, isFetching, isPreviousData} =
    useQuery({
      queryKey: ['anime', 'airing', page],
      queryFn: () => fetchAnimeList(page, 'airing'),
      keepPreviousData: true,
    });

  const animeList = data?.data;
  const hasNextPage = data?.pagination?.has_next_page;
  const lastPage = data?.pagination?.last_visible_page;

  const renderItem = ({item}) => {
    const imageUrl = item?.images?.jpg?.image_url;
    const heartColor = !item.__selected ? theme.colors.inversePrimary : "white"
    return (
      <Card style={{marginVertical: 10}}>
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
        <TouchableOpacity
          onPress={() => {}}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 8,
            borderTopRightRadius: 10,
            backgroundColor: '#88888888',
          }}>
          <Icon name="heart" size={30} color={heartColor} />
        </TouchableOpacity>
      </Card>
    );
  };

  useEffect(() => {
    if (animeList.length > 0) {
      flatListRef?.current?.scrollToIndex({index: 0});
    }
  }, [page]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
    </View>
  );
};

export default Airing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
