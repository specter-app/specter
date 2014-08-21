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
    data: {
      logInRequired: true
    }
  });
});
