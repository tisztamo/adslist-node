/*jslint nomen: true*/
/*global angular*/
angular.module('adslistApp')
  .controller('ApproveCtrl', function ($scope, $state, $stateParams, Ads) {
    'use strict';
    $scope.ad = {
      text: 'Loading ad...'
    };
    Ads.query({
      _id: $stateParams.id
    }, function (ads) {
      $scope.ad = ads[0];
      $scope.ad.approved = false;
      $scope.ad.status = 'inreview';
      $scope.ad.$save();
    });

    $scope.approveAd = function () {
      $scope.ad.approved = true;
      $scope.ad.rejected = false;
      $scope.ad.status = 'reviewed';
      $scope.ad.$save();
      $state.go('approvelist');
    };

    $scope.rejectAd = function () {
      $scope.ad.approved = false;
      $scope.ad.status = 'reviewed';
      $scope.ad.rejected = true;
      $scope.ad.$save();
      $state.go('approvelist');
    };
  });