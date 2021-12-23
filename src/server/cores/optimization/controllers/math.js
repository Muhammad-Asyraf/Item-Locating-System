// Credit: jhackshaw for the formulas

// Haversine great circle distance
const distance = (pt1, pt2) => {
    const [lng1, lat1] = pt1;
    const [lng2, lat2] = pt2;
    if (lat1 === lat2 && lng1 === lng2) {
      return 0;
    }
  
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
  
    var theta = lng1 - lng2;
    var radtheta = (Math.PI * theta) / 180;
  
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    return dist * 60 * 1.1515 * 1.609344;
  };
  
  module.exports.pathCost = path => {
    return path
      .slice(0, -1)
      .map((point, idx) => distance(point, path[idx + 1]))
      .reduce((a, b) => a + b, 0);
  };
  
  module.exports.counterClockWise = (p, q, r) => {
    return (q[0] - p[0]) * (r[1] - q[1]) < (q[1] - p[1]) * (r[0] - q[0]);
  };
  
  module.exports.intersects = (a, b, c, d) => {
    return (
      counterClockWise(a, c, d) !== counterClockWise(b, c, d) &&
      counterClockWise(a, b, c) !== counterClockWise(a, b, d)
    );
  };
  
  module.exports.setDifference = (setA, setB) => {
    const ret = new Set(setA);
    setB.forEach(p => {
      ret.delete(p);
    });
    return ret;
  };
  
  module.exports.rotateToStartingPoint = (path, startingPoint) => {
    const startIdx = path.findIndex(p => p === startingPoint);
    path.unshift(...path.splice(startIdx, path.length));
  };

  module.exports.shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }