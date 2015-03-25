/*globals angular*/
angular.module('adslistApp')
  .config(function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('approve', {
        url: '/approve/:id',
        templateUrl: 'app/approve/approve.html',
        controller: 'ApproveCtrl'
      });
  });