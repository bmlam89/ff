import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import { BottomAppBar } from './components/AppBar';
import { MySlider } from './components/Slider';
export const App = () => {
	return (
		<>
			<MySlider/>
			<BottomAppBar/>
		</>
		
	)
}
