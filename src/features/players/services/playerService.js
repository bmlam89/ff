import axios from 'axios';
const API_URL = 'https://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

export const playerService = {
	getTopPlayers: async (start = 0) => {
		const response = await axios.get(`${API_URL}/players?start=${start}`);
		return response.data.players;
	},

	getPlayerGamelogs: async (pk, season) => {
		const response = await axios.get(`${API_URL}/gamelogs?pk=${pk}&season=${season}`);
		return response.data.gamelogs;
	}
};
