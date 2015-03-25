/*jslint nomen: true*/
/*globals angular*/
angular.module('adslistApp')
  .factory('Ads', function ($resource, Auth) {
    'use strict';
    return $resource('/api/ads/:id', {
      id: '@_id'
    }, {
      myAds: {
        method: 'GET',
        isArray: true,
        params: {
          creator: function () {
            return Auth.getCurrentUser()._id;
          }
        }
      }
    });
  });