'use strict';

angular.module('adslistApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {
      email: "test@test.com",
      password: "test"
    };
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
            email: $scope.user.email,
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
      $scope.user.email = 'admin@admin.com';
      $scope.user.password = 'admin';
      $scope.login($scope.form);
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  });