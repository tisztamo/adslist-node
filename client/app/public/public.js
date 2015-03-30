'use strict';

angular.module('adslistApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('public', {
        url: '/public/:id/:token',
        templateUrl: 'app/public/public.html',
        controller: 'PublicCtrl'
      });
  });