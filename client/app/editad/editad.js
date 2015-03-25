'use strict';

angular.module('adslistApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editad', {
        url: '/editad/:id',
        templateUrl: 'app/editad/editad.html',
        controller: 'EditadCtrl'
      });
  });