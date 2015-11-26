angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ActivitiesCtrl', function($scope, Chats, $ionicModal, $cordovaSQLite, $interval, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.activity = {};
  $scope.activity.name = "";

  $scope.activitylist = [];

  var get_activity = function(){
      Chats.set_all_activity();
      $scope.activitylist = [];
      var count = 0;

      stop = $interval(function() {
              count ++ ;
                if ($scope.activitylist.length == 0) {
                    $scope.activitylist = Chats.get_all_activity();
                    count ++;
                } 
                if($scope.activitylist.length > 0 || count > 10){
                  $interval.cancel(stop);
                  console.log($scope.activitylist);
                }
              }, 100);
  }

  get_activity();  

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
  
    console.log($scope.activity.name);

     $cordovaSQLite.execute(db, 'INSERT INTO Activities (activity) VALUES (?)', [$scope.activity.name])
         .then(function(result) {
             alert("Insert Success !!");
         }, function(error) {
             $scope.statusMessage = "Error on saving: " + error.message;
         })

         $timeout(function(){
          get_activity();
         },200);

         $scope.activity.name = "";

        $scope.modal.hide();
  };

  $scope.remove = function(item){
    var id = item.id;
     $cordovaSQLite.execute(db, 'DELETE FROM Activities WHERE id =  ' + id)
          .then(function(result) {
              get_activity(); 
          }, function(error) {
              console.log(error);
          })
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

.controller('ActivityCtrl', function($scope, $stateParams,  Chats, $interval, $cordovaSQLite) {

  $scope.student = [];
  $scope.studentall = [];
  $scope.activitylist = [];
  $scope.searchText = {};
  $scope.searchText.ID = "";

  $scope.activitylist = Chats.get_all_activity();

  $scope.id = $stateParams.chatId;

  Chats.set_student($scope.id );

  var getStudent = function(){

      Chats.set_student($scope.id);

        var count = 0;
        $scope.studentall = [];

      stop = $interval(function() {
              count ++ ;
                if ($scope.studentall.length == 0) {
                    $scope.studentall = Chats.get_all_student();
                    count ++;
                } 
                if($scope.studentall.length > 0 || count > 10){
                  $interval.cancel(stop);
                  console.log($scope.studentall);
                }
      }, 100);
  }

  $scope.search = function(){
    console.log("SEARCH");

    var temp = [];
    for(var i = 0 ; i < $scope.studentall.length ; i++){
      console.log($scope.studentall[i].studentid);
      console.log($scope.searchText.ID);
      if($scope.studentall[i].studentid == $scope.searchText.ID){
        temp.push($scope.studentall[i]);
        console.log(temp);
      }
    }

    $scope.studentall = temp;
  }

  getStudent();

  for(var i = 0 ; i < $scope.activitylist.length ; i++){
    if($scope.activitylist[i].id == $scope.id)
      $scope.activity_name = $scope.activitylist[i].activity;
  }

  $scope.remove = function(item){
    var id = item.id;
    console.log(id);
     $cordovaSQLite.execute(db, 'DELETE FROM Students WHERE id =  ' + id)
          .then(function(result) {
              getStudent(); 
          }, function(error) {
              console.log(error);
          })
  }

})

.controller('CameraCtrl', function($scope, $cordovaBarcodeScanner, $interval, Chats, $cordovaSQLite, $ionicModal) {
  $scope.std_id  = "";
  $scope.student = {};
  $scope.student.id = "";
  $scope.data = {};
  $scope.data.activitiesSelected = null;

  $scope.isAdd = false;

  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.std_id = imageData.text;
            $scope.isAdd = true;
            get_activity();  

        }, function(error) {
            alert("error !!");
        });
    };

  $scope.activitylist = [];

  var get_activity = function(){
      Chats.set_all_activity();
      $scope.activitylist = [];
      var count = 0;

      stop = $interval(function() {
              count ++ ;
                if ($scope.activitylist.length == 0) {
                    $scope.activitylist = Chats.get_all_activity();
                    count ++;
                } 
                if($scope.activitylist.length > 0 || count > 10){
                  $interval.cancel(stop);
                  console.log($scope.activitylist);
                }
              }, 100);
  }

  

  $scope.add = function(){

    console.log($scope.data.activitiesSelected);
     $cordovaSQLite.execute(db, 'INSERT INTO Students (studentid, activity) VALUES (?,?)', [$scope.std_id, $scope.data.activitiesSelected])
          .then(function(result) {
              alert("Insert Student Success !!");
              $scope.isAdd = false;
              $scope.std_id  = "";
              $scope.data.activitiesSelected = null;
          }, function(error) {
              console.log(error);
          })
  }

  $scope.discard = function(){
    $scope.isAdd = false;
    $scope.std_id  = "";
  }

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
  
    $scope.std_id = $scope.student.id;
    $scope.isAdd = true;
            get_activity();  
        $scope.modal.hide();
  };
})

.controller('ExportCtrl', function($scope, $interval, Chats, $cordovaEmailComposer) {
   $scope.activitylist = [];

   $scope.data = {};
  $scope.data.activitiesSelected = null;

  var get_activity = function(){
      Chats.set_all_activity();
      $scope.activitylist = [];
      var count = 0;

      stop = $interval(function() {
              count ++ ;
                if ($scope.activitylist.length == 0) {
                    $scope.activitylist = Chats.get_all_activity();
                    count ++;
                } 
                if($scope.activitylist.length > 0 || count > 10){
                  $interval.cancel(stop);
                  console.log($scope.activitylist);
                }
              }, 100);
  }

  get_activity();

  $scope.studentall = [];

  var exportCSV = function(){

      Chats.set_student($scope.data.activitiesSelected);

        var count = 0;
        $scope.studentall = [];

      stop = $interval(function() {
              count ++ ;
                if ($scope.studentall.length == 0) {
                    $scope.studentall = Chats.get_all_student();
                    count ++;
                } 
                if($scope.studentall.length > 0 || count > 10){
                  $interval.cancel(stop);
                  console.log($scope.studentall);
                  for(var i = 0 ; i < $scope.studentall.length ; i++){
                    enc = enc + $scope.studentall[i].studentid + '\n';
                  }
                  console.log(enc);
                  var base64 = window.btoa(enc);
                  console.log(base64);
                  try{
                    $cordovaEmailComposer.isAvailable().then(function() {
                      console.log("is available");
                    }, function () {
                      console.log("not available");
                    });

                    var email = {
                      to: 'dream.anantachaiwanich@gmail.com',
                      subject: 'Export CSV ' + $scope.activitylist[$scope.data.activitiesSelected],
                      attachments: ['base64:Book1.csv//' + base64],
                      body: 'CSV available',
                      isHtml: true
                    };

                    $cordovaEmailComposer.open(email).then(null, function () {
                      console.log("canceled.")
                    });
                  }
                  catch(e){
                    console.log(e);
                    console.log("Not work in browser.");
                  }
                }
      }, 100);
  }

  var enc = "";

  $scope.export = function(){
    console.log($scope.data.activitiesSelected);
    exportCSV();
  }
});
