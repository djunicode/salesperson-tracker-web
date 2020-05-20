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

import {formData} from '../../AuthToken';

const useStyles = makeStyles((theme) => ({
  formControl: {},
  wrapper: {
    margin: 20,
  },
}));
function AssignProduct() {
    const classes = useStyles();
    const [quantity, setquantity] = useState(null);
    const [s_name, sets_name] = useState(null);
    const [sp_list, setsp_list] = useState([]);
    const [item_list,setitem_list] = useState([]);
    const [items,setitem] = useState(null);

    async function fetchSalesperson(){
        fetch("http://127.0.0.1:8000/salesperson", {method: 'GET',headers: formData})
            .then(response => response.json())
            .then(result => {
                const m_id = localStorage.getItem('m_id');
                const arr = result.filter(item => {
                    return(
                        item.Managed_By==m_id
                    )
                })
                setsp_list([...arr]);
            })
            .catch(error => console.log('error', error));

        
    }
    async function fetchWarehouseItems()
    {
        fetch("http://127.0.0.1:8000/warehouse", {method: 'GET',headers: formData})
            .then(response => response.json())
            .then(result => {
                setitem_list([...result]);
            })
            .catch(error => console.log('error', error));
    }
    const addToInventory = (event)=> {
      //manager assigns item to salesperson
      var bodyForm = new FormData();
      bodyForm.append("Quantity", quantity);
      bodyForm.append("Salesperson_Ref", s_name);
      bodyForm.append("item_Ref", items);
      
      
      var requestOptions = {
        method: 'POST',
        headers: formData,
        body: bodyForm,
      };
          
      fetch("http://127.0.0.1:8000/inventory/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      window.location.reload();  
    }
    useEffect(() => {
        fetchSalesperson();
        fetchWarehouseItems();
    },[])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ASSIGN ITEM
      </Typography>
      <Grid container spacing={4}>
        
      <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Items</InputLabel>
            <Select labelId="demo-simple-select-label" 
            id="demo-simple-select" 
            value = {items}
            onChange={e => setitem(e.target.value)}
            >
               {
                    
                    item_list.map(temp => {   
                        return(
                            <MenuItem key={temp.pk} value={temp.pk}>
                              {temp.Name} - {temp.Quantity}
                            </MenuItem>
                        )     
                        
                    })
                    
                }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Salesperson</InputLabel>
            <Select labelId="demo-simple-select-helper-label" 
            id="demo-simple-select-helper" 
            value = {s_name}
            onChange={e => sets_name(e.target.value)}
            >
                {
                    
                    sp_list.map(temp => {   
                        return(
                            <MenuItem key={temp.id} value={temp.id}>{temp.Name}</MenuItem>
                        )     
                        
                    })
                    
                }
              
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
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
        <Grid xs={12} className={classes.wrapper}>
          <Button onClick={addToInventory} variant="contained" color="primary" fullWidth>
            ASSIGN
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default AssignProduct;
