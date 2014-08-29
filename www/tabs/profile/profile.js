angular.module('specter.tab.profile', ['specter.tab.profile.controller'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "tabs/profile/profile.html",
          controller: 'profileCtrl'
        }
      },
      data: {
        logInRequired: false
      }
    })
    .state('tab.profile.discovered', {
      url: "/discovered",
      templateUrl: "tabs/profile/profile-discovered.html"
    })
    .state('tab.profile.created', {
      url: "/created",
      templateUrl: "tabs/profile/profile-created.html"

    })
    $urlRouterProvider.otherwise('/tab/profile/created');
});
