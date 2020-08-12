import { createStore, action } from 'easy-peasy';
import axios from 'axios';
import Auth from '../components/Authentication/authHelpers';

const store = createStore({
  links: {
    authenticated: ['Saved Recipes', 'Edit Profile', 'Logout'],
    constant: 'Home',
    unauthenticated: ['Login', 'Register']
  },
  session: {
    isAuthenticated: false,
    isLoading: false,
    loggedInUser: null,
    login: action((state, payload) => {
      state.isLoading = true;
      const headers = {
        'Content-Type': 'application/json',
      };
    
      delete payload.confirmPassword;

      try {
        axios.post('/register', payload, { headers })
          .then(res => {
            Auth.authenticateToken(res.data.token);
            state.user = res.data;
            state.isAuthenticated = true;
          });
      } catch (e) {
        console.error(`Error Creating User: ${e}`);
      }
    }),
  },
});

export default store;
