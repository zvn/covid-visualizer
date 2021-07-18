import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const widgetStyles = makeStyles(props => ({
  root: {
    minWidth: 275,
    padding: 12,
  },
  trendingCaption: {
    padding: 4,
    color: ({color}) => color[900],
    backgroundColor: ({color}) => color[100],
  },
  trendingIcon: {
    verticalAlign: 'bottom',
    fontSize: 19,
    paddingBottom: 3,
  },
  indent_down: {
    paddingBottom: 10,
  }
}));


function NumberWidget(props) {
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
    if (data_counts <= 14) {
      week_diff = week_counter - props.data[data_counts - 8][props.datakey + '_total'];
      week_percent = week_diff * 100 / (week_counter - week_diff);
      week_percent = Math.round(week_percent * 100) / 100;
    }
  }
  if (data_counts > 14) {
    week_diff = week_counter - (
      props.data[data_counts - 8][props.datakey + '_total'] - props.data[data_counts - 15][props.datakey + '_total']);
    week_percent = week_diff * 100 / (week_counter - week_diff);
    week_percent = Math.round(week_percent * 100) / 100;
  }

  const weekly_trending_icon = (week_diff < 0 ? ArrowDownwardIcon : ArrowUpwardIcon);
  
  var color = grey;
  if (Math.abs(week_percent) > 0.1) {
    if (props['more_better'] === (week_percent > 0)) {
      color = green;
    } else {
      color = red;
    }
  }

  const classes = widgetStyles({color: color});
  var display_data = [];
  for(var i = 0; i < 180 && i <= props.data.length; i++) {
    display_data.push(props.data[props.data.length - i]);
  }
  display_data.reverse();
  

  return (
    <Card className={classes.root}>
      <Typography eventName={classes.title} variant="h4" component="h2">
        {props.title}
      </Typography>
      <Typography color="textSecondary">
        {props.subtitle}
      </Typography>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} md={4} className={classes.indent_down}>
            <Typography color="textSecondary">
              Last 7 days
            </Typography>
            <Grid alignItems="flex-end" container spacing={1}>
              <Grid item>
                <Typography variant="h3" component="h2">
                  {week_counter}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.trendingCaption} >
                  <SvgIcon component={weekly_trending_icon} className={classes.trendingIcon}></SvgIcon>
                  {Math.abs(week_diff)}({Math.abs(week_percent)}%)
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="caption" color="textSecondary">
              Daily (Latest on {props.data[data_counts - 1]['date_str']})
            </Typography>
            <Typography variant="h5" component="h2">
              {today_counter}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={display_data}>
                <XAxis dataKey={props['display_key']}/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line name={props.title} type="monotone" dot={false} legendType="line" dataKey={props.datakey + '_daily'} stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>          
      </CardContent>
    </Card>
  );
}

export default NumberWidget;
