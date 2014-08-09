angular.module('specter.tab.marcopolo', ['specter.tab.marcopolo.controller'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.marcopolo', {
      url: "/marcopolo",
      views: {
        'marcopolo-tab': {
          templateUrl: "tabs/marcopolo/marcopolo.html",
          controller: 'marcopoloCtrl'
        }
      }
    });
});
