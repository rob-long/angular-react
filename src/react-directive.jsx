import angular from 'angular';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createAppBridge } from '@rob-long/app-bridge';

angular.module('myApp').directive('reactComponent', function () {
  return {
    restrict: 'E',
    scope: {
      data: '=',
    },
    link: function (scope, element) {
      const root = createRoot(element[0]);

      const ReactWrapper = () => {
        return <App data={scope.data} />;
      };

      root.render(<ReactWrapper />);

      scope.$on('$destroy', () => {
        root.unmount();
      });

      // Use AppBridge to subscribe to changes
      const appBridge = createAppBridge();
      const sharedStateSubject = appBridge.getSubject('sharedState');

      const subscription = sharedStateSubject.subscribe((newState) => {
        if (newState !== null) {
          scope.$applyAsync(() => {
            scope.data = newState;
          });
        }
      });

      scope.$on('$destroy', () => {
        subscription.unsubscribe();
      });
    },
  };
});
