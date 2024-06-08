import angular from 'angular';

const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', function ($scope) {
  $scope.message = 'Hello from AngularJS!';
}]);

export default app;