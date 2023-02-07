import axios from 'axios';
import {API_URL} from '../utils/API';

export const fetchAnimeList = async (
  page: number,
  status: 'airing' | 'complete' | 'upcoming',
  searchTerm: string,
) => {
  return axios
    .get(
      `${API_URL}/anime?page=${page}&status=${status}&limit=10&q=${searchTerm}`,
    )
    .then(res => res.data);
};

export const fetchAnimeById = async (id: string) => {
  return axios.get(`${API_URL}/anime/${id}`).then(res => res.data);
};
