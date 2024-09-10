import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress,  Typography, useTheme } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';


export const LeagueStandingsPage = ({league}) => {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        getStandings();
    }, [] );

    const theme = useTheme();
    console.log(theme,'themeee')
    if(isLoading) return <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box>
    return (
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'end', padding: 2}}>
            <Typography variant='h6' sx={{color: theme.palette.text.primary }}>Standings</Typography>
            <Button sx={{alignItmes: 'end'}}>View all <FiChevronRight/></Button>
        </Box>
    );
};
