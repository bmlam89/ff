import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Divider, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header';
import { IosSwitch } from './components/Switch/IosSwitch';
import { Homepage } from './pages/Homepage';
import { BottomNavbar } from './components/Navbar';

const API_URL = 'https://localhost:8000';

export const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( true );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ players, setPlayers ] = useState( [] );

    const getPlayers = async ( start ) => {
        const res = await axios.get(`${ API_URL }/api/v1/players?start=${ start || 0  }`);
        if( res.data?.players ) {
            setPlayers( [...res.data.players] );
        }
    };

    useEffect( () => {
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

        if( isLoading ) {
            checkAuthStatus();
        }

        else if( !isLoading && !isAuthenticated ) {
            window.location.href = `${ API_URL }/login`;
        } else if( !isLoading && isAuthenticated ) {
            // getPlayers();
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
				<Box sx={{
						display: 'flex',
						width: '100%',
						flexDirection: 'row-reverse',
					}}
				>
					<IosSwitch/>
				</Box>
				<Divider/>
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
				
				<BottomNavbar/>
			</Box>
		</Router>
	);
};
