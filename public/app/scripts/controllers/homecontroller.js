'use strict';

angular.module('hrmsApp')
  .controller('homeController', function ($scope,$location,Authenticate, Movies, Flash) {

        if (!sessionStorage.authenticated){
            $location.path('/')
            Flash.show("you should be authenticated to access this page")
        }
        
        Movies.get({},function(response){
            $scope.movies = response.movies
        })
        $scope.logout = function (){
            Authenticate.get({},function(response){
                delete sessionStorage.authenticated
                delete sessionStorage.user_email
                Flash.show(response.flash)
                $location.path('/')
            })
        }
  });
