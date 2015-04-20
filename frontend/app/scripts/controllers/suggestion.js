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
        $scope.disabledFirst = true;
        $scope.disabledSecond = true;
        $scope.disabledThird = true;

        $scope.submitedCitizen = false;
        $scope.submitedSuggestion = false;
        $scope.submitedFinal = false;

        $scope.submitCitizen = function(citizenForm)
        {
            $scope.submitedCitizen = true;

            if(citizenForm.$valid == true)
            {
                $scope.nextTab(0);
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.checkDisabled = function(selectedIndex)
        {
            if(selectedIndex == 0 && $scope.disabledFirst == true)
            {
                return true;
            }
            if(selectedIndex == 1 && $scope.disabledSecond == true)
            {
                return true;
            }
            if(selectedIndex == 2 && $scope.disabledSecond == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        };
        $scope.submitSuggestion = function(suggestionForm)
        {
            $scope.submitedSuggestion = true;

            if(suggestionForm.$valid == true)
            {

                    $scope.nextTab(1);
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.submitFinal = function()
        {
            $scope.submitedFinal = true;

            var citizen = $scope.citizen;
            var suggestion = $scope.suggestion;

            return true;
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
        $scope.loadWorks = function() {

            $scope.zones = [];
            var getZones = Restangular.one('city/works');
            getZones.get().then(function (response)
            {
                $scope.works = response.body;

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
