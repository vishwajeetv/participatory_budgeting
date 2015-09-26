'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AuthenticationCtrl
 * @description
 * # AuthenticationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('AuthenticationCtrl', function ($scope, Restangular, $location, $mdToast, $rootScope, UserProvider,
    InstanceProvider , DateTime) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.submitedLogin = false;
        $scope.submitedRegistration = false;

        $scope.login = function (loginForm) {

            $scope.submitedLogin = true;

            if(loginForm.$valid)
            {
                $scope.loggedIn = true;
                var loginData = {
                  "email" : $scope.user.email,
                    "password": $scope.user.password
                };

                $scope.authFailedMesesage = "";
                var loginUser = Restangular.all('user/login');
                loginUser.post(loginData).then(function (response)
                {
                    if(response.header.status == "success")
                    {
                        $rootScope.authenticated = true;
                        sessionStorage.authenticated = true;
                        UserProvider.setUser(response.body);
                        $mdToast.show($mdToast.simple().content(response.header.message));
                            console.log(response.header.message);
                        $scope.redirectToRole();
                    }
                    else
                    {
                        console.log(response.header.message);
                        $scope.authFailedMesesage = "Incorrect email or password. Please retry.";
                        $mdToast.show($mdToast.simple().content("Incorrect email or password. Please retry."));
                        $scope.invalidCredentials = true;
                    }
                }, function (response) {
                        $scope.user.errors = response.data;
                });

                console.log(loginData);
                return true;
            }
            else
            {
                return false;
            }

        }

        $scope.register = function (registrationForm) {

            $scope.submitedRegistration = true;

            if(registrationForm.$valid)
            {

                $scope.loggedIn = true;
                var registrationData = {
                    "email" : $scope.new_user.email,
                    "name" : $scope.new_user.name,
                    "password": $scope.new_user.password,
                    'role' : 'citizen',
                    'instance_id' : InstanceProvider.getInstanceId()
                };
                console.log(registrationData);

                UserProvider.register(registrationData).
                    then(function(response)
                    {
                        $rootScope.authenticated = true;
                        sessionStorage.authenticated = true;
                        UserProvider.setUser(response.body);
                        $mdToast.show($mdToast.simple().content(response.header.message));
                        console.log(response.header.message);
                        $scope.redirectToRole();
                    },
                    function (response) {
                        if (response) {
                            $scope.new_user.errors = response;
                        }
                    });

                return true;
            }
            else
            {
                return false;
            }

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

        $scope.redirectToRole = function() {
            var user = UserProvider.getUser();
            console.log(user.role);
            if (user.role == "citizen") {
                $location.path('/citizen');
            }
            else if (user.role == "admin") {
                $location.path('/admin');
            }

        };

        if(sessionStorage.authenticated == true)
        {
            $scope.redirectToRole();
        }

        function init()
        {
            $scope.loadInstance();
        }

        init();
  });
