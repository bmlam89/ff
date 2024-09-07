import { useState, useEffect } from 'react';

export const useAvailableHeight = (headerHeight, bottomBarHeight) => {
	const [availableHeight, setAvailableHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
			const windowHeight = window.innerHeight;
			const newAvailableHeight = windowHeight - headerHeight - bottomBarHeight;
			setAvailableHeight(newAvailableHeight);
		}

		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, [headerHeight, bottomBarHeight]);

	return availableHeight;
};
