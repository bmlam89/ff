import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useFfService } from '../hooks';
import { BasicLoading, SelectWeekButtonGroup } from '../components';
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
                    <SelectWeekButtonGroup selectedWeek={+ffService.matchupWeek} setSelectedWeek={(week) => ffService.updateMatchupPageWeek(week)}/> 
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

const TeamNames = ({ teams }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {teams.map((team, index) => (
            <Typography key={index} fontSize={12}>{team.name}</Typography>
        ))}
    </Box>
);

const ScoreAndLogos = ({ teams }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <TeamLogo url={teams[0].team_logos.team_logo.url} />
        <ScoreDisplay teams={teams} />
        <TeamLogo url={teams[1].team_logos.team_logo.url} />
    </Box>
);

const TeamLogo = ({ url }) => (
    <img src={url} style={{ width: '48px', height: '48px', borderRadius: '50%' }} alt="Team Logo" />
);

const ScoreDisplay = ({ teams }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        <Typography fontSize={32}>{teams[0].team_points.total}</Typography>
        <Typography sx={{ fontSize: 16, color: 'gray', fontWeight: 600 }}>/</Typography>
        <Typography fontSize={32}>{teams[1].team_points.total}</Typography>
    </Box>
);

const ProjectionsAndWinProbability = ({ teams }) => (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <TeamProjection team={teams[0]} align="start" />
        <ProjectionLabels />
        <TeamProjection team={teams[1]} align="end" />
    </Box>
);

const TeamProjection = ({ team, align }) => (
    <Stack sx={{ alignItems: align }}>
        <Typography fontSize={12}>{team.team_projected_points.total}</Typography>
        <Typography fontSize={12}>{parseInt(team.win_probability * 100)}%</Typography>
    </Stack>
);

const ProjectionLabels = () => (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography fontSize={12}>Live Projected</Typography>
        <Typography fontSize={12}>Win %</Typography>
    </Stack>
);

const PlayerInfo = ({ player, align }) => {
    const renderEmptySlot = () => (
        <Box sx={{ 
            display: 'flex',
            minHeight: 38,
            alignItems: 'center',
            width: '100%',
            paddingX: 2.5,
            backgroundColor: '#d4d6d2'
        }}>
            <Stack sx={{ alignItems: align === 'left' ? 'flex-start' : 'flex-end', height: '100%', width: '100%'}}>
                <Typography sx={{
                    fontSize: 15,
                    textTransform: 'uppercase',
                    color: '#4d4a4c',
                    fontWeight: 600,
                }}>
                    Empty
                </Typography>
            </Stack>
            
                
        </Box>
    );

    if (!player) return renderEmptySlot();
    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            width: '100%', 
            paddingX: 2.5 
        }}>
            { align === 'left' 
                ? <>
                    <PlayerDetails player={player} align={align} />
                    <PlayerPoints points={player.player_points.total} />
                </>
                : <>
                    <PlayerPoints points={player.player_points.total} />
                    <PlayerDetails player={player} align={align} />
                </>
            }
        </Box>
    );
};

const PlayerDetails = ({ player, align }) => (
    <Stack sx={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Typography fontSize={12}>
            {player.name.first[0]}. {player.name.last}
        </Typography>
        <Typography fontSize={10} textTransform='uppercase'>
            {player.editorial_team_abbr}&nbsp;-&nbsp;{player.display_position}
        </Typography>
    </Stack>
);

const PlayerPoints = ({ points }) => (
    <Stack justifyContent='center'>
        <Typography fontSize={14}>
            {points}
        </Typography>
    </Stack>
);

const PositionBox = ({ position }) => (
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

export const Matchup = ({ selectedMatchup, hideButton }) => {
    const ffService = useFfService();
    const [matchup, setMatchup] = useState(selectedMatchup);
    
    useEffect(() => {
        if (!matchup && !ffService.selectedMatchup) ffService.setMatchupPage();
        else if (ffService.selectedMatchup) setMatchup(ffService.selectedMatchup);
    }, [ffService.selectedMatchup]);

    if (!matchup || !matchup.teams || !matchup.teams?.team || !matchup.teams?.team[0]?.roster) return <BasicLoading />;

    const POSITIONS = ['QB', 'WR', 'RB', 'TE', 'W/R/T', 'K', 'DEF', 'BN', 'IR'];

    const getLineup = (team) => {
        return POSITIONS.reduce((acc, position) => {
            acc[position] = team.roster.filter(player => player.selected_position.position === position);
            return acc;
        }, {});
    };

    const myTeam = matchup.teams.team[0].is_owned_by_current_login ? matchup.teams.team[0] : matchup.teams.team[1];
    const opposingTeam = matchup.teams.team[0].is_owned_by_current_login ? matchup.teams.team[1] : matchup.teams.team[0];

    const myLineup = getLineup(myTeam);
    const opposingLineup = getLineup(opposingTeam);

    const renderPositionRows = (position) => {
        const maxPlayers = position === 'WR' || position === 'RB' ? 2 : 1;
        const rows = [];
        for (let i = 0; i < maxPlayers; i++) {
            rows.push(
                <Box key={`${position}-${i}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayerInfo player={myLineup[position][i]} align="left" />
                    <PositionBox position={position} />
                    <PlayerInfo player={opposingLineup[position][i]} align="right" />
                </Box>
            );
        }
        return rows;
    };

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
                    <Header matchup={matchup} hideButton={hideButton}/>
                </Stack>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {POSITIONS.map((position) => {
                        if (position === 'BN' || position === 'IR') {
                            return myLineup[position].map((_, index) => (
                                <Box key={`${position}-${index}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PlayerInfo player={myLineup[position][index]} align="left" />
                                    <PositionBox position={position} />
                                    <PlayerInfo player={opposingLineup[position][index]} align="right" />
                                </Box>
                            ));
                        } else {
                            return renderPositionRows(position);
                        }
                    })}
                </Box>
            </Box>
        </Box>
    );
};
