import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AddItem from './AddItem';
import Stocks from './Stocks';

import {
  Container,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Box,
} from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import AssignProduct from './AssignProduct';

const purp = purple[900];

const drawerWidth = 241;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: purp,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  makeCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  setSize: {
    height: 100,
    width: 100,
  },
  makeSpace: {
    margin: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));
function Inventory() {
  const classes = useStyles();
  const logoutUser = async () => {
    const r = window.confirm("Do you really want to logout?")
    if (r == true) {
      await localStorage.setItem('Token', null);
      await localStorage.setItem('Status', 'LoggedOut');
      await localStorage.setItem('Image', null)
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SALESPERSON TRACKER
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Container maxWidth="sm" className={classes.makeCenter}>
          <Avatar className={ classes.setSize } src={localStorage.getItem('Image')} />
        </Container>
        <Typography component="h2" variant="h6" style={{ paddingTop: 20 }}>
          {localStorage.getItem('Name')}
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          Manager
        </Typography>

        <ButtonGroup
          style={{ boxShadow: 'none' }}
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
          disableElevation
        >
          <Button href="/dashboard" className={classes.makeSpace}>
            Dashboard
          </Button>
          <Button
            href="/inventory"
            className={classes.makeSpace}
            color="secondary"
          >
            Inventory
          </Button>
          <Button href="/sales-people" className={classes.makeSpace}>
            SalesPeople
          </Button>
          <Button href="/" className={classes.makeSpace} onClick={logoutUser}>
            Logout{' '}
          </Button>
        </ButtonGroup>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <Stocks />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <AssignProduct/>
              </Paper>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <AddItem />
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );
}

export default Inventory;
