import axios from 'axios';
axios.defaults.withCredentials = true;

export const ffService = {
    getFantasyContent: (season) => axios.get(`/api/yahoo/fantasy-content/${season}`),
    
    getTeam: (fantasyContent, selectedLeague) => {
        const league = selectedLeague || fantasyContent.users.user.games.game.leagues.league[0];
        const key = league.teams.team.team_key;
        return axios.get(`/api/yahoo/teams/${key}`)
    },

    getPlayers: (lk, start, count) => axios.get(`/api/yahoo/leagues/${lk}/players?start=${start}&count=${count}`),

	getGamelogs: (pk, season) => axios.get(`/api/yahoo/players/${pk}/gamelogs/${season}`),
};
