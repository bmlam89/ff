import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export const Matchups = ({league}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [leagueMatchups, setLeagueMatchups] = useState(null);
    const [standings, setStandings] = useState([]);
    const getStandings = async () => {
        try {
            const response = await axios.get(`https://localhost:8000/api/v1/standings?lk=${league.league_key}`);
            console.log(response.data.standings,'standigns');
            setStandings(response.data.standings);
        } catch (error) {
            console.error('Error trying to get standings.', error);
            throw error;
        }

    };
    const getMatchups = async () => {
        try {
            const url = `https://localhost:8000/api/v1/matchups?lk=${league.league_key}`;
            const resp = await axios.get(url);
            const scoreboard = resp.data.league.scoreboard.matchups;
            setLeagueMatchups(resp.data.league);
            console.log(scoreboard,'scoreboardddd')
        } catch (error) {
            console.error('Error trying to get all matchups', error);
            throw error;
        } 
       
    }; 

    


    if(isLoading) {
        return <Box sx={{display:'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}><CircularProgress/></Box>
    }
    return (
        <Stack gap={3} paddingX={3} paddingTop={2}>

            <Typography fontSize={14}>Week {leagueMatchups.scoreboard.week}</Typography>
            <Stack gap={4} sx={{height: '100vh', overflow: 'auto', overscrollBehavior: 'contain', paddingBottom: 0}}>
                {leagueMatchups.scoreboard.matchups.matchup.map((match, idx) => 
                    <Box key={idx} sx={{width: '100%', display: 'flex'}}>
                        <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', gap: 4}}>
                            
                            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    {(standings.find(t => t.team_key === match.teams.team[0].team_key)).team_standings.rank}
                                    <img src={match.teams.team[0].team_logos.team_logo.url} style={{width:40, height: 40, borderRadius: 100}}/>
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography fontSize={13} fontWeight={600}>{match.teams.team[0].name} ({(Number(match.teams.team[0].win_probability)*100).toFixed()}%)</Typography>
                                        <Box sx={{display: 'flex'}}>
                                            <Typography fontSize={12}>{match.teams.team[0].managers.manager.nickname}</Typography>
                                            <Typography fontSize={12}>1-0-0</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', width: 'fit'}}>
                                    <Typography fontSize={12}>------</Typography>
                                    <Typography fontSize={12}>{match.teams.team[0].team_projected_points.total}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    {(standings.find(t => t.team_key === match.teams.team[1].team_key)).team_standings.rank}
                                    <img src={match.teams.team[1].team_logos.team_logo.url} style={{width:40, height: 40, borderRadius: 100}}/>
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography fontSize={13} fontWeight={600}>{match.teams.team[1].name} ({(Number(match.teams.team[1].win_probability)*100).toFixed()}%)</Typography>
                                        <Box sx={{display: 'flex'}}>
                                            <Typography fontSize={12}>{match.teams.team[1].managers.manager.nickname} </Typography>
                                            <Typography fontSize={12}>1-0-0</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', width: 'fit'}}>
                                    <Typography fontSize={12}>------</Typography>
                                    <Typography fontSize={12}>{match.teams.team[1].team_projected_points.total}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    
                    </Box>
                )}
            </Stack>
        </Stack>
    )
};
