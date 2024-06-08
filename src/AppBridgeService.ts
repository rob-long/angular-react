import angular from 'angular';
import AppBridge from './AppBridge';

angular.module('myApp').factory('AppBridgeService', ['$rootScope', function($rootScope: angular.IRootScopeService) {
  return {
    getSubject: <T>(name: string) => AppBridge.getSubject<T>(name),
    getValue: <T>(name: string) => AppBridge.getValue<T>(name),
    updateSubject: <T>(name: string, newState: T) => AppBridge.updateSubject<T>(name, newState),
    subscribe: <T>(name: string, callback: (newState: T) => void) => {
      const subject = AppBridge.getSubject<T>(name);
      const subscription = subject.subscribe((newState) => {
        $rootScope.$apply(() => {
          callback(newState as T);
        });
      });
      return () => subscription.unsubscribe();
    }
  };
}]);
