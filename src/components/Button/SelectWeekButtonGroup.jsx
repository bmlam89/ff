import * as React from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography } from '@mui/material';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useFfService } from '../../hooks';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export const SelectWeekButtonGroup = () => {
    const ffService = useFfService();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        };

        const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
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
                        fontSize: '10px',
                        lineHeight: 1,
                        borderRadius: 0,
                    },
                }}
            >
                <Button onClick={handleClick}>
                    <FiChevronLeft size={16} />
                </Button>
                <Button
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <Typography sx={{ fontSize: '12px', textTransform: 'capitalize' }}>Week {ffService.selectedLeague.current_week}</Typography>
                </Button>
                <Button onClick={handleClick}>
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
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
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
