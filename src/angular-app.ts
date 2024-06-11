import angular from 'angular';
import { createAppBridge } from '@rob-long/app-bridge';
import {
  WebGreeting,
  WebInviteController,
  WebDatePicker,
  WebDateRange,
} from '@mavrck-inc/react-modules';

if (!customElements.get('web-greeting')) {
  customElements.define('web-greeting', WebGreeting);
  customElements.define('web-invite-controller', WebInviteController);
  customElements.define('web-date-picker', WebDatePicker);
  customElements.define('web-date-range', WebDateRange);
}

interface IState {
  text: string;
  items: number[];
}

const initialState: IState = {
  text: 'Initial text',
  items: [1, 2, 3],
};

export interface S4SubjectEntries {
  sharedState: IState | null;
  sharedInvite: { text: string } | null;
  sharedDateRange: { start: string; end: string } | null;
}

const appBridge = createAppBridge<S4SubjectEntries>();
appBridge.updateSubject('sharedState', initialState);

const app = angular.module('myApp', []);

interface IMainControllerScope extends angular.IScope {
  message: string;
  sharedState: IState;
  updateSharedText: (newText: string) => void;
  updateItem: (index: number, newValue: number) => void;
  dateRange: string;
}

app.controller('MainController', [
  '$scope',
  function ($scope: IMainControllerScope) {
    const subjectName = 'sharedState';

    try {
      $scope.sharedState = appBridge.getValue(subjectName) || {
        text: '',
        items: [],
      };
    } catch (error) {
      console.error('Error fetching initial state:', error);
      $scope.sharedState = { text: '', items: [] };
    }

    const sharedStateSubject = appBridge.subscribe(subjectName, {
      next: (state) => {
        if (state !== null) {
          $scope.$applyAsync(() => {
            $scope.sharedState = state;
            $scope.message = state.text;
          });
        }
      },
    });

    const sharedInviteSubject = appBridge.subscribe('sharedInvite', {
      next: (state) => {
        if (state !== null) {
          $scope.$applyAsync(() => {
            console.log('invite updated');
            $scope.message = state.text;
          });
        }
      },
    });

    const sharedDateRange = appBridge.subscribe('sharedDateRange', {
      next: (state) => {
        if (state !== null) {
          $scope.$applyAsync(() => {
            console.log('date updated', state);
            $scope.dateRange = `${state.start} - ${state.end}`;
          });
        }
      },
    });

    $scope.$on('$destroy', () => {
      sharedStateSubject.unsubscribe();
      sharedInviteSubject.unsubscribe();
      sharedDateRange.unsubscribe();
    });

    $scope.updateSharedText = (newText: string) => {
      try {
        const newState = { ...$scope.sharedState, text: newText };
        appBridge.updateSubject(subjectName, newState);
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
        appBridge.updateSubject(subjectName, newState);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
  },
]);
