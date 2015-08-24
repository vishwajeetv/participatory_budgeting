'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionlistCtrl
 * @description
 * # SuggestionlistCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionListCtrl', function ( $scope , InstanceProvider , UserProvider , Restangular) {

      $scope.loadInstance = function () {

        var getInstance = Restangular.one('instance');
        getInstance.get().then(function (response) {
          $scope.instance = response.body;
          $scope.instance.start_time = convertDateTime($scope.instance.start_time);
          InstanceProvider.setInstance(response.body);
          $scope.instance.end_time = convertDateTime($scope.instance.end_time);
          $scope.checkInstanceDates();
        }, function () {
          console.log('error');

        });
      };

      $scope.name = UserProvider.getUser().name;

      $scope.loadUser= function(){

        $scope.citizen = UserProvider.getUserById
        (UserProvider.getUserId())
            .then(function (user) {
              $scope.citizen = user;
              console.log(user);
            });
      }

      $scope.logout = function(){
        UserProvider.logout();
        $location.path('/');
      }
      function init() {
        $scope.loadInstance();
        $scope.loadUser();
      }

      init();

  });
