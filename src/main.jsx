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
            main: '#4847DF',
            dark: '#3837B2', // This is approximately 20% darker than the main color
            light: '#6A69E5', // You might want to add this for consistency
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