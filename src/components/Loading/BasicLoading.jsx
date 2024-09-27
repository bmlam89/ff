import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const BasicLoading = () => {
    return <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box>
}
