import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import BasicList from './components/SideBar';

function App() {
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit' component='div'>
            Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <BasicList />
      
    </div>
  );
}

export default App;
