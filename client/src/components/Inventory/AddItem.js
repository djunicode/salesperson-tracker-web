import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {},
  wrapper: {
    margin: 20,
  },
}));
function AddItem() {
  const classes = useStyles();
  const [itemName, setitemName] = useState("");
  const [quantity, setquantity] = useState(0);
  const [units, setunits] = useState("");
  const [date, setdate] = useState("");
  const [cost_price, setcost_price] = useState(0);
  const [details,setDetails] = useState("");
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ADD ITEM
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="itemName"
            name="itemName"
            label="Name"
            fullWidth
            value = {itemName}
            onChange={e => setitemName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            value = {quantity}
            onChange={e => setquantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Units</InputLabel>
            <Select labelId="demo-simple-select-label" 
            id="demo-simple-select" 
            value = {units}
            onChange={e => setunits(e.target.value)}
            >
              <MenuItem value={"kg"}>Kg</MenuItem>
              <MenuItem value={"g"}>grams</MenuItem>
              <MenuItem value={"tons"}>Tons</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <form noValidate>
            <TextField
              fullWidth
              id="date"
              label="Arrival Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value = {date}
              onChange={e => setdate(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={6} sm={6}></Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="Cost"
            name="Cost"
            label="Cost Price"
            fullWidth
            value = {cost_price}
            onChange={e => setcost_price(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={6}></Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="detail"
            name="detail"
            label="Add Details"
            fullWidth
            value = {details}
            onChange={e => setDetails(e.target.value)}
          />
        </Grid>
        <Grid xs={12} className={classes.wrapper}>
          <Button variant="contained" color="primary" fullWidth>
            ADD
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default AddItem;
