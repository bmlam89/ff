import React, { useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { MySelect } from '../../../components/Select';
import { MyTabs } from '../../../components/Tabs';
import { usePlayer } from '../hooks/usePlayer';

export const PlayerGamelogs = ({player, season}) => {
    console.log(player,'player')
	const { gamelogs, getPlayerGamelogs, isFetching, error } = usePlayer();

	useEffect(() => {
		getPlayerGamelogs(player.pk, season || 2023);
	  }, []);

	if(isFetching) return <Box>Fetching gamelogs...</Box>
	if(error) return <Box>Error: {error}</Box>;

	return (
		<Box sx={{display: 'flex-col', width: '88vw'}}>
            <Box sx={{display: 'flex', gap: 1, paddingY: 2, alignItems: 'center'}}>
                <img src={player.image} style={{maxHeight:60}}/>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5}}>
                    <p>{player.name}</p>
                    <Box sx={{display:'flex', gap:1}}>
                        <p>{player.team}</p>
                        <p>{player.pos}</p>
                    </Box>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{width: '100%'}}>
               <MyTabs/>
            </Box>
            <Divider/>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                <MySelect/>
            </Box>
            <Divider/>
            <Box sx={{width: '100%'}}>
                {gamelogs.map((gl,idx) => <div key={idx}>{gl.tgts}</div>)}
            </Box>
        </Box>
	);
};
