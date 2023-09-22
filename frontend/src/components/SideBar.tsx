import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { TaskStatusV1, TaskV1 } from '../types/v1';
import { BACKEND_URL, DEFAULT_HEADERS } from '../utils/constants';
import './SideBar.css';
import TaskIcon from '@mui/icons-material/Task';
import { Button } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import FlagIcon from '@mui/icons-material/Flag';
import InventoryIcon from '@mui/icons-material/Inventory';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const taskItemStyles = { borderRadius: '1rem', marginBottom:'.5rem', border: '1px solid black', flexDirection: 'column', alignItems: 'start' };

const BasicList = () => {
  const [tasks, setTasks] = useState<[TaskV1] | []>([]);

  const refreshTasks = async () => {
    const res = await (await fetch(`${BACKEND_URL}/v1/task/list`, { method: 'GET' })).json();
    setTasks(res);
  };

  useEffect(() => {
    refreshTasks();
  }, [setTasks]);

  return (
    <div className='sideBar'>
      <Box sx={{ width: '50%', bgcolor: 'background.paper' }}>
        <List sx={{ padding: '.5rem' }}>
          <ListItem>
            <InventoryIcon color='primary' />
            <ListItemText sx={{ marginLeft: '1rem' }}>Backlog</ListItemText>
          </ListItem>
          {tasks
            .filter((task) => task.status === TaskStatusV1.NEW)
            .map((task) => (
              <ListItem sx={taskItemStyles} key={task.id}>
                <div className='task'>
                  <div className='taskName'>
                    <TaskIcon /> {task.name}
                  </div>
                  <ListItemText className='taskDescription'>{task.description}</ListItemText>
                  <Button
                    sx={{ maxWidth: '5rem' }}
                    variant='outlined'
                    onClick={async () => {
                      await fetch(`${BACKEND_URL}/v1/task`, { method: 'PUT', headers: DEFAULT_HEADERS, body: JSON.stringify({ id: task.id, status: TaskStatusV1.COMPLETE }) });
                      refreshTasks();
                    }}
                  >
                    <StartIcon />
                  </Button>
                </div>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ width: '50%', bgcolor: 'background.paper' }}>
      <List sx={{ padding: '.5rem' }}>
          <ListItem>
            <FlagIcon color='success' />
            <ListItemText sx={{ marginLeft: '1rem' }}>Complete</ListItemText>
          </ListItem>
          {tasks
            .filter((task) => task.status === TaskStatusV1.COMPLETE)
            .map((task) => (
              <ListItem sx={taskItemStyles} key={task.id}>
                <div className='taskName'>
                  <TaskIcon /> {task.name}
                </div>
                <ListItemText className='taskDescription'>{task.description}</ListItemText>
                <Button
                    sx={{ maxWidth: '5rem' }}
                    variant='outlined'
                    onClick={async () => {
                      await fetch(`${BACKEND_URL}/v1/task`, { method: 'PUT', headers: DEFAULT_HEADERS, body: JSON.stringify({ id: task.id, status: TaskStatusV1.NEW }) });
                      refreshTasks();
                    }}
                  >
                    <UnarchiveIcon />
                  </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );
};

export default BasicList;
