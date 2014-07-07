'use strict';

angular.module('hrmsApp')
    .factory('Authenticate', function($resource){
        return $resource("/service/authenticate/")
    })
