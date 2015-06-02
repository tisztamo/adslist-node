/*globals angular*/
angular.module('adslistApp')
  .controller('PublicCtrl', function ($scope, $stateParams, $http) {
    'use strict';

    $scope.ad = {
      text: 'Loading ad...'
    };
    $http.get('/api/ads/public/' + $stateParams.id + '?token=' + $stateParams.token).success(function (ad) {
      $scope.ad = ad;
    }).error(function (error) {
      $scope.ad.text = 'Error loading ad!';
      $scope.error = error;
    });
  });