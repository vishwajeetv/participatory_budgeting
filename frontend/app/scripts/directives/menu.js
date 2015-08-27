'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:menu
 * @description
 * # menu
 */
angular.module('frontendApp')
  .directive('menu', function () {
    return {
      templateUrl: 'views/components/menu.html',
      restrict: 'E',
      scope:
      {
        active : '@'
      },
      controller : function ($scope) {

        $scope.activeClass = function(classToCheck)
        {
          if($scope.active == classToCheck )
          {
            return 'md-warn';
          }
          else
          {
            return 'md-primary md-hue-1 md-whiteframe-z1';
          }
        }
      }
    };
  });
