import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { MySelect } from '../../../components/Select';
import { MyTabs } from '../../../components/Tabs';
import { usePlayer } from '../hooks/usePlayer';
import { FormControl, InputLabel, Select, MenuItem, NativeSelect } from '@mui/material';



const HeaderCell = ({ children, className = '' }) => (
  <TableCell align="center" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', ...className }}>
    {children}
  </TableCell>
);

const DataCell = ({ children, className = '' }) => (
  <TableCell align="center" sx={{ whiteSpace: 'nowrap', ...className }}>
    {children}
  </TableCell>
);

const SectionHeader = ({ children }) => (
  <Typography variant="subtitle1" fontWeight="bold" sx={{ height: 32, textAlign: 'left', whiteSpace: 'nowrap' }}>
    {children}
  </Typography>
);

const Section = ({ title, headers, data, className }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', ...className }}>
    {title && typeof title === 'string' ? <SectionHeader>{title}</SectionHeader> : title}

    <TableContainer component={Paper} sx={{ border: 1, borderColor: 'black', flex: 1, display: 'flex' }}>
      <Table size="small" sx={{ height: '100%' }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <HeaderCell key={index} className={{ borderLeft: index !== 0 ? 1 : 0, borderColor: 'black' }}>
                {header}
              </HeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <DataCell key={cellIndex} className={{ borderLeft: cellIndex !== 0 ? 1 : 0, borderColor: 'black' }}>
                  {cell}
                </DataCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
export const PlayerGamelogs = ({player, season2}) => {
    // console.log(player,'player')
	// const { gamelogs, getPlayerGamelogs, isFetching, error } = usePlayer();

	// useEffect(() => {
	// 	getPlayerGamelogs(player.pk, season || 2023);
	//   }, []);

	// if(isFetching) return <Box>Fetching gamelogs...</Box>
	// if(error) return <Box>Error: {error}</Box>;
    const [season, setSeason] = useState("2024");

    useEffect(() => {
        console.log(season, 'season')
    }, [season])

    const handleChange = (event) => {
        setSeason(event.target.value);
    };
	const gamelogs = [
		{week:1, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1},
		{week:2, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1},
		{week:3, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1}
	  ];
      const options = ['Gamelogs', 'Rank', 'Research']

	  return (
        <> 
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Box sx={{display: 'flex', gap: 1, width: '100%', paddingX: 2, justifyContent: 'start'}}>
                    {options.map((option, idx) => (
                        <Box key={idx} sx={{padding: 0, width: 'fit'}}>
                            <p style={{textDecoration: 'underline'}}>{option}</p>
                        </Box>
                    ))}
                </Box>
            </Box>           
            <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%', px: 2}}>
                <Box sx={{ width: 80 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="season-select-label"
                            id="season-select"
                            value={season}
                            onChange={handleChange}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid black',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid rgba(0, 0, 0, 0.87)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid',
                                    borderColor: 'black',
                                },
                                '.MuiSelect-select': {
                                    paddingX: 0.5,
                                    paddingTop: 0.5,
                                    paddingBottom: 0,
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                },
                                color: 'black'
                                }}
                        >
                            <MenuItem value="2024">2024</MenuItem>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2022">2022</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box> 
            <Box sx={{ width: '100%', overflowX: 'auto',overscrollBehavior: 'contain', maxWidth: '92vw' }}>
            <Box sx={{ display: 'inline-flex', gap: 3, minWidth: 'max-content', px: 2}}>
                <Section
                title={' '}
                headers={['Wk', 'Opp']}
                data={gamelogs.map(log => [log.week, log.opponent])}
                />
                <Section
                title="Fantasy"
                headers={['Points', 'Finish']}
                data={gamelogs.map(log => [log.fantasyPoints, log.fantasyFinish])}
                />
                <Section
                title="Receiving"
                headers={['Tgts', 'Rec', 'Yds', 'Avg', 'Lng', 'Td']}
                data={gamelogs.map(log => [
                    log.targets, log.receptions, log.receivingYards,
                    log.receivingAvg, log.receivingLong, log.receivingTd
                ])}
                />
                <Section
                title="Rushing"
                headers={['Att', 'Yds', 'Avg', 'Lng', 'Td']}
                data={gamelogs.map(log => [
                    log.rushingAtt, log.rushingYards, log.rushingAvg,
                    log.rushingLong, log.rushingTd
                ])}
                />
            </Box>
            </Box>
        </>
	  );
};
