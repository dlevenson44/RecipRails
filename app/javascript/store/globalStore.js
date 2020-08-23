import { createStore, thunk, action } from 'easy-peasy';
import links from './linksStore';
import user from './userStore';

const store = createStore({
  links,
  user,
});

export default store;
