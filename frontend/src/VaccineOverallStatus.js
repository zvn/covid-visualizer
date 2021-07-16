import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
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
  indent_right: {
    paddingRight: 10,
  },
  indent_down: {
    paddingBottom: 10,
  },
  icon_matrix_container: {
    minWidth: 250,
  }
}));


function VaccineOverallStatusCard(props) {
  const classes = widgetStyles({color: green, vaccine_color: green});
  const data = props.data;
  var no_dose_icon = (<SvgIcon component={StopIcon} className={classes.no_dose_icon} viewBox = "5 5 12 12"></SvgIcon>);
  var first_dose_icon = (<SvgIcon component={StopIcon} className={classes.first_dose_icon} viewBox = "5 5 12 12"></SvgIcon>);
  var second_dose_icon = (<SvgIcon component={StopIcon} className={classes.second_dose_icon} viewBox = "5 5 12 12"></SvgIcon>);

  
  var icon_matrix = [];
  for(var i = 9; i >= 0; i--) {
    for (var j = 1; j <= 10; j++) {
      var block_percent = i * 10 + j;
      if (data.people_fully_vaccinated_per_hundred >= block_percent) {
        icon_matrix.push(second_dose_icon);
      } else if (data.people_vaccinated_per_hundred >= block_percent) {
        icon_matrix.push(first_dose_icon);
      } else {
        icon_matrix.push(no_dose_icon);
      }
    }
    if (i > 0) {
      icon_matrix.push((<br></br>));
    }
  }
  
  return (
    <Card elevation={0} className={classes.root}>
      
      <Grid container >
        <Grid item xs={12} sm={4} className={classes.indent_right + " " + classes.indent_down} >
        <Typography eventName={classes.title} variant="h5" component="h6">
          Overall Status
        </Typography>
        <Typography  color="textSecondary" align="right">
            First Dose in Percent {first_dose_icon}
          </Typography>
          <Typography variant="h4" align="right" className={classes.first_dose}>
            {data.people_vaccinated_per_hundred}%
          </Typography>
          <Typography  color="textSecondary" align="right">
            Second Dose in Percent {second_dose_icon}
          </Typography>
          <Typography variant="h4" align="right" className={classes.second_dose}>
            {data.people_fully_vaccinated_per_hundred}%
          </Typography>
          
        </Grid>
        <Grid item xs={12} sm={8} className={classes.icon_matrix_container + " " + classes.indent_down} >
          {icon_matrix}
        </Grid>
      </Grid>
    </Card>
  );
}

export default VaccineOverallStatusCard;
