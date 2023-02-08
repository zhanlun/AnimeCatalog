import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Image, StyleSheet, View, Text as RNText} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Divider, Text, useTheme} from 'react-native-paper';
import Loading from '../components/Loading';
import {fetchAnimeById} from '../services/anime';

type Props = {};

const DetailScreen = ({route, navigation}: Props) => {
  const {id} = route?.params ?? {};
  const theme = useTheme();

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
      <View
        style={{alignItems: 'center', flexGrow: 1, justifyContent: 'center'}}>
        <Text variant="bodySmall">
          An error occurred. Please try again later.
        </Text>
      </View>
    );
  }

  if (isLoading || isFetching) {
    return (
      <View
        style={{alignItems: 'center', flexGrow: 1, justifyContent: 'center'}}>
        <Loading />
      </View>
    );
  }

  return (
    <View
      style={{
        flexGrow: 1,
        height: '100%',
        backgroundColor: theme.colors.surface,
      }}>
      {imageUrl && (
        <Image source={{uri: imageUrl}} style={{width: '100%', height: 200}} />
      )}
      {/* <Card.Title
        title={`${animeData.title} (${animeData.year})`}
        subtitle={`Score: ${animeData.score}/10`}
      /> */}
      <View style={{paddingVertical: 20, paddingHorizontal: 15}}>
        <Text variant="headlineSmall">
          {animeData.title} ({animeData.year})
        </Text>
        <Text variant="labelLarge" style={{ marginTop: 10 }}>
          {animeData.score ? `Score: ${animeData.score}/10` : 'Score: -'}
        </Text>
        <View style={{height: 10}} />
        <Text variant="labelMedium">Rating: {animeData.rating}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.backdrop,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <Text variant="titleMedium">Synopsis</Text>
        <View style={{height: 10}} />
        <Text variant="bodyMedium">{animeData?.synopsis || '-'}</Text>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          backgroundColor: theme.colors.backdrop,
        }}>
        <Button
          icon="heart"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Mark As Favorite
        </Button>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
