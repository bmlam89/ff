import { create } from 'zustand';
import { ffService } from "../services/ffService";

const createErrorMessage = (route, err, payload = {}) => [
    "**FF Service Store Error**",
    "Store path: features/fantasyFootball/store/ffStore.js",
    `Error message: ${err.message}`,
    `Error stack: ${err.stack}`,
    `Backend route name: ${route}`,
    "Backend payload:",
    ...Object.entries(payload).map(([key, value]) => `  ${key}: ${value}`)
].join('\n');

export const useFfService = create((set, get) => ({
    isLoading: false,
    error: null,
    fantasyContent: null,
    team: null,
    selectedLeague: null,
    players: [],
    gamelogs: [],

    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    getFantasyContent: async (season = 2024) => {
        set({ isLoading: true, error: null });
        try {
            const response = await ffService.getFantasyContent(season);
            set({ fantasyContent: response.data.fantasy_content });
        } catch (err) {
            const errMessage = createErrorMessage('getFantasyContent', err, { season });
            console.error(errMessage, err);
            set({ error: errMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    setSelectedLeague: (league) => set({ selectedLeague: league }),

    getTeam: async () => {
        set({ isLoading: true, error: null });
        try {
            const { fantasyContent, selectedLeague } = get();
            const response = await ffService.getTeam(fantasyContent, selectedLeague);
            set({ team: response.data.fantasy_content.team });
        } catch (err) {
            const errMessage = createErrorMessage('getRoster', err);
            console.error(errMessage, err);
            set({ error: errMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    getPlayers: async (lk, start = 0, count = 25) => {
        set({ isLoading: true, error: null });
        try {
            const response = await ffService.getPlayers(lk, start, count);
            set(state => ( { players: [...state.players, ...response.data.player] } ) );
        } catch (err) {
            const errMessage = createErrorMessage('getPlayers', err, { lk, start, count });
            console.error(errMessage, err);
            set({ error: errMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    getGamelogs: async (pk, season = 2024) => {
        set({ isLoading: true, error: null });
        try {
            const data = await ffService.getGamelogs(pk, season);
            set({ gamelogs: data });
        } catch (err) {
            const errMessage = createErrorMessage('getGamelogs', err, { pk, season });
            console.error(errMessage, err);
            set({ error: errMessage });
        } finally {
            set({ isLoading: false });
        }
    },
}));