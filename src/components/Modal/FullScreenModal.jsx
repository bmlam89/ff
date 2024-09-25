import React, { useState, forwardRef } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import { IoClose } from "react-icons/io5";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction} ref={ref} {...props} />;
});

export const FullScreenModal = ({isOpen, setIsOpen, direction, children}) => {
    
    return (
  
        <Dialog
            fullScreen
            open={isOpen}
            onClose={() => setIsOpen(false)}
            TransitionComponent={Transition}
            TransitionProps={{direction}}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{justifyContent: 'flex-end', paddingX: 0}}>
                    <IconButton
                        color="inherit"
                        onClick={() => setIsOpen(false)}
                        aria-label="close"
                    >
                        <IoClose />
                    </IconButton>
                </Toolbar>
            </AppBar>
            { children }
        </Dialog>
    );
};
