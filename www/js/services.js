angular.module('starter.services', [])

.factory('Items', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
	var items = [ 
	{
		title : 'Porch Rocker',
		id : 1,
		image : 'img/porch_rocker.jpg',
		owner : 'Molly',
		price : '$29.99'
	}, 
	{
		title : 'Bottle of Snapple',
		id : 2,
		image : 'img/bottle.png',
		owner : 'Tierney',
		price : '$1.99'
	 }, 
	 {
		title : 'Lipstick',
		id : 3,
		image : 'img/lipstick.jpg',
		owner : 'Zoey',
		price : '$14.99'
	  } 
	 ];

  return {
    all: function() {
      return items;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    add: function(item) {
    	items.push(item);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
