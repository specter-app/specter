angular.module('specter.tab.create', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.create', {
      url: "/create",
      views: {
        'create-tab': {
          templateUrl: "tabs/create/create.html",
          // controller: 'MarcopoloCtrl'
        }
      }
    })
});
