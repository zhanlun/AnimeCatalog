import {useQuery} from '@tanstack/react-query';
import {useSetAtom} from 'jotai';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, useTheme} from 'react-native-paper';
import {selectedAnimeIdAtom} from '../atoms/selectedAnime';
import Loading from '../components/Loading';
import useFavoriteAnime from '../hooks/useFavoriteAnime.hook';
import {fetchAnimeById} from '../services/anime';

type Props = {};

const DetailScreen = ({route, navigation}: Props) => {
  const {id} = route?.params ?? {};
  const theme = useTheme();
  const {whetherIsFavorite, addFavorite, removeFavorite} = useFavoriteAnime();
  const isFavorite = whetherIsFavorite(id);

  const setSelectedAnimeId = useSetAtom(selectedAnimeIdAtom);

  useEffect(() => {
    setSelectedAnimeId('' + id);
  }, [id, setSelectedAnimeId]);

  const {isLoading, isError, error, data, isFetching, isPreviousData} =
    useQuery({
      queryKey: ['anime', 'detail', id],
      queryFn: () => fetchAnimeById(id),
      keepPreviousData: true,
    });

  const animeData = data?.data;
  const imageUrl = animeData?.images?.jpg?.large_image_url;

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="bodySmall">
          An error occurred. Please try again later.
        </Text>
      </View>
    );
  }

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  return (
    <View
      style={[styles.mainContainer, {backgroundColor: theme.colors.surface}]}>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
      <View style={styles.headerContainer}>
        <Text variant="headlineSmall">
          {animeData.title} {animeData.year ? `(${animeData.year})` : ''}
        </Text>
        <Text variant="labelLarge" style={{marginTop: 10}}>
          {animeData.score ? `Score: ${animeData.score}/10` : 'Score: -'}
        </Text>
        <View style={{height: 10}} />
        <Text variant="labelMedium">Rating: {animeData.rating}</Text>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContentContainer,
          {backgroundColor: theme.colors.backdrop},
        ]}>
        <Text variant="titleMedium">Synopsis</Text>
        <View style={{height: 10}} />
        <Text variant="bodyMedium">{animeData?.synopsis || '-'}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {!isFavorite ? (
          <Button
            icon="heart"
            mode="contained"
            onPress={() => addFavorite(id, animeData.title)}>
            Mark As Favorite
          </Button>
        ) : (
          <Button
            icon="heart-off"
            mode="contained-tonal"
            onPress={() => removeFavorite(id)}>
            Remove From Favorites
          </Button>
        )}
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  errorContainer: {alignItems: 'center', flexGrow: 1, justifyContent: 'center'},
  loadingContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flexGrow: 1,
    height: '100%',
  },
  image: {width: '100%', height: 200},
  headerContainer: {paddingVertical: 20, paddingHorizontal: 15},
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
