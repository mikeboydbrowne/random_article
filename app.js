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
'posts',
function($scope, posts){
  // Data
  $scope.test = 'Hello world';

  $scope.posts = posts.posts;

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
      });
      $scope.title = ''; // Clearing input after submission
      $scope.link = '';
    }
  }
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }
}]);
