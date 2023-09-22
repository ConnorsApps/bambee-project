import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateDialog from './Create';
import { useState } from 'react';
import { TaskV1 } from '../types/v1';

const BasicList = () => {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <CreateDialog
        open={createOpen}
        onClose={(value: TaskV1) => {
          console.log('value', value);
        }}
      />
      <nav aria-label='main mailbox folders'>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setCreateOpen(!createOpen)}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>New</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label='secondary mailbox folders'>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Trash' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#simple-list'>
              <ListItemText primary='Spam' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default BasicList;
