import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import {formData} from '../../AuthToken';
import { Box } from '@material-ui/core';



 

const useStyles = makeStyles(theme => ({

  root: {

    width: '25%'

  },

  heading: {

    fontSize: theme.typography.pxToRem(15),

    flexBasis: '33.33%',

    flexShrink: 0

  },

  secondaryHeading: {

    fontSize: theme.typography.pxToRem(15),

    color: theme.palette.text.secondary

  },
  detail : {
    display:'block',
    textAlign:'initial'
  }

}));

 

function Stocks() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [assigned_items, setassigned_items] = useState([]);
  
  

  async function setupList()
  {
    var invList=[];
    fetch("http://127.0.0.1:8000/InventoryList", {method: 'GET',headers: formData})
      .then(response => response.json())
      .then(result => {
        for(let i=0;i<result.length;i++)
        {
          let itemDetail={"id":result[i].id,"target":result[i].Quantity};
          fetch(`http://127.0.0.1:8000/salesperson/${result[i].Salesperson_Ref}/`, {method: 'GET',headers: formData})
            .then(response => response.json())
            .then(result => {
              itemDetail = {...itemDetail,"salesperson":result.Name};
            })
            .catch(error => console.log('error', error));

          fetch(`http://127.0.0.1:8000/warehouse/${result[i].item_Ref}`, {method: 'GET',headers: formData})
            .then(response => response.json())
            .then(result => {
              itemDetail={...itemDetail,"quantity":result.Quantity,"item_name":result.Name,"description":result.Description};
      
              invList.push(itemDetail);
            
              setassigned_items([...invList]);
              
            })
            .catch(error => console.log('error', error));

          
        }
        
      })
      .catch(error => console.log('error', error));  
     
  }
  useEffect(() => {
    setupList();
  },[]);
  
  const handleChange = panel => (event, isExpanded) => {

    setExpanded(isExpanded ? panel : false);
  };

 

  return (

    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <Typography variant="h6" gutterBottom>
        ASSIGNED ITEMS
      </Typography>
      {
          assigned_items.map(temp => {
            return(
              <ExpansionPanel
                expanded={expanded === temp.id}
                onChange={handleChange(temp.id)}
              >

                <ExpansionPanelSummary

                  expandIcon={<ExpandMoreIcon />}

                >

                  <Typography className={classes.heading}>{ temp.item_name} </Typography>

                  <Typography

                    className={classes.secondaryHeading}

                    style={{ marginLeft: '35px' }}

                  >

                    {temp.salesperson}

                  </Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.detail}>

                  <Typography component="div">

                    Target : {temp.target}

                  </Typography>{' '}
                  <Typography component="div">

                    In Stock : {temp.quantity}

                  </Typography>
                  <Typography component="div" style={{display:'block'}}>

                    Description : {temp.description}

                  </Typography>
                  
                  

                </ExpansionPanelDetails>

              </ExpansionPanel>
            )
          })   
      }

      {/* <ExpansionPanel
        expanded={expanded === 1}
        onChange={handleChange(1)}
      >

        <ExpansionPanelSummary

          expandIcon={<ExpandMoreIcon />}

          id="panel1bh-header"

        >

          <Typography className={classes.heading}> Item 1 </Typography>{' '}

          <Typography

            className={classes.secondaryHeading}

            style={{ marginLeft: '35px' }}

          >

            remaining/original{' '}

          </Typography>{' '}

        </ExpansionPanelSummary>{' '}

        <ExpansionPanelDetails>

          <Typography>

            Other details of the item and salesperson associated{' '}

          </Typography>{' '}

        </ExpansionPanelDetails>{' '}

      </ExpansionPanel>{' '}

      <div style={{ height: '15px' }}></div>

      <ExpansionPanel

        expanded={expanded === 'panel2'}

        onChange={handleChange('panel2')}

      >

        <ExpansionPanelSummary

          expandIcon={<ExpandMoreIcon />}

          id="panel1bh-header"

        >

          <Typography className={classes.heading}> Item 2 </Typography>{' '}

          <Typography

            className={classes.secondaryHeading}

            style={{ marginLeft: '35px' }}

          >

            remaining/original{' '}

          </Typography>{' '}

        </ExpansionPanelSummary>{' '}

        <ExpansionPanelDetails>

          <Typography>

            Other details of the item and salesperson associated{' '}

          </Typography>{' '}

        </ExpansionPanelDetails>{' '}

      </ExpansionPanel>{' '}

      <div style={{ height: '15px' }}></div>

      <ExpansionPanel

        expanded={expanded === 'panel3'}

        onChange={handleChange('panel3')}

      >

        <ExpansionPanelSummary

          expandIcon={<ExpandMoreIcon />}

          id="panel1bh-header"

        >

          <Typography className={classes.heading}> Item 3 </Typography>{' '}

          <Typography

            className={classes.secondaryHeading}

            style={{ marginLeft: '35px' }}

          >

            remaining/original{' '}

          </Typography>{' '}

        </ExpansionPanelSummary>{' '}

        <ExpansionPanelDetails>

          <Typography>

            Other details of the item and salesperson associated{' '}

          </Typography>{' '}

        </ExpansionPanelDetails>{' '}

      </ExpansionPanel>{' '}

      <div style={{ height: '15px' }}></div>

      <ExpansionPanel

        expanded={expanded === 'panel4'}

        onChange={handleChange('panel4')}

      >

        <ExpansionPanelSummary

          expandIcon={<ExpandMoreIcon />}

          id="panel1bh-header"

        >

          <Typography className={classes.heading}> Item 4 </Typography>{' '}

          <Typography

            className={classes.secondaryHeading}

            style={{ marginLeft: '35px' }}

          >

            remaining/original{' '}

          </Typography>{' '}

        </ExpansionPanelSummary>{' '}

        <ExpansionPanelDetails>

          <Typography>

            Other details of the item and salesperson associated{' '}

          </Typography>{' '}

        </ExpansionPanelDetails>{' '}

      </ExpansionPanel>{' '} */}

    </div>

  );

}
export default Stocks;