'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SuggestionCtrl', function ($scope, $timeout, Restangular, $mdToast, $mdDialog,
                                          InstanceProvider, UserProvider, $location, SuggestionProvider,
                                          DateTime, $filter, CityProvider) {

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
                {'instruction': 'Go out! Gather details about exact location of the problem!'},
                {'instruction': 'Brainstorm, discuss to produce a concise suggestion!'},
                {'instruction': 'Begin!'}
            ];

        $scope.showInstructions = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                {
                    parent:angular.element(document.body),
                    clickOutsideToClose: true,
                    //.title('This is an alert title')
                    templateUrl:'views/instructions.html',
                    ariaLabel:'Alert Dialog Demo',
                    ok : 'Got it!',
                    targetEvent :(ev)
        }
            );
        };

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

        $scope.suggestionId = null;
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
                    'work_purpose' : suggestionForm.work_purpose.$modelValue,
                    'mode' : 'ONLINE'
                };

                console.log(saveSuggestionData);

                SuggestionProvider.saveSuggestion(saveSuggestionData).
                    then(function(response)
                    {
                        console.log(response.header.message);
                        $scope.submitedSuggestion = true;
                        $scope.suggestionId = response.body.id;
                        $scope.nextTab(2);
                        return true;
                    },
                    function (response) {
                        if (response) {
                            $scope.suggestion.errors = response;
                        }
                    });


            }
            else
            {
                return false;
            }
        }

        $scope.submitFinal = function()
        {
            SuggestionProvider.submitSuggestion($scope.suggestionId, InstanceProvider.getInstanceId()).
                then(function(response)
                {
                    console.log(response.header.message);
                    $mdToast.show($mdToast.simple().content(response.header.message));
                    $scope.submitedFinal = true;
                    $scope.progress = parseInt($scope.progress) + 25;
                    $scope.disabledFirst = true;
                    $scope.disabledSecond = true;
                    $scope.disabledThird = true;
                    return true;
                },
                function (response) {
                    if (response) {
                        $scope.suggestion.errors = response;
                    }
                });

        };

        $scope.loadInstance = function () {

            InstanceProvider.loadInstance().then(function (response) {
                console.log(response);
                $scope.instance = response;
                $scope.city_name = response.city.name;
                $scope.instance.start_time = DateTime.convertDateTime($scope.instance.start_time);
                InstanceProvider.setInstance(response);
                $scope.instance.end_time = DateTime.convertDateTime($scope.instance.end_time);
                $scope.instanceError = InstanceProvider.checkInstanceDates($scope.instance);
            }, function () {
                console.log('error');

            });

        };

        $scope.begin= function()
        {
            $scope.nextTab(0);
        }

        $scope.showAreas = function()
        {
            $scope.selectedZones = $filter('filter')($scope.divisions,
                {
                   division_id: $scope.suggestion.zone.division_id
                }

            )
        }

        $scope.instanceError = null;

        $scope.loadZones = function() {
            CityProvider.getZones().then(function (response) {
                angular.forEach(response.body, function (zone) {
                    zone.zone_id = parseInt(zone.zone_id);
                });

                $scope.zones = response.body;
            }, function () {
                console.log('error');

            });
        };

        $scope.loadDivisions = function() {

            var getDivisions = Restangular.one('city/show-divisions/?zone_id='+$scope.suggestion.zone.zone_id);
            getDivisions.get().then(function (response)
            {
                angular.forEach(response.body, function (division) {
                    division.division_id = parseInt(division.division_id);
                });
                $scope.divisions = response.body;

            }, function () {
                console.log('error');

            });
        };

        $scope.loadWorks = function() {

            $scope.works = [];
            CityProvider.getWorks().then(function (response) {
                $scope.works = response.body;

            }, function () {
                console.log('error');

            });
        };

        $scope.progress = 0;
        $scope.previousTab = function(selectedIndex)
        {
            console.log(selectedIndex);
            if(selectedIndex > 0)
            {
                $scope.progress = $scope.progress - 25;
                $scope.selectedIndex = selectedIndex - 1;
            }
        }

        $scope.nextTab = function(selectedIndex)
        {
            console.log(selectedIndex);
            if(selectedIndex < 3)
            {
                console.log($scope.progress);
                $scope.progress = parseInt($scope.progress) + 25;
                $scope.selectedIndex = selectedIndex + 1;
            }

        }

        $scope.loadUser= function(){

            $scope.citizen = UserProvider.getUserById
            (UserProvider.getUserId())
                .then(function (user) {
                    $scope.citizen = user;
                    console.log(user);
            });
        }

        if( !(sessionStorage.authenticated))
        {
            $location.path('/');
        }
        $scope.logout = function(){
            UserProvider.logout();
            $location.path('/');
        }
        function init() {
            $scope.loadInstance();
            $scope.loadZones();
            $scope.loadUser();
            $scope.loadWorks();
        }

        init();
  });