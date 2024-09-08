import { 
    Box,
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow 
} from '@mui/material';

import { PlayerGamelogs } from './PlayerGamelogs';

import { useModal } from '../../../hooks';
import { usePlayer } from '../hooks/usePlayer';

function createData( idx, image, name, position, team, gamesPlayed, targets ) {
    return { idx, image, name, position, team, gamesPlayed, targets };
};

const columns = ['idx','image','name','pos','team','gp','tgts'];

const rows = [...Array(40)].map( (_, idx) => createData(
	idx,
	'https://s.yimg.com/iu/api/res/1.2/0AcARSXfH.2ePjMXhKeHDg--~C/YXBwaWQ9eXNwb3J0cztoPTcyO3E9ODA7dz03Mg--/https://s.yimg.com/xe/i/us/sp/v/nfl_cutout/players_l/07292024/34095.png',
	`Name${idx}`,
	`Pos${idx}`,
	`Team${idx}`,
	17,
	100
));

export const TopPlayersList = () => {
	const { players, getPlayers, isFetchingPlayers } = usePlayer();
	const { openModal } = useModal();
    
	const renderPlayerGamelogs = (player) => {
		openModal(<PlayerGamelogs player={player}/>)
	};

	if(isFetchingPlayers) {
		return <Box>Loading...</Box>;
	}

    return (
		<TableContainer sx={ { height: '100%', overflow: 'auto' } }>
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
											<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
												<button onClick={() => renderPlayerGamelogs(p)}>
													<img src={v} />
												</button>
											</Box>
										</Box> : v }
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
    );
};
