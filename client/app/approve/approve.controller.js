/*jslint nomen: true*/
/*global angular*/
angular.module('adslistApp')
  .controller('ApproveCtrl', function ($scope, $state, $stateParams, Ads, Review) {
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
      var review = new Review();
      review._id = $scope.ad._id;
      review.approved = true;
      review.$save();
      $state.go('approvelist');
    };

    $scope.rejectAd = function () {
      var review = new Review();
      review._id = $scope.ad._id;
      review.approved = false;
      review.$save();
      $state.go('approvelist');
    };
  });