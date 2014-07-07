angular.module("hrmsApp",['ngCookies','ngResource','ngSanitize','ngRoute','ui.bootstrap'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.
            when('/', {
                controller: 'loginController',
                templateUrl: 'views/login.html'
            })
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html'
            })

            .otherwise
            ({redirectTo :'/'})
    }]).config(function($httpProvider){

        var interceptor = function($rootScope,$location,$q,Flash){

            var success = function(response){
                return response
            }

            var error = function(response){
                if (response.status = 401){
                    delete sessionStorage.authenticated
                    $location.path('/')
                    Flash.show(response.data.flash)

                }
                return $q.reject(response)

            }
            return function(promise){
                return promise.then(success, error)
            }
        }
        $httpProvider.responseInterceptors.push(interceptor)
    })