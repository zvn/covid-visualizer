import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';
import { CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const widgetStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 12,
  },
  title: {
    
  },
  caption: {
    
  },
  majornumber: {

  },
  secondarynumber: {

  }
});


function NumberWidget(props) {
  const classes = widgetStyles();

  return (
    <Card className={classes.root}>
      <Typography eventName={classes.title} variant="h4" component="h2">
        {props.title}
      </Typography>
      <Typography color="textSecondary">
        {props.subtitle}
      </Typography>
      <CardContent>
        <Typography className={classes.caption} color="textSecondary">
          Last 7 days
        </Typography>
        <Typography variant="h3" component="h2">
          456
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Daily
        </Typography>
        <Typography variant="h5" component="h2">
          123
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NumberWidget;
