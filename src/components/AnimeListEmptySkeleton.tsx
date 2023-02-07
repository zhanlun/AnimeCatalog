import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {};

const AnimeListEmptySkeleton = (props: Props) => {
  const theme = useTheme();
  const cardSkeletonProps = {
    style: {
      alignSelf: 'stretch',
      marginVertical: 10,
    },
    height: 260,
  };

  return (
    <SkeletonPlaceholder borderRadius={10} highlightColor={theme.colors.backdrop} backgroundColor={theme.colors.backdrop}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default AnimeListEmptySkeleton;

const styles = StyleSheet.create({});
