import { createStore, thunk, action } from 'easy-peasy';
import favorite from './favoriteStore';
import links from './linksStore';
import search from './searchStore';
import user from './userStore';

const store = createStore({
  favorite,
  links,
  search,
  user,
});

export default store;
