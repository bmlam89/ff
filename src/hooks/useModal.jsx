import React, { useState, createContext, useContext } from 'react';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { FullScreenModal } from '../components';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [direction, setDirection] = useState(null);

    const openModal = ({content, direction}) => {
        setContent(content);
        setDirection(direction);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <FullScreenModal isOpen={isOpen} setIsOpen={setIsOpen} direction={direction}>
                {content}
            </FullScreenModal>
        </ModalContext.Provider>
    );
};