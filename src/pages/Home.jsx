import React from 'react';
import { Box, useTheme } from '@mui/material';

import { PlayerList } from '../features/fantasyFootball/components';

import { useFfService } from '../hooks';

export const Home = () => {
    const { isFetching, error, players } = useFfService();
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
