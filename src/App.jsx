import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header';
import { Roster, Matchup, Players, Standings } from './pages';
import { BottomNavbar } from './components/Navbar';

import { usePlayer } from './features/players/hooks/usePlayer';

const API_URL = 'https://localhost:8000';
const CURRENT_SEASON = 2024;
export const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );
    // const [ ffData, setFfData ] = useState( null );
    // const [ roster, setRoster ] = useState( null );
    const [ selectedLeague, setSelectedLeague ] = useState( null );
    const {  ffData, getFfData, roster, getRoster } = usePlayer();
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${ API_URL }/auth` );
            if(!response.data.authenticated) {
                window.location.href = `${ API_URL }/login`;
            } else {
                setIsAuthenticated( response.data.authenticated );
            }
        } catch ( error ) {
            // setIsAuthenticated( false );
            window.location.href = `${ API_URL }/login`;
        } 
    };
    // const getFfData = async (season) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/api/v1/fantasy-football/${season}`);
    //         const data = { ...response.data };
    
    //         const guid = data.fantasy_content.users.user.guid;
    //         delete data.fantasy_content.users.user.guid;
    
    //         const gameKey = data.fantasy_content.users.user.games.game.game_key;
    //         delete data.fantasy_content.users.user.games.game.game_key;
    
    //         const leagues = data.fantasy_content.users.user.games.game.leagues.league;
    //         delete data.fantasy_content.users.user.games.game.leagues;

    //         setFfData({
    //             data: data,
    //             guid,
    //             gameKey,
    //             leagues,
    //         });
    //     } catch (error) {
    //         console.error('Error fetching leagues', error);
    //         throw error;
    //     }
    // };
    // const getRoster = async () => {
    //     try {
    //         const tk = selectedLeague 
    //             ? selectedLeague.teams.team.team_key 
    //             : ffData.leagues[0].teams.team.team_key;
    //         const url = `${API_URL}/api/v1/fantasy-football/2024/rosters/${tk}`;
    //         const response = await axios.get(url);

    //         const data = {...response.data};
    //         setRoster({...response.data.fantasy_content.team})
    //         console.log(data,'dattaaa')
    //     } catch (error) {
    //         console.error('Error trying to get roster', error);
    //         throw error;
    //     }
    // }


    useEffect( () => {
        
        if( !isAuthenticated ) {
            checkAuthStatus();
        } else if( !ffData ) {
            getFfData(CURRENT_SEASON);
        } else if( !roster ) {
            const tk = selectedLeague 
                ? selectedLeague.teams.team.team_key 
                : ffData.leagues[0].teams.team.team_key;
            getRoster(tk, CURRENT_SEASON);
        } else {
            setIsLoading(false);
        }

    }, [ isAuthenticated, ffData, roster ] );


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

			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: 'auto' }}>
			
				<Header>
					<p style={{color: 'white'}}>Hello!</p>
				</Header>
				<Divider/>
				<Routes>
					<Route path="/" element={<Roster league={selectedLeague || ffData.leagues[0]}/>} />
                    <Route path="/matchup" element={<Matchup league={selectedLeague || ffData.leagues[0]}/>} />
                    <Route path="/players" element={<Players league={selectedLeague || ffData.leagues[0]}/>}/>
                    <Route path="/leagues/:leagueKey" element={<Standings league={selectedLeague || ffData.leagues[0]} />} />
				</Routes>
				
				<BottomNavbar leagues={ffData.leagues} league={selectedLeague || ffData.leagues[0]} setSelectedLeague={setSelectedLeague}/>
			</Box>
		</Router>
	);
};

