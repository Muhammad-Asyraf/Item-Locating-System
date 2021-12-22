export const createBounds = (routeGeoJSON) => {
  let highestLongitude = -Infinity;
  let highestLatitude = -Infinity;
  let lowestLongitude = Infinity;
  let lowestLatitude = Infinity;
  let coordinates = routeGeoJSON.coordinates;

  for (point of coordinates) {
    if (point[0] > highestLongitude) {
      highestLongitude = point[0];
    }

    if (point[1] > highestLatitude) {
      highestLatitude = point[1];
    }

    if (point[0] < lowestLongitude) {
      lowestLongitude = point[0];
    }

    if (point[1] < lowestLatitude) {
      lowestLatitude = point[1];
    }
  }

  return {
    ne: [highestLongitude, highestLatitude],
    sw: [lowestLongitude, lowestLatitude],
  };
};

// Method to calculate the midpoint between coordinates (Non-weighted)
export const calculateCenterCoordinate = async (coordinates) => {
  console.log(
    `calculateCenterCoordinates() coordinates:` + JSON.stringify(coordinates)
  );
  let x = 0;
  let y = 0;
  let z = 0;
  let totalWeight = coordinates.length;
  let pointsRadians = coordinates.map((point) => {
    let long = (point[0] * Math.PI) / 180;
    let lat = (point[1] * Math.PI) / 180;

    return {
      x: Math.cos(lat) * Math.cos(long),
      y: Math.cos(lat) * Math.sin(long),
      z: Math.sin(lat),
    };
  });

  //console.log(JSON.stringify(pointsRadians));

  for (point of pointsRadians) {
    x = x + point.x;
    y = y + point.y;
    z = z + point.z;
  }

  //console.log(`X=${x}, Y=${y}, Z=${z}`);

  x = x / totalWeight;
  y = y / totalWeight;
  z = z / totalWeight;

  let long = Math.atan2(y, x);
  let hyp = Math.sqrt(x * x + y * y);
  let lat = Math.atan2(z, hyp);

  long = (long * 180) / Math.PI;
  lat = (lat * 180) / Math.PI;
  return [long, lat];
};
