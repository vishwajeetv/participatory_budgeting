'use strict';

/**
 * @ngdoc service
 * @name frontendApp.SuggestionProvider
 * @description
 * # SuggestionProvider
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('SuggestionProvider', function ( $q, $http , Restangular , SERVER_URL ) {

      this.getSuggestionsByUser = function (instanceId , userId) {
        var url = SERVER_URL + 'suggestion/show-by-user?user_id='+userId+'&instance_id='+instanceId;
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

        this.saveSuggestion = function(suggestion){

            var url = SERVER_URL + 'suggestion';
            var deferred = $q.defer();

            $http.post(url, suggestion).
                success(function (response, status) {
                    if(response.header.status == 'success')
                        deferred.resolve(response);
                    else
                        deferred.reject(response);
                }).
                error(function (data, status) {
                    console.log(data);
                    deferred.reject(data);
                    console.log('could not store suggestion');
                });
            return deferred.promise;

        }

        this.submitSuggestion = function(suggestionId, instanceId){

            var url = SERVER_URL + 'suggestion/submit-suggestion';
            var deferred = $q.defer();
            var suggestionData = {
                'instance_id' : instanceId,
                'suggestion_id' : suggestionId
            }
            $http.post(url, suggestionData).
                success(function (response, status) {
                    if(response.header.status == 'success')
                        deferred.resolve(response);
                    else
                        deferred.reject(response);
                }).
                error(function (data, status) {
                    console.log(data);
                    deferred.reject(data);
                    console.log('could not store suggestion');
                });
            return deferred.promise;

        }
  });
