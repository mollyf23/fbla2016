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
		price : '$1.99',
		details: "a full bottle of snapple. It's peach flavored. Ice cold.",
		comments: [
	 		  { 
				  user: "Molly",
				  comment: "I really love peach Snapple"
			  },
			  { 
				  user: "Tierney",
				  comment: "Kiwi Strawberry is better!"
			  },
			  { 
				  user: "Zoey",
				  comment: "No it's not"
			  }		  
		]
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
    get: function(itemId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    }
  };
});
