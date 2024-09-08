import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { usePlayer } from '../hooks/usePlayer';

export const PlayerGamelogs = ({player, season}) => {
	const { gamelogs, getPlayerGamelogs, isFetching, error } = usePlayer();

	useEffect(() => {
		getPlayerGamelogs(player.player_key, season || 2023);
	  }, [getPlayerGamelogs, player.player_key, season]);

	if(isFetching) return <Box>Fetching gamelogs...</Box>
	if(error) return <Box>Error: {error}</Box>;

	return (
		<Box sx={{width:388, height:400, backgroundColor: 'green'}}/>
	);
};
