import React from 'react';
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)( ( { theme } ) => {
	console.log(theme,'themeeee')
	return {
		color: theme.palette.success.main,
		'& .MuiSlider-thumb': {
			'&:hover, &.Mui-focusVisible': {
			boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
			},
			'&.Mui-active': {
			boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
			},
		}
	}
} );
export const MySlider = () => {
	return (
		<CustomSlider defaultValue={30}/>
	)
}
