import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header';
import { Home, Matchups, MyMatchup, Standings, News } from './pages';
import { BottomNavbar } from './components/Navbar';


const API_URL = 'https://localhost:8000';

export const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ leagues, setLeagues] = useState([]);
    const [ selectedLeagueIdx, setSelectedLeagueIdx] = useState(0);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${ API_URL }/auth` );
            setIsAuthenticated( response.data.authenticated );
        } catch ( error ) {
            setIsAuthenticated( false );
        } finally {
            setIsLoading( false );
        }
    };

    const getLeagues = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/leagues`);
            setLeagues(response.data.leagues);
        } catch (error) {
            console.error('Error fetching leagues', error);
            throw error;
        }
    };
   
    useEffect( () => {
        

        if( isLoading ) {
            checkAuthStatus();
        } else if( !isLoading && !isAuthenticated ) {
            window.location.href = `${ API_URL }/login`;
        } else if ( !isLoading && isAuthenticated ) {
            getLeagues();
        }

    }, [ isLoading, isAuthenticated ] );


    if( isLoading ) {
        return (
            <div>
                <Backdrop
                    sx={ theme => ( { color: '#fff', zIndex: theme.zIndex.drawer + 1 } ) }
                    open={ isLoading }
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
    
	return (
		<Router>
			<CssBaseline/>

			<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			
				<Header>
					<p style={{color: 'white'}}>Hello!</p>
				</Header>
				<Divider/>
				<Routes>
					<Route path="/" element={<Home />} />
                    <Route path="/matchups" element={<Matchups league={leagues[selectedLeagueIdx]}/>} />
					<Route path="/my-matchup" element={<MyMatchup league={leagues[selectedLeagueIdx]}/>} />
                    <Route path="/standings" element={<Standings league={leagues[selectedLeagueIdx]}/>}/>
                    <Route path="/news" element={<News />} />
				</Routes>
				
				<BottomNavbar leagues={leagues} setSelectedLeagueIdx={setSelectedLeagueIdx} selectedLeagueIdx={selectedLeagueIdx}/>
			</Box>
		</Router>
	);
};

