import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
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
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ADD ITEM
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Name"
            fullWidth
            autoComplete="fname"
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
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Units</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Kg</MenuItem>
              <MenuItem value={20}>grams</MenuItem>
              <MenuItem value={30}>Tons</MenuItem>
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
            autoComplete="billing country"
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
            autoComplete="billing country"
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
