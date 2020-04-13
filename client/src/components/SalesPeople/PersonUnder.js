import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '600px',
    height: '700px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    paddingLeft: '5vw',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  square: {
    width: '60px',
    height: '60px',
    backgroundColor: 'grey',
  },
}));

var PersonUnder = () => {
  const classes = useStyles();
  const [items, setItems] = React.useState('');
  const [locations, setLocations] = React.useState('');
  // const inputLabel = React.useRef(null);
  const handleChangeItem = (event) => {
    setItems(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocations(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography component="h5" variant="h7" align="center">
              SALES PERSON UNDER YOU{' '}
            </Typography>{' '}
          </Grid>
          <Grid item xs={3}>
            <Avatar variant="square" className={classes.square}>
              N{' '}
            </Avatar>{' '}
          </Grid>
          <Grid item xs={7}>
            <Typography>NAME </Typography> <Typography>DETAILS </Typography>{' '}
          </Grid>
          <Grid item xs={10}>
            <Typography component="h5" variant="h6" align="center">
              DETAILS{' '}
            </Typography>{' '}
          </Grid>
          <Grid item xs={10}>
            <Typography component="h5" variant="h6" align="center">
              DETAILS{' '}
            </Typography>{' '}
          </Grid>
          <Grid item xs={10}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="items-associated"> SET CHECKPOINTS </InputLabel>{' '}
              <Select
                //labelId="demo-simple-select-label"
                id="items-associated"
                value={items}
                onChange={handleChangeItem}
              >
                <MenuItem value={10}> OPTION 1 </MenuItem>{' '}
                <MenuItem value={20}> OPTION 2 </MenuItem>{' '}
                <MenuItem value={30}> OPTION 3 </MenuItem>{' '}
              </Select>{' '}
            </FormControl>{' '}
          </Grid>{' '}
          <Grid item xs={10}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {' '}
                SET TARGET{' '}
              </InputLabel>{' '}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locations}
                onChange={handleChangeLocation}
              >
                <MenuItem value={10}> Ten </MenuItem>{' '}
                <MenuItem value={20}> Twenty </MenuItem>{' '}
                <MenuItem value={30}> Thirty </MenuItem>{' '}
              </Select>{' '}
            </FormControl>{' '}
          </Grid>{' '}
          <br />
          <br />
          <br />
          <br />
          <Grid item xs={3}>
            <Avatar variant="square" className={classes.square}>
              T{' '}
            </Avatar>{' '}
          </Grid>
          <Grid item xs={7}>
            <Typography>TARGET </Typography>{' '}
          </Grid>
          <Grid item xs={3}>
            <Avatar variant="square" className={classes.square}>
              T{' '}
            </Avatar>{' '}
          </Grid>
          <Grid item xs={7}>
            <Typography>TARGET </Typography>{' '}
          </Grid>{' '}
        </Grid>{' '}
      </form>
    </Container>
  );
};

export default PersonUnder;
