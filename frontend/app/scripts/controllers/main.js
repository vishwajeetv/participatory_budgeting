'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('MainCtrl', function ($scope, $rootScope, UserProvider) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $rootScope.authenticated = false;
        $rootScope.showName = function () {
            if ($rootScope.authenticated == true || sessionStorage.authenticated == true) {
                var user = UserProvider.getUser();
                console.log(user);
                return user.name;
            }
            else {
                return null;
            }
        }
  });
