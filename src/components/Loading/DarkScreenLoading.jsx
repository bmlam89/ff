import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const DarkScreenLoading = ({isLoading}) => {
    return (
        <Backdrop
            sx={ theme => ( { color: '#fff', zIndex: theme.zIndex.drawer + 1 } ) }
            open={ isLoading }
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
