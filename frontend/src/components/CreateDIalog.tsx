import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { TaskStatus, Task } from '../types/tasks';
import { useRef, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface CreateDialogProps {
  open: boolean;
  onClose: (task: Task) => void;
  onCancel: () => void;
}

const tommorrow = new Date();
tommorrow.setDate(tommorrow.getDate() + 1);

const CreateDialog = (props: CreateDialogProps) => {
  const { onClose, open } = props;
  const [dueBy, setDueBy] = useState<Dayjs | null | undefined>(dayjs(tommorrow));
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const submit = () => {
    const task: Task = {
      name,
      createdAt: new Date(),
      description,
      dueBy: dueBy!.toDate(), // Can't be false due to isFormValid function
      status: TaskStatus.NEW,
    };
    onClose(task);
  };

  const isFormValid = () => {
    if (!name) return false;
    if (!dueBy) return false;
    return true;
  };

  return (
    <Dialog onClose={props.onCancel} open={open}>
      <DialogTitle id='create-new-task-title'>Create New Task</DialogTitle>
      <form ref={formRef}>
        <TextField id='name-field' label='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField id='description' label='Description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label='Due By' value={dueBy} onChange={setDueBy} />
        </LocalizationProvider>
        <Button id='submit-button' disabled={!isFormValid()} onClick={submit} type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateDialog;
