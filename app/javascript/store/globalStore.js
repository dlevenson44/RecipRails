import { createStore, thunk } from 'easy-peasy';
import axios from 'axios';
import Auth from '../components/Authentication/authHelpers';

const store = createStore({
  links: {
    authenticated: ['Saved Recipes', 'Edit Profile', 'Logout'],
    constant: 'Home',
    unauthenticated: ['Login', 'Register']
  },
  user: {
    isAuthenticated: false,
    isLoading: false,
    loggedInUser: null,
    register: thunk(async (state, payload) => {
      state.isLoading = true;
      const headers = {
        'Content-Type': 'application/json',
      };

      delete payload.confirmPassword;
      const user = { user: payload };

      try {
        await axios.post('/register', user, { headers })
          .then(res => {
            Auth.authenticateToken(res.data.token);
            state.user = res.data;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
      } catch (e) {
        console.error(`Error Creating User: ${e}`);
        state.isLoading = false;
      }
    }),
  },
});

export default store;
