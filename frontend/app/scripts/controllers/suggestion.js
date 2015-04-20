'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionCtrl', function ($scope, $timeout, Restangular, $mdToast) {

        $scope.citizen = null;
        $scope.suggestion = null;


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

        $scope.submitFinal = function(citizenForm, suggestionForm)
        {
            $scope.submitedFinal = true;

            var citizen = $scope.citizen;
            var suggestion = $scope.suggestion;

            var saveSuggestionData = {
                'citizen' :
                {
                    'name' : citizenForm.name.$modelValue,
                    'email' : citizenForm.email.$modelValue,
                    'mobile': citizenForm.mobile.$modelValue
                }
                ,
                'suggestion':{
                    'work_id' : suggestionForm.work.$modelValue.id,
                    'division_id' : suggestionForm.division.$modelValue.id,
                    'suggestion' : suggestionForm.suggestion.$modelValue
                }
            };
            console.log(saveSuggestionData);
            var saveSuggestion = Restangular.all('suggestion');
            saveSuggestion.post(saveSuggestionData).then(function (response)
            {
                if(response.header.status == "success")
                {

                    console.log(response.header.message);
                    $mdToast.show($mdToast.simple().content(response.header.message));

                }
                else
                {
                    console.log(response.header.message);
                }
            }, function () {
                console.log('error');

            });
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
