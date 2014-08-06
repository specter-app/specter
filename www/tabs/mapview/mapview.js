angular.module('specter.tab.mapview', ['specter.tab.mapview.controller'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.mapview', {
      url: "/mapview",
      views: {
        'mapview-tab': {
          templateUrl: "tabs/mapview/mapview.html",
          controller: 'mapviewCtrl'
        }
      }
    })
});
