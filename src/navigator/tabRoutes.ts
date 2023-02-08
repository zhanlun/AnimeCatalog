import AnimeList from '../screens/AnimeList';

const routes = [
  {
    name: 'Complete',
    label: 'Complete',
    animeStatus: 'complete',
    component: AnimeList,
    icon: 'calendar-check',
  },
  {
    name: 'Airing',
    label: 'Airing',
    animeStatus: 'airing',
    component: AnimeList,
    icon: 'television-play',
  },
  {
    name: 'Upcoming',
    label: 'Upcoming',
    animeStatus: 'upcoming',
    component: AnimeList,
    icon: 'timer-sand',
  },
];

export default routes;
