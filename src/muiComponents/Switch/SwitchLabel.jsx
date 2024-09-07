import React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

export const SwitchLabel = ( { children } ) => {
    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: 1,
                gap: 0,
            }}
        >
            <Switch defaultChecked color='default'/>
            <p>{ children }</p>
        </Box>
    );
};
