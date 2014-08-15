'use strict';

/* jasmine specs for filters go here */

describe('specter/tabs', function() {
  var $rootScope, $state, $injector;
  beforeEach(module('specter'));
  //we can call module instead of angular.mock.module because angular.module.mock is
  //published on window for global access
  beforeEach(inject(function(_$state_) {
    $state = _$state_;
  }));
  //inject is used to add dependencies to the test

  it('should direct to create when you click on create tab', function() {
    expect($state.href('tab.create')).toEqual('#/tab/create');
  });

  it('should direct to profile when you click on profile tab', function() {
    expect($state.href('tab.profile')).toEqual('#/tab/profile');
  });

  it('should direct to setting when you click on setting tab', function() {
    expect($state.href('tab.setting')).toEqual('#/tab/setting');
  });

  it('should direct to mapview when you click on mapview setting', function() {
    expect($state.href('tab.mapview')).toEqual('#/tab/mapview');
  });

  // it('should direct to marcopolo when you click on marcopolo setting', function() {
  //   expect($state.href('tab.marcoplo')).toEqual('#/tab/marcopolo/:53e95b608b480cd4103720fc');
  // });

});
