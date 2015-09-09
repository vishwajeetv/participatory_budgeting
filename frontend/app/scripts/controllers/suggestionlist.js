'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionlistCtrl
 * @description
 * # SuggestionlistCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionListCtrl', function ( $scope , InstanceProvider , UserProvider , Restangular , DateTime) {

      $scope.loadInstance = function () {

        var getInstance = Restangular.one('instance');
        getInstance.get().then(function (response) {
          $scope.instance = response.body;
          $scope.instance.start_time = DateTime.convertDateTime($scope.instance.start_time);
          InstanceProvider.setInstance(response.body);
          $scope.instance.end_time = DateTime.convertDateTime($scope.instance.end_time);
          $scope.instanceError = InstanceProvider.checkInstanceDates($scope.instance);
        }, function () {
          console.log('error');

        });
      };

        $scope.loadSuggestions = function () {
            //console.log("In load suggestions");
            //$scope.suggestions = [];
            //var getSuggestions = Restangular.one('suggestion/?instance_id=1');
            //getSuggestions.get().then(function (response) {
            //    $scope.suggestions = response.body;
            //
            //}, function () {
            //    console.log('error');
            //
            //});
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
        $scope.loadSuggestions();
      }

      init();

  });
