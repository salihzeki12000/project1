'use strict';

  angular
  .module('oceanSummerApp')
  .controller('viewOFController',viewOFController);

function viewOFController($scope,$state,$stateParams,$rootScope,formFactory,Auth){

  var idOForm = {id:$stateParams.id};
  $rootScope.pagecreateform=  false;
  // console.log('id:',idOForm.id);
  // $scope.form = formFactory.getForm(idOForm.id);
  // console.log('form:',$scope.form);
  formFactory.oceanForms().get({id:$stateParams.id},function(form){

    $scope.form = form;
    $scope.doctor = form.owner;
    if($scope.form.bill == 'MBS/DVA'){
      $scope.disablembs = false;
      // $("#otherpaid").attr('disabled','disabled');
      // $("#nocharge").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
    if($scope.form.bill == 'Other Paid'){
      // $("#otherpaid").removeAttr('disabled');
      // $("#mbs").attr('ng-disabled',true);
      $scope.disablembs = true;
      $scope.form.medicare = [];
      // $("#nocharge").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
    if($scope.form.bill == 'No Charge'){
      // $("#nocharge").removeAttr('disabled');
      $scope.disablembs = true;
      $scope.form.medicare = [];
      // $("#mbs").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
  },
  function(error){
    alert('Error get form ViewForm\nDetail: '+error.message);
  });
  // console.log('form:',$scope.form);
  $scope.goToEditOForm = function() {
      $state.go('index.editOForm', {
        id: $scope.form._id
      });
    };
}
