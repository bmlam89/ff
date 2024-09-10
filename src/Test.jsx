import React, { useState } from 'react';
import { Grow, AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  backgroundColor: theme.palette.primary?.main || theme.palette.grey?.[300] || '#e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.getContrastText?.(theme.palette.primary?.main) || '#000000',
  padding: theme.spacing?.(2) || '16px',
}));

const ExpandableBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      position: 'relative'
    }}>
      <Box sx={{ flexGrow: 1 }} />
      <Grow in={isExpanded} style={{ transformOrigin: '0 100%' }}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            Expandable Box
          </Typography>
          <Typography variant="body1">
            This box grows when the button is clicked.
          </Typography>
        </StyledBox>
      </Grow>
      <AppBar position="static" color="default" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            startIcon={isExpanded ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            onClick={toggleExpand}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ExpandableBox;