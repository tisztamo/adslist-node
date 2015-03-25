/*global angular*/
angular.module('adslistApp')
  .config(function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('approvelist', {
        url: '/approvelist',
        templateUrl: 'app/approve/approvelist.html',
        controller: 'ApprovelistCtrl'
      });
  });