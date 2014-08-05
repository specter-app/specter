angular.module('specter.tab.marcopolo', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.marcopolo', {
      url: "/marcopolo",
      views: {
        'marcopolo-tab': {
          templateUrl: "tabs/marcopolo/marcopolo.html",
          // controller: 'MarcopoloCtrl'
        }
      }
    })
});
