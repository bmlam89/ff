import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
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
        if(ffService.selectedLeague && ffService.selectedLeague.teams) setTeams(ffService.selectedLeague.teams);
        if(teams) setData();
    }, [ffService.selectedLeague]);
   
    if(!teams.length) return <BasicLoading/>
   
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: 2, paddingX: 2.5}}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'end'}}>
                <Typography variant='h6' sx={{color: theme.palette.text.primary }}>Standings</Typography>
                <Button sx={{alignItmes: 'end'}}>View all <FiChevronRight/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Box sx={{display: 'flex', gap: 2, fontSize: 14}}>
                    <Box sx={{width: 66}}>Rank</Box>
                    <Box sx={{flexGrow: 1, maxWidth: 209}}>Team</Box>
                    <Box>W-L-T</Box>
                    <Box sx={{}}>PF</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: 2}}>
                    { teams.map( team => (
                        <Box key={team.team_key} sx={{display: 'flex', gap: 2, fontSize: 12, alignItems: 'center'}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Box sx={{width: 34, display: 'flex', justifyContent: 'center'}}>{team.team_standings.rank}</Box>
                                <img
                                    src={team.team_logos.team_logo.url}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                    }}
                                />
                            </Box>

                            <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center', maxWidth: 209}}>
                                <Typography textTransform="none" fontSize={12}>{team.name}</Typography>
                            </Box>
                            
                            <p>{team.team_standings.outcome_totals.wins}
                                -{team.team_standings.outcome_totals.losses}
                                -{team.team_standings.outcome_totals.ties}
                            </p>
                            <p>{team.team_standings.points_for}</p>
                        </Box>
                    ) ) }
                </Box>
            </Box>
        </Box>
    );
};
