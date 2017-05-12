'use strict';

angular
.module('oceanSummerApp')
.factory('drugFactory', MyServiceDrug);

function MyServiceDrug($resource) {

  var drugFactory = {};
  
  drugFactory.getCaps = function(){
    return $resource('/api/drugs/:id',{
    id: '@id'});
  }

  return drugFactory;  

}
