import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { IosSwitch } from '../components/Switch'

import { PlayerList } from '../features/players/components/PlayerList';

import { usePlayer } from '../features/players/hooks/usePlayer';

export const Homepage = () => {
	const theme = useTheme();
    const { players, isFetching, error } = usePlayer();

    if(isFetching) return <Box>Fetching players...</Box>
	if(error) return <Box>Error: {error}</Box>;
	
    return (
        <>
            <Box sx={{ flexGrow: 1, overflow: 'auto', overscrollBehavior: 'contain', paddingBottom: theme.mixins.toolbar.minHeight/8 }}>
                <PlayerList players={players}/>
            </Box>
        </>
	);
};
