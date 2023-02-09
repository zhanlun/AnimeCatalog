import React from 'react';
import {useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AnimeListEmptySkeleton = () => {
  const theme = useTheme();
  const cardSkeletonProps = {
    style: {
      marginVertical: 10,
      alignSelf: 'stretch',
    },
    height: 260,
  };

  return (
    <SkeletonPlaceholder
      borderRadius={10}
      highlightColor={theme.colors.surfaceVariant}
      backgroundColor={theme.colors.backdrop}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
        <SkeletonPlaceholder.Item {...cardSkeletonProps} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default AnimeListEmptySkeleton;
