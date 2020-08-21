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
    logout: thunk(async (actions, payload) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `token ${payload}`,
        'token': payload,
      };

      try {
        await axios.delete('/logout', { headers })
          .then(() => {
            Auth.deauthenticateToken();
            actions.removeUser();
          });
      } catch (e) {
        console.error(`Error Logging Out: ${e}`);
      }
    }),
    removeUser: action(state => {
      state.isAuthenticated = false;
      state.loggedInUser = null;
    }),
    register: thunk(async (actions, payload) => {
      actions.setLoad();
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
        actions.setLoad();
      }
    }),
    setUser: action((state, user) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.loggedInUser = user;
    }),
    setLoad: action((state) => {
      state.isLoading = !state.isLoading;
    })
  },
});

export default store;
