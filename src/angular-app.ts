import angular from 'angular';
import AppBridge from './AppBridge';

// Define the initial state
interface IState {
  text: string;
  items: number[];
}

// Initialize the shared state
const initialState: IState = {
  text: 'Initial text',
  items: [1, 2, 3]
};

AppBridge.updateSubject<IState>('sharedState', initialState);

const app = angular.module('myApp', []);

interface IMainControllerScope extends angular.IScope {
  message: string;
  sharedState: IState;
  updateSharedText: (newText: string) => void;
  updateItem: (index: number, newValue: number) => void;
}

app.controller('MainController', ['$scope', function ($scope: IMainControllerScope) {
  $scope.message = 'Hello from AngularJS!';
  const subjectName = 'sharedState';
  $scope.sharedState = AppBridge.getValue<IState>(subjectName) || { text: '', items: [] };

  // Subscribe to changes in the shared state
  const sharedStateSubject = AppBridge.getSubject<IState>(subjectName).subscribe((state) => {
    if (state !== null) {
      $scope.$applyAsync(() => {
        $scope.sharedState = state;
      });
    }
  });

  // Clean up subscription on scope destroy
  $scope.$on('$destroy', () => {
    sharedStateSubject.unsubscribe();
  });

  // Function to update the shared state
  $scope.updateSharedText = (newText: string) => {
    const newState = { ...$scope.sharedState, text: newText };
    AppBridge.updateSubject(subjectName, newState);
  };

  $scope.updateItem = (index: number, newValue: number) => {
    const newItems = [...$scope.sharedState.items];
    newItems[index] = newValue;
    const newState = { ...$scope.sharedState, items: newItems };
    AppBridge.updateSubject(subjectName, newState);
  };
}]);
