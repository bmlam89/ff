import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

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
    {title && <SectionHeader>{title}</SectionHeader>}
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

export const Test = () => {
  const gamelogs = [
    {week:1, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1},
    {week:2, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1},
    {week:3, opponent:'@Mia', fantasyPoints: 31.6, fantasyFinish: 'WR2', targets: 8, receptions: 6, receivingYards: 164, receivingAvg: 32, receivingLong: 25, receivingTd: 1, rushingAtt:10, rushingYards: 50, rushingAvg: 5, rushingLong: 20, rushingTd: 1}
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto',overscrollBehavior: 'contain' }}>
      <Box sx={{ display: 'inline-flex', gap: 3, minWidth: 'max-content', px: 2}}>
        <Section
          title=" " // Add an empty title to create space
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
  );
};