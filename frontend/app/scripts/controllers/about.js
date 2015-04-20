'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


        $scope.previousTab = function(selectedIndex)
        {
            console.log(selectedIndex);
            $scope.selectedIndex = selectedIndex - 1;
        }

        $scope.nextTab = function($selectedIndex)
        {
            console.log(selectedIndex);
            $scope.selectedIndex = selectedIndex + 1;
        }

  });
