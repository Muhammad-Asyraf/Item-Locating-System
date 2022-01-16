import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemPages from './Items';
import ProductPages from './Products';
import StoreLayoutPages from './StoreLayouts';
import PromotionPages from './Promotions';
import CampaignPages from './Campaigns';
import ProfilePages from './Profiles';
import NotFoundPage from './NotFound';

import Layout from '../components/Layout/Layout';

const BackOffice = () => {
  const storeUrl = localStorage.getItem('storeUrl');

  return (
    <Layout>
      <Switch>
        <Route path={`/${storeUrl}/item`} component={ItemPages} />
        <Route path={`/${storeUrl}/product`} component={ProductPages} />
        <Route path={`/${storeUrl}/layout`} component={StoreLayoutPages} />
        <Route path={`/${storeUrl}/promotion`} component={PromotionPages} />
        <Route path={`/${storeUrl}/marketing-campaign`} component={CampaignPages} />
        <Route path={`/${storeUrl}/profile`} component={ProfilePages} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default BackOffice;
