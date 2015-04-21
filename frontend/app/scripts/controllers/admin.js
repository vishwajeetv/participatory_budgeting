'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('AdminCtrl', function ($scope, $timeout, Restangular, $mdToast, $rootScope) {

        var init = function () {
            $scope.loadSuggestions();
        };
        $scope.loadSuggestions = function () {
            console.log("In load suggestions");
            $scope.suggestions = [];
            var getSuggestions = Restangular.one('suggestion');
            getSuggestions.get().then(function (response) {
                $scope.suggestions = response.body;

            }, function () {
                console.log('error');

            });
        };


        if (!sessionStorage.authenticated || sessionStorage.role != 'admin') {
            $location.path('/');
        }
        else {
            $rootScope.authenticated = true;
        }
        init();


    });
