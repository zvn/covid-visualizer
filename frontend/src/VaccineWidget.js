import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { BottomNavigation, CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VaccineOverallStatusCard from './VaccineOverallStatus';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const widgetStyles = makeStyles(props => ({
  root: {
    minWidth: 275,
    padding: 12,
  },
  title: {
    
  },
  trendingCaption: {
    padding: 4,
    color: ({color}) => color[900],
    backgroundColor: ({color}) => color[100],
  },
  majorNumber: {

  },
  secondaryNumber: {

  },
  trendingIcon: {
    verticalAlign: 'bottom',
    fontSize: 19,
    paddingBottom: 3,
  }
}));

function countVaccineDiff(start, end) {
  var diff = {};
  if (start !== null) {
    for (var key in end) {
      diff[key] = end[key] - start[key];
    }
  } else {
    return end;
  } 
  return diff;
}

function VaccineWidget(props) {
  

  var data_counts = props.data.length;

  var i = 0;
  for (; i < data_counts; i++) {
    if ('people_vaccinated' in props.data[i]) {
      break;
    }
  }
  // preserve at most 180 days of data to display in charts
  if (data_counts - i > 180) {
    i = data_counts - 180;
  }
  var display_data = [{
    people_vaccinated: 0,
    people_fully_vaccinated: 0,
    people_vaccinated_per_hundred: 0,
    people_fully_vaccinated_per_hundred: 0
  }];
  if (data_counts > 0) {
    display_data = props.data.slice(i);
  }
  
  const classes = widgetStyles({color: green});
  
  var latest_daily_diff = display_data[display_data.length - 1];
  var latest_weekly_diff = display_data[display_data.length - 1];
  if (display_data.length > 1) {
    latest_daily_diff = countVaccineDiff(display_data[display_data.length - 2], display_data[display_data.length - 1]);
  }
  if (display_data.length > 7) {
    latest_weekly_diff = countVaccineDiff(display_data[display_data.length - 8], display_data[display_data.length - 1]);
  }


  return (
    <Card className={classes.root}>
      <Typography eventName={classes.title} variant="h4" component="h2">
        Vaccinations
      </Typography>
      <Typography color="textSecondary">
        People vaccinated
      </Typography>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6}>
            <VaccineOverallStatusCard data = {display_data[display_data.length - 1]}></VaccineOverallStatusCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            
          </Grid>

        </Grid>          
      </CardContent>
    </Card>
  );
}

export default VaccineWidget;
