import angular from 'angular';
import subjectManager from './AppBridge';

// Initialize the shared state
const initialState = {
  text: 'Initial text',
  items: [1, 2, 3]
};

subjectManager.updateSubject('sharedState', initialState);



const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', function ($scope) {
  $scope.message = 'Hello from AngularJS!';
  const subjectName = 'sharedState';
  $scope.sharedState = subjectManager.getValue(subjectName) || { text: '', items: [] };

  // Subscribe to changes in the shared state
  const subscription = subjectManager.getSubject(subjectName).subscribe((state) => {
    if (state !== null) {
      $scope.$applyAsync(() => {
        $scope.sharedState = state;
      });
    }
  });

  // Clean up subscription on scope destroy
  $scope.$on('$destroy', () => {
    subscription.unsubscribe();
  });

  // Function to update the shared state
  $scope.updateSharedText = (newText) => {
    const newState = { ...$scope.sharedState, text: newText };
    subjectManager.updateSubject(subjectName, newState);
  };

  $scope.updateItem = (index, newValue) => {
    const newItems = [...$scope.sharedState.items];
    newItems[index] = newValue;
    const newState = { ...$scope.sharedState, items: newItems };
    subjectManager.updateSubject(subjectName, newState);
  };
}]);
