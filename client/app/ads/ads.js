/*globals angular */
angular.module('adslistApp')
  .config(function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('myads', {
        url: '/myads',
        templateUrl: 'app/ads/myads.html',
        controller: 'AdsCtrl'
      });
  });