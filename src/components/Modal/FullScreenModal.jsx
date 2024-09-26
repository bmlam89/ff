import React, { useState, forwardRef, useEffect } from 'react';
import { Box, Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import { IoClose } from "react-icons/io5";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction} ref={ref} {...props} />;
});

export const FullScreenModal = ({ isOpen, setIsOpen, direction, backButton, children, closeModal, setCloseModalCallback }) => {
    const [closeDirection, setCloseDirection] = useState(null);

    const handleClose = () => {
        setCloseDirection('up');
        closeModal();
    };

    useEffect(() => {
        setCloseModalCallback(() => handleClose);
    }, [setCloseModalCallback]);

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            TransitionProps={{direction: closeDirection ? closeDirection : direction}}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'transparent',
                },
                '& .MuiDialog-paper': {
                    height: 'calc(100% - 56px)',
                    top: 0,
                    mb: '56px', 
                    maxHeight: 'calc(100% - 56px)', 
                },
                '&::after': {
                    content: '""',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '56px',
                    zIndex: 1,
                },
            }}
            hideBackdrop
        >
            <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'background.paper',
            }}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar sx={{alignItems: 'center', justifyContent: 'space-between', paddingX: 0}}>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                            {backButton ? backButton : <Box width={48} height={48}/>}
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <IoClose />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ 
                    flexGrow: 1, 
                    overflowY: 'auto'
                }}>
                    {children}
                </Box>
            </Box>
        </Dialog>
    );
};