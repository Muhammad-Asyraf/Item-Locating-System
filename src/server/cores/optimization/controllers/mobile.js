const math = require('./math');
const getLogger = require('../../../utils/logger');

const optimizationLogger = getLogger(__filename, 'auth');

// Optimize route : Normal
// Points format : [Longitude,Latitude]
// Algorithm :  Convex Hull
const calculate = async (points) => {
  
  const sp = points[0];

  // Find the "left most point" by looking for the left most longitude
  let leftmost = points[0];
  for (const p of points) {
    if (p[1] < leftmost[1]) {
      leftmost = p;
    }
  }

  // Assign initial path point with leftmost
  const path = [leftmost];

  while (true) {
    const curPoint = path[path.length - 1];
    let [selectedIdx, selectedPoint] = [0, null];

    // Find the "most counterclockwise" point from the rest
    for (let [idx, p] of points.entries()) {
      if (
        !selectedPoint ||
        math.counterClockWise(curPoint, p, selectedPoint) === 2
      ) {
        // This point is counterclockwise with respect to the current hull
        // and selected point (e.g. more counterclockwise)
        [selectedIdx, selectedPoint] = [idx, p];
      }
    }

    // Adding this to the hull so it's no longer available
    points.splice(selectedIdx, 1);

    // If back to the furthest left point, formed a cycle, break
    if (selectedPoint === leftmost) {
      break;
    }

    // Add to hull
    path.push(selectedPoint);
  }

  // If there is extra points in the hull
  while (points.length > 0) {
    let [bestRatio, bestPointIdx, insertIdx] = [Infinity, null, 0];

    for (let [freeIdx, freePoint] of points.entries()) {
      // For every free point, find the point in the current path
      // that minimizes the cost of adding the point minus the cost of
      // the original segment
      let [bestCost, bestIdx] = [Infinity, 0];
      for (let [pathIdx, pathPoint] of path.entries()) {
        const nextPathPoint = path[(pathIdx + 1) % path.length];

        // The new cost minus the old cost
        const evalCost =
          math.pathCost([pathPoint, freePoint, nextPathPoint]) -
          math.pathCost([pathPoint, nextPathPoint]);

        if (evalCost < bestCost) {
          [bestCost, bestIdx] = [evalCost, pathIdx];
        }
      }

      // Figure out how "much" more expensive this is with respect to the
      // overall length of the segment
      const nextPoint = path[(bestIdx + 1) % path.length];
      const prevCost = math.pathCost([path[bestIdx], nextPoint]);
      const newCost = math.pathCost([path[bestIdx], freePoint, nextPoint]);
      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIdx, insertIdx] = [ratio, freeIdx, bestIdx + 1];
      }
    }

    const [nextPoint] = points.splice(bestPointIdx, 1);
    path.splice(insertIdx, 0, nextPoint);
  }

  // Rotate the array so that starting point is back first
  const startIdx = path.findIndex((p) => p === sp);
  path.unshift(...path.splice(startIdx, path.length));

  // Go back home
  path.push(sp);

  return path;
};

// An algorithm test method.
exports.getOptimizedPathFromPoints = async (req, res, next) => {
  try {
    // Store coordinates
    const { points } = req.body;
    let calculatedPath = 'none';
    let jsonRes;
    // Call calculate
    if (points.length != 0) {
      //console.log(points)
      //console.log("Initial Cost : " + math.pathCost(points))
      calculatedPath = await calculate(points);
      //console.log(calculatedPath)
      //console.log("Best Cost : " + math.pathCost(calculatedPath))

      jsonRes = {
        path: calculatedPath
      }

      res.json(jsonRes);
    }
  } catch (error) {
    optimizationLogger.warn(`Error calculating : ${error}`);
    next();
  }
};

// Calculate optimzation route for a specified cart.
exports.getOptimizedPathFromCart = async (req, res, next) => {
  try {
    // Get cart's store latlng with cart id
    // Store coordinates
    // Call calculate
  } catch (error) {}
};
