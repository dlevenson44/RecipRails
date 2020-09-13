import { createStore, thunk, action } from 'easy-peasy';
import links from './linksStore';
import search from './searchStore';
import user from './userStore';

const store = createStore({
  links,
  search,
  user,
});

export default store;
