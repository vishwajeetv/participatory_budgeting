'use strict';

/**
 * @ngdoc service
 * @name frontendApp.InstanceProvider
 * @description
 * # InstanceProvider
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('InstanceProvider', function () {
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
