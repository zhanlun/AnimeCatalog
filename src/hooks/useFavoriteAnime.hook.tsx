import {useAtom} from 'jotai/react';
import {favoritesAtom} from '../atoms/favorites';

const useFavoriteAnime = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const whetherIsFavorite = (id: string) => {
    return !!favorites[id];
  };

  const addFavorite = (id: string, title: string) => {
    setFavorites(prev => ({...prev, [id]: {title}}));
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => ({...prev, [id]: null}));
  };

  return {
    whetherIsFavorite,
    addFavorite,
    removeFavorite,
  };
};

export default useFavoriteAnime;
