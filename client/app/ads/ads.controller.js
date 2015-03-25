/*globals angular */
angular.module('adslistApp')
  .controller('AdsCtrl', function ($scope, Ads) {
    'use strict';
    $scope.ads = Ads.myAds();
  });