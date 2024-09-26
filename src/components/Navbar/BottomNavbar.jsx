import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Backdrop, Box, Button, Grow, IconButton, Toolbar, Typography, Divider } from '@mui/material';
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
    transition: 'all 0.3s',
    backgroundColor: theme.palette.primary.main,
    boxShadow: selected ? 'inset 0 3px 10px 3px rgb(0 0 0 / 0.2);' : 'none',
    

    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    '&.Mui-disabled': {
        color: 'inherit',
        opacity: 1,
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

    const updateSelectedLeague = (league) => {
        ffService.updateSelectedLeague(league);
        navigate(`/leagues/${league.league_key}/standings`);
        setPreviousNavOption(null);
        setIsOpen(false); 
    };

    const handleNavigation = async (navOption) => {
        console.log(navOption)
        if(navOption.name !== 'Matchup' && isModalOpen) closeModal();

        if(navOption.name === 'Leagues') {
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
    
        setSelectedNavOption(navOption);
    };

    useEffect(() => {

        if(!isOpen && previousNavOption) {//resetting nav to previous option if user opened leagues but didn't select a league
            setPreviousNavOption(null);
            setSelectedNavOption(previousNavOption);
        }

        // if(selectedNavOption.name === 'Matchup' && location.pathname === '/matchup' && !isModalOpen) {//handle showing matchups modal only when it's not open
        //     openModal({
        //         content: <Matchups/>, 
        //         direction: 'up'
        //     });
        // }
        if( selectedNavOption.name !== 'Matchup' && isModalOpen ) {//closes modal only when active nav isn't Matchup
            closeModal() 
        }

    }, [ isOpen, selectedNavOption]);

    
    return (
        <>
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isOpen}
                onClick={() => setIsOpen(false)}
            >
                {isOpen && (
                    <Grow in={isOpen} style={{ transformOrigin: '0 100%' }}>
                        <StyledBox>
                            {ffService.leagues.map((league, lgIdx) => (
                                <Box key={lgIdx} sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <Button onClick={() => updateSelectedLeague(league)}>
                                        <Typography variant='p' sx={{ color: 'white', fontSize: 18 }}>
                                            {league.name}
                                        </Typography>
                                    </Button>
                                    <img src={ffService.selectedTeam.team_logos.team_logo.url} alt="Team Logo" style={{ width: 48, height: 48 }} />
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
                                color='inherit'
                                onClick={() => handleNavigation(option)}
                                selected={selectedNavOption.name === option.name && !isOpen}
                                sx={{color: `${selectedNavOption.name === option.name ? '#FFD700' : 'white' }`}}
                            >
                                {/* {(selectedNavOption.name === option.name && !isOpen) || (isOpen && option.name === 'Leagues') 
                                    ? <option.FilledIcon /> 
                                    : <option.OutlinedIcon/>
                                } */}
                                {(selectedNavOption.name === option.name) && (location.pathname.includes(selectedNavOption.path)) 
                                    ? <option.FilledIcon /> 
                                    : <option.OutlinedIcon/>
                                }
                                <Typography fontSize={12}>{option.name}</Typography>
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