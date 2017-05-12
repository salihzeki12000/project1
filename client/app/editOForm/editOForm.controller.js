'use strict';

angular
  .module('oceanSummerApp')
  .controller('editOFController', editOFController)
  .controller('ModalInstanceEditCtrl', ModalInstanceEditCtrl);

function editOFController($scope, $stateParams, $state, $timeout, $uibModal, formFactory, Auth, codingFactory, drugFactory,toaster) {

  var editOFCtr = this;
  formFactory.oceanForms().get({ id: $stateParams.id }, function (form) {
    $scope.form = form;
    $scope.doctor = form.owner;
    
    //parsing starttime
    var time1 = form.starttime.split(" ");//e.g 12:07 PM
    var time1_1 = time1[0].split(":");//12:07
    var h1 = parseInt(time1_1[0]);
    var m1 = parseInt(time1_1[1]);
    if(time1[1] == 'AM' && h1>=12){
      h1 = h1 - 12;
    }
    if(time1[1] == 'PM' && h1<12){
      h1 = h1 + 12;
    }
    $scope.starttime = new Date(2016, 8, 28,h1,m1);
    // console.log('time1_1[0]:',h);
    // console.log('time1_1[1]:', m);

    //parsing finishtime
    var time2 = form.finishtime.split(" ");//e.g 12:07 PM
    
    var time2_1 = time2[0].split(":");//12:07

    var h2 = parseInt(time2_1[0]);
    var m2 = parseInt(time2_1[1]);
    if(time2[1] == 'AM' && h2>=12){
      h2 = h2 - 12;
    }
    if(time2[1] == 'PM' && h2<12){
      h2 = h2 + 12;
    }
    $scope.finishtime = new Date(2016, 8, 28,h2,m2);

    // console.log('$scope.form.bill',$scope.form.bill);
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

    // $timeout(function () {
    //   $scope.form.diagnosis.forEach(function (item) {
    //   // console.log('diag num:',item.dnum );
    //     //console.log('drug:',item.diagnosis.drug );
    //     //console.log('createOFCtr.selectedCode2.diagnum:',createOFCtr.selectedCode2 );
    //     // if (item.dnum == diagnum) {
    //       item.drug.forEach(function (subitem) {
    //         // console.log('drug num:',subitem.drnum );
            
    //         //console.log('sub createOFCtr.selectedCode2.diagnum:',createOFCtr.selectedCode2 );
    //         // if (subitem.drnum == drunum) {
    //         $("#dose"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#measure"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#freqnum"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#freq"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#norep"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#new"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#cont"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#pres"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#otc"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         $("#supply"+item.dnum+subitem.drnum).removeAttr('disabled');
    //         // }
    //       });
    //     // }
    //   });
    // }, 10000);
    
  },
    function(error){
      alert('Error oceanForms EditForm\nDetail: '+error.message);
    });
  
  $scope.goToViewOForm = function() {
      $state.go('index.viewOForm', {
        id: $scope.form._id
      });
    }

  $scope.hstep = 1;
  $scope.mstep = 5;
  $scope.new = 'new';
  $scope.continuation = 'continuation';

  $scope.icpc2lnk = [];
  codingFactory.getCodeLnk().query({}, function (icpc2lnk) {
    $scope.icpc2lnk = icpc2lnk;
    //console.log('forms: ',forms);
  },
    function(error){
      alert('Error ICPC2LNK EditForm\nDetail: '+error.message);
    });

  $scope.icpc2trm = [];
  codingFactory.getCodeTrm().query({}, function (icpc2trm) {
    $scope.icpc2trm = icpc2trm;
    //console.log('forms: ',forms);
  },
    function(error){
      alert('Error ICPC2TRM EditForm\nDetail: '+error.message);
    });

  $scope.caps = [];
  drugFactory.getCaps().query({}, function (caps) {
    $scope.caps = caps;
    //console.log('forms: ',forms);
  },
    function(error){
      alert('Error CAPS EditForm\nDetail: '+error.message);
    });


  $scope.myDate = new Date();
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth();
  var day = d.getDay();
  var h = d.getHours();
  console.log('h: ',h);
  var m = d.getMinutes();
  console.log('m: ',m);
  var m2 = d.getMinutes() + 20;

  $scope.currentDate = { value1: new Date(2016, 8, 28, h, m) };



  /////////////////////////////////////////// Start -- DatePicker////////////////////////////////////////////////////////
  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };
  /////////////////////////////////////////// END -- DatePicker////////////////////////////////////////////////////////

  $scope.disablembs = true;
  $scope.disableBill = function(){
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
      // $("#nocharge").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
    if($scope.form.bill == 'No Charge'){
      // $("#nocharge").removeAttr('disabled');
      $scope.disablembs = true;
      // $("#mbs").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
  }

  $scope.resetNewPatient = function () {
      $scope.form.patient.conditions.newpatient = '';  
  }
  $scope.resetHealthcare = function () {
    $scope.form.patient.conditions.healthcare= '';
  }
  $scope.resetVetarans = function () {
    console.log('veterans',$scope.form.patient.conditions.veterans);
    $scope.form.patient.conditions.veterans= '';
  }
  $scope.resetNesb = function () {
    $scope.form.patient.conditions.nesb= '';
  }
  $scope.resetAboriginal = function () {
    $scope.form.patient.conditions.aboriginal= '';
  }
  $scope.resetTorres = function () {
    $scope.form.patient.conditions.torres= '';
  }

  $scope.addNewReason = function () {
    var maxnum = 0;
    $scope.form.reason.forEach(function (item) {
      if (item.rnum > maxnum) {
        maxnum = item.rnum;
      }
    });
    $scope.form.reason.push({ rnum: maxnum + 1, rname: '', icpc2plus: '' });
  }

  $scope.deleteReason = function (reas) {
    //console.log(reas);
    var count = 0;
    $scope.form.reason.forEach(function (item) {
      if (item == reas) {
        $scope.form.reason.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.newReasonList);
  }

  // $scope.activearray = [];
  // var addActivetoDiag = function(){
    
  //   // var diaglen = $scope.form.diagnosis.length;
  //   $scope.form.diagnosis.forEach(function (item) {
  //     activearray.push({value:'active'});
  //   });
  // }

  $scope.deleteDiagnosis = function (group) {
    //console.log(group);
    var count = 0;
    $scope.form.diagnosis.forEach(function (item) {
      if (item == group) {
        $scope.form.diagnosis.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.$watch('form.diagnosis',function(value){
    // console.log('form.diagnosis',value);
    if($scope.form){
      $scope.form.diagnosis.forEach(function (item) {        
            item.drug.forEach(function (subitem) {           
              if (subitem.drname.label) {
                subitem.drcode = subitem.drname.code;
                if(subitem.drname.codinginfo){
                  subitem.codinginfo = subitem.drname.codinginfo; 
                }else{
                  subitem.codinginfo = 'No information'; 
                }     
                subitem.drname = subitem.drname.label;              
                subitem.enabled = true;
                console.log('drug:', subitem);
              }
            });        
        });   
    }  
      
  },true);
  
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  $scope.$watch('form.patient.dob',function(value){
    if($scope.form.patient.dob){
      var dobarray = $scope.form.patient.dob.split("/");
      var newdob = dobarray[2]+"/"+dobarray[1]+"/"+dobarray[0];
      var agedob = getAge(newdob);
      console.log('dob: ', newdob);
      console.log('age: ' + getAge(newdob));
      if(agedob < 18){        
        $("#smoking").attr('disabled','disabled');
        $("#drinking").attr('disabled','disabled');
        $("#drinks").attr('disabled','disabled');
        $("#moredrink").attr('disabled','disabled');
        $scope.form.patient.smoking = '';
        $scope.form.patient.drinking = '';
        $scope.form.patient.drinks = '';
        $scope.form.patient.moredrink = '';
      }else{
        $("#smoking").removeAttr('disabled');
        $("#drinking").removeAttr('disabled');
        $("#drinks").removeAttr('disabled');
        $("#moredrink").removeAttr('disabled');
      }
    }
  },true);

  $scope.label = function(cap) {
    if(cap){
      if(cap.codinginfo){
        return cap.label + ' (' + cap.codinginfo + ')';
      }else{
        return cap.label;
      }
    }else{
      return;
    }
  }

  $scope.goOpenModal2= function(event,type,text){    
    if(event.keyCode == 13){
      event.preventDefault(); 
      if(text == 'reason'){
        editOFCtr.openMyModal2(type.rname,type.rnum,text);      
      }
      if(text == 'diagnosis'){
        editOFCtr.openMyModal2(type.name,type.dnum,text);
      }
    }    
  }

  $scope.goOpenModal= function(event,diagnum,type,text){    
    if(event.keyCode == 13){
      event.preventDefault(); 
      if(text == 'imaging'){
        editOFCtr.openMyModal(diagnum,type.iname,type.inum,text);
      }
      if(text == 'pathology'){
        editOFCtr.openMyModal(diagnum,type.pname,type.pnum,text);
      }
      if(text == 'procedure'){
        editOFCtr.openMyModal(diagnum,type.pname,type.pnum,text);
      }
      if(text == 'referral'){
        editOFCtr.openMyModal(diagnum,type.rname,type.rnum,text)
      }
    }    
  }

  $scope.addDrug = function (drugList) {
    var maxnum = 0;
    drugList.forEach(function (item) {
      if (item.drnum > maxnum) {
        maxnum = item.drnum;
      }
    });
    drugList.push({
      drnum: maxnum + 1,
      drcode: '',
      drname: '',
      codinginfo:'',
      
      dosmeasure: '',
      drfreq: '',
      
      drstatus: { name: '' },
      others: {name:''},
      enabled: false
    });
    console.log('drugList',drugList);
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.drug);
    });*/
  }

  $scope.deleteDrug = function (drugList, drug) {
    //console.log(group);
    var count = 0;
    drugList.forEach(function (item) {
      if (item == drug) {
        drugList.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.addProcedure = function (procedureList) {
    var maxnum = 0;
    procedureList.forEach(function (item) {
      if (item.pnum > maxnum) {
        maxnum = item.pnum;
      }
    });

    procedureList.push({
      pnum: maxnum + 1,
      pname: '',
      pnurse: false,
      enabled: false
    });
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.procedure);
    });*/
  }

  $scope.deleteProcedure = function (procList, proc) {
    //console.log(group);
    var count = 0;
    procList.forEach(function (item) {
      if (item == proc) {
        procList.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.addReferral = function (referralList) {
    var maxnum = 0;
    referralList.forEach(function (item) {
      if (item.rnum > maxnum) {
        maxnum = item.rnum;
      }
    });

    referralList.push({
      rnum: maxnum + 1,
      rname: '',
      enabled: false
    });
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.referral);
    });*/
  }

  $scope.deleteReferral = function (refList, ref) {
    //console.log(group);
    var count = 0;
    refList.forEach(function (item) {
      if (item == ref) {
        refList.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.addImaging = function (imagingList) {
    var maxnum = 0;
    imagingList.forEach(function (item) {
      if (item.inum > maxnum) {
        maxnum = item.inum;
      }
    });

    imagingList.push({
      inum: maxnum + 1,
      iname: '',
      bodysite: '',
      enabled: false
    });
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.imaging);
    });*/
  }

  $scope.deleteImaging = function (imaList, ima) {
    //console.log(group);
    var count = 0;
    imaList.forEach(function (item) {
      if (item == ima) {
        imaList.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.addPathology = function (pathologyList) {
    var maxnum = 0;
    pathologyList.forEach(function (item) {
      if (item.pnum > maxnum) {
        maxnum = item.pnum;
      }
    });

    pathologyList.push({
      pnum: maxnum + 1,
      pname: '',
      enabled: false
    });
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.pathology);
    });*/
  }

  $scope.deletePathology = function (patList, pat) {
    //console.log(group);
    var count = 0;
    patList.forEach(function (item) {
      if (item == pat) {
        patList.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  // $scope.activeTab = function(group){
  //   $scope.form.diagnosis.forEach(function (item) {
  //     item.dstatus='';
      
  //   });
  //   group.dstatus='active';
  // }

  $scope.addMoreDiag = function () {
    //var countTab = $scope.form.diagnosis.length+1;
    
    var maxnum = 0;
    $scope.form.diagnosis.forEach(function (item) {
      // item.dstatus='';
      if (item.dnum > maxnum) {
        maxnum = item.dnum;
      }
    });
    var countTab = maxnum + 1;

    $scope.form.diagnosis.push({
      //title: titleTab,
      dstatus: 'active',//this is just to control tabs
      //diagnosis:{
      dnum: countTab,
      name: '',
      status: '',
      drug: [{
        drnum: 1,
        drcode: '',
        drname: '',
        codinginfo:'',
        
        dosmeasure: '',
        drfreq: '',
        
        drstatus: { name: '' },
        others: {name:''},
        enabled: false
      }],
      procedure: [{
        pnum: 1,
        pname: '',
        pnurse: false,
        enabled: false
      }],
      referral: [{
        rnum: 1,
        rname: '',
        enabled: false
      }],
      imaging: [{
        inum: 1,
        iname: '',
        bodysite: '',
        enabled: false
      }],
      pathology: [{
        pnum: 1,
        pname: '',
        enabled: false
      }]
      //}
    });
  }
  //Status diagnosis
  //$scope.new = 'new';
  $scope.otc = 'otc';
  $scope.supply = 'supply';
  $scope.old = 'old';
  // $scope.statusDiag = ['New', 'Old', 'Work related'];

  // ///console.log($scope.selectedCon);
  // $scope.togglestatusDiag = function (item, list) {
  //   var idx = list.indexOf(item);
  //   if (idx > -1) {
  //     list.splice(idx, 1);
  //   }
  //   else {
  //     list.push(item);
  //   }
  // };


  $scope.dateBeforeToday = function (dateString) {
    var parts = dateString.split("/");
    var newDate = new Date(parts[2], parts[1] - 1, parts[0]);
    console.log('newDate', newDate);
    var today = new Date();
    console.log('today', today);
    if (newDate > today) {
      //something else is wrong
      //console.log('You cannot enter a date in the future!')
      return false;
    }
    else {
      return true;
    }
  }

  $scope.validateDate = function (dateString) {
    return moment(dateString, 'DD/MM/YYYY', true).isValid();
  }

  var toaster1 = function(type,text){
    toaster.pop({
            type: type,           
            title: text,
            // body: text,
            showCloseButton: true,
            timeout: 2000
        });
    $timeout(function () {
      $state.go('index.home');
    }, 2000);
  }

  var toaster2 = function(type,text,body){
    toaster.pop({
            type: type,           
            title: text,
            body: body,
            showCloseButton: true,
            bodyOutputType: 'trustedHtml',
            timeout: 6000
        });
    
  }

  $scope.validateForm = function(){
    var requiredUnique = new Set();
    var errorRequired = [];
    var uniquesError =[];
    // console.log('$scope.createOceanForm.$error.required',$scope.createOceanForm.$error.required);
    if($scope.createOceanForm.$error.required){
      $scope.createOceanForm.$error.required.forEach(function(item){
      // console.log('error',item.$name);
      errorRequired.push(item.$name);
      requiredUnique = new Set(errorRequired);
      
      });
      uniquesError = Array.from(requiredUnique); 
    }else{
      uniquesError =[];
    }
    
    return uniquesError;
  }


  $scope.showMessageError = function(arrayerrors){  
    // console.log('error',$scope.uniquesError );
    var errorString = '';
    arrayerrors.forEach(function(item){
      if(item == 'gender'){
        var sex = '- Sex';
        errorString += sex +'<br>';
      }
      if(item == 'post'){
        var post = '- Post Code';
        errorString += post +'<br>';
      }
      if(item == 'dob'){
        var dob = '- Date of Birth';
        errorString += dob +'<br>';
      }
      if(item == 'reason'){
        var reason = '- 1st Reason for Encounter';
        errorString += reason +'<br>';
      }
      if(item == 'diagnosis'){
        var diag = '- 1st Diagnosis/Problems';
        errorString += diag +'<br>';
      }
    });
    // alert('error string: \n'+errorString);
    toaster2('error','Required fields for submitting',errorString);
  }

  $scope.saveAndExit = function () {
    if ($scope.form.patient.dob) {
      var dobvalid = $scope.validateDate($scope.form.patient.dob);
      console.log('dobvalid', dobvalid);
      var dobBeforeToday = $scope.dateBeforeToday($scope.form.patient.dob);
      console.log('dobBeforeToday', dobBeforeToday);
      if (!dobvalid) {
        $scope.createOceanForm.dob.$error.validationError = true;
        toaster2('error','Invalid DOB');
      }
      if (!dobBeforeToday) {
        $scope.createOceanForm.dob.$error.validationError = true;
        toaster2('error','DOB cannot be after today');
      }
      if (dobvalid && dobBeforeToday) {

        $scope.createOceanForm.dob.$error.validationError = undefined;
        $scope.createOceanForm.dob.$invalid = false;
        $scope.createOceanForm.dob.$valid = true;

        $scope.form.starttime = moment($scope.starttime).format('hh:mm A');
        $scope.form.finishtime = moment($scope.finishtime).format('hh:mm A');
        if(!$scope.form.bill == 'MBS/DVA'){
           $scope.form.medicare = [];
        }

        formFactory.oceanForms().update({ id: $stateParams.id }, $scope.form, function () {
          toaster1('warning','Saved Changes');
        },
        function(error){
          alert('Error save form EditForm\nDetail: '+error.message);
        });
      }
    } else {
      $scope.form.starttime = moment($scope.starttime).format('hh:mm A');
      $scope.form.finishtime = moment($scope.finishtime).format('hh:mm A');
      console.log('bill', $scope.form.bill);
      if(!$scope.form.bill == 'MBS/DVA'){
           $scope.form.medicare = [{text:''}];
        }

      formFactory.oceanForms().update({ id: $stateParams.id }, $scope.form, function () {
        toaster1('warning','Saved Changes');
      },
      function(error){
        alert('Error save form EditForm\nDetail: '+error.message);
      });
    }
  }

  $scope.confirmForm = function (size) {
    var dobvalid = $scope.validateDate($scope.form.patient.dob);
    console.log('dobvalid', dobvalid);
    var dobBeforeToday = $scope.dateBeforeToday($scope.form.patient.dob);
    console.log('dobBeforeToday', dobBeforeToday);
    var errors = $scope.validateForm();
    if( errors.length > 0){
      $scope.showMessageError(errors);
      // return;
    }
    if (!dobvalid && $scope.form.patient.dob) {
      $scope.createOceanForm.dob.$error.validationError = true;    
      // $scope.createOceanForm.dob.$invalid = false;
      // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
      toaster2('error','Invalid DOB');
    }
    if (!dobBeforeToday && $scope.form.patient.dob) {
      $scope.createOceanForm.dob.$error.validationError = true;      
      // $scope.createOceanForm.dob.$invalid = true;
      // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
      toaster2('error','DOB cannot be after today');
    }
    if (dobvalid && dobBeforeToday ){
      $scope.createOceanForm.dob.$error.validationError = undefined;
      $scope.createOceanForm.dob.$invalid = false;
      $scope.createOceanForm.dob.$valid = true;
      // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
    }
    
    if (dobvalid && dobBeforeToday && errors.length==0) {

      $scope.form.starttime = moment($scope.starttime).format('hh:mm A');
      $scope.form.finishtime = moment($scope.finishtime).format('hh:mm A');
      var modalInstance = $uibModal.open({
        templateUrl: 'app/editOForm/views/modal_formedit.html',
        controller: 'ModalInstanceEditCtrl',
        controllerAs: 'modaledit',
        size: size,
        resolve: {
          form: function () {
            return $scope.form;
          }
        }
      });
    }
  }

   $scope.resetForm = function(){
        
        $scope.form.medicare = [];
        $scope.form.bill = '';
        $scope.form.patient = {};
        // $scope.form.patient.consultation = '';
        // $scope.form.patient.conditions = {
        //   newpatient: '',
        //   healthcare: '',
        //   veterans: '',
        //   nesb: '',
        //   aboriginal: '',
        //   torres: ''
        // };
        // $scope.form.patient.timesgp = 0;
        // $scope.form.patient.gender = '';
        // $scope.form.patient.post = '';
        // $scope.form.patient.height = 0;
        // $scope.form.patient.weight = 0;
        // $scope.form.patient.dob = '';
        // $scope.form.patient.smoking = '';
        // $scope.form.patient.drinking = '';
        // $scope.form.patient.drinks = 0;
        // $scope.form.patient.moredrink = '';
        $scope.form.reason = [];
        $scope.form.reason = [{ rnum: 1, rname: '', icpc2plus: '' },
  { rnum: 2, rname: '', icpc2plus: '' },
  { rnum: 3, rname: '', icpc2plus: '' }];
        $scope.form.diagnosis = [];
        $scope.form.diagnosis = [{
        dnum: 1,
        name: '',
        status: '',
        drug: [{
          drnum: 1,
          drcode: '',
          drname: '',
          codinginfo:'',
          
          dosmeasure: '',
          drfreq: '',
          
          drstatus: { name: '' },
          others: {name:''},
          enabled: false
        }],
        procedure: [{
          pnum: 1,
          pname: '',
          pnurse: false,
          enabled: false
        }],
        referral: [{
          rnum: 1,
          rname: '',
          enabled: false
        }],
        imaging: [{
          inum: 1,
          iname: '',
          bodysite: '',
          enabled: false
        }],
        pathology: [{
          pnum: 1,
          pname: '',
          enabled: false
        }]
      },
    {
        dnum: 2,
        name: '',
        status: '',
        drug: [{
          drnum: 1,
          drcode: '',
          drname: '',
          codinginfo:'',
          
          dosmeasure: '',
          drfreq: '',
         
          drstatus: { name: '' },
          others: {name:''},
          enabled: false
        }],
        procedure: [{
          pnum: 1,
          pname: '',
          pnurse: false,
          enabled: false
        }],
        referral: [{
          rnum: 1,
          rname: '',
          enabled: false
        }],
        imaging: [{
          inum: 1,
          iname: '',
          bodysite: '',
          enabled: false
        }],
        pathology: [{
          pnum: 1,
          pname: '',
          enabled: false
        }]
      },
    {
        dnum: 3,
        name: '',
        status: '',
        drug: [{
          drnum: 1,
          drcode: '',
          drname: '',
          codinginfo:'',
         
          dosmeasure: '',
          drfreq: '',
          
          drstatus: { name: '' },
          others: {name:''},
          enabled: false
        }],
        procedure: [{
          pnum: 1,
          pname: '',
          pnurse: false,
          enabled: false
        }],
        referral: [{
          rnum: 1,
          rname: '',
          enabled: false
        }],
        imaging: [{
          inum: 1,
          iname: '',
          bodysite: '',
          enabled: false
        }],
        pathology: [{
          pnum: 1,
          pname: '',
          enabled: false
        }]
      },
    {
        dnum: 4,
        name: '',
        status: '',
        drug: [{
          drnum: 1,
          drcode: '',
          drname: '',
          codinginfo:'',
          
          dosmeasure: '',
          drfreq: '',
          
          drstatus: { name: '' },
          others: {name:''},
          enabled: false
        }],
        procedure: [{
          pnum: 1,
          pname: '',
          pnurse: false,
          enabled: false
        }],
        referral: [{
          rnum: 1,
          rname: '',
          enabled: false
        }],
        imaging: [{
          inum: 1,
          iname: '',
          bodysite: '',
          enabled: false
        }],
        pathology: [{
          pnum: 1,
          pname: '',
          enabled: false
        }]
      }];
      toaster2('warning','Reset form','Changes are still not saved!');
      // formFactory.oceanForms().update({ id: $stateParams.id }, $scope.form, function () {
      //     toaster2('warning','Reset form','');
      //   },
      //   function(error){
      //     alert('Error reset form\nDetail: '+error.message);
      //   });
   }
    

  editOFCtr.openMyModal2 = function (name,num, type) {

    var modalMyInstance = $uibModal.open({
      templateUrl: 'app/editOForm/views/modal_icpcedit.html',
      controller: 'CodingModalEditCtrl',
      controllerAs: 'editOFCtr',
      //size: size,
      resolve: {
        num: function () {
          return num;
        },
        name: function () {
          return name;
        },
        // icpc2key: function () {
        //   return $scope.icpc2key;
        // },
        icpc2lnk: function () {
          return $scope.icpc2lnk;
        },
        icpc2trm: function () {
          return $scope.icpc2trm;
        }
      }
    });

    modalMyInstance.result.then(function (selectedItem) {
      editOFCtr.selectedCode2 = selectedItem;
      if (type == 'reason') {
        $scope.form.reason.forEach(function (item) {
          if (item.rnum == editOFCtr.selectedCode2.num) {
            item.rname = editOFCtr.selectedCode2.trm.term30;
            item.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
            console.log('reason:', item);
          }
        });
      }
      if (type == 'diagnosis') {
        $scope.form.diagnosis.forEach(function (item) {
          if (item.dnum == editOFCtr.selectedCode2.num) {
            item.name = editOFCtr.selectedCode2.trm.term30;
            item.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
            console.log('diagnosis:', item);
          }
        });
      }
      //console.log('createOFCtr.selectedCode2',createOFCtr.selectedCode2);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  editOFCtr.openMyModal = function (diagnum, name,num, type) {

    var modalMyInstance2 = $uibModal.open({
      templateUrl: 'app/editOForm/views/modal_icpcedit.html',
      controller: 'DiagnosisModalEditCtrl',
      controllerAs: 'editOFCtr',
      //size: size,
      resolve: {
        diagnum: function () {
          return diagnum;
        },
        num: function () {
          return num;
        },
        name: function () {
          return name;
        },
        // icpc2key: function () {
        //   return $scope.icpc2key;
        // },
        icpc2lnk: function () {
          return $scope.icpc2lnk;
        },
        icpc2trm: function () {
          return $scope.icpc2trm;
        }
      }
    });

    modalMyInstance2.result.then(function (selectedItem) {
      editOFCtr.selectedCode2 = selectedItem;

      if (type == 'procedure') {
        $scope.form.diagnosis.forEach(function (item) {
          if (item.dnum == editOFCtr.selectedCode2.diagnum) {
            item.procedure.forEach(function (subitem) {
              if (subitem.pnum == editOFCtr.selectedCode2.num) {
                subitem.pname = editOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('procedure:', subitem);
              }
            });
          }
        });
      }
      if (type == 'imaging') {
        $scope.form.diagnosis.forEach(function (item) {
          if (item.dnum == editOFCtr.selectedCode2.diagnum) {
            item.imaging.forEach(function (subitem) {
              if (subitem.inum == editOFCtr.selectedCode2.num) {
                subitem.iname = editOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('imaging:', subitem);
              }
            });
          }
        });
      }
      if (type == 'referral') {
        $scope.form.diagnosis.forEach(function (item) {
          if (item.dnum == editOFCtr.selectedCode2.diagnum) {
            item.referral.forEach(function (subitem) {
              if (subitem.rnum == editOFCtr.selectedCode2.num) {
                subitem.rname = editOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('referral:', subitem);
              }
            });
          }
        });
      }
      if (type == 'pathology') {
        $scope.form.diagnosis.forEach(function (item) {
          if (item.dnum == editOFCtr.selectedCode2.diagnum) {
            item.pathology.forEach(function (subitem) {
              if (subitem.pnum == editOFCtr.selectedCode2.num) {
                subitem.pname = editOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = editOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('pathology:', subitem);
              }
            });
          }
        });
      }
      //console.log('createOFCtr.selectedCode2',createOFCtr.selectedCode2);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

}

angular.module('oceanSummerApp').controller('DrugModalEditCtrl', function ($scope, $uibModalInstance, caps) {

  var editOFCtr = this;
  $scope.codingCaps = caps;

  editOFCtr.ok = function () {
    $uibModalInstance.close(editOFCtr.capsSelected);
  };

  editOFCtr.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('oceanSummerApp').controller('CodingModalEditCtrl', function ($scope, $uibModalInstance, codingFactory, icpc2lnk, icpc2trm, name, num) {

  var editOFCtr = this;
  //$scope.codingkey=  icpc2key;
  $scope.codelnk = icpc2lnk;
  $scope.codetrm = icpc2trm;
  $scope.customSelected = name;

  editOFCtr.selectedCode2 = {
    trm: editOFCtr.trm,
    num: num
  };

  $scope.showListTerms = false;
  $scope.searchCode = function () {

    if(icpc2lnk.length == 0 || icpc2trm.length == 0){
      $scope.showListTerms = false;
    }
    else{
      $scope.showListTerms = true;
      $scope.termids = [];
      if($scope.customSelected){
        codingFactory.getKeywordCounter().query({ keyword: $scope.customSelected }, function (counter) {
          // console.log('counter',counter);
          if(counter.length > 0){
          codingFactory.getCodeKeyword().query({ keyword: $scope.customSelected }, function (icpc2key) {

            icpc2key.forEach(function (subitem) {
              $scope.codelnk.forEach(function (item) {

                if (item.keyid == subitem.keyid) {
                  var termid = item.termid;
                  $scope.termids.push(termid);
                  return;//to break the loop
                }
              });
            });

            var mySet = new Set();

            $scope.codetrm.forEach(function (childSnapshot) {
              $scope.termids.forEach(function (item) {

                if (childSnapshot.termid == item) {
                  mySet.add(childSnapshot);
                  return;//to break the loop
                }
              });
            });

            $scope.terms = Array.from(mySet);
            //Converts icpcode and termcode into ICPC-2 PLUS nomenclature (e.g 'W84024')
            $scope.terms.forEach(function (item) {
              if (item.termcode < 10) {
                item.codeformat = item.icpcode + '00' + item.termcode.toString();
              }
              else if (item.termcode >= 10 && item.termcode < 100) {
                item.codeformat = item.icpcode + '0' + item.termcode.toString();
              }
              else if (item.termcode >= 100) {
                item.codeformat = item.icpcode + item.termcode.toString();
              }
            });
            //console.log('terms count:',$scope.terms.length);
            $scope.codeLength = $scope.terms.length;
          },
          function(error){
            alert('Error ICPCKEY EditForm\nDetail: '+error.message);
          });
        }else{
            codingFactory.getlookUpTable().query({ keyword: $scope.customSelected }, function (linkkey) {
              // console.log('linkkey',linkkey);
              if(linkkey){
                var mySet = new Set();

                $scope.codetrm.forEach(function (childSnapshot) {
                  linkkey[0].termid.forEach(function (item) {

                    if (childSnapshot.termid == item) {
                      mySet.add(childSnapshot);
                      return;//to break the loop
                    }
                  });
                });

                $scope.terms = Array.from(mySet);
                //Converts icpcode and termcode into ICPC-2 PLUS nomenclature (e.g 'W84024')
                $scope.terms.forEach(function (item) {
                  if (item.termcode < 10) {
                    item.codeformat = item.icpcode + '00' + item.termcode.toString();
                  }
                  else if (item.termcode >= 10 && item.termcode < 100) {
                    item.codeformat = item.icpcode + '0' + item.termcode.toString();
                  }
                  else if (item.termcode >= 100) {
                    item.codeformat = item.icpcode + item.termcode.toString();
                  }
                });
                //console.log('terms count:',$scope.terms.length);
                $scope.codeLength = $scope.terms.length;
              }else{
                $scope.codeLength = 0;
                // $scope.showListTerms = false;
              }
            });
          }
        });
      }
      else{
        $scope.codeLength = 0;
        $scope.showListTerms = false;
      }
    }
  }
  
  
  $scope.searchCode();

  editOFCtr.ok = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.close(editOFCtr.selectedCode2);
  };

  editOFCtr.cancel = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('oceanSummerApp').controller('DiagnosisModalEditCtrl', function ($scope, $uibModalInstance, codingFactory, icpc2lnk, icpc2trm, diagnum, name, num) {

  var editOFCtr = this;
  //$scope.codingkey=  icpc2key;
  $scope.codelnk = icpc2lnk;
  $scope.codetrm = icpc2trm;
  $scope.customSelected = name;

  editOFCtr.selectedCode2 = {
    trm: editOFCtr.trm,
    diagnum: diagnum,
    num: num
  };

  $scope.showListTerms = false;
  $scope.searchCode = function () {
    if(icpc2lnk.length == 0 || icpc2trm.length == 0){
      $scope.showListTerms = false;
    }
    else{
      $scope.showListTerms = true;
      $scope.termids = [];

     if($scope.customSelected){
        codingFactory.getKeywordCounter().query({ keyword: $scope.customSelected }, function (counter) {
          // console.log('counter',counter);
          if(counter.length > 0){
          codingFactory.getCodeKeyword().query({ keyword: $scope.customSelected }, function (icpc2key) {

            icpc2key.forEach(function (subitem) {
              $scope.codelnk.forEach(function (item) {

                if (item.keyid == subitem.keyid) {
                  var termid = item.termid;
                  $scope.termids.push(termid);
                  return;//to break the loop
                }
              });
            });

            var mySet = new Set();

            $scope.codetrm.forEach(function (childSnapshot) {
              $scope.termids.forEach(function (item) {

                if (childSnapshot.termid == item) {
                  mySet.add(childSnapshot);
                  return;//to break the loop
                }
              });
            });

            $scope.terms = Array.from(mySet);
            //Converts icpcode and termcode into ICPC-2 PLUS nomenclature (e.g 'W84024')
            $scope.terms.forEach(function (item) {
              if (item.termcode < 10) {
                item.codeformat = item.icpcode + '00' + item.termcode.toString();
              }
              else if (item.termcode >= 10 && item.termcode < 100) {
                item.codeformat = item.icpcode + '0' + item.termcode.toString();
              }
              else if (item.termcode >= 100) {
                item.codeformat = item.icpcode + item.termcode.toString();
              }
            });
            //console.log('terms count:',$scope.terms.length);
            $scope.codeLength = $scope.terms.length;
          },
          function(error){
            alert('Error ICPCKEY EditForm\nDetail: '+error.message);
          });
        }else{
            codingFactory.getlookUpTable().query({ keyword: $scope.customSelected }, function (linkkey) {
              // console.log('linkkey',linkkey);
              if(linkkey){
                var mySet = new Set();

                $scope.codetrm.forEach(function (childSnapshot) {
                  linkkey[0].termid.forEach(function (item) {

                    if (childSnapshot.termid == item) {
                      mySet.add(childSnapshot);
                      return;//to break the loop
                    }
                  });
                });

                $scope.terms = Array.from(mySet);
                //Converts icpcode and termcode into ICPC-2 PLUS nomenclature (e.g 'W84024')
                $scope.terms.forEach(function (item) {
                  if (item.termcode < 10) {
                    item.codeformat = item.icpcode + '00' + item.termcode.toString();
                  }
                  else if (item.termcode >= 10 && item.termcode < 100) {
                    item.codeformat = item.icpcode + '0' + item.termcode.toString();
                  }
                  else if (item.termcode >= 100) {
                    item.codeformat = item.icpcode + item.termcode.toString();
                  }
                });
                //console.log('terms count:',$scope.terms.length);
                $scope.codeLength = $scope.terms.length;
              }else{
                $scope.codeLength = 0;
                // $scope.showListTerms = false;
              }
            });
          }
        });
      }
      else{
        $scope.codeLength = 0;
        $scope.showListTerms = false;
      }
    }
  }

  $scope.searchCode();

  editOFCtr.ok = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.close(editOFCtr.selectedCode2);
    //console.log(createOFCtr.selectedCode2);
  };

  editOFCtr.cancel = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.dismiss('cancel');
  };
});

function ModalInstanceEditCtrl($scope, $state, $uibModalInstance,$timeout, form, Auth, formFactory,toaster) {

  $scope.encnum = form.encnum;
  $scope.encdate = form.encdate;
  $scope.starttime = form.starttime;
  $scope.finishtime = form.finishtime;
  $scope.bill = form.bill;
  if(form.bill == 'MBS/DVA'){
      $scope.medicare = form.medicare;
  }else{
    $scope.medicare = [];
  }
  
  // $scope.nonmedicare = form.nonmedicare;
  $scope.consultation = form.patient.consultation;
  $scope.condition = form.patient.conditions;
  $scope.timesgp = form.patient.timesgp;
  //console.log('condition: ',$scope.condition);
  $scope.gender = form.patient.gender;
  $scope.post = form.patient.post;
  $scope.height = form.patient.height;
  $scope.weight = form.patient.weight;
  $scope.dob = form.patient.dob;
  $scope.reason = form.reason;
  //console.log('reasons: ',$scope.reason);
  $scope.smoking = form.patient.smoking;
  $scope.drinking = form.patient.drinking;
  $scope.drinks = form.patient.drinks;
  $scope.moredrink = form.patient.moredrink;
  this.owner = Auth.getCurrentUser().name;
  //console.log('owner: ',this.owner);

  /*var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  $scope.fTime  = {value2:new Date(2016,8,28,h,m)};
  $scope.finishtime= moment($scope.fTime.value2).format('HH:mm A');*/

  $scope.cancel = function () {
    $uibModalInstance.close();
  };

  var toaster1 = function(type,text){
    toaster.pop({
            type: type,           
            title: text,
            // body: text,
            showCloseButton: true,
            timeout: 2000
        });
    $timeout(function () {
      $state.go('index.home');
    }, 2000);
  }

  //console.log($scope.newReasonList);
  $scope.diagnosisList = form.diagnosis;
  //console.log('diagnosisList: ',$scope.diagnosisList);
  $scope.submitForm = function () {

    form.status = 'Submitted';
    form.enabled = true;
    form.owner = Auth.getCurrentUser()._id;
    if(!form.bill == 'MBS/DVA'){
      form.medicare = [];
    }
    formFactory.oceanForms().update({ id: form._id }, form,
    function(){
      $uibModalInstance.close();
      toaster1('success','Form Submitted!');
    },
    function(error){
      alert('Error submit form EditForm\nDetail: '+error.message);
    });

    

  }
}
