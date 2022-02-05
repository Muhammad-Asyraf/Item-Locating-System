export const groupBy = (arr, criteria) => {
  const newObj = arr.reduce((acc, currentValue) => {
    if (!acc[currentValue[criteria]]) {
      acc[currentValue[criteria]] = [];
    }
    acc[currentValue[criteria]].push(currentValue);
    return acc;
  }, {});
  return newObj;
};

export const productsGroupByStores = (products) => {
  const object = groupBy(products, 'store_uuid');
  const array = [];

  for ([key, value] of Object.entries(object)) {
    array.push({
      store: value.length != 0 && value[0]?.stores?.store_name,
      data: value,
    });
  }

  return array;
};
