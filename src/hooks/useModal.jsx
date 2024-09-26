import React, { useState, createContext, useContext, useCallback } from 'react';
import { FullScreenModal } from '../components';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [backButton, setBackButton] = useState(null);
    const [direction, setDirection] = useState(null);
    const [key, setKey] = useState(0);
    const [closeCallback, setCloseCallback] = useState(() => () => {});

    const openModal = ({ content, backButton, direction }) => {
        setContent(content);
        setDirection(direction);
        setBackButton(backButton);
        setKey(prev => prev + 1);
        setIsOpen(true);
    };

    const closeModal = useCallback(() => {
        closeCallback();
        setIsOpen(false);
    }, [closeCallback]);

    const setCloseModalCallback = useCallback((callback) => {
        setCloseCallback(() => callback);
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, setCloseModalCallback }}>
            {children}
            <FullScreenModal
                key={`${key}-${direction}`} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                direction={direction}
                backButton={backButton}
                closeModal={closeModal}
                setCloseModalCallback={setCloseModalCallback}
            >
                {content}
            </FullScreenModal>
        </ModalContext.Provider>
    );
};