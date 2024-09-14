import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Box, Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { BottomNavbar, DarkScreenLoading, Header } from './components';
import { Login, Roster, Matchup, Players, Standings } from './pages';
import { useAuth, useFfService } from './hooks';

export const App = () => {
    const authService = useAuth();
    const ffService = useFfService()
    
    useEffect(() => {   
        if(!authService.hasYahooAuth) authService.getYahooAuthStatus();
        else ffService.getFantasyContent();
    }, [authService.hasYahooAuth]);

    if( authService.isLoading ) return <DarkScreenLoading isLoading={authService.isLoading}/>;
    
	return (
		<Router>
			<CssBaseline/>

			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: 'auto' }}>
                { authService.hasYahooAuth && <>
                    <Header>
                        <p style={{color: 'white'}}>Hello!</p>
                    </Header> 
                    <Divider/>
                </> }
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
				
				{ authService.hasYahooAuth && <BottomNavbar /> }
			</Box>
		</Router>
	);
};
