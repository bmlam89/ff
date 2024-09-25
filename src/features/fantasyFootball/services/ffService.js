import axios from 'axios';
axios.defaults.withCredentials = true;

export const ffService = {
    test: (editorial_team_key) => axios.get(`/api/yahoo/test/${editorial_team_key}`),

    getLeagues: (season) => axios.get(`/api/yahoo/user/leagues/${season}`),
    
    getLeagueStandings: (league) => {
        const key = league.league_key;
        return axios.get(`/api/yahoo/leagues/${key}/teams/standings`);
    },
    
    getTeamPoints: (team, week) => {
        const key = team.team_key;
        return axios.get(`/api/yahoo/teams/${key}/points?week=${week}`);
    },
    
    getRoster: (team, week) => { 
        const key = team.team_key;
        return axios.get(`/api/yahoo/teams/${key}/roster?week=${week}`);
    },

    getLeagueMatchups: (league, week) => {
        const key = league.league_key;
        return axios.get(`/api/yahoo/leagues/${key}/matchups?week=${week}`);   
    },

    getTeamMatchups: (team, week) => {
        const key = team.team_key;
        return axios.get(`/api/yahoo/teams/${key}/matchups?week=${week}`);
    },

    getPlayerStats: (league, roster, week) => {
        const requestBody = { players: roster.map(player => player.player_key), week: week };
        try {
            return axios.post(
                `/api/yahoo/leagues/${league.league_key}/players/stats`, 
                requestBody, 
                { headers: { 'Content-Type': 'application/json' } } 
            );
        } catch (error) {
            console.error('Error fetching player points:', error);
            throw error;
        }
    },

};
