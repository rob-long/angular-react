import angular from 'angular';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

angular.module('myApp').directive('reactComponent', function () {
  return {
    restrict: 'E',
    link: function (scope, element) {
      const root = createRoot(element[0]);
      root.render(<App />);

      scope.$on('$destroy', () => {
        root.unmount();
      });
    },
  };
});