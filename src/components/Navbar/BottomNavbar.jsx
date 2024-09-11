import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Badge, BottomNavigationAction, Box, Button, ClickAwayListener, Grow, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { HiOutlineTrophy, HiTrophy } from 'react-icons/hi2';
import { IoNewspaperOutline, IoNewspaper } from 'react-icons/io5';
import { PiRanking, PiRankingFill } from "react-icons/pi";
import { PiFootballHelmet, PiFootballHelmetFill } from "react-icons/pi";
import { RiRedditLine, RiRedditFill } from "react-icons/ri";

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.mixins.toolbar.minHeight || 56,
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
    zIndex: theme.zIndex?.appBar - 1 || 1099,
}));

const navButtons = [
    { name: 'Leagues', OutlinedIcon: HiOutlineTrophy, FilledIcon: HiTrophy },
    { name: 'Matchups', OutlinedIcon: HiOutlineUsers, FilledIcon: HiUsers, page: '/matchups' },
    { name: 'My Matchup', OutlinedIcon: PiFootballHelmet, FilledIcon: PiFootballHelmetFill, page: '/my-matchup' },
    { name: 'Standings', OutlinedIcon: PiRanking, FilledIcon: PiRankingFill, page: '/standings' },
    { name: 'Scores & News', OutlinedIcon: RiRedditLine, FilledIcon: RiRedditFill, page: '/news' },
];

export const BottomNavbar = ({leagues, setSelectedLeagueIdx, selectedLeagueIdx}) => {
    const [selectedIdx, setSelectedIdx] = useState(2);

    const handleClose = () => {
        if(selectedIdx !== 0) {
            setSelectedIdx(null);
        }
        
    };

    const updateSelectedLeague = (idx) => {
        setSelectedLeagueIdx(idx);
        setSelectedIdx(null);
    }

    const navigate = useNavigate();
    const handleNavigation = (idx) => {
        if( idx === selectedIdx && idx === 0 ) setSelectedIdx( null ) 
        else setSelectedIdx( idx );

        const props = { state: { league: leagues[selectedLeagueIdx] } }
        if(idx === 1) {
            navigate('/matchups', props);
        } else if(idx === 2) {
            navigate('/my-matchup', props);
        } else if( idx === 3) {
            navigate('/standings', props);
        } else {
            navigate('/news', props);
        }

    };
        
    

    return (
        <>
            {selectedIdx === 0 && (
                <ClickAwayListener onClickAway={handleClose}>
                    <Grow in={selectedIdx === 0} style={{ transformOrigin: '0 100%' }}>
                        <StyledBox>
                            {leagues.map((league, idx) => (
                                <Button key={idx} onClick={() => updateSelectedLeague(idx)}>
                                    <Typography variant='p' sx={{ color: 'white', fontSize: 18 }}>
                                        {league.name}
                                    </Typography>
                                </Button>
                            ))}
                        </StyledBox>
                    </Grow>
                </ClickAwayListener>
            )}
            <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {navButtons.map((button, idx) => (
                        <IconButton
                            key={`navbar-${idx}`}
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                padding: 0,
                                '&.Mui-disabled': {
                                    color: 'inherit',
                                    opacity: 1,
                                },
                            }}
                            color='inherit'
                            onClick={() => handleNavigation(idx)}
                            disabled={selectedIdx === idx}
                        >
                            {selectedIdx === idx ? <button.FilledIcon /> : <button.OutlinedIcon />}
                            <Typography fontSize={12}>{button.name}</Typography>
                        </IconButton>
                    ))}
                </Toolbar>
            </AppBar>
        </>
    );
};