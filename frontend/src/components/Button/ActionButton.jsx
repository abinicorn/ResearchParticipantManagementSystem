import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';

export default function ActionButton({pageCondition}) {
  
    const [open, setOpen] = React.useState(false);
    const placement ='bottom-start';
    const anchorRef = React.useRef(null);

    let actionList = [];

    function createData(icon, name) {
        return { icon, name };
    }

    if(pageCondition === 'sessionBoard') {
        
        actionList = [
            createData(<EditIcon/>, 'Edit Session'), 
            createData(<HighlightOffIcon/>, 'Delete Session'), 
            createData(<ListAltIcon/>, 'View Participants')
        ];

    } 
    if (pageCondition === "dashBoard") {

        actionList = [
            createData(<EditIcon/>, 'Edit Detail'),
            createData(<PeopleIcon/>, 'Manage Participant'),
            createData(<PeopleOutlineIcon/>, 'Manage Researcher'),
            createData(<CalendarMonthIcon/>, 'Manage Session'),
            createData(<DescriptionIcon/>, 'Generate Report'),
            createData(<HighlightOffIcon/>, 'Close Study')
        ];
    }
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
        <Box sx={{ display: 'flex', marginBottom: 5, marginLeft: 5}}>
            <Button
            variant="contained"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx = {{ position: 'absolute' }}
            >
            Action
            </Button>
        </Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement={placement}
          transition
          disablePortal
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {actionList.map((actionList) => (
                        <MenuItem key={actionList}>
                            <ListItemIcon>{actionList.icon}</ListItemIcon>
                            <Typography textAlign="center">{actionList.name}</Typography>
                        </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>

  );
}
