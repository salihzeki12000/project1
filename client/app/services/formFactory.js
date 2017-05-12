'use strict';

angular
.module('oceanSummerApp')
.factory('formFactory', MyServiceForm);

function MyServiceForm($resource) {

  var formFactory = {};

  formFactory.getFormOwner = function(){
    return $resource('/api/things/owner/:owner',{
      owner: '@owner'});    
  }
  
  formFactory.getLastForm = function(){
    return $resource('/api/things/last/form');
  }

  formFactory.getLastFormOwner = function(){
    return $resource('/api/things/lastformowner/:owner',{
      owner: '@owner'});    
  }

  formFactory.oceanForms = function(){
    return $resource('/api/things/:id',{
      id: '@id'},{
        update: {
          method:'PUT'
        },
        save: {
          method:'POST'
        }
      });
  }

  
  formFactory.getAllForms = function(){
    return $resource('/api/things');
  }

  return formFactory;
}

