import { useState, useEffect }from 'react';
import { 
    Box, Pagination, Paper, 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow 
} from '@mui/material';

const columns = [
    { id: 'image', label: '' },
    { id: 'name', label: 'name' },
    { id: 'position', label: 'pos' },
    {
        id: 'team',
        label: 'team',
    },
    {
        id: 'gamesPlayed',
        label: 'gp',
    },
    {
        id: 'targets',
        label: 'tgts',
    },
];

function createData( image, name, position, team, gamesPlayed, targets ) {
    return { image, name, position, team, gamesPlayed, targets };
};



export const StickyHeadTable = ( { players, getPlayers } ) => {
    
    const [ pIdx, setpIdx ] = useState( 0 );
    const handleChangePage = () => {
        setpIdx( prev => +prev + players.length );
        getPlayers( pIdx + players.length );
    };
    const rows = players.map( player => createData( 
        player.image_url, 
        player.name.full, 
        player.primary_position, 
        player.editorial_team_abbr,
        player.stats.gp,
        player.stats.tgts
    ) )
    return (
        <Paper sx={ { width: '100%', overflow: 'hidden' } }>
            <TableContainer sx={ { maxHeight: '77vh',overscrollBehavior: 'contain' } }>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            { columns.map( column => (
                                <TableCell
                                    key={ column.id }
                                    align={ column.align }
                                    style={ { minWidth: column.minWidth } }
                                >
                                    { column.label }
                                </TableCell>
                            ) ) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { rows
                            .map( ( row, idx ) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.name }>
                                        { columns.map( column => {
                                            const value = row[ column.id ];
                                            return (
                                                <TableCell 
                                                    key={ column.id } 
                                                    align={ column.align }
                                                >
                                                    { column.format && typeof value === 'number'
                                                        ? column.format( value )
                                                        : column.id === 'image' 
                                                            ? <Box sx={ {
                                                                    display: 'flex',
                                                                    gap: 1,
                                                                    alignItems: 'center'
                                                                } }
                                                            >
                                                                { pIdx + idx + 1 }<img src={value}/>
                                                            </Box>
                                                            : value
                                                    }
                                                </TableCell>
                                            );
                                        } ) }
                                    </TableRow>
                                );
                        } ) }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 60,
                    backgroundColor:'#D8D8D8'
                } }
            >
                <Pagination count={ 6 } color="primary" onChange={ handleChangePage }/>
            </Box>
        </Paper>
    );
};
