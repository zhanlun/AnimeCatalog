import {useAtom} from 'jotai/react';
import {favoritesAtom} from '../atoms/favorites';
import {useEffect} from 'react';

const useFavoriteAnime = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

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
