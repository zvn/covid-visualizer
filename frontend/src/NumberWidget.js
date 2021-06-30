import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
  var today_counter = 0;
  var today_diff = 0;
  var today_percent = 0;
  var week_counter = 0;
  var week_diff = 0;
  var week_percent = 0;

  var data_counts = props.data.length;
  if (data_counts > 0) {
    today_counter = props.data[data_counts - 1][props.datakey + '_daily'];
    today_diff = today_counter;
    today_percent = 100;
    week_counter = props.data[data_counts - 1][props.datakey + '_total'];
    week_diff = week_counter;
    week_percent = 100;
  }
  if (data_counts > 1) {
    today_diff = today_counter - props.data[data_counts - 2][props.datakey + '_daily'];
    today_percent = today_diff * 100 / props.data[data_counts - 2][props.datakey + '_daily'];
    today_percent = Math.round(today_percent * 100) / 100;
  }
  if (data_counts > 7) {
    week_counter = 
      props.data[data_counts - 1][props.datakey + '_total'] - 
      props.data[data_counts - 8][props.datakey + '_total'];
    week_diff = today_counter - props.data[data_counts - 8][props.datakey + '_daily'];
    week_percent = week_diff * 100 / (week_counter - week_diff);
    week_percent = Math.round(week_percent * 100) / 100;
  }

  

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
        <Grid alignItems="flex-end" container spacing={2}>
          <Grid item>
            <Typography variant="h3" component="h2">
              {week_counter}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.caption} >
              {week_diff} ({week_percent}%)
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="caption" color="textSecondary">
          Daily
        </Typography>
        <Grid alignItems="flex-end" container spacing={2}>
          <Grid item>
            <Typography variant="h5" component="h2">
              {today_counter}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.caption} >
              {today_diff} ({today_percent}%)
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default NumberWidget;
