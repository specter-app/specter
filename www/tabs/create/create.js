angular.module('specter.tab.create', ['specter.tab.create.controller'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('tab.create', {
    url: "/create",
    views: {
      'create-tab': {
        templateUrl: "tabs/create/create.html",
        controller: 'createCtrl as create'
      }
    },
    resolve: {
      location: function (geoService) {
        return geoService.getLocation();
      }
    },
    data: {
      logInRequired: true
    }
  });
});
