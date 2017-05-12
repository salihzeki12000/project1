'use strict';

angular.module('oceanSummerApp', [
  'oceanSummerApp.auth',
  'oceanSummerApp.constants',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'btford.socket-io',
  'ngMessages',
  'ngTagsInput',
  'ui.footable',
  'toaster'
  
])
  .config(function($urlRouterProvider, $stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $stateProvider

    .state('landing',{
      url:'/',
      controller:'landController',
      controllerAs:'land',
      templateUrl:'app/landing/landing.html',
      data: { pageTitle: 'The OCEAN study', specialClass: 'landing-page' }
    })
    .state('login',{
      url:'/login/:mess',
      controller:'loginController',
      controllerAs:'loginCtr',
      templateUrl:'app/login/login.html'
    })
    .state('logout',{
      url:'/',
      controller:'loginController',
      controllerAs:'loginCtr',
      templateUrl:'app/login/login.html',
      resolve: {
        logout: function(Auth) {
          Auth.logout();
        }
      }
    })

    .state('register',{
      url:'/register',
      controller:'registerController',
      controllerAs:'registerCtr',
      templateUrl:'app/register/register.html'
    })
    .state('forgot_password',{
      url:'/forgot_password',
      controller:'registerController',
      controllerAs:'registerCtr',
      templateUrl:'app/views/forgot_password.html'
    })

    .state('index', {
      abstract: true,
      //url:'/index',
      templateUrl: "app/common/content.html"
    })
    .state('index.home',{
      url:'/forms',
      controller:'homeController',
      controllerAs:'main',
      templateUrl:'app/home/home.html'
    })
    // .state('index.landing',{
    //   url:'/home',
    //   controller:'homeController',
    //   controllerAs:'main',
    //   templateUrl:'app/views/landing.html'
    // })
    .state('index.instructions',{
      url:'/instructions',
      controller:'instController',
      controllerAs:'inst',
      templateUrl:'app/instructions/instructions.html'
    })
    .state('index.createOForm',{
      url:'/createOForm',
      controller:'createOFController',
      controllerAs:'createOFCtr',
      templateUrl:'app/createOForm/createOForm.html',
      data: { pageTitle: 'Create Form' }
    })
    .state('index.statistics',{
      url:'/statistics',
      controller:'homeController',
      controllerAs:'main',
      templateUrl:'app/statistics/statistics.html',
      data: { pageTitle: 'Statistics' }
    })
    .state('index.viewOForm',{
      url:'/viewOForm/:id',
      controller:'viewOFController',
      controllerAs:'viewOFCtr',
      templateUrl:'app/viewOForm/viewOForm.html',
      data: { pageTitle: 'View Form' }
    })
    .state('index.editOForm',{
      url:'/editOForm/:id',
      controller:'editOFController',
      controllerAs:'editOFCtr',
      templateUrl:'app/editOForm/editOForm.html',
      data: { pageTitle: 'Edit Form' }
    })
    .state('index.manage',{
      url:'/manage',
      controller:'manageController',
      controllerAs:'manageCtr',
      templateUrl:'app/manage/manage.html',
      data: { pageTitle: 'Management' }
    });
  });

