'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionCtrl', function ($scope, $timeout, Restangular, $mdToast,
                                          InstanceProvider, UserProvider, $location, SuggestionProvider) {

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

            if(citizenForm.$valid == true)
            {
                var citizen = $scope.citizen;
                var saveCitizenData = {
                    'instance': InstanceProvider.getInstanceId(),
                    'name' : citizenForm.name.$modelValue,
                    'email' : citizenForm.email.$modelValue,
                    'mobile': citizenForm.mobile.$modelValue,
                    'address': citizenForm.address.$modelValue,
                    'role':'citizen'

                };

                var saveCitizen = Restangular.all('user');
                saveCitizen.post(saveCitizenData).then(function (response)
                {
                    if(response.header.status == "success")
                    {
                        $scope.submitedCitizen = true;
                        UserProvider.setUser(response.body);
                        $scope.citizen = response.body;
                        $scope.nextTab(1);
                        return true;

                    }
                    else
                    {
                        console.log(response.header.message);
                    }
                }, function (response) {
                    console.log('error');
                    if(response.status == 422)
                    {

                    }

                });


            }
            else
            {
                return false;
            }
        };

        $scope.instructions =
            [
                {'instruction': 'Wow good'},
                {'instruction': 'Wow great'},
                {'instruction': 'Wow awesome'}
            ];

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
                var suggestion = $scope.suggestion;

                var saveSuggestionData = {
                    'citizen' : $scope.citizen,
                    'instance_id' : InstanceProvider.getInstanceId(),
                    'user_id' : UserProvider.getUserId(),
                    'work_id' : suggestionForm.work.$modelValue.id,
                    'division_id' : suggestionForm.division.$modelValue.id,
                    'zone_id' : suggestionForm.zone.$modelValue.id,
                    'area' : suggestionForm.area.$modelValue,
                    'suggestion' : suggestionForm.suggestion.$modelValue,
                    'work_purpose' : suggestionForm.work_purpose.$modelValue
                };

                console.log(saveSuggestionData);

                SuggestionProvider.saveSuggestion(saveSuggestionData).
                    then(function(response)
                    {
                        console.log(response.header.message);
                        $mdToast.show($mdToast.simple().content(response.header.message));
                        $scope.submitSuggestion = true;
                        $scope.suggestion = response.body;
                    },
                    function (response) {
                        if (response) {
                            $scope.suggestion.errors = response;
                            console.log(suggestion.errors);
                        }
                    });
                $scope.nextTab(2);
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.submitFinal = function(citizenForm, suggestionForm)
        {


        };

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

        function convertDateTime(dateTime) {

            var t = dateTime.split(/[- :]/);
            var javaScriptDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
            return javaScriptDate;
        }

        $scope.checkInstanceDates = function () {


            var start_time = $scope.instance.start_time;

            var end_time = ($scope.instance.end_time);

            var current_time = new Date();

            if (current_time < start_time) {
                $scope.instanceError = "before";
            }


        }

        $scope.instanceError = null;
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

            $scope.works = [];
            var getWorks = Restangular.one('city/works');
            getWorks.get().then(function (response)
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
