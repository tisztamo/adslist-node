/*globals angular */
angular.module('adslistApp')
  .controller('MainCtrl', function ($scope, $http, Ads, socket) {
    'use strict';
    $scope.ads = Ads.query({
      approved: true
    }, function () {
      socket.syncUpdates('ad', $scope.ads);
    });

    $scope.publishedUrl = function(ad) {
      return window.location.protocol + '//' + window.location.host + '/public/' +
        ad._id + '/' + ad.token;
    };

    $scope.submitAd = function () {
      if ($scope.newAd === '') {
        return;
      }
      var ad = new Ads({
        text: $scope.newAd,
        approved: false,
        status: 'waitingforreview'
      });
      ad.$save();
      $scope.newAd = '';
      $scope.previewText = '';
    };

    $scope.preview = function () {
      $scope.previewText = $scope.newAd;
    };

    $scope.publish = function (ad) {
      $http.post('/api/ads/' + ad._id + '/token').success(function (token) {
        ad.token = token;
        ad.published = true;
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });