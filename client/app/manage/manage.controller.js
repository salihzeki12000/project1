'use strict';


  angular
  .module('oceanSummerApp')
  .controller('manageController',manageController);

function manageController($scope,$state,$timeout,formFactory,User,Auth,toaster,codingFactory){

  $scope.useruid = Auth.getCurrentUser()._id;
  this.userName = Auth.getCurrentUser().name;
  $scope.users = User.query();

  var toaster1 = function(type,text,body){
    toaster.pop({
            type: type,           
            title: text,
            body: body,
            showCloseButton: true,
            timeout: 5000
        });
    // $timeout(function () {
    //   $state.go('index.home');
    // }, 2000);
  }

  codingFactory.getKeyword().query(function (icpc2key) {
    $scope.keywords = icpc2key;
    // console.log('$scope.keywords',$scope.keywords.length);
  });

  formFactory.getAllForms().query(function(forms){
    $scope.forms = forms;
       
  },
  function(error){
    alert('Error get all form Manage\nDetail: '+error.message);
  });

  var getLookUptable = function(){
     codingFactory.lookUpTable().query(function (linkkey) {
      $scope.linkkey = linkkey;
    });
  }

  getLookUptable();

  $scope.linkKeyword = function(){
    codingFactory.getLnkKey().query({id:$scope.keySelected.keyid},function (icpc2lnk) {
      $scope.links = icpc2lnk;
      // console.log('$scope.links',$scope.links);
      var newkeyword ={linkeyword:$scope.keylink,keyword:$scope.keySelected.keyword,termid:[]};
      icpc2lnk.forEach(function(item){
        newkeyword.termid.push(item.termid);
      });
      
      // console.log('newkeyword',newkeyword);
      codingFactory.lookUpTable().save(newkeyword,function(linkkey){
        toaster1('success','New link keyword','You have linked '+linkkey.linkeyword+' and '+linkkey.keyword);
        // console.log('linkkey',linkkey);
        $scope.keySelected= '';
        $scope.keylink = '';
        getLookUptable();
      });
    });
  }

  $scope.deleteLink = function(link) {
    codingFactory.lookUpTable().remove({id:link._id});
    $scope.linkkey.splice($scope.linkkey.indexOf(link), 1);
  }
 

  $timeout(function(){
        $('#myTable').trigger('footable_initialize');
    }, 2000);


  //Table filtering
  $scope.filteringEventHandler = function(e) {
         var selected = $('.filter-status').find(':selected').text();
         if (selected && selected.length > 0) {
             e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;
             e.clear = !e.filter;
         }
   };

   $scope.filterByStatus = function() {
       $('.footable').trigger('footable_filter', {
           filter: $('#filter').val()
       });
   };

   $scope.filter = {
       status: null
   };
  //End Table filtering
  
  $scope.removeForm = function(form){
    form.enabled = false;
    formFactory.oceanForms().update({id:form._id},form,
    function(form){
      console.log('$scope.removeForm (success)',form);
      toaster1('success','Form deleted','You have delete form #'+form.encnum);
    },
    function(error){
      alert('Error remove form Manage\nDetail: '+error.message);
    });
  }

  $scope.goToViewOForm = function(form) {
      $state.go('index.viewOForm', {
        id: form._id
      });
    }
  $scope.goToEditOForm = function(form) {
      $state.go('index.editOForm', {
        id: form._id
      });
    };

  $scope.deleteUser = function(user) {
    user.$remove();
    $scope.users.splice($scope.users.indexOf(user), 1);
  }

}
