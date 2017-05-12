'use strict';

  angular
  .module('oceanSummerApp')
  .controller('registerController',registerController);

function registerController($scope,$state,$stateParams,$timeout,Auth,User,userFactory){


  //start-non-standard
  $scope.user = {};
  $scope.errors = {};
  $scope.submitted = false;
  // var currentUser = {};
  var newuserid;
  //end-non-standard

  //add signUp event
  $scope.signUp = function(form){
    $scope.submitted = true;
    
    if(form.$valid){
      userFactory.getLastUser().query(function(lastuser){
        newuserid = lastuser[0].userid+1;   
        // console.log('newuserid',newuserid);
         Auth.createUser({
          userid:newuserid,
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password        
        })
        .then(() => {
          // Account created, redirect to home
          $state.go('login',{mess:'new'});
        })
        .catch(err => {
          console.log('catch');
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      },
      function(error){
        alert('Error getlastuser\nDetail: '+error.message);
      });
     
     
    }
  }

  var noMatchPass = function(){
    if(pass == repass){
      $scope.validPass = true;
    }else{
      $scope.validPass = false;
    }
  }


}
