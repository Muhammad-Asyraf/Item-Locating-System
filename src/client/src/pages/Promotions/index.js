import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PromotionListPage from './PromotionList';
import PromotionCreatePage from './PromotionCreate';
import PromotionEditPage from './PromotionEdit';

const Promotion = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={PromotionListPage} />
        <Route path={`${match.path}/create`} exact component={PromotionCreatePage} />
        <Route path={`${match.path}/edit/:uuid`} exact component={PromotionEditPage} />
      </Switch>
    </>
  );
};
export default Promotion;
