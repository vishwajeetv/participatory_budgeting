'use strict';

angular.module('hrmsApp')
  .controller('loginController', function ($scope,$sanitize,$location,Authenticate, Flash) {
        $scope.login = function(){
            Authenticate.save({
                'email': $sanitize($scope.email),
                'password': $sanitize($scope.password)
            },function() {
                $scope.flash = ''
                $location.path('/home');
                sessionStorage.authenticated = true;
                sessionStorage.user_email = $scope.email;
            },function(response){
                $scope.flash = response.data.flash

            })
        }
  });
