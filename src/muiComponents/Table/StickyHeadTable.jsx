import { useState, useEffect }from 'react';
import { 
    Box, Divider, Paper, 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow 
} from '@mui/material';

import { Modal } from '../Modal';

let columns = [
    { l: 'image', h: '' },
    { l: 'name', h: 'name' },
    { l: 'position', h: 'pos' },
    {
        l: 'team',
        h: 'team',
    },
    {
        l: 'gamesPlayed',
        h: 'gp',
    },
    {
        l: 'targets',
        h: 'tgts',
    },
];
columns = ['idx','image','name','pos','team','gp','tgts'];

function createData( idx, image, name, position, team, gamesPlayed, targets ) {
    return { idx, image, name, position, team, gamesPlayed, targets };
};
const rows = [...Array(40)].map( (_, idx) => createData(
	idx,
	'https://s.yimg.com/iu/api/res/1.2/0AcARSXfH.2ePjMXhKeHDg--~C/YXBwaWQ9eXNwb3J0cztoPTcyO3E9ODA7dz03Mg--/https://s.yimg.com/xe/i/us/sp/v/nfl_cutout/players_l/07292024/34095.png',
	`Name${idx}`,
	`Pos${idx}`,
	`Team${idx}`,
	17,
	100
));
export const StickyHeadTable = ( { players, getPlayers } ) => {
	const [open, setOpen] = useState(false);

    const [ pIdx, setpIdx ] = useState( 0 );
    const handleChangePage = () => {
        setpIdx( prev => +prev + players.length );
        getPlayers( pIdx + players.length );
    };

	const clickHandler = (bool) => {
		console.log('click handler called');
		setOpen(bool);
	};
    return (
        <Paper sx={ { width: '100%', height: '100%', overflow: 'hidden' } }>
            <TableContainer sx={ { height: '100%', overflow: 'auto' } }>
				<Box sx={{width:'100%', height:100, backgroundColor: 'gray'}}/>

                <Table stickyHeader aria-label="sticky table">

                    <TableHead>
						<TableRow 
						>
                            { columns.map( (h,idx)=> (
								<TableCell 
									key={idx} 
								>
									{ h === 'idx' || h === 'image' ? '' : h }
								</TableCell>
                            ) ) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
						{rows.map( (p,idx) => 
							<TableRow 
								hover 
								role="checkbox" 
								tabIndex={ -1 } 
								key={ `${p.name}-row` }
							>
								{Object.entries(p).map( ([k,v], idx2) =>
									<TableCell 
										key={`${p.name}-cell-${idx2}`}
									>
										{k === 'image' ? 
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											width: '100%'
										}}
										>
											<Modal open={open} setOpen={clickHandler}>
												<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
													<button onClick={clickHandler}>
														<img src={v} />
													</button>
												</Box>
											</Modal> 
										</Box>: v}
									</TableCell>
								)}

							</TableRow>
						)}
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
