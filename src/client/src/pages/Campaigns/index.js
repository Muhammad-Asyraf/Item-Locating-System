import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CampaignListPage from './CampaignList';
import CampaignCreatePage from './CampaignCreate';
import CampaignEditPage from './CampaignEdit';

const Campaign = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={CampaignListPage} />
        <Route path={`${match.path}/create`} exact component={CampaignCreatePage} />
        <Route path={`${match.path}/edit/:uuid`} exact component={CampaignEditPage} />
      </Switch>
    </>
  );
};
export default Campaign;
