import { createStore, thunk, action } from 'easy-peasy';
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
    register: thunk(async (actions, payload) => {
      actions.startLoad();
      const headers = {
        'Content-Type': 'application/json',
      };

      delete payload.confirmPassword;
      const user = { user: payload };

      try {
        await axios.post('/register', user, { headers })
          .then(res => {
            Auth.authenticateToken(res.data.token);
            actions.setUser(res.data);
          });
      } catch (e) {
        console.error(`Error Creating User: ${e}`);
        state.isLoading = false;
      }
    }),
    setUser: action((state, user) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.loggedInUser = user;
    }),
    startLoad: action((state) => {
      state.isLoading = true;
    })
  },
});

export default store;
