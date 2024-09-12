import axios from 'axios';
const API_URL = 'https://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

export const playerService = {
    getFfData: async (season) => {
        const response = await axios.get(`${API_URL}/fantasy-football/${season}`);
        const data = { ...response.data };

        const guid = data.fantasy_content.users.user.guid;
        delete data.fantasy_content.users.user.guid;

        const gameKey = data.fantasy_content.users.user.games.game.game_key;
        delete data.fantasy_content.users.user.games.game.game_key;

        const leagues = data.fantasy_content.users.user.games.game.leagues.league;
        delete data.fantasy_content.users.user.games.game.leagues;

        return {
            data: data,
            guid,
            gameKey,
            leagues,
        };
    },
    getRoster: async (tk, season) => {
        const url = `${API_URL}/fantasy-football/${season}/rosters/${tk}`;
        const response = await axios.get(url);
        return response.data.fantasy_content.team;
    },
    getTopPlayers: async (league, start = 0) => {
		const response = await axios.get(`${API_URL}/players?start=${start}&lk=${league.league_key}`);
		return response.data.players;
	},

	getPlayerGamelogs: async (pk, season) => {
		const response = await axios.get(`${API_URL}/gamelogs?pk=${pk}&season=${season}`);
		return response.data.gamelogs;
	},
};
