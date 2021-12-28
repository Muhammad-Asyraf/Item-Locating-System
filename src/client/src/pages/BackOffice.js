import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemPages from './Items';
import ProductPages from './Products';
import StoreLayouts from './StoreLayouts';
import NotFoundPage from './NotFound';
import Layout from '../components/Layout/Layout';

const BackOffice = () => {
  const storeUrl = localStorage.getItem('storeUrl');

  return (
    <Layout>
      <Switch>
        <Route path={`/${storeUrl}/item`} component={ItemPages} />
        <Route path={`/${storeUrl}/product`} component={ProductPages} />
        <Route path={`/${storeUrl}/layout`} component={StoreLayouts} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default BackOffice;
