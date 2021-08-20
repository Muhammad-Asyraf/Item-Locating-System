import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ItemListPage from './ItemList';
import ItemCreatePage from './ItemCreate';
import ItemEditPage from './ItemEdit';

const Item = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={ItemListPage} />
        <Route path={`${match.path}/create`} exact component={ItemCreatePage} />
        <Route path={`${match.path}/edit/:uuid`} exact component={ItemEditPage} />
      </Switch>
    </>
  );
};
export default withRouter(Item);
