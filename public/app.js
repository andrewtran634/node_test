var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
	$scope.addPost = function() {
		$scope.posts.push({title: 'a new post!', 'upvotes' : 0});
	};
	$scope.test = 'Hello world!';
	$scope.posts = [
	  	{'title' : 'post1', 'upvotes' : 5}, 
	  	{'title' : 'post2', 'upvotes' : 2}, 
	  	{'title' : 'post3', 'upvotes' : 15},
	  	{'title' : 'post4', 'upvotes' : 9}, 
	  	{'title' : 'post5', 'upvotes' : 4}
  	];
 }]);