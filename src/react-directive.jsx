// src/react-directive.jsx
import angular from 'angular';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

angular.module('myApp').directive('reactComponent', function () {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      sharedText: '='
    },
    link: function (scope, element) {
      const root = createRoot(element[0]);

      const ReactWrapper = () => {
        return <App data={scope.data} initialSharedText={scope.sharedText} />;
      };

      root.render(<ReactWrapper />);

      scope.$on('$destroy', () => {
        root.unmount();
      });

      const subscription = window.sharedTextSubject.subscribe((newText) => {
        scope.$applyAsync(() => {
          scope.sharedText = newText;
        });
      });

      scope.$on('$destroy', () => {
        subscription.unsubscribe();
      });
    },
  };
});
