import React, { useEffect } from 'react';
import { useFfService } from '../hooks';

export const Matchup = () => {
    const ffService = useFfService();
    useEffect(() => {
        if(!ffService.matchup) ffService.getMatchup();
        else console.log('holy shit matchup in Matchup page', ffService.matchup);

        if(!ffService.matchups) ffService.getMatchups;
        else console.log('holy shit matchups in matchup page', ffService.matchups);
    }, [ffService.matchup, ffService.matchups])
    return (
        <div>MyMatchup</div>
    );
};
