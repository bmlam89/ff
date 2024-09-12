import { useEffect, useState } from 'react';
import { 
    Box,
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow 
} from '@mui/material';

import { PlayerGamelogs } from './PlayerGamelogs';

import { useModal } from '../../../hooks';

function createData( idx, image, name, pos, team, gp, pk ) {
    return { idx, image, name, pos, team, gp, pk };
};

const columns = ['idx','image','name','pos','team','gp'];

export const PlayerList = ({ players }) => {
	
    const rows = players.map((p, idx) => createData(
        idx+1,
        p.image_url,
        p.name.full,
        p.primary_position,
        p.editorial_team_abbr,
        p.stats.gp,
        p.player_key
    ));

    const { openModal } = useModal();
	const renderPlayerGamelogs = (player) => openModal(<PlayerGamelogs player={player}/>)
    
    return (
		<TableContainer sx={ {} }>
			<Table stickyHeader aria-label="sticky table">

				<TableHead>
					<TableRow >
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
                    <TableRow sx={{display: 'flex', height: 300, width: '100%'}}/>
					{rows.map((p,rIdx) => 
						<TableRow 
							hover 
							role="checkbox" 
							tabIndex={ -1 } 
							key={ `${p.name}-${rIdx}` }
						>

							{columns.map((c, cIdx) =>
								<TableCell key={`${p[c]}-${cIdx}`}>
									{c === 'image' ? 
										<Box sx={{
												display: 'flex',
												alignItems: 'center',
												width: '100%'
											}}
										>
											<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
												<button onClick={() => renderPlayerGamelogs(p)}>
													<img src={p.image} />
												</button>
											</Box>
										</Box> : p[c] }
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
    );
};
