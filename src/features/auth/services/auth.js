import axios from 'axios';
axios.defaults.withCredentials = true;

export const authService = {
    getYahooAuthStatus: () => axios.get('/auth/yahoo/status'),
};
