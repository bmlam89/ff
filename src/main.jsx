import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; 
import { App } from './App'
import { ModalProvider } from './hooks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4847DF'
        },
    },
});

const root = createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <ModalProvider>
                <App />
            </ModalProvider>
        </Router>
    </ThemeProvider>
);