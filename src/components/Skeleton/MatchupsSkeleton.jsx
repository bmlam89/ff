import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material';

import { useFfService } from '../../hooks';

export const MatchupsSkeleton = () => {
    const ffService = useFfService();
    return (

        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
            <Stack gap={3} paddingX={3} paddingTop={2} sx={{ flexGrow: 1, overflow: 'auto', paddingX: 2.5 }}>
                <Stack gap={4} sx={{ paddingBottom: 2 }}>
                    <Box sx={{display: 'flex', paddingY: 0.5}}>
                        <Skeleton sx={{width: '129px', height: '18px', borderRadius: '20px'}} />
                    </Box>
                    
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                    <Skeleton variant="rectangular" sx={{width: '100%', height:'154px', borderRadius: '20px' }}/>
                </Stack>
            </Stack>
        </Box>
    );
};
