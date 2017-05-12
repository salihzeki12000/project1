'use strict';

angular
.module('oceanSummerApp')
.factory('userFactory', MyServiceUser);

function MyServiceUser($resource) {

  var userFactory = {};

  userFactory.getLastUser = function(){
    return $resource('/api/users/last/user');    
  }

  userFactory.users = function(){
    return $resource('/api/users/:id',{
      id: '@id'},{
        update: {
          method:'PUT'
        },
        save: {
          method:'POST'
        }
      });
  }
  
  return userFactory;
}

