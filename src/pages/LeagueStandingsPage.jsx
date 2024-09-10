import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const LeagueStandingsPage = ({league}) => {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getStandings = async () => {
        try {
            const response = await axios.get(`https://localhost:8000/api/v1/standings?lk=${league.league_key}`);
            console.log(response,'responseee')
            setStandings(response.data.standings);
        } catch (error) {
            console.error('Error trying to get standings.', error);
            throw error;
        } finally {
            setIsLoading( false );
        }

    };

    useEffect(() => {
        getStandings();
    }, [] );

    if(isLoading) return <div>Loading...</div>
    return (
        <>
        <div>{league.name}</div>
        <div>{standings[0].name}</div>
        </>
    );
};
