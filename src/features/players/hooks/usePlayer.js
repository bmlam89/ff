import { useEffect, useState, useCallback } from "react";
import { playerService } from "../services/playerService";


export const usePlayer = () => {
    const [players, setPlayers] = useState([]);
	const [gamelogs, setGamelogs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);


    const getPlayers = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const start = players.length;
            const newPlayers = await playerService.getTopPlayers(start);
            setPlayers(prevPlayers => [...prevPlayers, ...newPlayers]);
        } catch (err) {
			console.error('Error fetching top players:', err);
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    }, []);

	const getPlayerGamelogs = useCallback(async (pk, season = 2023) => {
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

    useEffect(() => {
        getPlayers();
    }, []);

    return {
        players,
		getPlayers,
		gamelogs,
		getPlayerGamelogs,
        isFetching,
        error    
	};
};