angular.module('specter.tab', [
  'specter.tab.marcopolo',
  'specter.tab.create',
  'specter.tab.profile',
  'specter.tab.mapview'
  ]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs/tabs.html"
    });
  $urlRouterProvider.otherwise('/tab/profile');
});
