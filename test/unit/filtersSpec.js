'use strict';

/* jasmine specs for filters go here */

describe('Test for timeConversion filter', function() {
  var $filter;

  beforeEach(function(){
    module('specter');
    inject(function(_$filter_){
      $filter = _$filter_;
    });
  });

  it('should return the correct time: 1m', function(){
    var currentTime = new Date();
    currentTime = currentTime.toString();
    var timeDiff = $filter('timeConversion')(currentTime);
    expect(timeDiff).toEqual('1m');
  });
  it('should return the correct time: 17m', function(){
    var currentTime = new Date(new Date() - 1000000) ;
    currentTime = currentTime.toString();
    var timeDiff = $filter('timeConversion')(currentTime);
    expect(timeDiff).toEqual('17m');
  });
  it('should return the correct time: 3h', function(){
    var currentTime = new Date(new Date() - 10000000) ;
    currentTime = currentTime.toString();
    var timeDiff = $filter('timeConversion')(currentTime);
    expect(timeDiff).toEqual('3h');
  });
  it('should return the correct time: 2d', function(){
    var currentTime = new Date(new Date() - 150000000) ;
    currentTime = currentTime.toString();
    var timeDiff = $filter('timeConversion')(currentTime);
    expect(timeDiff).toEqual('2d');
  });
  it('should return the correct time: 1w+', function(){
    var currentTime = new Date(2013,2,1,1,10);
    currentTime = currentTime.toString();
    var timeDiff = $filter('timeConversion')(currentTime);
    expect(timeDiff).toEqual('1w+');
  });
});
