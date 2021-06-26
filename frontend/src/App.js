import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import NumberWidget from './NumberWidget';
import Box from '@material-ui/core/Box';

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
  },
}));



function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h5">COVID-19 Summary for Taiwan</Typography>
          </Toolbar>
        </AppBar>
      <Box m={3}>
        <Grid container m={10} spacing={3} justify="center" className={classes.grid}>
          <Grid item xs={6}>
            <NumberWidget></NumberWidget>
          </Grid>
          <Grid item xs={6}>
            <NumberWidget></NumberWidget>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
