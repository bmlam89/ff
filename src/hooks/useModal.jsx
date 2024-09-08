import React, { useState, useCallback, createContext, useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const ModalContext = createContext( null );

export const useModal = () => {

	const context = useContext(ModalContext);
	return context;

};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = useCallback((modalContent) => {
        setContent(modalContent);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setContent(null);
    }, []);

    const ModalWrapper = useCallback(
        ({ children, ...props }) => (
            <Dialog open={isOpen} onClose={closeModal} {...props}>
				<IconButton
					aria-label="close"
					onClick={closeModal}
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>
                {content}
            </Dialog>
        ),
        [isOpen, content, closeModal]
    );

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
			<ModalWrapper/>
        </ModalContext.Provider>
    );
};


//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContent] = useState(null);

//   const openModal = useCallback((modalContent) => {
//     setContent(modalContent);
//     setIsOpen(true);
//   }, []);

//   const closeModal = useCallback(() => {
//     setIsOpen(false);
//     setContent(null);
//   }, []);

//   const ModalWrapper = useCallback(
//     ({ children, ...props }) => (
//       <Dialog open={isOpen} onClose={closeModal} {...props}>
//         {content}
//       </Dialog>
//     ),
//     [isOpen, content, closeModal]
//   );

//   return {
//     isOpen,
//     openModal,
//     closeModal,
//     ModalWrapper,
//   };
// };

// export default useModal;