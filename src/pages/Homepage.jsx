import React from 'react';
import { Box, useTheme } from '@mui/material';
import { TopPlayersList } from '../features/players/components/TopPlayersList';

export const Homepage = () => {
	const theme = useTheme();

	return (
		<Box sx={{ flexGrow: 1, overflow: 'auto', overscrollBehavior: 'contain', paddingBottom: theme.mixins.toolbar.minHeight/8 }}>
			<TopPlayersList/>
		</Box>
	);
};
