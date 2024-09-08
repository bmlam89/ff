import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import { App } from './App'
import { ModalProvider } from './hooks/useModal';

const root = createRoot(document.getElementById('root'));
root.render(
	<ModalProvider>
		<App />
	</ModalProvider>
);