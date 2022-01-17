import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileDetailPage from './ProfileDetail';
import ProfileEditPage from './ProfileEdit';

const Profile = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/edit/:uuid`} exact component={ProfileEditPage} />
        <Route path={`${match.path}`} component={ProfileDetailPage} />
      </Switch>
    </>
  );
};
export default Profile;
