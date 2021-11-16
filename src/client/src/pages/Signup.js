import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Alert from '@mui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';

import Stepper from '../components/Signup/Stepper';

import {
  // setHeader,
  verified,
  selectAuthMessage,
  selectAuthIsLoading,
} from '../redux/features/authSlice';
import { signup } from '../redux/thunks/authThunk';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative',
    // backgroundColor: '#003366',
    // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
  },
  card: {
    '& > *': {
      margin: theme.spacing(1),
    },
    maxWidth: '90vw',
    minHeight: '65vh',
    minWidth: '60vw',
    borderRadius: '20px !important',
    marginTop: '60px',
    marginBottom: '60px',
  },
  cardContent: {
    flexGrow: 1,
    marginLeft: '50px',
    marginRight: '50px',
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);
  // const [state, setState] = useState({
  //   open: true,
  // });

  const signupHandler = async (data) => {
    const { type } = await dispatch(signup(data));

    if (type.includes('fulfilled')) {
      const storeUrl = localStorage.getItem('storeUrl');
      history.push(`/${storeUrl}/dashboard`);
    }
    dispatch(verified());
  };

  // const handleClose = () => {
  //   setState({
  //     ...state,
  //     open: false,
  //   });
  // };

  console.log(authErrors);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.root}
      >
        <div
          style={{
            zIndex: '-10',
            position: 'absolute',
            width: '100%',
            height: '100% ',
            backgroundColor: '#003366',
            // backgroundColor: '#dc3d4b',
            // clipPath: 'polygon(54% 0, 100% 0%, 100% 100%, 0% 100%)',
            // clipPath: 'ellipse(102% 100% at 102% 0%)',
            // 'clip-path': 'ellipse(168% 100% at 138.5% 0%)',
            clipPath: 'ellipse(162% 100% at 154.16% 0%)',
          }}
        />
        <Card elevation={6} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container spacing={0}>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                {authErrors.length !== 0 && (
                  <Snackbar
                    open={authErrors}
                    // onClose={handleClose}
                    TransitionComponent={(props) => <Slide {...props} direction="up" />}
                  >
                    <Alert
                      variant="filled"
                      severity="error"
                      elevation={6}
                      sx={{
                        width: '100%',
                        backgroundColor: 'rgb(211, 47, 47)',
                      }}
                    >
                      {authErrors}
                    </Alert>
                  </Snackbar>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stepper onSignup={signupHandler} authLoading={authLoading} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default SignUp;
