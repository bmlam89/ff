import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { TopNavbar, BottomNavbar, DarkScreenLoading } from './components';
import { Login, Roster, Matchup, Players, Standings } from './pages';
import { useAuth, useFfService } from './hooks';

export const App = () => {
    const authService = useAuth();
    const ffService = useFfService();
    
    useEffect(() => {   
        if(authService.isLoading) authService.setYahooAuthStatus();
        else if(authService.hasYahooAuth) ffService.setRosterPage();
        if(!ffService.isLoading) {
            console.log('hasYahooAuth:', authService.hasYahooAuth);
            console.log('leagues:', ffService.leagues);
            console.log('selectedLeague:', ffService.selectedLeague);
            console.log('teams:', ffService.selectedLeague.teams);
            console.log('selectedTeam:', ffService.selectedTeam);
            console.log('roster:', ffService.selectedTeam.roster);
            console.log('league matchups:', ffService.selectedLeague.matchups);
            console.log('team matchups:', ffService.selectedTeam.matchups);
            console.log('selected matchup:', ffService.selectedMatchup);
        }
    }, [authService.isLoading, authService.hasYahooAuth, ffService.isLoading]);

    if (authService.isLoading) return <DarkScreenLoading isLoading={authService.isLoading} />;
    
    return (
        <Router>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100vh',
                overflow: 'hidden'
            }}>
                {authService.hasYahooAuth && !ffService.isLoading && <TopNavbar />}
                
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
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route 
                            element={authService.hasYahooAuth ? <Outlet /> : <Navigate to='/login' />}
                        >
                            <Route path="/" element={<Roster />} />
                            <Route path="/matchup" element={<Matchup />} />
                            <Route path="/players" element={<Players />} />  
                            <Route path="/leagues/:leagueKey" element={<Standings />} /> 
                        </Route>
                    </Routes>
                </Box>
                
                {authService.hasYahooAuth && !ffService.isLoading && <BottomNavbar />}
            </Box>
        </Router>
    );
};