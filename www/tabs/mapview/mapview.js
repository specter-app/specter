angular.module('specter.tab.mapview', ['specter.tab.mapview.controller'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.mapview', {
      url: "/mapview",
      views: {
        'mapview-tab': {
          templateUrl: "tabs/mapview/mapview.html",
          // controllerAs: "mapview",
          //controllerAs did not work for some reason so I had to use mapviewCtrl as mapview
          controller: 'mapviewCtrl as mapview'
        }
      }
    });
});
