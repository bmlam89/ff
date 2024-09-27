import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Typography, useTheme } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';

import { BasicLoading } from '../components';

import { useFfService } from '../hooks';

export const Standings = () => {
    const ffService = useFfService();
    const theme = useTheme();
    
    const [teams, setTeams] = useState([]);
    const setData = async () => {
        await ffService.setTeamPoints();
        await ffService.setTeamRoster();
        await ffService.setTeamStats();
    };

    useEffect(() => {
        console.log('check')
        if(ffService.selectedLeague && ffService.selectedLeague.teams) setTeams(ffService.selectedLeague.teams);
        if(teams) setData();
    }, [ffService.selectedLeague]);
   
    if(!teams.length) return <BasicLoading/>
   
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'end'}}>
                <Typography variant='h6' sx={{color: theme.palette.text.primary }}>Standings</Typography>
                <Button sx={{alignItmes: 'end'}}>View all <FiChevronRight/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {teams.map(team => <Box key={team.team_key} sx={{display: 'flex', gap: 2}}>
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
