import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



 

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

  }

}));

 

function Stocks() {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

 

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
       STOCKS
      </Typography>

      <ExpansionPanel

        expanded={expanded === 'panel1'}

        onChange={handleChange('panel1')}

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

        expanded={expanded === 'panel1'}

        onChange={handleChange('panel1')}

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

        expanded={expanded === 'panel1'}

        onChange={handleChange('panel1')}

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

        expanded={expanded === 'panel1'}

        onChange={handleChange('panel1')}

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

      </ExpansionPanel>{' '}

    </div>

  );

}
export default Stocks;