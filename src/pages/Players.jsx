import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';

import { PlayerList } from '../features/fantasyFootball/components';

import { useFfService } from '../hooks';

export const Players = ({league}) => {
    const { players, getPlayers, isFetching, error } = useFfService();
    const theme = useTheme();

    if(isFetching) return <Box>Fetching players...</Box>
	if(error) return <Box>Error: {error}</Box>;
    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', overscrollBehavior: 'contain', paddingBottom: theme.mixins.toolbar.minHeight/8 }}>
            <PlayerList players={players}/>
        </Box>
	);
};
