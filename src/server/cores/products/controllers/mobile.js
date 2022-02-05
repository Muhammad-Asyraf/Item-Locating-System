const Product = require('../model');
const Store = require('../../stores/model');
const Category = require('../../categories/model');
const SubCategory = require('../../categories/sub_categories/model');
const getLogger = require('../../../utils/logger');

const productLogger = getLogger(__filename, 'product');

exports.searchProducts = async (req, res, next) => {
  try {
    const query = req.query;
    // console.log(JSON.stringify(query));
    let productQuery;

    if ('category' in query && query?.category != '') {
      let subcategories = SubCategory.query().where(
        'category_uuid',
        query.category
      );
      productQuery = SubCategory.relatedQuery('products')
        .for(subcategories)
        .withGraphFetched('[sub_categories.category]');
    } else if ('subcategory' in query && query?.subcategory != '') {
      productQuery = SubCategory.relatedQuery('products')
        .for(query.subcategory)
        .withGraphFetched('[sub_categories.category]');
    } else {
      productQuery = Product.query();
    }

    if ('uuid' in query && query?.uuid != '') {
      productQuery = productQuery.where('store_uuid', query.uuid);
    }

    // Add where clause for search
    // productQuery = productQuery
    //   .where('name', 'ilike', `%${query.search}%`)
    //   .withGraphFetched('stores');

    const products = await productQuery
      .where('is_active', true)
      .where('name', 'ilike', `%${query.search}%`)
      .withGraphFetched('[stores,promotions,images]')
      .modifyGraph('promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      })
      .modifyGraph('images', (builder) => {
        builder.select('path');
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
    productLogger.warn(`Error retrieving all products`);
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.query()
      .select('uuid', 'name', 'image_uuid')
      .withGraphFetched('image')
      .modifyGraph('image', (builder) => {
        builder.select('path');
      });

    res.json(categories);
  } catch (err) {
    productLogger.warn(`Error retrieving categories`);
    next(err);
  }
};

exports.getSubCategories = async (req, res, next) => {
  try {
    const { category_uuid } = req.params;
    const subcategories = await Category.relatedQuery('sub_categories')
      .for(category_uuid)
      .select('uuid', 'name', 'image_uuid');

    res.json(subcategories);
  } catch (err) {
    productLogger.warn(`Error retrieving subcategories`);
    next(err);
  }
};

exports.getProductsGroupByStore = async (req, res, next) => {
  try {
    const query = req.query;
    const stores = await Store.query()
      .withGraphFetched('products.[stores,promotions,images]')
      .modifyGraph('products', (builder) => {
        builder
          .where('name', 'ilike', `%${query.search}%`)
          .where('is_active', true);
      })
      .modifyGraph('products.promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      })
      .modifyGraph('products.images', (builder) => {
        builder.select('path');
      });
    console.log(JSON.stringify(stores));

    const updatedStores = stores.map((store) => {
      const { products, ...storeAttrs } = store;

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

      return {
        ...storeAttrs,
        products: updatedProducts,
      };
    });
    res.json(updatedStores);
  } catch (err) {
    productLogger.warn(`Error retrieving grouped products`);
    next(err);
  }
};
