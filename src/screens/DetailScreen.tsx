import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';
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

  if (isLoading) {
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
        marginTop: -10,
        flexGrow: 1,
        backgroundColor: theme.colors.surface,
      }}>
      {imageUrl && (
        <Card.Cover
          source={{uri: imageUrl}}
          style={{borderBottomStartRadius: 0, borderBottomEndRadius: 0}}
        />
      )}
      <Card.Title
        title={`${animeData.title} (${animeData.year})`}
        subtitle={`Score: ${animeData.score}/10`}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Card.Content style={{ flexGrow: 1, backgroundColor: theme.colors.backdrop, paddingVertical: 10 }}>
          <Text variant="bodySmall">Rating: {animeData.rating}</Text>
          <View style={{height: 20}} />
          <Text variant="bodyMedium" style={{ flexGrow: 1 }}>{animeData?.synopsis}</Text>
          <View style={{height: 300}} />
        </Card.Content>
      </ScrollView>
      
      {/* <View style={{ marginHorizontal: 30 }}> */}
      <Button>Mark as Favorite</Button>
      {/* </View> */}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
