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

    getLeagueMatchups: (league, weeks) => {
        const key = league.league_key;
        const query = weeks.join(',');
        return axios.get(`/api/yahoo/leagues/${key}/matchups?weeks=${query}`);   
    },

    getTeamMatchups: (team, weeks) => {
        const key = team.team_key;
        const query = weeks.join(',');
        return axios.get(`/api/yahoo/teams/${key}/matchups?weeks=${query}`);
    },

    getPlayerStats: (league, team, roster, week) => {
        const requestBody = { players: roster.map(player => player.player_key), week };
        try {
            return axios.post(
                `/api/yahoo/leagues/${league.league_key}/teams/${team.team_key}/players/stats`, 
                requestBody, 
                { headers: { 'Content-Type': 'application/json' } } 
            );
        } catch (error) {
            console.error('Error fetching player points:', error);
            throw error;
        }
    },

    


};
