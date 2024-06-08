import angular from 'angular';

import AppBridge from './AppBridge';
import { WebGreeting, WebInviteController} from '@mavrck-inc/react-modules';

if (!customElements.get('web-greeting')) {
  customElements.define('web-greeting', WebGreeting);
  customElements.define('web-invite-controller', WebInviteController);
}


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

  try {
    $scope.sharedState = AppBridge.getValue<IState>(subjectName) || { text: '', items: [] };
  } catch (error) {
    console.error('Error fetching initial state:', error);
    $scope.sharedState = { text: '', items: [] };
  }

  // Subscribe to changes in the shared state
  const sharedStateSubject = AppBridge.subscribe<IState>(subjectName, {next: (state) => {
    if (state !== null) {
      $scope.$applyAsync(() => {
        $scope.sharedState = state;
        $scope.message = state.text;
      });
    }
  }});

  // Subscribe to changes from react-modules web component
  const sharedInviteSubject = AppBridge.subscribe<IState>('sharedInvite', {next: (state) => {
    if (state !== null) {
      $scope.$applyAsync(() => {
        $scope.message = state.text;
      });
    }
  }});

  // Clean up subscription on scope destroy
  $scope.$on('$destroy', () => {
    sharedStateSubject.unsubscribe();
  });

  // Function to update the shared state
  $scope.updateSharedText = (newText: string) => {
    try {
      const newState = { ...$scope.sharedState, text: newText };
      AppBridge.updateSubject(subjectName, newState);
      $scope.message = newText;
    } catch (error) {
      console.error('Error updating shared text:', error);
    }
  };

  $scope.updateItem = (index: number, newValue: number) => {
    try {
      const newItems = [...$scope.sharedState.items];
      newItems[index] = newValue;
      const newState = { ...$scope.sharedState, items: newItems };
      AppBridge.updateSubject(subjectName, newState);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
}]);
