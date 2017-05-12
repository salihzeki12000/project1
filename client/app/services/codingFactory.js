'use strict';

angular
.module('oceanSummerApp')
.factory('codingFactory', MyServiceCoding);

function MyServiceCoding($resource) {

   var codingFactory = {};

   codingFactory.getCodeKeyword = function(){
     return $resource('/api/icpc2keys/keyword/:keyword',{
      keyword: '@keyword'});
   }

   codingFactory.getKeywordCounter = function(){
     return $resource('/api/icpc2keys/key/counter/:keyword',{
      keyword: '@keyword'});
   }

   codingFactory.getKeyword = function(){
     return $resource('/api/icpc2keys/:id',{
      id: '@id'});
   }
   

   codingFactory.getCodeLnk= function(){
    return $resource('/api/icpc2lnks/:id',{
        id: '@id'});
   }

   codingFactory.getLnkKey= function(){
    return $resource('/api/icpc2lnks/keyid/:id',{
        id: '@id'});
   }

   codingFactory.lookUpTable= function(){
    return $resource('/api/lookups/:id',{
        id: '@id'},{
        update: {
          method:'PUT'
        },
        save: {
          method:'POST'
        },
        remove: {
          method:'DELETE'
        }
      });
   }

  codingFactory.getlookUpTable = function(){
     return $resource('/api/lookups/keyword/:keyword',{
      keyword: '@keyword'});
   }

   codingFactory.getCodeTrm= function(){
    return $resource('/api/icpc2trms/:id',{
        id: '@id'});
   }
   
   return codingFactory;

}

