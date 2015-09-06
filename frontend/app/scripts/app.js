'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
        'ngMaterial', 'restangular','data-table'
  ])
    .config(function (RestangularProvider, SERVER_URL) {
        RestangularProvider.setBaseUrl(SERVER_URL);
        RestangularProvider.setDefaultHeaders({"Content-Type": "application/json"});
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('grey');
    })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'AuthenticationCtrl'
      })
      .when('/citizen', {
        templateUrl: 'views/suggestion.html',
        controller: 'SuggestionCtrl'
      })
        .when('/citizen/suggestionlist', {
            templateUrl: 'views/suggestionlist.html',
            controller: 'SuggestionListCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin/new_suggestion.html',
            controller: 'AdminCtrl'
        })
        .when('/admin/suggestionlist', {
            templateUrl: 'views/admin/suggestion_list.html',
            controller: 'AdminCtrl'
        })

      .otherwise({
        redirectTo: '/'
      });
  });
