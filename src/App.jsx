import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header';
import { Homepage } from './pages/Homepage';
import { BottomNavbar } from './components/Navbar';
import { Test } from './Test';

const API_URL = 'https://localhost:8000';

export const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( false );

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
    // useEffect( () => {
        

    //     if( isLoading ) {
    //         checkAuthStatus();
    //     } else if( !isLoading && !isAuthenticated ) {
    //         window.location.href = `${ API_URL }/login`;
    //     } 

    // }, [ isLoading, isAuthenticated ] );

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
					<Route path="/" element={<Test />} />
				</Routes>
				
				<BottomNavbar/>
			</Box>
		</Router>
	);
};
