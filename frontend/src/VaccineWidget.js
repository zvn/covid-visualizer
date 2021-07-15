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
import VaccineTrendingStatusCard from './VaccineTrendingStatus';

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
  var sample_data = {
    people_vaccinated: 0,
    people_fully_vaccinated: 0,
    people_vaccinated_per_hundred: 0,
    people_fully_vaccinated_per_hundred: 0
  };
  var diff = {};
  if (start === null) {
    start = sample_data;
  }
  for (var key in sample_data) {
    diff[key] = end[key] - start[key];
  }
  diff['date_str'] = end['date_str'];
   
  return diff;
}

function VaccineWidget(props) {
  var data_counts = props.data.length;
  var end = data_counts - 1;
  for (; end >= 0; end --) {
    if ('people_vaccinated' in props.data[end]) {
      break;
    }
  }

  var start = 0;
  for (; start <= end; start++) {
    if ('people_vaccinated' in props.data[start]) {
      break;
    }
  }
  // preserve at most 181 days of data to display in charts
  // then we can count difference of latest 180 days
  if (end - start > 180) {
    start = end - 180;
  }
  var accumulated_data = [{
    people_vaccinated: 0,
    people_fully_vaccinated: 0,
    people_vaccinated_per_hundred: 0,
    people_fully_vaccinated_per_hundred: 0
  }];

  //var diff_data = [];
  if (end >= start) {
    accumulated_data = props.data.slice(start, end + 1);
  }
  
  
  const classes = widgetStyles({color: green});
  


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
            <VaccineOverallStatusCard data = {accumulated_data[accumulated_data.length - 1]}></VaccineOverallStatusCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <VaccineTrendingStatusCard 
              history={accumulated_data}></VaccineTrendingStatusCard>
          </Grid>

        </Grid>          
      </CardContent>
    </Card>
  );
}

export default VaccineWidget;
