angular.module('specter.tab.setting', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.setting', {
      url: "/setting",
      views: {
        'setting-tab': {
          templateUrl: "tabs/setting/setting.html",
          // controller: 'MarcopoloCtrl'
        }
      }
    })
});
