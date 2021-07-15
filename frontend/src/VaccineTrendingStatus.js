import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { indigo } from '@material-ui/core/colors';

import { BottomNavigation, CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Paper } from '@material-ui/core';

import { AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import NumberFormat from 'react-number-format';
import StopIcon from '@material-ui/icons/Stop';

var first_color_tone = 500;
var second_color_tone = 900;

const widgetStyles = makeStyles(props => ({
  root: {
    minWidth: 275,
    padding: 0,
  },
  title: {
    
  },
  trendingCaption: {
    padding: 4,
    color: ({color}) => color[900],
    backgroundColor: ({color}) => color[100],
  },
  first_dose: {
    
  },
  second_dose: {
    
  },
  no_dose_icon: {
    color: grey[first_color_tone],
    marginBottom: -4,
  },
  first_dose_icon: {
    color: ({vaccine_color}) => vaccine_color[first_color_tone],
    marginBottom: -4,
  },
  second_dose_icon: {
    color: ({vaccine_color}) => vaccine_color[second_color_tone],
    marginBottom: -4,
  },
  trendingIcon: {
    verticalAlign: 'bottom',
    fontSize: 19,
    paddingBottom: 3,
  },
  indent: {
    paddingLeft: 10,
  },
  indent_down: {
    paddingBottom: 10,
  },
  icon_matrix_container: {
    minWidth: 250,
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

function VaccineTrendingStatusCard(props) {
  var vaccine_color = green;
  const classes = widgetStyles({color: vaccine_color, vaccine_color: vaccine_color});
  var display_data = props.history;
  
  var weekly_diff = {
    people_vaccinated: 0,
    people_fully_vaccinated: 0,
    people_vaccinated_per_hundred: 0,
    people_fully_vaccinated_per_hundred: 0
  };
  for (var key in weekly_diff) {
    weekly_diff[key] = display_data[display_data.length - 1][key];
  }
  if (props.history.length > 7) {
    for (var key in weekly_diff) {
      weekly_diff[key] = weekly_diff[key] - display_data[display_data.length - 8][key];
    }
  }
  
  return (
    <Card elevation={0} className={classes.root}>
      <Grid container >
        <Grid item xs={12} sm={4} md={4} className={classes.indent_down}>
          <Typography eventName={classes.title} variant="h5" component="h6">
            Progress
          </Typography>
          <Typography  color="textSecondary">
            First Dose in 7 days
          </Typography>
            <Grid alignItems="flex-end" container spacing={1}>
              <Grid item>
                <Typography variant="h4" className={classes.first_dose}>
                  <NumberFormat 
                    value={weekly_diff.people_vaccinated} 
                    thousandSeparator={true} 
                    displayType={'text'}></NumberFormat>
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.trendingCaption} >
                  +{Math.round(weekly_diff.people_vaccinated_per_hundred * 100) / 100}%
                </Typography>
              </Grid>
            </Grid>
          
          <Typography  color="textSecondary">
            Second Dose in 7 days
          </Typography>
          <Grid alignItems="flex-end" container spacing={1}>
              <Grid item>
                <Typography variant="h4" className={classes.second_dose}>
                  <NumberFormat 
                    value={weekly_diff.people_fully_vaccinated} 
                    thousandSeparator={true} 
                    displayType={'text'}></NumberFormat>
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.trendingCaption} >
                  +{Math.round(weekly_diff.people_fully_vaccinated_per_hundred * 100) / 100}%
                </Typography>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={8} className={classes.indent}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={display_data}>
                <XAxis dataKey={'date_str'}/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                <defs>
                  <linearGradient id="color1dose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={vaccine_color[first_color_tone]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={vaccine_color[first_color_tone]} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="color2dose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={vaccine_color[second_color_tone]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={vaccine_color[second_color_tone]} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip/>
                <Legend/>
                <Area name={props.title} type="monotone" dot={false} legendType="line" dataKey={'people_vaccinated_per_hundred'} stroke={vaccine_color[first_color_tone]} fill="url(#color1dose)" fillOpacity={1} name="1st dose" />
                <Area name={props.title} type="monotone" dot={false} legendType="line" dataKey={'people_fully_vaccinated_per_hundred'} stroke={vaccine_color[second_color_tone]} fill="url(#color2dose)" fillOpacity = {1} name="2nd dose" />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
      </Grid>
    </Card>
  );
}

export default VaccineTrendingStatusCard;
