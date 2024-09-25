import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography } from '@mui/material';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useFfService } from '../../hooks';

const options = new Array(17);

export const SelectWeekButtonGroup = ({selectedWeek, setSelectedWeek}) => {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const updateSelectedWkAndClosePopper = (week) => {
        setSelectedWeek(week);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                size="small"
                sx={{ 
                    height: '18px',
                    minWidth: 'auto',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    '& .MuiButtonGroup-grouped': {
                        border: 'none',
                    },
                    '& .MuiButton-root': {
                        height: '18px',
                        minHeight: '18px',
                        padding: '2px 4px',
                        fontSize: '14px',
                        lineHeight: 1,
                        borderRadius: 0,
                    },
                }}
            >
                <Button 
                    disabled={selectedWeek - 1 < 1}
                    onClick={() => setSelectedWeek(selectedWeek - 1)}
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF'
                        }
                    }}
                >
                    <FiChevronLeft size={16} />
                </Button>
                <Button
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF'
                        }
                    }}
                >
                    <Typography sx={{ fontSize: '12px', textTransform: 'capitalize' }}>Week {selectedWeek}</Typography>
                </Button>
                <Button
                    disabled={selectedWeek + 1 > 17} 
                    onClick={() => setSelectedWeek(selectedWeek + 1)}
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF'
                        }
                    }}
                >
                    <FiChevronRight size={16} />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((_, index) => (
                                        <MenuItem
                                            key={index}
                                            selected={index + 1 === selectedWeek}
                                            onClick={() => updateSelectedWkAndClosePopper(index + 1)}
                                        >
                                            Week {index + 1}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};
