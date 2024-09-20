import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Box, Typography } from '@mui/material';

import { useFfService } from '../../hooks';

export const TopNavbar = () => {
    const [header, setHeader] = useState(null);
    const ffService = useFfService();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/') setHeader('Roster');
        else if(location.pathname === '/matchup') setHeader('Matchup');
        else if(location.pathname === '/players') setHeader('Players');
        else setHeader('Standings');
    }, [location.pathname]);
    
    return (
        <AppBar position='fixed' color='primary' sx={{ top: 0, bottom: 'auto' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant='h6'>{header}</Typography>
                <Typography variant='p'>{ffService?.selectedLeague?.name}</Typography>
            </Box>
        </AppBar>
    );
};
