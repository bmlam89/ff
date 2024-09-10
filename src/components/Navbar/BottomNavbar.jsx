import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Button, Grow, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AiOutlineUserSwitch } from 'react-icons/ai';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { IoNewspaperOutline } from 'react-icons/io5';
import { TbScoreboard } from 'react-icons/tb';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.mixins.toolbar.minHeight || 56, // Adjust based on AppBar height
    left: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'darkGray',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'start',
    color: theme.palette.getContrastText?.(theme.palette.primary.main) || '#000000',
    padding: theme.spacing?.(2),
    zIndex: theme.zIndex?.appBar - 1 || 1099, // Just below AppBar
}));

export const BottomNavbar = ({leagues, setSelectedLeagueIdx}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    const handleNavigation = (league, idx) => {
        setSelectedLeagueIdx(idx);
        navigate(`/league?league_key=${league.league_key}`);
        setIsOpen(!isOpen);
    }

	return (
        <>
            <Grow in={isOpen} style={{ transformOrigin: '0 100%' }}>
                <StyledBox>
                    { leagues.map((league, idx) => <Button key={idx} onClick={() => handleNavigation(league, idx)}>
                            <Typography variant='p' sx={{color: 'white', size: 18}}>
                                {league.name}
                            </Typography>
                        </Button>                            
                    )}                    
                </StyledBox>
            </Grow>
			<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Stack py={1}>
                        <IconButton sx={{padding: 0}} color='inherit' onClick={handleOpen}><HiOutlineTrophy/></IconButton>
                        <Typography fontSize={12}>Leagues</Typography>
                    </Stack>
                    <Stack py={1}>
					    <IconButton color='inherit'><AiOutlineUserSwitch/></IconButton>
                        <Typography fontSize={12}>Trade Analyzer</Typography>
                    </Stack>
                    <Stack py={1}>
                        <IconButton color='inherit'><IoNewspaperOutline /></IconButton>
                        <Typography fontSize={12}>News</Typography>
                    </Stack>
                    <Stack py={1}>
                        <IconButton color='inherit'><TbScoreboard /></IconButton>
                        <Typography fontSize={12}>Score</Typography>
                    </Stack>
				</Toolbar>
			</AppBar>
          
		</>
	);
}
