'use strict';

angular.module('adslistApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:userId/:controller', {
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      me: {
        method: 'GET',
        params: {
          userId:'me'
        }
      }
	  });
  });
