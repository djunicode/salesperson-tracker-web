import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' '}
      {'Copyright © '}{' '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website{' '}
      </Link>{' '}
      {new Date().getFullYear()} {'.'}{' '}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    paddingLeft: '5vw'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

var SalesPeople = () => {
  const classes = useStyles();
  const [items, setItems] = React.useState('');
  const [locations, setLocations] = React.useState('');
  const inputLabel = React.useRef(null);
  const handleChangeItem = event => {
    setItems(event.target.value);
  };
  const handleChangeLocation = event => {
    setLocations(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography component="h5" variant="h6">
                REGISTER NEW SALESPERSON{' '}
              </Typography>{' '}
            </Grid>{' '}
            <Grid item xs={10} sm={5}>
              <TextField
                autoComplete="fname"
                name="firstName"
                //variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>{' '}
            <Grid item xs={10} sm={5}>
              <TextField
                //variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>{' '}
            <Grid item xs={10}>
              <TextField
                //variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>{' '}
            <Grid item xs={10}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="items-associated">
                  {' '}
                  Items Associated{' '}
                </InputLabel>{' '}
                <Select
                  //labelId="demo-simple-select-label"
                  id="items-associated"
                  value={items}
                  onChange={handleChangeItem}
                >
                  <MenuItem value={10}> Ten </MenuItem>{' '}
                  <MenuItem value={20}> Twenty </MenuItem>{' '}
                  <MenuItem value={30}> Thirty </MenuItem>{' '}
                </Select>{' '}
              </FormControl>{' '}
            </Grid>{' '}
            <Grid item xs={10}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {' '}
                  Locations Serving{' '}
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
            </Grid>
          </Grid>{' '}
          <Grid item xs={10}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ADD{' '}
            </Button>{' '}
          </Grid>
        </form>{' '}
      </Paper>
    </Container>
  );
};

export default SalesPeople;
