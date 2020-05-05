import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './PersUnd.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  expanded: {
    margin: "0 auto"
  },
}));

var PersonUnder = () => {
  
  var [ListPeople, listing] = useState([]) 
 
  

 
  
  
  
  useEffect( () => {
    const word = 'Token ';
  const token = word.concat(`${localStorage.getItem('Token')}`);
  let formData = new FormData();
  formData.append('Authorization', `${token}`);
    fetch(`http://127.0.0.1:8000/Operations/GetSalespersonData`, {
      method: 'GET',
      headers: formData
    })
      .then((res) => res.json())
      .then((data) => {
       var myPeople = data.filter(d => d.User_ref.username == 'admin2');
       console.log(myPeople)
       listing(myPeople)
       console.log(ListPeople)
       
       
      })
      .catch((err) => {
        console.log(err);
      });
},[])


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
            <Typography component="h5" variant="h7" align="center" style={{fontSize : 

'115%', fontFamily: 'Segoe UI'}}>
              SALES PEOPLE UNDER YOU{' '}
            </Typography>{' '}
          </Grid>
          
          
          {ListPeople.length == 0
          ? <div>Loading People...</div>
          :<Grid item xs={10}> 
      {ListPeople.map((value) => {
        return (
        <ExpansionPanel className="panel" style={{width : '150%', height : '100px', 

marginBottom : '55px', marginLeft:'-35%'}} className={classes.expanded}>
        
        <ExpansionPanelSummary style={{marginBottom : '-65px'}} expandIcon=

{<ExpandMoreIcon />}>
        <div class="inf-container" ><img class="prof-pic" src = {value.Photo} />
        <div class="prim-details"><span class= 'dot' style={ value.isLoggedin ? { 

backgroundColor:'green'} : {backgroundColor : '#bbb'} }  ></span> <div class="per-

det"> <b>{value.Name}</b>,  {value.Age}</div>
        
        </div> </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{height:'5px',backgroundColor:'#cf5504', 

marginBottom:'0%'}}>
          <div class="coordinates">LAT - {value.last_location_lat} </div>
          <div class="coordinates">LONG - {value.last_location_long} </div>
        </ExpansionPanelDetails>
       
        </ExpansionPanel>
        )
      })}
    </Grid>
          }
         
    
         
          
          
          
          
          <br />
          <br />
          <br />
          <br />
          
          
            
        </Grid>
      </form>
    </Container>
  );
};

export default PersonUnder;
