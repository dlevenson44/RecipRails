import { createStore, action } from 'easy-peasy';

const store = createStore({
  links: {
    authenticated: ['Saved Recipes', 'Edit Profile', 'Logout'],
    constant: 'Home',
    unauthenticated: ['Login', 'Register']
  },
  session: {
    isAuthenticated: false,
    isLoading: false,
    isLoaded: true,
    loggedInUser: null,
    startLogin: action((state, payload) => {
      state.isLoading = true;
      state.isLoaded = false;
    })
  }
});

export default store;
