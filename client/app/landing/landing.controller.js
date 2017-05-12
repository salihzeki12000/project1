'use strict';


  angular
  .module('oceanSummerApp')
  .controller('landController',landController);

function landController($rootScope,$state){

  $rootScope.state=  $state;
  console.log('$rootScope.state',$rootScope.state);

}
