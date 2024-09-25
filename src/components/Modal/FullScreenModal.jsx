import React, { useState, forwardRef } from 'react';
import { Box, Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import { IoClose } from "react-icons/io5";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction} ref={ref} {...props} />;
});

export const FullScreenModal = ({isOpen, setIsOpen, direction, backButton, children}) => {
    const [closeDirection, setCloseDirection] = useState(null);
    
    const closeModal = () => {
        setCloseDirection('up');
        setIsOpen(false);
    };

    return (
  
        <Dialog
            fullScreen
            open={isOpen}
            onClose={closeModal}
            TransitionComponent={Transition}
            TransitionProps={{direction: closeDirection ? closeDirection : direction}}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{alignItems: 'center', justifyContent: 'space-between', paddingX: 0}}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        {backButton ? backButton : <Box width={48} height={48}/>}
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            color="inherit"
                            onClick={closeModal}
                            aria-label="close"
                        >
                            <IoClose />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            { children }
        </Dialog>
    );
};
