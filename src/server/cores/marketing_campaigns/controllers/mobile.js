const Campaign = require('../model');
const Promotion = require('../../promotions/model');
const Product = require('../../products/model');
const getLogger = require('../../../utils/logger');

const campaignLogger = getLogger(__filename, 'campaign');

exports.getAllCampaigns = async (req, res, next) => {
  try {
    let campaigns = await Campaign.query().withGraphFetched('store');
    res.json(campaigns);
  } catch (err) {
    campaignLogger.warn(`Error retrieving all campaigns`);
    next(err);
  }
};

exports.getCampaign = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    let campaign = await Campaign.query().for(uuid).withGraphFetched('store');
    res.json(campaign);
  } catch (err) {
    campaignLogger.warn(`Error retrieving all campaigns`);
    next(err);
  }
};

exports.getCampaignProducts = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    let products = await Promotion.query()
      .where('campaign_uuid', uuid)
      .withGraphFetched('products.stores');
    res.json(products);
  } catch (err) {
    campaignLogger.warn(`Error retrieving all campaigns`);
    next(err);
  }
};
