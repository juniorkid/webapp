angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

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

    // get_all_db: function(){
    //   $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
    //   .then(
    //     function(result) {
    //       if (result.rows.length > 0) {
    //         for(int i = 0 ; i < result.rows.length ; i++){
    //           listActivity.push(result.rows.item(i));
    //         }
    //         return listActivity;
    //       }
    //     },
    //     function(error) {
    //       $scope.statusMessage = "Error on loading: " + error.message;
    //     }
    //   );
    // }
  };
});
