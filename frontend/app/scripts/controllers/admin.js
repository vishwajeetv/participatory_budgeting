'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('AdminCtrl', function ($scope, $timeout, $location, Restangular, $mdToast, $rootScope, $filter,
                                       InstanceProvider, UserProvider, SuggestionProvider, CityProvider, DateTime ) {


        $scope.options = {
            rowHeight: 50,
            headerHeight: 50,
            footerHeight: false,
            scrollbarV: false,
            selectable: false,
            columns: [{
                name: "Name",
                width: 300
            }, {
                name: "Gender"
            }, {
                name: "Company"
            }]
        };

        if( !(sessionStorage.authenticated))
        {
            $location.path('/');
        }

        $scope.saveSuggestion = function(suggestionForm)
        {
            $scope.submitedSuggestion = true;

            if( $scope.suggestion)
            {
                var suggestion = $scope.suggestion;

                var saveSuggestionData = {
                    'citizen' : $scope.citizen,
                    'instance_id' : InstanceProvider.getInstanceId(),
                    'user_id' : UserProvider.getUserId(),
                    'work_id' : suggestion.work.id,
                    'division_id' : suggestion.division.id,
                    'zone_id' : suggestion.zone.id,
                    'area' : suggestion.area,
                    'suggestion' : suggestion.suggestion,
                    'work_purpose' : suggestion.work_purpose,
                    'mode' : 'OFFLINE',
                    'inward_number':suggestion.inward_number
                };

                console.log(saveSuggestionData);

                SuggestionProvider.saveSuggestion(saveSuggestionData).
                    then(function(response)
                    {
                        console.log(response.header.message);
                        $mdToast.show($mdToast.simple().content(response.header.message));

                        $scope.citizen = {};
                        $scope.suggestion = {};
                        $scope.submitedSuggestion = false;
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
                var error = 'Please check the form again';
                console.log(error);
                $mdToast.show($mdToast.simple().content(error));

            }
        }

        $scope.showAreas = function()
        {
            $scope.selectedZones = {};
            $scope.selectedZones = $filter('filter')($scope.divisions,
                {
                    division_id: $scope.suggestion.division.division_id
                }

            )
        }

        $scope.instanceError = null;


        $scope.loadZones = function() {
            CityProvider.getZones().then(function (response) {
                angular.forEach(response.body, function (zone) {
                    zone.zone_id = (zone.zone_id);
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
                    division.division_id = (division.division_id);
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

        $scope.loadUser= function(){

            $scope.citizen = UserProvider.getUserById
            (UserProvider.getUserId())
                .then(function (user) {
                    //$scope.citizen = user;
                    console.log(user);
                });
        }

        $scope.logout = function(){
            UserProvider.logout();
            $location.path('/');
        }

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

        function init() {
            $scope.loadInstance();
            $scope.loadZones();
            $scope.loadUser();
            $scope.loadWorks();
        }

        init();

        if (!sessionStorage.authenticated || sessionStorage.role != 'admin') {
            $location.path('/');
        }
        else {
            $rootScope.authenticated = true;
        }


    });
