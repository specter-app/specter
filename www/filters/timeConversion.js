(function(){
  'use strict';

var timeConversion = function(){
  return function(time) {
    var convertedTime = new Date(String(time));
    var system_date = new Date();
    var diff = Math.floor((system_date - convertedTime) / 1000);
    if (diff <= 90) return '1 min ago';
    if (diff <= 3540) return Math.round(diff / 60) + ' mins ago';
    if (diff <= 5400) return '1 hour ago';
    if (diff <= 86400) return Math.round(diff / 3600) + ' hours ago';
    if (diff <= 129600) return '1 day ago';
    if (diff < 604800) return Math.round(diff / 86400) + ' days ago';
    else return '1 week ago';
  };
};

angular
  .module('specter')
  .filter('timeConversion', timeConversion);
})();
//pass the string from the database into newData()
