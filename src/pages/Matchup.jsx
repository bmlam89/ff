import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useFfService } from '../hooks';
import { SelectWeekButtonGroup } from '../components';
import { Matchups } from './Matchups';

import { useModal } from '../hooks';

const Header = ({matchup, hideButton}) => {
    const ffService = useFfService();
    const { openModal } = useModal();

    const { teams } = matchup;
    const renderMatchups = () => openModal({
        content: <Matchups/>, 
        direction: 'up'
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingX: 2.5,
            paddingY: 2,
            gap: 0.5,
            borderBottom: '1px black solid'
        }}>
            <TeamNames teams={teams.team} />
            <ScoreAndLogos teams={teams.team} />
            <ProjectionsAndWinProbability teams={teams.team} />
            <Box sx={{display: 'flex', gap: 2.5, width: 'fit'}}>
                {!hideButton && <>
                    <SelectWeekButtonGroup selectedWeek={+ffService.selectedMatchupWeek} setSelectedWeek={(week) => ffService.updateMatchupPageWeek(week)}/> 
                    <Button 
                        sx={{
                            display: 'flex', 
                            backgroundColor: 'primary.main', 
                            color: 'primary.main', 
                            borderRadius: '20px', 
                            paddingX: 2, 
                            maxHeight: '18px'
                        }}
                        onClick={renderMatchups}
                    >
                            <Typography color='#FFFFFF' fontSize={13} textTransform='none'>All matchups</Typography>
                        </Button> 
                </>}
            </Box>
        </Box>
        
    );
};

export const TeamNames = ({ teams }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {teams.map((team, index) => (
            <Typography key={index} fontSize={12}>{team.name}</Typography>
        ))}
    </Box>
);

export const ScoreAndLogos = ({ teams }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <TeamLogo url={teams[0].team_logos.team_logo.url} />
        <ScoreDisplay teams={teams} />
        <TeamLogo url={teams[1].team_logos.team_logo.url} />
    </Box>
);

export const TeamLogo = ({ url }) => (
    <img src={url} style={{ width: '48px', height: '48px', borderRadius: '50%' }} alt="Team Logo" />
);

export const ScoreDisplay = ({ teams }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        <Typography fontSize={32}>{teams[0].team_points.total}</Typography>
        <Typography sx={{ fontSize: 16, color: 'gray', fontWeight: 600 }}>/</Typography>
        <Typography fontSize={32}>{teams[1].team_points.total}</Typography>
    </Box>
);

export const ProjectionsAndWinProbability = ({ teams }) => (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <TeamProjection team={teams[0]} align="start" />
        <ProjectionLabels />
        <TeamProjection team={teams[1]} align="end" />
    </Box>
);

export const TeamProjection = ({ team, align }) => (
    <Stack sx={{ alignItems: align }}>
        <Typography fontSize={12}>{team.team_projected_points.total}</Typography>
        <Typography fontSize={12}>{parseInt(team.win_probability * 100)}%</Typography>
    </Stack>
);

export const ProjectionLabels = () => (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography fontSize={12}>Live Projected</Typography>
        <Typography fontSize={12}>Win %</Typography>
    </Stack>
);

export const PlayerInfo = ({ player, align }) => (
    <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        width: '100%', 
        paddingX: 2.5 
    }}>
        {align === 'left' ? (
            <>
                <PlayerDetails player={player} align={align} />
                <PlayerPoints points={player.player_points.total} />
            </>
        ) : (
            <>
                <PlayerPoints points={player.player_points.total} />
                <PlayerDetails player={player} align={align} />
            </>
        )}
    </Box>
);

export const PlayerDetails = ({ player, align }) => (
    <Stack sx={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Typography fontSize={12}>
            {player.name.first[0]}. {player.name.last}
        </Typography>
        <Typography fontSize={10} textTransform='uppercase'>
            {player.editorial_team_abbr}&nbsp;-&nbsp;{player.display_position}
        </Typography>
    </Stack>
);

export const PlayerPoints = ({ points }) => (
    <Stack justifyContent='center'>
        <Typography fontSize={14}>
            {points}
        </Typography>
    </Stack>
);

export const PositionBox = ({ position }) => (
    <Box sx={{
        paddingX: 2,
        paddingY: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        borderBottom: '1px black solid',
        minWidth: '50px'
    }}>
        <Typography fontSize={14}>{position}</Typography>
    </Box>
);

export const Matchup = ({selectedMatchup, hideButton}) => {
    const ffService = useFfService();
    const [matchup, setMatchup] = useState(selectedMatchup);
    
    useEffect(() => {
        if(!ffService.selectedMatchupWeek && !matchup) ffService.setInitialAppData();
        else if(!matchup) setMatchup(ffService.selectedMatchup);
    }, [ffService.selectedMatchupWeek]);

    const POSITIONS = ['QB', 'WR', 'RB', 'TE', 'W/R/T', 'K', 'DEF', 'BN'];

    if (ffService.isLoading || !matchup) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );

    const mapPlayersByPosition = (roster) => {
        const mappedPlayers = {};
        POSITIONS.forEach(position => {
            mappedPlayers[position] = roster.filter(player => player.selected_position.position === position);
        });
        return mappedPlayers;
    };

    const playersByPosition1 = mapPlayersByPosition(matchup.teams.team[0].roster);
    const playersByPosition2 = mapPlayersByPosition(matchup.teams.team[1].roster);

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}>
                <Stack sx={{gap: 1}}>
                    <Header matchup={ matchup } hideButton={hideButton}/>
                </Stack>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {POSITIONS.map(position => (
                        <Box key={position}>
                            {playersByPosition1[position].map((player, index) => {
                                const opposingPlayer = playersByPosition2[position][index];
                                return (
                                    <Box key={`${position}-${index}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PlayerInfo player={player} align="left" />
                                        <PositionBox position={position} />
                                        <PlayerInfo player={opposingPlayer} align="right" />
                                    </Box>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
