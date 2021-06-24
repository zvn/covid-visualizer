import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h5">COVID-19 Summary for Taiwan</Typography>
          </Toolbar>
        </AppBar>
      <Grid container spacing={3} justify="center">
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
