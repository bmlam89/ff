import { create } from 'zustand';
import { ffService } from "../services/ffService";

const createErrorMessage = (route, err, payload = {}) => [
    "**FF Service Store Error**",
    `Backend route name: ${route}`,
    `ERROR MESSAGE: ${err.message}`,
    `ERROR STACK: ${err.stack}`,
    "Backend payload:",
    ...Object.entries(payload).map(([key, value]) => `  ${key}: ${value}`),
    "Store path: features/fantasyFootball/store/ffStore.js",
].join('\n');

const initialState = {
    isLoading: true,
    error: null,
    season: '2024',
    guid: null,
    gameId: null,
    gameCode: null,
    leagues: [],
    selectedLeague: null,
    selectedTeam: null,
    selectedMatchup: null,
    standings: null,
    scores: [],
    teamMatchups: [],
    players: [],
    gamelogs: [],
};

export const useFfService = create((set, get) => ({
    ...initialState,
    test: async (editorial_team_key) => {
        const response = await ffService.test(editorial_team_key);
        return response;
    },

    setLeagues: async () => {
        const { season, selectedLeague } = get();
        try {
            const response = await ffService.getLeagues(season);
            set({
                guid: response.data.fantasy_content.users.user.guid,
                gameId: response.data.fantasy_content.users.user.games.game.game_id,
                gameCode: response.data.fantasy_content.users.user.games.game.code,
                leagues: response.data.fantasy_content.users.user.games.game.leagues.league,
                selectedLeague: selectedLeague ? selectedLeague : response.data.fantasy_content.users.user.games.game.leagues.league[0],
            });
        } catch (err) {
            const errMessage = createErrorMessage('setLeagues', err, { season });
            console.error(errMessage, err);
        }
    },

    setTeams: async () => {
        const { selectedLeague, selectedTeam } = get();
        try {
            const response = await ffService.getLeagueStandings(selectedLeague);
            set({selectedLeague: {
                    ...selectedLeague,
                    teams: response.data.fantasy_content.league.standings.teams.team
                },
                selectedTeam: selectedTeam 
                    ? selectedTeam 
                    : response.data.fantasy_content.league.standings.teams.team.find(t => t?.is_owned_by_current_login)
            });
        } catch (err) {
            const errMessage = createErrorMessage('setTeams', err, {selectedLeague});
            console.error(errMessage, err); 
        }
    },

    setTeamPoints: async (week=null) => {
        const { selectedLeague, selectedTeam } = get();
        const selectedWeek = week ? week : selectedLeague.current_week;
        try {
            const response = await ffService.getTeamPoints(selectedTeam, selectedWeek);
            const data = response.data.fantasy_content.team;
            set({selectedTeam: {...selectedTeam, ...data}});
        } catch (err) {
            const errMessage = createErrorMessage('setTeamPoints', err, {selectedTeam, selectedWeek});
            console.error(errMessage, err); 
        }
    },

    setRoster: async () => {
        const { selectedLeague, selectedTeam } = get();
        try {
            const response = await ffService.getRoster(selectedTeam, selectedLeague.current_week);
            set({selectedTeam: {
                    ...selectedTeam, 
                    roster: response.data.fantasy_content.team.roster.players.player
                },
            });
        } catch (err) {
            const errMessage = createErrorMessage('setRoster', err);
            console.error(errMessage, err);
        }
    },

    setLeagueMatchups: async (weeks = null) => {
        const { selectedLeague } = get();
        const selectedWeeks = weeks ? weeks : [ selectedLeague.current_week ];
        try {
            const response = await ffService.getLeagueMatchups(selectedLeague, selectedWeeks);
            set({
                selectedLeague: {
                    ...selectedLeague,
                    matchups: response.data.fantasy_content.league.scoreboard.matchups.matchup
                }
            });
        } catch (err) {
            const errMessage = createErrorMessage('setLeagueMatchups', err);
            console.error(errMessage, err);
        }
    },
    
    setTeamMatchups: async (weeks = null) => {
        const { selectedLeague, selectedTeam, selectedMatchup } = get();
        const selectedWeeks = weeks ? weeks : [ selectedLeague.current_week ];
        try {
            const response = await ffService.getTeamMatchups(selectedTeam, selectedWeeks);
            set({selectedTeam: {
                    ...selectedTeam,
                    matchups: response.data.fantasy_content.team.matchups.matchup,
                },
                selectedMatchup: selectedMatchup 
                    ? selectedMatchup
                    : response.data.fantasy_content.team.matchups.matchup.find(m => m.week === selectedLeague.current_week)
            });
        } catch (err) {
            const errMessage = createErrorMessage('setTeamMatchup', err);
            console.error(errMessage, err);
        }
    },

    setRosterPage: async () => {
        try {
            await get().setLeagues();
            await get().setTeams();
            await get().setTeamPoints();
            await get().setRoster();
            await get().setLeagueMatchups();
            await get().setTeamMatchups();
        } catch (error) {
            console.error('Error in fetchAllData:', error);
        } finally {
            set({isLoading: false})
        }
    },

    getMatchupRosters: async (teams, week) => {
        const rosters = [];
        try {
            for(let i = 0; i < teams.length; i++) {
                const response = await ffService.getRoster(teams[i], week);
                rosters.push(response.data.fantasy_content.team.roster.players.player);
            }
            return rosters;
        } catch (err) {
            const errMessage = createErrorMessage('getMatchupRosters', err);
            console.error(errMessage, err);
        }
    },

    setSelectedLeague: async (league) => {
        set({isLoading: true});
        set({selectedLeague: league});
        await get().setTeams();
        await get().setTeamPoints();
        await get().setRoster();
        await get().setLeagueMatchups();
        await get().setTeamMatchups();
        set({isLoading: false});

    },

    setPlayerStats: async () => {
        const { selectedLeague, selectedTeam } = get();
        try {
            const response = await ffService.getPlayerStats(selectedLeague, selectedTeam, selectedTeam.roster, selectedLeague.current_week);
            console.log(response.data,'responseeeeeee');
        } catch (err) {
            const errMessage = createErrorMessage('getPlayerPoints', err);
            console.error(errMessage, err);
        }
    },

}));