'use strict';

angular.module('adslistApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {
      userId: 'test',
      password: 'test'
    };
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
            userId: $scope.user.userId,
            password: $scope.user.password
          })
          .then(function () {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginAsAdmin = function () {
      $scope.user.userId = 'admin';
      $scope.user.password = 'admin';
      $scope.login($scope.form);
    };

  });