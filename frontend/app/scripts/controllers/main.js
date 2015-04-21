'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('MainCtrl', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $rootScope.authenticated = false;
        $scope.showLogout = function () {
            if ($rootScope.authenticated == true || sessionStorage.authenticated == true) {
                return true;
            }
            else {
                return false;
            }
        }
  });
