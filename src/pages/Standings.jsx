import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Typography, useTheme } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';

import { DarkScreenLoading } from '../components';

import { useFfService } from '../hooks';

export const Standings = () => {
 
    const ffService = useFfService();
    const theme = useTheme();
   
    // useEffect(() => {
    //     if(!ffService.selectedLeague && !ffService.isUpdating) {
    //         console.log('calling setInitialAppData from inside Standings page');
    //         ffService.setInitialAppData();
    //     } else {
    //         console.log(ffService.isUpdating);
    //         console.log(ffService);
    //     }
    // }, [ffService] );

    // if(ffService.isUpdating) return <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box>
   
    if(ffService.isUpdating || ffService.selectedLeague.teams.team) return <DarkScreenLoading isLoading={ffService.isUpdating}/>;
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'end'}}>
                <Typography variant='h6' sx={{color: theme.palette.text.primary }}>Standings</Typography>
                <Button sx={{alignItmes: 'end'}}>View all <FiChevronRight/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {ffService.selectedLeague.teams.map(team => <Box key={team.team_key} sx={{display: 'flex', gap: 2}}>
                        <p>{team.team_standings.rank}</p>
                        <Box p={1} alignItems='center' justifyContent='center'>

                            <img
                                src={team.team_logos.team_logo.url}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                }}
                            />
                        </Box>
                        <p>{team.name}</p>
                        <p>{team.team_standings.outcome_totals.wins}
                            -{team.team_standings.outcome_totals.losses}
                            -{team.team_standings.outcome_totals.ties}
                        </p>
                        <p>{team.team_standings.points_for}</p>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
