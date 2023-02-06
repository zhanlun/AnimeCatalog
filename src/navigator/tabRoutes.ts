import Airing from '../screens/Airing';
import Complete from '../screens/Complete';
import Upcoming from '../screens/Upcoming';

const routes = [
  {
    name: 'Complete',
    label: 'Complete',
    component: Complete,
    icon: 'calendar-check',
  },
  {
    name: 'Airing',
    label: 'Airing',
    component: Airing,
    icon: 'television-play',
  },
  {
    name: 'Upcoming',
    label: 'Upcoming',
    component: Upcoming,
    icon: 'timer-sand',
  },
];

export default routes;
