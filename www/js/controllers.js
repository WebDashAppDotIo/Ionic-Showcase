angular.module('starter.controllers', ['starter.storage'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('DataStorageCtrl', ['$scope', 'DataStorage', function($scope, $storage) {
  $storage.findAll().then(function(data){
    $scope.list = data;
  });
  $storage.findAll().then(function(data){
    console.log(data);
  });
}])

.controller('DataItemCtrl', ['$scope', 'DataStorage', '$stateParams', function($scope, $storage, $stateParams) {
  $storage.findById(parseInt($stateParams.itemId)).then(function(data){
    $scope.item = data;
  });
}]);

