import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
//import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1, 2, 4)
  },

  papericon: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#009688'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: '#009688'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    fname: '',
    lname: '',
    username: '',
    email: '',

    password: '',

    showPassword: false
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: {
        main: '#d32f2f'
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <CssBaseline />
        <div className={classes.papericon}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel color="secondary">First Name</InputLabel>
                  <Input
                    id="fname"
                    name="fname"
                    autoComplete="fname"
                    color="secondary"
                    required
                    fullWidth
                    type="text"
                    value={values.fname}
                    onChange={handleChange('fname')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel color="secondary">Last Name</InputLabel>
                  <Input
                    id="lname"
                    name="lname"
                    autoComplete="lname"
                    color="secondary"
                    required
                    fullWidth
                    type="text"
                    value={values.lname}
                    onChange={handleChange('lname')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel color="secondary">Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    color="secondary"
                    required
                    fullWidth
                    type="email"
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel color="secondary">UserName</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    color="secondary"
                    required
                    fullWidth
                    type="text"
                    value={values.username}
                    onChange={handleChange('username')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel color="secondary">Password</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    autoComplete="password"
                    color="secondary"
                    required
                    fullWidth
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  color="secondary"
                  required
                  control={<Checkbox value="allowExtraEmails" />}
                  label="By Signing Up, I agree to the Terms and Conditions."
                />
              </Grid>
            </Grid>

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.submit}
                fullWidth
              >
                <Typography variant="h6">SIGN UP</Typography>
              </Button>
            </ThemeProvider>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2" color="secondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
