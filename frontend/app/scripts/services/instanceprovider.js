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
  });
