'use strict';

/**
 * @ngdoc service
 * @name frontendApp.InstanceProvider
 * @description
 * # InstanceProvider
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('InstanceProvider', function ($http, $q, INSTANCE_ID, SERVER_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      this.setInstance = function(instance)
      {
        sessionStorage.instance_id = instance.id;
      }

      this.getInstance = function()
      {
        return sessionStorage.instance;
      }

      this.getInstanceId = function()
      {
        return sessionStorage.instance_id;
      }

    this.loadInstance = function()
    {
       var url = SERVER_URL + 'instance/'+INSTANCE_ID;
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

        }

        this.checkInstanceDates = function (instance) {


            var start_time = instance.start_time;

            var end_time = (instance.end_time);

            var current_time = new Date();

            if (current_time < start_time) {
                return 'before'
            }
            else if( current_time > end_time )
            {
                return 'after'
            }
            else
            {
                return null
            }


        }
  });
