(function(){
   var appController = function($scope, $rootScope, $ionicModal, $state, $firebaseSimpleLogin, UserService){
     $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $rootScope.$on('$showPopup', function (event, next) {
       $scope.modal.show();
     });

     var firebaseRef = new Firebase("https://specter-app.firebaseio.com/");
     // Create a Firebase Simple Login object
     $scope.auth = $firebaseSimpleLogin(firebaseRef);
     // Initially set no user to be logged in
     $scope.user = UserService;
     $scope.login = function(provider) {
       $scope.auth.$login(provider);
       $scope.modal.hide();
       $state.go('tab.profile', {}, {reload: true});
     };
     $scope.logout = function() {
       $scope.auth.$logout();
     };
  };
  appController.$inject = ['$scope', '$rootScope', '$ionicModal', '$state', '$firebaseSimpleLogin', 'UserService'];
  angular.module('specter').controller('appController', appController);
})();
