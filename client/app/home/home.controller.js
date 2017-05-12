'use strict';


  angular
  .module('oceanSummerApp')
  .controller('homeController',homeController);

function homeController($scope,$state,$timeout,formFactory,Auth,toaster){

  $scope.useruid = Auth.getCurrentUser()._id;
  this.userName = Auth.getCurrentUser().name;
  this.isAdmin = Auth.isAdmin();

  $scope.forms = formFactory.getFormOwner().query({owner:$scope.useruid}, 
    function(){
      // $scope.forms = forms;       
      $scope.statistics();
      // socket.syncUpdates('forms', $scope.forms);
    },
    function(error){
      alert('Error get forms Home\nDetails: ',error.message);
    }
  );


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

  $scope.removeForm = function(form){
    form.enabled = false;
    formFactory.oceanForms().update({id:form._id},form,
    function(responde){
      toaster1('success','Form deleted','You have delete form #'+form.encnum);
    },
    function(error){
      console.log('Error remove form Home\nDetail: ',error.message);
    }
    );
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

  //Statistics
  $scope.statistics = function(){
    
    $scope.countTotal = 0;
    $scope.countSubmitted = 0;
    $scope.countDraft = 0;
    $scope.disabledForm = 0;
    $scope.forms.forEach(function(childSnapshot) {
      //console.log('childSnapshot:', childSnapshot);
      //Count for total form for an user
      if(childSnapshot.owner._id == $scope.useruid && childSnapshot.enabled == true){
        $scope.countTotal = $scope.countTotal + 1;
        //console.log(' total form:', $scope.countTotal);
        //Count for Submitted form
        if(childSnapshot.status == 'Submitted'){
          $scope.countSubmitted = $scope.countSubmitted + 1;
        }
        //Count for Draft form
        if(childSnapshot.status == 'Draft'){
          $scope.countDraft = $scope.countDraft + 1;
        }
      }
      if(childSnapshot.owner._id == $scope.useruid && childSnapshot.enabled == false){
        $scope.disabledForm = $scope.disabledForm + 1;
        //console.log(' total delete form:', $scope.disabledForm);
      }

    });
  }
  //End Statistics

  $(document).ready(function(){
      $('body').append('<div id="toTop" class="btn btn-info"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>');
    	$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('#toTop').fadeIn();
			} else {
				$('#toTop').fadeOut();
			}
		}); 
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
  });
}
