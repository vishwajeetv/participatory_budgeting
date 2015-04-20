'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionCtrl', function ($scope, $timeout, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.submitedCitizen = false;

        $scope.submitCitizen = function(citizenForm)
        {
            $scope.submitedCitizen = true;

            if(citizenForm.$valid == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        $scope.loadZones = function() {

            $scope.zones = [];
            var getZones = Restangular.one('city');
            getZones.get().then(function (response)
            {
               $scope.zones = response.body;

            }, function () {
                console.log('error');

            });
        };

        $scope.previousTab = function(selectedIndex)
        {
            console.log(selectedIndex);
            if(selectedIndex > 0)
            {
                $scope.selectedIndex = selectedIndex - 1;
            }
        }

        $scope.nextTab = function(selectedIndex)
        {
            console.log(selectedIndex);
            if(selectedIndex < 3)
            {
                $scope.selectedIndex = selectedIndex + 1;
            }

        }
  });
