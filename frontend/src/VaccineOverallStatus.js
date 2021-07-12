import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

import { BottomNavigation, CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Paper } from '@material-ui/core';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    color: ({vaccine_color}) => vaccine_color[first_color_tone],
  },
  second_dose: {
    color: ({vaccine_color}) => vaccine_color[second_color_tone],
  },
  first_dose_icon: {
    color: ({vaccine_color}) => vaccine_color[first_color_tone],
    fill: ({vaccine_color}) => vaccine_color[first_color_tone],
  },
  trendingIcon: {
    verticalAlign: 'bottom',
    fontSize: 19,
    paddingBottom: 3,
  },
  indent: {
    paddingLeft: 10,
  }
}));


function VaccineOverallStatusCard(props) {
  const classes = widgetStyles({color: green, vaccine_color: green});
  const data = props.data;
  var icon = (<SvgIcon component={StopIcon} className={classes.first_dose_icon} viewBox = "5 5 12 12"></SvgIcon>);
  var icon_origin = (<SvgIcon component={StopIcon} className={classes.first_dose_icon}></SvgIcon>);
  var icons = [icon_origin, icon, icon, icon, icon_origin];
  // {data.people_vaccinated_per_hundred}%
  return (
    <Card elevation={0} className={classes.root}>
      <Typography eventName={classes.title} variant="h6" component="h6">
        Current Status
      </Typography>
      <Grid container >
        <Grid item xs={6} sm={6} className={classes.indent}>
        <Typography  color="textSecondary">
            First Dose in Percent
          </Typography>
          <Typography variant="h3" className={classes.first_dose}>
            {data.people_vaccinated_per_hundred}%
          </Typography>
          <Typography  color="textSecondary">
            Second Dose in Percent
          </Typography>
          <Typography variant="h3" className={classes.second_dose}>
            {data.people_fully_vaccinated_per_hundred}%
          </Typography>
          
        </Grid>
        <Grid item xs={6} sm={6}>
          {icons}
        </Grid>
      </Grid>
      
    </Card>
  );
}

export default VaccineOverallStatusCard;
