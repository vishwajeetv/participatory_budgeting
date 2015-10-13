'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('frontendApp')
  .directive('sidebar', function () {
    return {
        templateUrl: 'views/components/sidebar.html',
        restrict: 'E'
    };
  });
