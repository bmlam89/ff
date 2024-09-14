import axios from 'axios';
axios.defaults.withCredentials = true;

export const authService = {
    getYahooAuthStatus: async () => {
        const response = await axios.get('/auth/yahoo/status');
        return response;
    },
};
