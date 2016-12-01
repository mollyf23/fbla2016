angular.module('starter.services', [])

.factory('LocalStorage', ['$window', function($window) {
	  return {
	    set: function(key, value) {
	      $window.localStorage[key] = value;
	    },
	    get: function(key, defaultValue) {
	      return $window.localStorage[key] || defaultValue;
	    },
	    setObject: function(key, value) {
	      $window.localStorage[key] = JSON.stringify(value);
	    },
	    getObject: function(key) {
		      return JSON.parse($window.localStorage[key] || '{}');
	    },
	    getArray: function(key) {
		      return JSON.parse($window.localStorage[key] || '[]');
		}
	  }
}])
	
.factory('Items', function(LocalStorage) {
  // Might use a resource here that returns a JSON array
	var storageKey = "FBLA_ITEMS";
	
	var storedItems = LocalStorage.getArray(storageKey);
	
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

	if (storedItems.length > 0) items = storedItems;
  return {
    all: function() {
      return items;
    },
    remove: function(item) {
      items.splice(chats.indexOf(item), 1);
  	  LocalStorage.setObject(storageKey, items);
    },
    add: function(item) {
    	items.push(item);
    	LocalStorage.setObject(storageKey, items);
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
})

.factory('Users', function(LocalStorage) {
  // Might use a resource here that returns a JSON array
	var authenticatedUser = null;
	var storageKey = "FBLA_USERS";
	
	var storedUsers = LocalStorage.getArray(storageKey);

  // Some fake testing data
	var users = [ 
	{
		userName : 'Molly',
		password : 'scub123'
		
	}, 
	{
		userName : "Tierney",
		password : 'tubs123'
	},
	{
		userName : "Zoey",
		password : 'mollballs123'
	}
	
	 ];
	if (storedUsers.length > 0) users = storedUsers;
  return {
	    authenticate: function(userName, password) {
	    	var user = this.get(userName, password);
	    	if (user == null) {
	    		return false;
	    	}
	    	else {
	    		authenticatedUser = user.userName;
	    		return true;
	    	}
	    	
	    },
	    getAuthenticatedUser: function() {
	    	return authenticatedUser;
	    },
    get: function(userName, password) {
      for (var i = 0; i < users.length; i++) {
    	var user = users[i];
        if (user.userName == userName && user.password == password) {
          return user;
        }
      }
      return null;
    }
  };
})

;
