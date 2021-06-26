import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';

const widgetStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function NumberWidget(props) {
  const classes = widgetStyles();
  return (
    <Paper className={classes.paper}>
      hello
    </Paper>
  );
}

export default NumberWidget;
