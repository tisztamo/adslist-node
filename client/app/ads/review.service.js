/*jslint nomen: true*/
/*globals angular*/
angular.module('adslistApp')
  .factory('Review', function ($resource, Auth) {
    'use strict';
    return $resource('/api/ads/:id/review', {
      id: '@_id'
    });
  });