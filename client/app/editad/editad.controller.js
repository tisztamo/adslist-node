/*jslint nomen: true */
/*globals angular, alert*/
angular.module('adslistApp')
  .controller('EditadCtrl', function ($scope, $state, $stateParams, Ads) {
    'use strict';
    $scope.ad = {
      text: 'Loading ad...'
    };
    Ads.query({
      _id: $stateParams.id
    }, function (ads) {
      $scope.ad = ads[0];
      if ($scope.ad.status === 'inreview') {
        alert('This ad is in review. You cannot edit it');
        $state.go('myads');
      }
    });

    $scope.saveAd = function () {
      $scope.ad.approved = false;
      $scope.ad.rejected = false;
      $scope.ad.status = 'waitingforreview';
      $scope.ad.$save();
    };
  });