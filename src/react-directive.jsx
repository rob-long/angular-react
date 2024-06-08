import angular from 'angular';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

angular.module('myApp').directive('reactComponent', function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function (scope, element) {
      console.log(scope);
      const root = createRoot(element[0]);

      // Watch for changes to data and re-render React component
      scope.$watch('data', function (newValue) {
        if (newValue) {
          root.render(<App data={newValue} />);
        }
      });

      scope.$on('$destroy', () => {
        root.unmount();
      });
    },
  };
});