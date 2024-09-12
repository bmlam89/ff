import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Backdrop, Box, Button, Grow, IconButton, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";
import { HiOutlineTrophy, HiTrophy } from 'react-icons/hi2';
import { TbVs } from "react-icons/tb";
import { RiUserSearchLine, RiUserSearchFill } from "react-icons/ri";

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

const navOptions = [
    { name: 'Roster', OutlinedIcon: HiOutlineUserGroup, FilledIcon: HiUserGroup },
    { name: 'Matchup', OutlinedIcon: TbVs, FilledIcon: TbVs },
    { name: 'Players', OutlinedIcon: RiUserSearchLine, FilledIcon: RiUserSearchFill },
    { name: 'Leagues', OutlinedIcon: HiOutlineTrophy, FilledIcon: HiTrophy },
];

export const BottomNavbar = ({leagues, setSelectedLeague}) => {
    const [selectedNavOption, setSelectedNavOption] = useState(navOptions[0]);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const updateSelectedLeague = (league) => {
        setSelectedNavOption(navOptions[3])
        setSelectedLeague(league);
        navigate(`/leagues/${league.league_key}`);
        setIsOpen(false); 
    };

    const handleNavigation = (navOption) => {
        if(navOption.name === 'Leagues') {
            setIsOpen(!isOpen);
        } else{
            setSelectedNavOption(navOption);
            if(navOption.name === 'Roster') {
                navigate('/');
            } else if(navOption.name === 'Matchup') {
                navigate('/matchup');
            } else if(navOption.name === 'Players') {
                navigate('/players');
            } 
        }
    };

    useEffect(() => {
        const path = location.pathname;
        if( path === '/') setSelectedNavOption(navOptions[0]);
        else if ( path === '/matchup' ) setSelectedNavOption(navOptions[1]);
        else if ( path === '/players' ) setSelectedNavOption(navOptions[2]);
        else setSelectedNavOption(navOptions[3]);
    }, []);
    return (
        <>
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isOpen}
                onClick={() => setIsOpen(false)}
            >
            {isOpen && (
                <Grow in={isOpen} style={{ transformOrigin: '0 100%' }}>
                    <StyledBox>
                        {leagues.map((league, lgIdx) => (
                            <Button key={lgIdx} onClick={() => updateSelectedLeague(league)}>
                                <Typography variant='p' sx={{ color: 'white', fontSize: 18 }}>
                                    {league.name}
                                </Typography>
                            </Button>
                        ))}
                    </StyledBox>
                </Grow>
            )}
            </Backdrop>
            <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {navOptions.map((option, nIdx) => (
                        <IconButton
                            key={`navbar-${nIdx}`}
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
                            onClick={() => handleNavigation(option)}
                        >
                            {(selectedNavOption.name === option.name && !isOpen) || (isOpen && option.name === 'Leagues') 
                                ? <option.FilledIcon /> 
                                : <option.OutlinedIcon/>
                            }
                            <Typography fontSize={12}>{option.name}</Typography>
                        </IconButton>
                    ))}
                </Toolbar>
            </AppBar>
        </>
    );
};