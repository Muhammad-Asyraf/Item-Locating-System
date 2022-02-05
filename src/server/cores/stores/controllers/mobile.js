const Store = require('../model');
const Campaign = require('../../marketing_campaigns/model');
const Layout = require('../../layouts/model');
const Category = require('../../categories/model');
const SubCategory = require('../../categories/sub_categories/model');
const Product = require('../../products/model');
const getLogger = require('../../../utils/logger');

const storeLogger = getLogger(__filename, 'store');

exports.getStores = async (req, res, next) => {
  try {
    const query = req.query;
    let storeQuery = Store.query();

    if ('uuid' in query && query?.uuid != '') {
      storeQuery = storeQuery.where('uuid', query.uuid);
    }

    const stores = await storeQuery;
    res.json(stores);
  } catch (err) {
    storeLogger.warn(`Error getting stores list`);
    next(err);
  }
};

exports.getStoreProducts = async (req, res, next) => {
  try {
    const query = req.query;
    let productQuery = Store.relatedQuery('products').for(query.uuid);

    if ('type' in query && query?.type != '') {
      if (query?.type == 'promotional') {
      } else if (query?.type == 'bitl') {
        productQuery = productQuery.where('product.stock_status', 'Low Stock');
      }
    }

    const products = await productQuery
      .withGraphFetched('[stores,promotions]')
      .modifyGraph('promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      });
    const updatedProducts = products.map((product) => {
      const { promotions, retail_price, ...remainingAtts } = product;

      const updatedPromotion = promotions.map((promotion) => {
        const { start_date, end_date, promotion_type, meta_data } = promotion;
        let sale_price;
        let display_name;

        const currentDateTime = new Date().getTime();
        const startDateTime = new Date(start_date).getTime();
        const endDateTime = new Date(end_date).getTime();

        const activePromotion =
          currentDateTime >= startDateTime && currentDateTime <= endDateTime;
        const scheduledPromotion =
          currentDateTime <= startDateTime && currentDateTime <= endDateTime;
        const expiredPromotion =
          currentDateTime >= startDateTime && currentDateTime >= endDateTime;

        let promotion_status;

        if (activePromotion) {
          promotion_status = 'active';
        } else if (scheduledPromotion) {
          promotion_status = 'scheduled';
        } else if (expiredPromotion) {
          promotion_status = 'expired';
        }

        const isDiscountBasedPromo =
          promotion_type === 'Basic' || promotion_type === 'Bundle';

        if (isDiscountBasedPromo) {
          const {
            meta_data: { discount, discountType },
          } = promotion;
          let saving;

          if (discountType.percentage_off_checked) {
            saving = (parseFloat(discount) / 100) * parseFloat(retail_price);
            display_name = `${discount}% off`;
          } else {
            saving = parseFloat(discount);
            display_name = `${discount} off`;
          }

          sale_price = parseFloat(retail_price) - saving;
        } else {
          display_name = `Buy ${meta_data?.BxGy.buyQty} Get ${meta_data?.BxGy.freeQty}`;
        }

        return {
          ...promotion,
          promotion_status,
          sale_price,
          display_name,
        };
      });

      return {
        ...remainingAtts,
        retail_price,
        promotions: updatedPromotion,
      };
    });
    res.json(updatedProducts);
  } catch (err) {
    storeLogger.warn(`Error getting store's products`);
    next(err);
  }
};

exports.getStoreCampaigns = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    let campaigns = await Campaign.query()
      .where('store_uuid', uuid)
      .withGraphFetched('store');
    res.json(campaigns);
  } catch (err) {
    storeLogger.warn(`Error retrieving store's campaigns`);
    next(err);
  }
};

exports.getStoreLayouts = async (req, res, next) => {
  try {
    const { uuid } = req.query;
    let layouts = await Layout.query()
      .where('store_uuid', uuid)
      .where('is_active', true);
    res.json(layouts);
  } catch (err) {
    storeLogger.warn(`Error retrieving store's campaigns`);
    next(err);
  }
};
