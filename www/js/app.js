// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' , 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, Chats) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    db = $cordovaSQLite.openDB("nextflow.db");
    Chats.set(db);

        //$cordovaSQLite.execute(db, 'DROP TABLE Activities ');
       // $cordovaSQLite.execute(db, 'DROP TABLE Students ');
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Activities (id INTEGER PRIMARY KEY AUTOINCREMENT, activity TEXT)');
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, studentid TEXT, activity INT)');
          });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.activities', {
      url: '/activities',
      cache: false,
      views: {
        'tab-activities': {
          templateUrl: 'templates/activities.html',
          controller: 'ActivitiesCtrl'
        }
      }
    })

    .state('tab.activity', {
      url: '/activities/:chatId',
      cache: false,
      views: {
        'tab-activities': {
          templateUrl: 'templates/activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })

    .state('tab.camera', {
      url: '/camera',
      cache: false,
      views: {
        'tab-camera': {
          templateUrl: 'templates/camera.html',
          controller: 'CameraCtrl'
        }
      }
    })

  .state('tab.export', {
    url: '/export',
    cache: false,
    views: {
      'tab-export': {
        templateUrl: 'templates/export.html',
        controller: 'ExportCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/camera');

});
