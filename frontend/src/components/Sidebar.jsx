import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SessionContext } from '../pages/SessionContextProvider';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({isSession}) {
    
    const { studyList } = React.useContext(SessionContext);
    
    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {studyList.map((text, index) => (
                    <ListItem key={index} disablePadding component={Link} to={isSession ? `/session/${text._id}`: `/study-participants/${text._id}`}> 
                        <ListItemButton>
                        <ListItemIcon>
                            <AssignmentRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text.studyName} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}