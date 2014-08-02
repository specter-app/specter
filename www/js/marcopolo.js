function distanceBetween(coord1, coord2) {

}

function redBlue(distance) {
	// distance for now is percentage along transition
  var red = [204, 51, 0];
  var blue = [0, 153, 255];
  var result; 

  var maxDistance = 200;
  var change = [Math.abs((red[0] - blue[0])/maxDistance), Math.abs((red[1] - blue[1])/maxDistance), 
    Math.abs((red[2] - blue[2])/maxDistance) ];

  var color = [change[0] * distance, change[1] * distance, change[2] * distance]
  result = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  return result;
	// outputs the color value
}


function redBlueMitch(distance) {
  var n = 200;

  var red = [204, 51, 0];
  var blue = [0, 153, 255];

  var result = [];
  result[0] = red[0] + (blue[0] - red[0]) * distance / n;
  result[1] = red[1] + (blue[1] - red[1]) * distance / n;
  result[2] = red[2] + (blue[2] - red[2]) * distance / n;

  return result;
}

console.log(redBlueMitch(200));
console.log(redBlueMitch(100));
console.log(redBlueMitch(0));
