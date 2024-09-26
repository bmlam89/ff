import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { TopNavbar, BottomNavbar, DarkScreenLoading } from './components';
import { Login, Roster, Matchup, Players, Standings } from './pages';
import { useAuth, useFfService } from './hooks';

export const App = () => {
    const authService = useAuth();
    const ffService = useFfService();
    authService.setIsLoading(true);
    useEffect(() => {
        if(authService.isLoading) authService.setYahooAuthStatus();
        else ffService.setInitialAppData();
    }, [authService.isLoading]);

    useEffect(() => {
        if(!ffService.isLoading) console.log(ffService,'ffService');
    }, [ffService.isLoading]);

    if (authService.isLoading) {
        return <DarkScreenLoading isLoading={authService.isLoading} />;
    }

    if (!authService.hasYahooAuth) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh',
            overflow: 'hidden'
        }}>
            {authService.hasYahooAuth && ffService.selectedLeague?.teams && <TopNavbar />}
            
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingY: '56px',
                }}
            >
                {ffService.isLoading ? (
                    <DarkScreenLoading isLoading={true} />
                ) : (
                    <Routes>
                        <Route path="/" element={<Roster />} />
                        <Route path="/matchup" element={<Matchup />} />
                        <Route path="/players" element={<Players />} />  
                        <Route path="/leagues/:key/standings" element={<Standings />} /> 
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                )}
            </Box>
            
            {authService.hasYahooAuth && ffService.selectedLeague?.teams && <BottomNavbar />}
        </Box>
    );
};