import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { TaskStatusV1, TaskV1 } from '../types/v1';
import { useRef, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface CreateDialogProps {
  open: boolean;
  onClose: (task: TaskV1) => void;
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
    const task: TaskV1 = {
      name,
      createdAt: new Date(),
      description,
      dueBy: dueBy!.toDate(), // Can't be false due to validation function
      status: TaskStatusV1.NEW,
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
      <DialogTitle>Create New Task</DialogTitle>
      <form ref={formRef}>
        <TextField label='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label='Description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label='Due By' value={dueBy} onChange={setDueBy} />
        </LocalizationProvider>
        {/* <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name='status' value={task.status} onChange={handleChange} required>
            <MenuItem value={TaskStatusV1.NEW}>{TaskStatusV1.NEW}</MenuItem>
            <MenuItem value={TaskStatusV1.COMPLETE}>{TaskStatusV1.COMPLETE}</MenuItem>
          </Select>
        </FormControl> */}
        <Button disabled={!isFormValid()} onClick={submit} type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateDialog;
