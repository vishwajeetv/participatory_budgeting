'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AuthenticationCtrl
 * @description
 * # AuthenticationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('AuthenticationCtrl', function ($scope, Restangular, $location, $mdToast, $rootScope, UserProvider) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.submitedLogin = false;

        $scope.login = function (loginForm) {

            $scope.submitedLogin = true;

            if(loginForm.$valid)
            {
                $scope.loggedIn = true;
                var loginData = {
                  "email" : $scope.user.email,
                    "password": $scope.user.password
                };

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
                        $scope.invalidCredentials = true;
                    }
                }, function () {
                    console.log('error');

                });

                console.log(loginData);
                return true;
            }
            else
            {
                return false;
            }

        }

        $scope.signup = function (signupForm) {

            $scope.submitedSignup = true;

            if(signupForm.$valid)
            {
                $scope.loggedIn = true;
                var signUpData = {
                    "email" : $scope.user.email,
                    "password": $scope.user.password,
                    'role' : 'citizen'
                };
                console.log(signUpData);
                return true;
            }
            else
            {
                return false;
            }

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
  });
