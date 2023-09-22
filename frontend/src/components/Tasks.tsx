import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { TaskStatus, Task, TaskStatusV2 } from '../types/tasks';
import { BACKEND_URL, DEFAULT_HEADERS } from '../utils/constants';
import './Tasks.css';
import TaskIcon from '@mui/icons-material/Task';
import { Button } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import FlagIcon from '@mui/icons-material/Flag';
import InventoryIcon from '@mui/icons-material/Inventory';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const taskItemStyles = { borderRadius: '1rem', marginBottom: '.5rem', border: '1px solid black', flexDirection: 'column', alignItems: 'start' };

const Tasks = () => {
  const [tasks, setTasks] = useState<[Task] | []>([]);

  const refreshTasks = async () => {
    const res = await (await fetch(`${BACKEND_URL}/v1/task/list`, { method: 'GET' })).json();
    setTasks(res);
  };

  const updateStatus = async (id: string, status: TaskStatus | TaskStatusV2) => {
    let apiVersion = 'v1';
    if (status === TaskStatusV2.IN_PROGRESS) {
      apiVersion = 'v2';
    }
    await fetch(`${BACKEND_URL}/${apiVersion}/task`, { method: 'PUT', headers: DEFAULT_HEADERS, body: JSON.stringify({ id, status }) });

    refreshTasks();
  };

  useEffect(() => {
    refreshTasks();
  }, [setTasks]);

  return (
    <div className='sideBar'>
      <Box sx={{ width: '33%', bgcolor: 'background.paper' }}>
        <List sx={{ padding: '.5rem' }}>
          <ListItem>
            <InventoryIcon color='primary' />
            <ListItemText sx={{ marginLeft: '1rem' }}>Backlog</ListItemText>
          </ListItem>
          {tasks
            .filter((task) => task.status === TaskStatus.NEW)
            .map((task) => (
              <ListItem sx={taskItemStyles} key={task.id}>
                <div className='task'>
                  <div className='taskName'>
                    <TaskIcon /> {task.name}
                  </div>
                  <ListItemText className='taskDescription'>{task.description}</ListItemText>
                  <Button sx={{ maxWidth: '5rem' }} variant='outlined' onClick={() => updateStatus(task.id!, TaskStatusV2.IN_PROGRESS)}>
                    <StartIcon />
                  </Button>
                </div>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ width: '33%', bgcolor: 'background.paper' }}>
        <List sx={{ padding: '.5rem' }}>
          <ListItem>
            <TerminalIcon color='warning' />
            <ListItemText sx={{ marginLeft: '1rem' }}>In Progress...</ListItemText>
          </ListItem>
          {tasks
            .filter((task) => task.status === TaskStatusV2.IN_PROGRESS)
            .map((task) => (
              <ListItem sx={taskItemStyles} key={task.id}>
                <div className='task'>
                  <div className='taskName'>
                    <TaskIcon /> {task.name}
                  </div>
                  <ListItemText className='taskDescription'>{task.description}</ListItemText>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button sx={{ maxWidth: '5rem' }} variant='outlined' onClick={() => updateStatus(task.id!, TaskStatus.NEW)}>
                      <ArrowBackIosNewIcon />
                    </Button>
                    <Button sx={{ maxWidth: '5rem' }} variant='outlined' onClick={() => updateStatus(task.id!, TaskStatus.COMPLETE)}>
                      <ArrowForwardIosIcon />
                    </Button>
                  </div>
                </div>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ width: '33%', bgcolor: 'background.paper' }}>
        <List sx={{ padding: '.5rem' }}>
          <ListItem>
            <FlagIcon color='success' />
            <ListItemText sx={{ marginLeft: '1rem' }}>Complete</ListItemText>
          </ListItem>
          {tasks
            .filter((task) => task.status === TaskStatus.COMPLETE)
            .map((task) => (
              <ListItem sx={taskItemStyles} key={task.id}>
                <div className='taskName'>
                  <TaskIcon /> {task.name}
                </div>
                <ListItemText className='taskDescription'>{task.description}</ListItemText>
                <Button sx={{ maxWidth: '5rem' }} variant='outlined' onClick={() => updateStatus(task.id!, TaskStatusV2.IN_PROGRESS)}>
                  <UnarchiveIcon />
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );
};

export default Tasks;
