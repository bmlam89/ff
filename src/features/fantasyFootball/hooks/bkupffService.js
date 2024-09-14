import { useCallback, useState } from "react";
import { ffService } from "../services/ffService";

const createErrorMessage = (route, err, payload = {}) => [
    "**useFfService Hook Error**",
    "Frontend hook path: features/fantasyFootball/hooks/useFfService.js",
    `Error message: ${err.message}`,
    `Error stack: ${err.stack}`,
    `Backend route name: ${route}`,
    "Backend payload:",
    ...Object.entries(payload).map(([key, value]) => `  ${key}: ${value}`)
].join('\n');

export const useFfService = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fantasyContent, setFantasyContent] = useState(null);
    const [roster, setRoster] = useState(null);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [players, setPlayers] = useState([]);
    const [gamelogs, setGamelogs] = useState([]);

    const getFantasyContent = async (season = 2024) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ffService.getFantasyContent(season);
            setFantasyContent(response.data.fantasy_content);
        } catch (err) {
            const errMessage = createErrorMessage('getFantasyContent', err, { season });
            console.error(errMessage, err);
        } finally {
            setIsLoading(false);
        }
    };

    const getRoster = async (tk) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ffService.getRoster(tk);
            setRoster(data);
        } catch (err) {
            const errMessage = createErrorMessage('getRoster', err, { tk, season });
            console.error(errMessage, err);
            setError(errMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const getPlayers = useCallback(async (lk, start = players.length, count = 25) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ffService.getPlayers(lk, start, count);
            setPlayers(prevPlayers => [...prevPlayers, ...data]);
        } catch (err) {
            const errMessage = createErrorMessage('getPlayers', err, { lk, start, count });
            console.error(errMessage, err);
            setError(errMessage);
        } finally {
            setIsLoading(false);
        }
    }, [players.length]);

    const getGamelogs = async (pk, season = 2024) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ffService.getGamelogs(pk, season);
            setGamelogs(data);
        } catch (err) {
            const errMessage = createErrorMessage('getGamelogs', err, { pk, season });
            console.error(errMessage, err);
            setError(errMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error,fantasyContent, roster, selectedLeague, players, gamelogs,  
        getFantasyContent, getRoster, setSelectedLeague, getPlayers, getGamelogs };
};