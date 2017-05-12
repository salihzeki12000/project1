'use strict';

  angular
  .module('oceanSummerApp')
  .controller('loginController',loginController);

function loginController($scope,$state,$stateParams,$timeout,Auth){

    
  //message for a new user
  $scope.mess = {value:$stateParams.mess};
  //console.log('mess: ',$scope.mess.value);

  //login event
  $scope.user = {};
  $scope.errors = {};
  $scope.submitted = false;

  $scope.login = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
        })
        .then(() => {
            // Logged in, redirect to home
            $state.go('index.home');
        })
        .catch(err => {
            $scope.errors.other = err.message;
            console.log('err',err);
            // $scope.loginForm.password.$error.validationError = false;
        });

        }
    }
  

}
