angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ActivitiesCtrl', function($scope, Chats, $ionicModal) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.activity_name = "";

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();

    // $cordovaSQLite.execute(db, 'INSERT INTO Activities (activity) VALUES (?)', [$scope.activity_name])
    //     .then(function(result) {
    //         alert("Insert Success !!");
    //     }, function(error) {
    //         $scope.statusMessage = "Error on saving: " + error.message;
    //     })
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

.controller('ActivityCtrl', function($scope, $stateParams,  Chats) {

  //$scope.student = Chats.get_all_db();

  console.log($scope.student);

  $scope.chat = Chats.get($stateParams.chatId);

   $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  }

})

.controller('CameraCtrl', function($scope, $cordovaBarcodeScanner) {
  $scope.std_id  = "";
  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.std_id = imageData.text;
            
        }, function(error) {
            alert("error !!");
        });
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
