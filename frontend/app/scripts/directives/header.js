'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:header
 * @description
 * # header
 */
angular.module('frontendApp')
    .directive('header', function () {
      return {
        templateUrl: 'views/components/header.html',
        restrict: 'E',
        scope:
        {

        },
        controller : function ($scope , UserProvider, $location) {

          $scope.name = UserProvider.getUser().name;
          $scope.logout = function()
          {
            UserProvider.logout();
            $location.path('/');
          }
        }
      };
    });
