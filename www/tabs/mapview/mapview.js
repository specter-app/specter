angular.module('specter.tab.mapview', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.mapview', {
      url: "/mapview",
      views: {
        'mapview-tab': {
          templateUrl: "tabs/mapview/mapview.html",
          // controller: 'MarcopoloCtrl'
        }
      }
    })
});
