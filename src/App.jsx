import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Divider, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header';
import { IosSwitch } from './components/Switch/IosSwitch';
import { StickyHeadTable } from './components/Table';
import { BottomAppBar } from './components/AppBar';

const API_URL = 'https://localhost:8000';
axios.defaults.withCredentials = true;

export const App = () => {

    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );
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
            getPlayers();
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
		<>
            <CssBaseline/>
          
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
            <StickyHeadTable players={ players } getPlayers={ getPlayers }/>
            <BottomAppBar/>
        </>
	);
};
