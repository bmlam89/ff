import React from 'react';
import { Box, useTheme } from '@mui/material';

import { PlayerList } from '../features/players/components/PlayerList';

import { usePlayer } from '../features/players/hooks/usePlayer';

export const Home = () => {
    const { players, isFetching, error } = usePlayer();
    const theme = useTheme();

    if(isFetching) return <Box>Fetching players...</Box>
	if(error) return <Box>Error: {error}</Box>;
	console.log(players,'playersss')
    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', overscrollBehavior: 'contain', paddingBottom: theme.mixins.toolbar.minHeight/8 }}>
            <PlayerList players={players}/>
        </Box>
	);
};
