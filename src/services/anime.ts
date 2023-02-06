import axios from 'axios';
import {API_URL} from '../utils/API';

export const fetchAnimeList = async (
  page: number,
  status: 'airing' | 'complete' | 'upcoming',
) => {
  return axios
    .get(`${API_URL}/anime?page=${page}&status=${status}&limit=10`)
    .then(res => res.data);
};
