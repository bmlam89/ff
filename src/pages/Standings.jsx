import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography, useTheme } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';


export const Standings = () => {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const theme = useTheme();
    const { league } = location.state;
    console.log(theme,'themeee', league,'leagueeee')
    const getStandings = async () => {
        try {
            const response = await axios.get(`https://localhost:8000/api/v1/standings?lk=${league.league_key}`);
            console.log(response.data.standings,'standigns')
            setStandings(response.data.standings);
        } catch (error) {
            console.error('Error trying to get standings.', error);
            throw error;
        } finally {
            setIsLoading( false );
        }

    };
    const getGame = async ( req, res ) => {
        try {
            const url = `https://localhost:8000/api/v1/game/nfl?tk=${league.league_key}`;
            const resp = await axios.get(url);
        } catch (error) {
            console.error('Error trying to get yahoo nfl game resource:', error);
            throw error;
        }
    };
    useEffect(() => {
        getStandings();
        getGame();
    }, [] );

    if(isLoading) return <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box>
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'end'}}>
                <Typography variant='h6' sx={{color: theme.palette.text.primary }}>Standings</Typography>
                <Button sx={{alignItmes: 'end'}}>View all <FiChevronRight/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {standings.map((team, idx) => <Box key={idx} sx={{display: 'flex', gap: 2}}>
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
