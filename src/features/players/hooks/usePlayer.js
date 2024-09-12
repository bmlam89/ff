import { useState, useCallback } from "react";
import { playerService } from "../services/playerService";

export const usePlayer = () => {
    const [ffData, setFfData] = useState(null);
    const [roster, setRoster] = useState(null);
    const [players, setPlayers] = useState([]);
	const [gamelogs, setGamelogs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    
    const getFfData = useCallback( async (season) => {
        setIsFetching(true);
        setError(null);
        try {
            const data = await playerService.getFfData(season);
            setFfData(data);
        } catch (err) {
            console.error('Error trying to getFfData within usePlayer hook in features/players/hooks/usePlayer.js', err);
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    }, []);

    const getRoster = useCallback( async (tk, season) => {
        setIsFetching(true);
        setError(null);
        try {
            const roster = await playerService.getRoster(tk, season);
            setRoster(roster);
        } catch (err) {
            console.error('Error trying to getRoster within usePlayer hook in features/players/hooks/usePlayer.js', err);
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    }, []);

    const getPlayers = useCallback(async (league) => {
        setIsFetching(true);
        setError(null);
        try {
            const start = players.length;
            const newPlayers = await playerService.getTopPlayers(league, start);
            setPlayers(prevPlayers => [...prevPlayers, ...newPlayers]);
        } catch (err) {
			console.error('Error fetching top players:', err);
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    }, []);

	const getPlayerGamelogs = useCallback(async (pk, season) => {
		setIsFetching(true);
		setError(null);
		try {
			const gamelogs = await playerService.getPlayerGamelogs(pk, season);
			setGamelogs(gamelogs);
		} catch (err) {
			console.error('Error fetching player gamelogs:', err);
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
	}, []);


    return {
        ffData,
        getFfData,
        roster,
        getRoster,
        players,
		getPlayers,
		gamelogs,
		getPlayerGamelogs,
        isFetching,
        error    
	};
};