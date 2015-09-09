'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('AdminCtrl', function ($scope, $timeout, $location, Restangular, $mdToast, $rootScope, InstanceProvider, UserProvider, SuggestionProvider ) {

        var init = function () {
            $scope.loadSuggestions();
        };
        $scope.loadSuggestions = function () {
            console.log("In load suggestions");
            $scope.suggestions = [];
            var getSuggestions = Restangular.one('suggestion/?instance_id=1');
            getSuggestions.get().then(function (response) {
                $scope.suggestions = response.body;

            }, function () {
                console.log('error');

            });
        };

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

            if(suggestionForm.$valid == true && $scope.suggestion)
            {
                var suggestion = $scope.suggestion;

                var saveSuggestionData = {
                    'citizen' : $scope.citizen,
                    'instance_id' : InstanceProvider.getInstanceId(),
                    'user_id' : UserProvider.getUserId(),
                    'work_id' : suggestion.work.id,
                    'division_id' : suggestion.division.id,
                    'zone_id' : suggestion.zone.id,
                    'area' : suggestionForm.area.$modelValue,
                    'suggestion' : suggestionForm.suggestion.$modelValue,
                    'work_purpose' : suggestionForm.work_purpose.$modelValue,
                    'mode' : 'OFFLINE'
                };

                console.log(saveSuggestionData);

                SuggestionProvider.saveSuggestion(saveSuggestionData).
                    then(function(response)
                    {
                        console.log(response.header.message);
                        $mdToast.show($mdToast.simple().content(response.header.message));

                        $scope.citizen = {};
                        $scope.suggestion = {};
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


        $scope.loadUser= function(){

            $scope.citizen = UserProvider.getUserById
            (UserProvider.getUserId())
                .then(function (user) {
                    $scope.citizen = user;
                    console.log(user);
                });
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

            $scope.works = [];
            var getWorks = Restangular.one('city/works');
            getWorks.get().then(function (response)
            {
                $scope.works = response.body;

            }, function () {
                console.log('error');

            });
        };


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

        if (!sessionStorage.authenticated || sessionStorage.role != 'admin') {
            $location.path('/');
        }
        else {
            $rootScope.authenticated = true;
        }


    });
