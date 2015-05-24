var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouteProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'MainCtrl'
      });
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
  var o = {
    posts: []
  }
  return o;
}])

app.controller('MainCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  // Data
  $scope.test = 'Hello world';

  $scope.posts = posts.posts[$stateParams.id];

  // Functions
  $scope.addPost = function() {
    // Checking post content
    if (!$scope.title || $scope.title === '') {
      return;
    } else {
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but you need to fix a few things!', upvotes: 0}
        ]
      });
      $scope.title = ''; // Clearing input after submission
      $scope.link = '';
    }
  }
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }
}]);
