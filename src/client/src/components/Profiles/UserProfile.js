import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();

  const { user } = props;
  console.log('user', user);

  return (
    <Grid
      item
      xs={12}
      md={12}
      container
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
              <BadgeRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              First Name
            </h4>
          </Grid>
          <Grid item xs={9}>
            <p>: &nbsp;&nbsp;{user.first_name}</p>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
              <BadgeTwoToneIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              Last Name
            </h4>
          </Grid>
          <Grid item xs={9}>
            <p>: &nbsp;&nbsp;{user.last_name}</p>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
              <ContactMailRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              Email
            </h4>
          </Grid>
          <Grid item xs={9}>
            <p>: &nbsp;&nbsp;{user.email}</p>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
              <ContactPhoneRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              Phone Number
            </h4>
          </Grid>
          <Grid item xs={9}>
            <p>: &nbsp;&nbsp;{user.phone_number}</p>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UserProfile;
