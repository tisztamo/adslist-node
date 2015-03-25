/*global angular*/
angular.module('adslistApp')
  .controller('ApprovelistCtrl', function ($scope, Ads) {
    'use strict';
    $scope.ads = Ads.query({
      approved: false,
      rejected: false
    });
  });