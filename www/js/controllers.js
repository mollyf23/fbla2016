angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Users, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
	  // Create the login modal that we will use later
	  $ionicModal.fromTemplateUrl('templates/login.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();

	  });

   };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
	  var result = Users.authenticate($scope.loginData.username, $scope.loginData.password);
	  if (result == true) {
		  $scope.modal.hide();
	  } else {
		 
			   var alertPopup = $ionicPopup.alert({
			     title: 'Incorrect Login!',
			     template: 'No user found with these credentials.'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });
			 
	  }
  };
})

// This is the controller for the list of items
.controller('ItemsController', function($scope, Items, Users) {
	var user = Users.getAuthenticatedUser();
	if (user == null) {
		  $scope.login();		
	}
  $scope.items = Items.all();
})

// This is the controller for donating an item
.controller('AddController', function($scope, $state, $ionicHistory, Items, Users) {
	var user = Users.getAuthenticatedUser();
	if (user == null) {
		  $scope.login();		
	}
	$scope.itemData = {}; 
	$scope.donate = function() {
		var user = Users.getAuthenticatedUser();
		var item = {
				title : $scope.itemData.title,
				id : Date.now(),
				image : 'img/lipstick.jpg',
				owner : user,
				price : $scope.itemData.price,
				details: $scope.itemData.details,
				rating: $scope.itemData.rating
		} 
		Items.add(item);
		$ionicHistory.nextViewOptions({disableBack: true})
		$state.go("app.items");
	}
  $scope.items = Items.all();
})

.controller('ItemController', function($scope, $stateParams, $ionicPopup, Items, Users) {
	var user = Users.getAuthenticatedUser();
	if (user == null) {
		  $scope.login();		
	}
	$scope.item = Items.get($stateParams.itemId);	
	$scope.addComment = function() {
		  $scope.data = {};

		  // An elaborate, custom popup
		  var myPopup = $ionicPopup.show({
		    template: '<input type="text" ng-model="data.comment">',
		    title: 'New Comment',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Post</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          if (!$scope.data.comment) {
		            //don't allow the user to close unless he enters comment
		            e.preventDefault();
		          } else {
		            return $scope.data.comment;
		          }
		        }
		      }
		    ]
		  });

		  myPopup.then(function(commentText) {
			var user = Users.getAuthenticatedUser();
		    var comment = {
		    	user: user,
		    	comment: commentText	    	
		    }
		    // if the comment array does not exist, create an empty array
		    if (!$scope.item.comments) $scope.item.comments = [];
		    
		    // add the comment
		    $scope.item.comments.push(comment);
		  });
		}
});
