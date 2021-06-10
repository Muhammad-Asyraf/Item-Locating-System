import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ItemList from './ItemList/ItemList';
import ItemDetail from './ItemDetail';
import ItemCreate from './ItemCreate';

const Item = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={ItemList} />
        <Route path={`${match.path}/item`} exact component={ItemDetail} />
        <Route path={`${match.path}/create`} exact component={ItemCreate} />
      </Switch>
    </>
  );
};
export default withRouter(Item);
