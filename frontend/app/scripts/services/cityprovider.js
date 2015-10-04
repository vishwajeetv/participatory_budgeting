'use strict';

/**
 * @ngdoc service
 * @name frontendApp.CityProvider
 * @description
 * # CityProvider
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('CityProvider', function ($http, $q, SERVER_URL, INSTANCE_ID) {
        this.getZones = function()
        {
            var url = SERVER_URL + 'city/show-zones';
            var requestData = {
                'instance_id' : INSTANCE_ID
            };
            var deferred = $q.defer();

            $http.post(url, requestData).
                success(function (response, status) {
                    if(response.header.status == 'success')
                        deferred.resolve(response);
                    else
                        deferred.reject(response);
                }).
                error(function (data, status) {
                    deferred.reject(data);
                    console.log('could not create user');
                });
            return deferred.promise;
        }
  });
