import * as turf from '@turf/turf';

/**
 *
 * @param {*} originObject {longitude, latitude}
 * @param {*} destinationObject {longitude, latitude}
 */
export const calculateDistance = (originObject, destinationObject) => {
  const originPoint = turf.point([
    originObject.longitude,
    originObject.latitude,
  ]);
  const destinationPoint = turf.point([
    destinationObject.longitude,
    destinationObject.latitude,
  ]);
  // console.log(
  //   `[Geolocation.js/calculateDistance] Origin: ${JSON.stringify(
  //     originPoint
  //   )} Destination: ${JSON.stringify(destinationPoint)}`
  // );

  const distance = turf.distance(originPoint, destinationPoint);

  return distance.toFixed(2);
};
