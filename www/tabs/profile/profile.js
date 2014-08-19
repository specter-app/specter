angular.module('specter.tab.profile', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "tabs/profile/profile.html",
          controller: 'loginCtrl'
        }
      }
    })
});
