var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  // Data
  $scope.test = 'Hello world';

  $scope.posts = [
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 9},
    {title: 'post 5', upvotes: 4}
  ];

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
