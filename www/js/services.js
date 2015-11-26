angular.module('starter.services', [])

.factory('Chats', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array
  var dbs = null;
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  var listActivity = [];
  var listStudent = [];
  var listallStudent = [];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },

    set: function(object){
      dbs = object;
    },

    set_all_activity: function(){
      $cordovaSQLite.execute(dbs, 'SELECT * FROM Activities')
      .then(
        function(result) {
          if (result.rows.length > 0) {
            listActivity = [];
            for(var i = 0 ; i < result.rows.length ; i++){
              listActivity.push(result.rows.item(i));
            }
            console.log(listActivity);
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },

    get_all_activity: function(){
      return listActivity;
    },

    set_student: function(id){
      console.log(id);
      $cordovaSQLite.execute(dbs, 'SELECT * FROM Students WHERE activity = ' + id)
      .then(
        function(result) {
          if (result.rows.length > 0) {
            listStudent = [];
            for(var i = 0 ; i < result.rows.length ; i++){
              listStudent.push(result.rows.item(i));
            }
            console.log(listStudent);
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },

    set_all_student: function(id){
      console.log(id);
      $cordovaSQLite.execute(dbs, 'SELECT * FROM Students ')
      .then(
        function(result) {
          if (result.rows.length > 0) {
            listallStudent = [];
            for(var i = 0 ; i < result.rows.length ; i++){
              listallStudent.push(result.rows.item(i));
            }
            console.log(listallStudent);
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },

    get_all_student: function(){
      return listStudent;
    }
  };
});
