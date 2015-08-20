'use strict';

/**
 * @ngdoc service
 * @name frontendApp.UserProvider
 * @description
 * # UserProvider
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('UserProvider', function ( SERVER_URL , $http, $q, Restangular ) {
      this.setUser = function(user)
      {
        sessionStorage.user_id = user.id;
        sessionStorage.user_name = user.name;
        sessionStorage.role = user.role;
      }

        this.logout = function()
        {
            delete sessionStorage.user_id ;
            delete sessionStorage.user_name ;
            delete sessionStorage.role ;
        }

      this.getUser = function()
      {
        return {
            'user_id' : sessionStorage.user_id,
            'name' : sessionStorage.user_name,
            'role' : sessionStorage.role
        }
      }

        this.getUserById = function (id) {
            var url = SERVER_URL + 'user/' + id;
            var deferred = $q.defer();
            $http.get(url).
                success(function (data, status, headers, config) {
                    if(data.header.status == 'success')
                    {
                        deferred.resolve(data.body);
                    }
                    else
                    {
                        deferred.reject();
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log("could not get person type id");
                    deferred.reject();
                });
            return deferred.promise;
        };

      this.getUserId = function()
      {
        return sessionStorage.user_id;
      }
  });
