import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);
const content = {}; // anything JSON serializable
export const favoritesAtom = atomWithStorage<{
  [key: string]: {title: string} | null;
}>('favorites', content, storage as any);
