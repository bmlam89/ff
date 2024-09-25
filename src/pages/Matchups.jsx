import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { FiChevronLeft } from 'react-icons/fi';

import { MatchupsSkeleton, SelectWeekButtonGroup } from '../components';
import { Matchup } from './Matchup';
import { useFfService, useModal } from '../hooks';

export const Matchups = () => {
    const ffService = useFfService();
    const { openModal } = useModal();
    const [localSelectedWeek, setLocalSelectedWeek] = useState(ffService.selectedMatchupWeek);

    const getTeamRecord = (team) => {
        const data = ffService.selectedLeague.teams.find(t => t.team_key === team.team_key);
        return `${data.team_standings.outcome_totals.wins}-${data.team_standings.outcome_totals.losses}-${data.team_standings.outcome_totals.ties}`;
    };

    useEffect(() => {
        if (!ffService.selectedLeague) ffService.setInitialAppData();
    }, [ffService]);

    useEffect(() => {
        ffService.updateMatchups(localSelectedWeek);
    }, [localSelectedWeek]);

    if(ffService.isUpdating) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <MatchupsSkeleton/>
        </Box>
    );

    const renderMatchupDetails = async (matchup) => {
        let updatedMatchup = await ffService.getMatchupRosters(matchup, localSelectedWeek);
        updatedMatchup = await ffService.getMatchupStats(updatedMatchup, localSelectedWeek);
        openModal({
            content: <MatchupDetails selectedMatchup={updatedMatchup}/>, 
            direction: 'right',
            backButton: <BackButton/>
        });
    }
    
    return (
        <Box sx={{ height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column' }}>
            {ffService.selectedLeague?.matchups && (
            <Stack gap={3} sx={{ flexGrow: 1, overflow: 'auto', paddingX: 3, paddingY: 2 }}>
                    <Box sx={{ paddingY: 0.5 }}>
                        <SelectWeekButtonGroup 
                            selectedWeek={+localSelectedWeek} 
                            setSelectedWeek={(week) => setLocalSelectedWeek(week)}
                        />
                    </Box>
                    <Stack gap={4}>
                        {ffService.selectedLeague?.matchups.map((match, idx) => (
                            <Button 
                                key={idx} 
                                sx={{ display: 'block', width: '100%', textAlign: 'left', padding: 0 }}
                                onClick={() => renderMatchupDetails(match)}
                            >
                                <Box
                                    id='matchup-container'
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        paddingX: 2.5,
                                        paddingY: 2,
                                        border: 'solid 1.5px black',
                                        borderRadius: '20px'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 4 }}>
                                        {[0, 1].map((teamIndex) => (
                                            <Box key={teamIndex} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography fontSize={12}>
                                                        {(ffService.selectedLeague.teams.find(t => t.team_key === match.teams.team[teamIndex].team_key)).team_standings.rank}
                                                    </Typography>
                                                    <img 
                                                        src={match.teams.team[teamIndex].team_logos.team_logo.url} 
                                                        style={{ width: 40, height: 40, borderRadius: 100 }} 
                                                        alt={`Team ${teamIndex + 1} logo`}
                                                    />
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gapX: 1 }}>
                                                        <Typography fontSize={13} fontWeight={600}>
                                                            {match.teams.team[teamIndex].name} ({(Number(match.teams.team[teamIndex].win_probability) * 100).toFixed()}%)
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <Typography fontSize={12}>{match.teams.team[teamIndex].managers.manager.nickname}</Typography>
                                                            <Typography fontSize={12}>{getTeamRecord(match.teams.team[teamIndex])}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: 'fit-content', gap: 1 }}>
                                                    <Typography fontSize={12}>{match.teams.team[teamIndex].team_points.total}</Typography>
                                                    <Typography fontSize={12}>{match.teams.team[teamIndex].team_projected_points.total}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Box>
    );
};

const BackButton = () => {
    const { openModal } = useModal();

    const renderMatchups = () => openModal({content: <Matchups/>, renderBackButton: true, direction: 'left'});

    return (
        <IconButton
            color="inherit"
            onClick={renderMatchups}
            aria-label="back"
        >
            <FiChevronLeft color='#FFFFFF'/>
        </IconButton>
    )
};

const MatchupDetails = ({selectedMatchup}) => {
    return <Matchup selectedMatchup={selectedMatchup} hideButton={true}/>;
};