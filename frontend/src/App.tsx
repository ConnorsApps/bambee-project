import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import './App.css';
import Tasks from './components/Tasks';
import { useState } from 'react';
import CreateDialog from './components/CreateDIalog';
import { Task } from './types/tasks';
import { BACKEND_URL, DEFAULT_HEADERS } from './utils/constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function App() {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <div className='App'>
      <CreateDialog
        onCancel={() => setCreateOpen(false)}
        open={createOpen}
        onClose={(task: Task) => {
          fetch(`${BACKEND_URL}/v1/task`, { method: 'POST', headers: DEFAULT_HEADERS, body: JSON.stringify(task) });
        }}
      />
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography id='tasks-header' variant='h6' color='inherit' component='div'>
            Tasks
          </Typography>
          <Button id='new-task-button' sx={{ marginLeft: '4rem', alignItems: 'center', gap: '.5rem' }} color='success' variant='contained' onClick={() => setCreateOpen(!createOpen)}>
            <AddCircleOutlineIcon />
            New
          </Button>
        </Toolbar>
      </AppBar>
      <Tasks />
    </div>
  );
}

export default App;
