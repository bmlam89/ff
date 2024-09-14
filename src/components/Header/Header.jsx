import React from 'react';
import Box from '@mui/material/Box';

export const Header = ( { children } ) => {
    return (
        <Box 
            id='components-Header-HomepageHeader' 
            sx={{
                width: '100%',
                height: 56,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            { children }
        </Box>
    );
};
