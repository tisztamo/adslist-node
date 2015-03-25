angular.module('adslistApp')
  .filter('totrusted', ['$sce', function ($sce) {
    'use strict';
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);