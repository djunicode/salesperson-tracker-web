import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  setSize: {
    height: 40,
    width: 40,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AddPersonToTeam = () => {
  const classes = useStyles();
  const [spData, setspData] = React.useState([]);
  const [fetchAgain, setFetchAgain] = React.useState(false);

  const sendData = (sp) => {
    const word = 'Token ';
    const token = word.concat(`${localStorage.getItem('Token')}`);
    let formData = new FormData();
    formData.append('Authorization', `${token}`);
    let bodyForm = new FormData();
    bodyForm.append('Username', `${sp[1]}`);
    fetch(`http://127.0.0.1:8000/Operations/AddSalesperson`, {
      method: 'POST',
      headers: formData,
      body: bodyForm,
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchAgain(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const word = 'Token ';
    const token = word.concat(`${localStorage.getItem('Token')}`);
    let formData = new FormData();
    formData.append('Authorization', `${token}`);

    fetch(`http://127.0.0.1:8000/Operations/GetSalespersonData`, {
      method: 'GET',
      headers: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter((sp) => sp.Managed_By === null);
        console.log(available)
        const finalData = available.map((sp) => [
          sp.Name,
          sp.User_ref.username,
          sp.Photo
        ]);
        console.log(finalData)
        setspData(finalData);
        setFetchAgain(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchAgain]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <form className={ classes.form } noValidate>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 10 }>
            <Typography component="h5" variant="h6">
              ADD SALESPERSON TO TEAM
            </Typography>
          </Grid>
          <Grid item xs={ 10 }></Grid>
        </Grid>
        <Grid item xs={ 12 }>
          { spData.length == 0 ? (
            <Grid item xs={ 12 }>
              <Typography component="h8" variant="h9">
                There is no salesperson free right now
              </Typography>
            </Grid>
          ) : (
              <List dense className={ classes.root }>
                { spData.map((sp) => {
                  return (
                    <Grid item xs={ 12 }>
                      <ListItem key={ sp[1] }>
                        <Grid item xs={ 2 }>
                          <Avatar className={ classes.setSize } src={ sp[2] } />
                        </Grid>
                        <Grid item xs={ 4 }>
                          <ListItemText id={ sp[1] } primary={ `${sp[0]}` } />
                        </Grid>
                        <Grid item xs={ 2 }></Grid>
                        <Grid item xs={ 4 }>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                            onClick={ sendData.bind('this', sp) }
                          >
                            ADD
                        </Button>
                        </Grid>
                      </ListItem>
                    </Grid>
                  );
                }) }
              </List>
            ) }
        </Grid>
      </form>
    </Container>
  );
};

export default AddPersonToTeam;
