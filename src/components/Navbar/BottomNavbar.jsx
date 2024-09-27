import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Backdrop, Box, Button, Grow, IconButton, Toolbar, Typography, Divider, useTheme } from '@mui/material';
import { HiOutlineTrophy, HiTrophy, HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi2';
import { TbVs } from "react-icons/tb";
import { RiUserSearchLine, RiUserSearchFill } from "react-icons/ri";
import { styled } from '@mui/material/styles';

import { Matchups } from '../../pages';
import { useFfService, useModal } from '../../hooks';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.mixins.toolbar.minHeight || 56,
    left: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: '#4D5AF5',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'start',
    color: theme.palette.getContrastText?.(theme.palette.primary.main) || '#000000',
    padding: theme.spacing?.(2),
    zIndex: theme.zIndex?.appBar - 1 || 1099,
}));

const StyledIconButton = styled(IconButton)(({ theme, selected }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    flex: 1,
    height: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: selected ? '#F5F5F5' : '#FFFFFF',
    boxShadow: selected 
        ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.2), inset 1px 0 0 0 rgba(255, 255, 255, 0.2), inset -1px 0 0 0 rgba(0, 0, 0, 0.2), 0 0 10px 0 rgba(0, 0, 0, 0.1)'
        : 'none',
    zIndex: selected ? 1 : 'auto',
    '& .MuiSvgIcon-root': {
        fontSize: selected ? '1.3em' : '1.2em',
        transition: 'all 0.3s',
    },
    '& .MuiTypography-root': {
        fontWeight: selected ? 'bold' : 'normal',
        transition: 'all 0.3s',
    },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: '#D9D9D9',
    margin: 0,
    height: '100%',
}));

const navOptions = [
    { name: 'Roster', path: '/', OutlinedIcon: HiOutlineUserGroup, FilledIcon: HiUserGroup },
    { name: 'Matchup', path: '/mathcup', OutlinedIcon: TbVs, FilledIcon: TbVs },
    { name: 'Players', path: '/players', OutlinedIcon: RiUserSearchLine, FilledIcon: RiUserSearchFill },
    { name: 'Leagues', path: '/leagues', OutlinedIcon: HiOutlineTrophy, FilledIcon: HiTrophy },
];

export const BottomNavbar = () => {
    const ffService = useFfService();
    const { isOpen: isModalOpen , openModal, closeModal } = useModal();
    const [previousNavOption, setPreviousNavOption] = useState(null);
    const [selectedNavOption, setSelectedNavOption] = useState(navOptions[0]);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    
    const updateSelectedLeague = async (league) => {
        ffService.setStandingsPage(league);
        setPreviousNavOption(null);
        setIsOpen(false); 
        navigate(`/leagues/${league.league_key}/standings`);
    };

    const handleNavigation = async (navOption) => {
        setSelectedNavOption(navOption);

        if(navOption.name !== 'Matchup' && isModalOpen) closeModal();
        if(isOpen && navOption.name !== 'Leagues') {
            setIsOpen(false);
        }
        if(navOption.name === 'Leagues' && ( selectedNavOption.name !== navOption.name || location.pathname.includes(navOption.path) ) ) {
            console.log('inside leagues setting previous to', selectedNavOption);
            setIsOpen(!isOpen);
            setPreviousNavOption(selectedNavOption);
        } 
        if(navOption.name === 'Roster') {
            navigate('/');
        }
        if(navOption.name === 'Matchup'){
            if(selectedNavOption.name !== navOption.name) {
                navigate('/matchup');
            } else if (!isModalOpen) {
                openModal({ content: <Matchups/>, direction: 'up'});
            } else {
                closeModal();
            }
        } 
        
        if(navOption.name === 'Players') {
            navigate('/players');
        } 
    
        
    };

    useEffect(() => {

        if(!isOpen && previousNavOption) {//resetting nav to previous option if user opened leagues
            setSelectedNavOption(previousNavOption);
            setPreviousNavOption(null);
        }

        //closes modal only when active nav isn't Matchup
        if( selectedNavOption.name !== 'Matchup' && isModalOpen ) closeModal();
        
    }, [ isOpen, selectedNavOption ]);

    useEffect(() => {
        const path = location.pathname;
        if( path === '/') setSelectedNavOption(navOptions[0]);
        else if ( path === '/matchup' ) setSelectedNavOption(navOptions[1]);
        else if ( path === '/players' ) setSelectedNavOption(navOptions[2]);
        else setSelectedNavOption(navOptions[3]);
    }, [location.pathname]);

    
    return (
        <>
            <Backdrop sx={(theme) => ({ 
                    backgroundColor: 'transparent',
                    color: '#FFFFFF', 
                    zIndex: theme.zIndex.drawer + 1 
                })}
                open={isOpen}
                onClick={() => setIsOpen(false)}
            >
                {isOpen && (
                    <Grow in={isOpen} style={{ transformOrigin: '0 100%' }}>
                        <StyledBox>
                            {ffService.leagues.map((league, lgIdx) => (
                                <Box key={lgIdx} sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <Button onClick={() => updateSelectedLeague(league)}>
                                        <Typography variant='p' sx={{ color: `${league.name === ffService.selectedLeague.name ? '#F5F5F5' : '#FFFFFF' }`, fontSize: 18 }}>
                                            {league.name}
                                        </Typography>
                                    </Button>
                                    <img src={league.teams.team.team_logos.team_logo.url} alt="Team Logo" style={{ width: 48, height: 48 }} />
                                </Box>
                            ))}
                        </StyledBox>
                    </Grow>
                )}
            </Backdrop>
            <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0, zIndex: 1400 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: 0, height: 56 }}>
                    {navOptions.map((option, nIdx) => (
                        <React.Fragment key={`navbar-${nIdx}`}>
                            <StyledIconButton
                                onClick={() => handleNavigation(option)}
                                selected={selectedNavOption.name === option.name}
                                sx={{ backgroundColor: theme.palette.primary.main }}
                            >
                                {(selectedNavOption.name === option.name) && (location.pathname.includes(selectedNavOption.path)) 
                                    ? <option.FilledIcon /> 
                                    : <option.OutlinedIcon/>
                                }
                                <Typography 
                                    fontSize={12} 
                                    sx={{
                                        transition: 'font-weight 0.3s ease',
                                        fontWeight: selectedNavOption.name === option.name ? 700 : 400,
                                    }}
                                >
                                    {option.name}
                                </Typography>
                            </StyledIconButton>
                            {nIdx < navOptions.length - 1 && (
                                <StyledDivider orientation="vertical" flexItem />
                            )}
                        </React.Fragment>
                    ))}
                </Toolbar>
            </AppBar>
        </>
    );
};