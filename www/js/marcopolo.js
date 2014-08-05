function distanceBetween(coord1, coord2) {
  // http://www.geodatasource.com/developers/javascript
}

function transitionColor(distance) {
  var numColorTransitionSteps = 200;

  var startColor = [204, 51, 0];
  var endColor = [0, 153, 255];

  var result = [];
  result[0] = startColor[0] + (endColor[0] - startColor[0]) * distance / numColorTransitionSteps;
  result[1] = startColor[1] + (endColor[1] - startColor[1]) * distance / numColorTransitionSteps;
  result[2] = startColor[2] + (endColor[2] - startColor[2]) * distance / numColorTransitionSteps;

  return result;
}

// console.log(transitionColor(200));
// console.log(transitionColor(100));
// console.log(transitionColor(0));
