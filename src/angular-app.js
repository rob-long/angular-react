// src/angular-app.js
import angular from 'angular';

const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', function ($scope) {
  $scope.message = 'Hello from AngularJS!';
  $scope.reactData = {
    title: 'Hello from AngularJS Controller',
    content: 'This is some data passed from AngularJS to React component.'
  };
  $scope.sharedText = 'Initial text from AngularJS';

  $scope.updateSharedText = function(newText) {
    $scope.sharedText = newText;
    window.sharedTextSubject.next(newText);
  };
}]);

export default app;
