'use strict';

angular.module('oceanSummerApp.auth', [
  'oceanSummerApp.constants',
  'oceanSummerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
