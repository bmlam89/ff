import React from 'react';
import { Box, Typography } from '@mui/material';

const PlayerCard = ({ player }) => {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 1.5,
            borderBottom: '1px solid #e0e0e0',
            '&:hover': {
                backgroundColor: '#f0f0f0'
            }
        }}>
            <Box sx={{display: 'flex', gap: 1}}>
                <Box sx={{
                    display: 'flex', 
                    borderRadius: '50%', 
                    width: 40, 
                    height: 40, 
                    alignSelf: 'center',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: '#4847DF',
                    color: '#FFFFFF'
                }}>
                    <Typography fontSize={12}>{player.selected_position.position}</Typography>
                </Box>
                <img src={player.image_url} alt={player.name.full} />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography>{player.name.first[0]}. {player.name.last}</Typography>
                    <Typography sx={{fontSize: '12px'}}>{player.editorial_team_abbr} - {player.primary_position}</Typography>

                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
    
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography>{player?.player_points.total}</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default PlayerCard;