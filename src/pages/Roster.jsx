import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useFfService } from '../hooks';

export const Roster = () => {
    const ffService = useFfService();
    useEffect(() => {
        if(ffService.fantasyContent && !ffService.team) ffService.getTeam();
        else console.log(ffService.team);
    },[ffService.fantasyContent, ffService.team])

    if(ffService.isLoading) return <Box><CircularProgress/></Box>
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            {ffService.team?.players.player.map(p => <Box>
                <p>Name: {p.name.full}</p>
                <img src={p.image_url} style={{width: 30, height: 30, borderRadius: 100}}/>
            </Box>)}
        </Box>
    );
};
