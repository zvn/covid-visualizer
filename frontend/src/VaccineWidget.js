import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import VaccineOverallStatusCard from './VaccineOverallStatus';
import VaccineTrendingStatusCard from './VaccineTrendingStatus';


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
        People vaccinated <Typography color="textSecondary" variant="subitle2" align="right" className={classes.second_dose}>
             - Up to {accumulated_data[accumulated_data.length - 1]['date_str']}
          </Typography>
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
