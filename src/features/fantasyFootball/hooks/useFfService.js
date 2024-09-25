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
    isUpdating: false,
    isShowingMatchups: false,
    error: null,
    season: '2024',
    guid: null,
    gameId: null,
    gameCode: null,
    leagues: [],
    selectedLeague: null,
    selectedTeam: null,
    selectedRosterWeek: null,
    selectedMatchup: null,
    selectedMatchupWeek: null,
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
                selectedRosterWeek: response.data.fantasy_content.users.user.games.game.leagues.league[0].current_week,
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

    setTeamPoints: async (week = null) => {
        const { selectedLeague, selectedTeam } = get();
        week = week ? week : selectedLeague.current_week;
        try {
            const response = await ffService.getTeamPoints(selectedTeam, week);
            const data = response.data.fantasy_content.team;
            set({selectedTeam: {...selectedTeam, ...data}});
        } catch (err) {
            const errMessage = createErrorMessage('setTeamPoints', err, {selectedTeam, week});
            console.error(errMessage, err); 
        }
    },

    setTeamRoster: async (week = null) => {
        const { selectedLeague, selectedTeam } = get();
        week = week ? week : selectedLeague.current_week;
        try {
            const response = await ffService.getRoster(selectedTeam, week);
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

    setTeamStats: async (week = null) => {
        const { selectedLeague, selectedTeam } = get();
        week = week ? week : selectedLeague.current_week;
        try {
            const response = await ffService.getPlayerStats(selectedLeague, selectedTeam.roster, week);
            set({selectedTeam: {
                ...selectedTeam,
                roster: selectedTeam.roster.map(p => ({
                    ...p,
                    ...response.data.fantasy_content.league.players.player.find(p2 => p2.player_key === p.player_key) 
                }))
            }})
        } catch (err) {
            const errMessage = createErrorMessage('getPlayerStats', err);
            console.error(errMessage, err);
        }
    },

    setLeagueMatchups: async (week = null) => {
        const { selectedLeague } = get();
        week = week ? week : selectedLeague.current_week;
        try {
            const response = await ffService.getLeagueMatchups(selectedLeague, week);
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
    
    setTeamMatchups: async (week = null) => {
        const { selectedLeague, selectedTeam } = get();
        week = week ? String(week) : selectedLeague.current_week;
        try {
            const response = await ffService.getTeamMatchups(selectedTeam, week);
            set({selectedTeam: {
                    ...selectedTeam,
                    matchups: response.data.fantasy_content.team.matchups.matchup,
                },
                selectedMatchup: response.data.fantasy_content.team.matchups.matchup.find(m => m.week === week),
                selectedMatchupWeek: response.data.fantasy_content.team.matchups.matchup.find(m => m.week === week).week,
            });
        } catch (err) {
            const errMessage = createErrorMessage('setTeamMatchup', err);
            console.error(errMessage, err);
        }
    },

    setMatchupRosters: async (teams = null, week = null) => {
        const { selectedMatchup } = get();
        teams = teams ? teams : selectedMatchup.teams.team;
        week = week ? week : selectedMatchup.week;
        const rosters = [];
        try {
            for(let i = 0; i < teams.length; i++) {
                const response = await ffService.getRoster(teams[i], week);
                rosters.push(response.data.fantasy_content.team.roster.players.player);
                set({selectedMatchup: {
                        ...selectedMatchup, 
                        teams: {
                            team:[
                                {...selectedMatchup.teams.team[0], roster: rosters[0]},
                                {...selectedMatchup.teams.team[1], roster: rosters[1]},
                            ]
                        }
                    }
                })
            }
        } catch (err) {
            const errMessage = createErrorMessage('setMatchupRosters', err);
            console.error(errMessage, err);
        }
    },

    setMatchupStats: async (team1 = null, team2 = null, week = null) => {
        const { selectedLeague, selectedMatchup } = get();
        week = week ? week : selectedLeague.current_week;
        try {
            const response1 = await ffService.getPlayerStats(selectedLeague, selectedMatchup.teams.team[0].roster, week);
            const response2 = await ffService.getPlayerStats(selectedLeague, selectedMatchup.teams.team[1].roster, week);
    
            const updateRoster = (roster, response) => {
                return roster.map(p => ({
                    ...p,
                    ...response.data.fantasy_content.league.players.player.find(p2 => p2.player_key === p.player_key)
                }));
            };
    
            const updatedTeam1Roster = updateRoster(selectedMatchup.teams.team[0].roster, response1);
            const updatedTeam2Roster = updateRoster(selectedMatchup.teams.team[1].roster, response2);
    
            set({
                selectedMatchup: {
                    ...selectedMatchup,
                    teams: {
                        ...selectedMatchup.teams,
                        team: [
                            {
                                ...selectedMatchup.teams.team[0],
                                roster: updatedTeam1Roster
                            },
                            {
                                ...selectedMatchup.teams.team[1],
                                roster: updatedTeam2Roster
                            }
                        ]
                    }
                }
            });
        } catch (err) {
            const errMessage = createErrorMessage('getPlayerStats', err);
            console.error(errMessage, err);
        }
    },

    setSelectedRosterWeek: (week) => set({selectedRosterWeek: week}),
    setSelectedMatchupWeek: (week) => set({selectedMatchupWeek: week}),
    setIsShowingMatchups: (bool) => set({isShowingMatchups: bool}),
    
    setInitialAppData: async () => {
        set({isLoading: true});
        try {
            await get().setLeagues();
            await get().setTeams();
            await get().setTeamPoints();
            await get().setTeamRoster();
            await get().setTeamStats();
            await get().setLeagueMatchups();
            await get().setTeamMatchups();
            await get().setMatchupRosters();
            await get().setMatchupStats();
        } catch (error) {
            console.error('Error in setInitialAppData:', error);
        } finally {
            set({isLoading: false})
        }
    },
    
    updateRosterPageWeek: async (week) => {
        set({isLoading: true});
        try {
            await get().setTeamRoster(week);
            await get().setTeamStats(week);
            await get().setTeamPoints(week);
            await get().setSelectedRosterWeek(week);
        } catch (error) {
            console.error('Error in updateRosterPageWeek:', error);
        } finally {
            set({isLoading: false});
        }
    },

    updateMatchupPageWeek: async (week) => {
        set({isLoading: true});
        try {
            await get().setLeagueMatchups(week);
            await get().setTeamMatchups(week);
            await get().setMatchupRosters(null, week);
            await get().setMatchupStats(null, null, week);
            await get().setSelectedMatchupWeek(week);
        } catch (error) {
            console.error('Error in updateMatchupPageWeek:', error);
        } finally {
            set({isLoading: false});
        }
    },

    updateMatchups: async (week) => {
        set({isUpdating: true});
        try {
            await get().setLeagueMatchups(week);
        } catch (error) {
            console.error('Error in updateMatchups:', error);
        } finally {
            set({isUpdating: false});
        }
    },

    getMatchupRosters: async (matchup, week) => {
        const rosters = [];
        const teams = matchup.teams.team;
        try {
            for(let i = 0; i < teams.length; i++) {
                const response = await ffService.getRoster(teams[i], week);
                rosters.push(response.data.fantasy_content.team.roster.players.player);
            }
            const updatedMatchup = {
                ...matchup,
                teams: {
                    team: [
                        {...matchup.teams.team[0], roster: rosters[0]},
                        {...matchup.teams.team[1], roster: rosters[1]},
                    ]
                }
            };
            console.log(updatedMatchup,'updated matchup for roster inside of userFfService');
            return updatedMatchup;
        } catch (err) {
            const errMessage = createErrorMessage('getMatchupRosters', err, {matchup, week});
            console.error(errMessage, err);
        }
    },

    getMatchupStats: async (matchup, week) => {
        const { selectedLeague } = get();
        try {
            const response1 = await ffService.getPlayerStats(selectedLeague, matchup.teams.team[0].roster, week);
            const response2 = await ffService.getPlayerStats(selectedLeague, matchup.teams.team[1].roster, week);
    
            const updateRoster = (roster, response) => {
                return roster.map(p => ({
                    ...p,
                    ...response.data.fantasy_content.league.players.player.find(p2 => p2.player_key === p.player_key)
                }));
            };
    
            const updatedTeam1Roster = updateRoster(matchup.teams.team[0].roster, response1);
            const updatedTeam2Roster = updateRoster(matchup.teams.team[1].roster, response2);
            const updatedMatchup = {
                ...matchup,
                teams: {
                    ...matchup.teams,
                    team: [
                        {
                            ...matchup.teams.team[0],
                            roster: updatedTeam1Roster
                        },
                        {
                            ...matchup.teams.team[1],
                            roster: updatedTeam2Roster
                        }
                    ]
                }
            };

            return updatedMatchup
           
        } catch (err) {
            const errMessage = createErrorMessage('getPlayerStats', err);
            console.error(errMessage, err);
        }
    },

}));