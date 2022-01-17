import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

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
  inputFields: {
    width: '80%',
  },
}));

const UserProfileEdit = (props) => {
  const classes = useStyles();

  const { user } = props;

  return (
    <Grid container spacing={0}>
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
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.first_name}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
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
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.last_name}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
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
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.email}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
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
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.phone_number}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
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
                <PasswordRoundedIcon
                  sx={{ position: 'relative', top: 5, mr: 1.5 }}
                  color="primary"
                />
                Current Password
              </h4>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.last_name}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={3}>
              <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                <KeyRoundedIcon
                  sx={{ position: 'relative', top: 5, mr: 1.5 }}
                  color="primary"
                />
                New Password
              </h4>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.email}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={3}>
              <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                <VpnKeyRoundedIcon
                  sx={{ position: 'relative', top: 5, mr: 1.5 }}
                  color="primary"
                />
                Confirm Password
              </h4>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.inputFields}
                variant="outlined"
                defaultValue={user.email}
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfileEdit;
