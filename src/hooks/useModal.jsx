import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = (modalContent) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Dialog open={isOpen} onClose={closeModal}>
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                    sx={{
                        position: 'absolute',
                        right: 3,
                        top: 3,
                        color: 'black',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 5, paddingBottom: 3, gap: 2}}>
                    {content}
                </Box>
            </Dialog>
        </ModalContext.Provider>
    );
};