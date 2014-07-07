'use strict';

angular.module('hrmsApp')
    .factory('Movies', function($resource){
        return $resource("/service/movies")
    })
