// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .controller('makeStacheController', function($scope, $ionicActionSheet, $ionicPopup, $timeout) {
    $scope.data = {
      currentTags: []
    };
    // Triggered on a button click, or some other target
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: 'Funny'
        }, {
          text: 'Puzzle'
        }, {
          text: 'Event'
        }, {
          text: 'Add a tag...'
        }],
        addText: 'Add a tag',
        cancelText: 'Done',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index, data) {
          if (index === 3) {
            // clicked add tags button
            $scope.showPopup();
          } else {
            $scope.data.currentTags.push(data.text);
          }
        }
      });

      // For example's sake, hide the sheet after two seconds
      // $timeout(function() {
      //   hideSheet();
      // }, 2000);

    };
    // MAKE THIS POPUP WORK

    $scope.showPopup = function() {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newTag">',
        title: 'Enter a new tag',
        // subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [{
          text: 'Cancel'
        }, 
        {
          text: '<b>Save tag</b>',
          type: 'button-positive',
          onTap: function(e) {
            $scope.data.currentTags.push($scope.data.newTag);
            $scope.data.newTag = '';
          }
        }, ]
      });
      myPopup.then(function(res) {
        // console.log('Tapped!', res);
      });
    };
  });

