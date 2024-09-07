import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Modal = ({open, setOpen, children}) => {
	const [scroll, setScroll] = useState('paper');

	const descriptionElementRef = useRef(null);
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<>
			{ children }
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				scroll={scroll}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
				<DialogContent dividers={scroll === 'paper'}>
					<DialogContentText
						id="scroll-dialog-description"
						ref={descriptionElementRef}
						tabIndex={-1}
					>
						{[...new Array(50)]
							.map(() => `Cras mattis consectetur purus sit amet fermentum.
								Cras justo odio, dapibus ac facilisis in, egestas eget quam.
								Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
								Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
							)
							.join('\n')
						}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button onClick={() => setOpen(false)}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
