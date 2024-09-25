import React, { useState, createContext, useContext } from 'react';

import { FullScreenModal } from '../components';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [backButton, setBackButton] = useState(null);
    const [direction, setDirection] = useState(null);
    const [key, setKey] = useState(0);

    const openModal = ( { content, backButton, direction } ) => {
        setContent(content);
        setDirection(direction);
        setBackButton(backButton);
        setKey(prev => prev + 1);
        setIsOpen(true);
    };

    return (
        <ModalContext.Provider value={{ openModal }}>
            {children}
            <FullScreenModal
                key={`${key}-${direction}`} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                direction={direction}
                backButton={backButton}
            >
                {content}
            </FullScreenModal>
        </ModalContext.Provider>
    );
};