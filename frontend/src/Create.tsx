import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { TaskStatusV1, TaskV1 } from './types/v1';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import DateFnsUtils from '@date-io/date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface CreateDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

const tommorrow = new Date();
tommorrow.setDate(tommorrow.getDate() + 1);

const CreateDialog = (props: CreateDialogProps) => {
  const { onClose, open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const [task, setTask] = useState<TaskV1>({
    name: '',
    createdAt: new Date(),
    dueBy: new Date(),
    status: TaskStatusV1.NEW,
  } as TaskV1);

  const [dueBy, setDueBy] = useState<Dayjs | null | undefined>(dayjs(tommorrow));

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(task); // Handle submit logic here, e.g., API call.
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <TextField label='Name' name='name' value={task.name} onChange={handleChange} required fullWidth />
        <TextField label='Description' name='description' value={task.description || ''} onChange={handleChange} fullWidth />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='Due By'
            value={dueBy}
            onChange={setDueBy}
          />
        </LocalizationProvider>
        {/* <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name='status' value={task.status} onChange={handleChange} required>
            <MenuItem value={TaskStatusV1.NEW}>{TaskStatusV1.NEW}</MenuItem>
            <MenuItem value={TaskStatusV1.COMPLETE}>{TaskStatusV1.COMPLETE}</MenuItem>
          </Select>
        </FormControl> */}
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
      {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Add account' />
          </ListItemButton>
        </ListItem>
      </List> */}
    </Dialog>
  );
};

export default CreateDialog;
