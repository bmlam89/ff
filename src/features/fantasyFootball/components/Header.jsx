import React from 'react';
import { Badge, Box, Button, Typography } from '@mui/material';
import { FiChevronDown } from 'react-icons/fi';
import { SelectWeekButtonGroup } from '../../../components';
import { useFfService } from '../hooks/useFfService';

const Header = () => {
    const ffService = useFfService();
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            gap: 2.5,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0'
        }}>
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={ffService.selectedTeam.team_logos.team_logo.url} alt="Team Logo" style={{ width: 48, height: 48 }} />
                    <Box sx={{ display:'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h5">{ffService.selectedTeam.name}</Typography>
                        <Box sx={{display: 'flex', gap:1}}>
                            <Typography sx={{fontSize: '12px'}}>
                                {ffService.selectedTeam.team_standings.outcome_totals.wins}&nbsp;-&nbsp;
                                {ffService.selectedTeam.team_standings.outcome_totals.losses}&nbsp;-&nbsp;
                                {ffService.selectedTeam.team_standings.outcome_totals.ties}
                            </Typography>
                            <Typography sx={{fontSize: '12px'}}>•</Typography>
                            <Typography sx={{fontSize: '12px'}}>{ffService.selectedTeam.team_standings.rank} of {ffService.selectedLeague.teams.length}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display:'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="h5">{ffService.selectedTeam.team_points.total}</Typography>
                        <Box sx={{display: 'flex', gap:1}}>
                            <Typography sx={{fontSize: '12px'}}>{ffService.selectedTeam.team_projected_points.total}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                gap: 3,
            }}>
                <SelectWeekButtonGroup selectedWeek={+ffService.rosterWeek} setSelectedWeek={async (week) => await ffService.updateRosterPageWeek(week)}/>
                <Button 
                    variant="outlined"
                    sx={{
                        height: '16px',
                        minWidth: 'auto',
                        border: '1px solid', 
                        borderRadius: '20px', 
                        padding: '2px 8px', 
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{
                        fontSize: '12px', 
                        textTransform: 'none',
                        marginRight: '4px'
                    }}>
                        Stats
                    </Typography>
                    <FiChevronDown size={12}/>
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                gap: 3,
            }}>
                <Button 
                    variant="contained"
                    sx={{
                        height: '18px',
                        borderRadius: '20px', 
                        padding: '3px 8px', 
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: 'primary',
                        color: 'white',
                       
                    }}
                    >
                    <Typography sx={{
                        fontSize: '12px', 
                        textTransform: 'none',
                    }}>
                        Transactions
                    </Typography>
                </Button>
                <Badge color='error' variant="dot" sx={{ '& .MuiBadge-badge': { top: '1px', right: '2px' } }}>

                <Button 
                    variant="contained"
                    sx={{
                        height: '18px',
                        borderRadius: '20px', 
                        padding: '3px 8px', 
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: 'primary',
                        color: 'white',
                    }}
                >
                        <Typography sx={{
                            fontSize: '12px', 
                            textTransform: 'none',
                        }}>
                            Player Updates
                        </Typography>
                </Button>
                </Badge>

            </Box>
        </Box>
    );
};

export default Header;
