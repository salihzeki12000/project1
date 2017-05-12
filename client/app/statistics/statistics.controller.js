'use strict';

  angular
  .module('oceanSummerApp')
  .controller('statisticsController',statisticsController);

function statisticsController($scope,$firebaseArray,formFactory,authFactory){

  /*$scope.formsSttt = formFactory.getForms();
  $scope.useruidSttt =  authFactory.getCurrentUser().uid;

  $scope.countTotal = 0;
  $scope.countSubmitted = 0;
  $scope.countDraft = 0;
  $scope.disabledForm = 0;
  $scope.formsSttt.forEach(function(childSnapshot) {
    //Count for total form for an user
    if(childSnapshot.owner == $scope.useruidSttt && childSnapshot.enabled == true){
      $scope.countTotal = $scope.countTotal + 1;
      //Count for Submitted form
      if(childSnapshot.status == 'Submitted'){
        $scope.countSubmitted = $scope.countSubmitted + 1;
      }
      //Count for Draft form
      if(childSnapshot.status == 'Draft'){
        $scope.countDraft = $scope.countDraft + 1;
      }
    }
    if(childSnapshot.owner == $scope.useruidSttt && childSnapshot.enabled == false){
      $scope.disabledForm = $scope.disabledForm + 1;
    }

  });*/



}
