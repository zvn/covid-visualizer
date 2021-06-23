import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function App() {
  return (
    <div className="">
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Paper >xs=12</Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper >xs=6</Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper >xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
