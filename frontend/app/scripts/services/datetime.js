'use strict';

/**
 * @ngdoc service
 * @name frontendApp.DateTime
 * @description
 * # DateTime
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('DateTime', function () {

      this.convertDateTime = function(dateTime) {

        var t = dateTime.split(/[- :]/);
        var javaScriptDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        return javaScriptDate;
      }
  });
