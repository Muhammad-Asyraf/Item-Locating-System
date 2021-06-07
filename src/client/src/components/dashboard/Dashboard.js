import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import {
  clearActiveUser,
  verifying,
  verified,
  clearState,
} from '../../redux/features/authSlice';
import { auth } from '../../firebase';

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearState());
  }, []);

  const handleSignOut = async () => {
    dispatch(verifying());
    await auth.signOut();
    dispatch(clearActiveUser());
    dispatch(verified());
    history.push('/auth/login');
  };

  return (
    <div>
      Dashboard Page
      <Button variant="text" color="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
