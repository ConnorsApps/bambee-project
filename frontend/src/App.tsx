import { AppBar, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import './App.css';
import BasicList from './components/SideBar';
import { useState } from 'react';
import CreateDialog from './components/Create';
import { TaskV1 } from './types/v1';
import { BACKEND_URL, DEFAULT_HEADERS } from './utils/constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function App() {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <div className='App'>
      <CreateDialog
        onCancel={() => setCreateOpen(false)}
        open={createOpen}
        onClose={(task: TaskV1) => {
          fetch(`${BACKEND_URL}/v1/task`, { method: 'POST', headers: DEFAULT_HEADERS, body: JSON.stringify(task) });
        }}
      />
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit' component='div'>
            Tasks
          </Typography>
          <Button sx={{ marginLeft: '4rem', alignItems: 'center', gap:'.5rem' }} color='success' variant='contained' onClick={() => setCreateOpen(!createOpen)}>
            <AddCircleOutlineIcon />
            New
          </Button>
        </Toolbar>
      </AppBar>
      <BasicList />
    </div>
  );
}

export default App;
