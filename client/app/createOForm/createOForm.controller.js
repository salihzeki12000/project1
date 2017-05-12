'use strict';

angular
  .module('oceanSummerApp')
  .controller('createOFController', createOFController)
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);
  // .run( function($state, $rootScope){
  //   $rootScope.stateHolder = $state.current;
  //   console.log('$rootScope.stateHolder',$rootScope.stateHolder);
  // });

function createOFController($scope, $uibModal, $timeout, $state, $window,$rootScope, formFactory, Auth, codingFactory, drugFactory, toaster) {


  var createOFCtr = this;
  $scope.noresult = "No matching results!";
  $scope.medicare = [];
  $scope.doctor = Auth.getCurrentUser();
  $rootScope.state=  $state;
  // $timeout(function () {
  //   $scope.showalert = true;
  // }, 10000);
   $window.start = new Date().getTime();
  //  $compile($document)($scope, function(clonedElement, scope) {
  //         var timer = $timeout(function () {
  //           console.log('ENDING MEASUREMENT: ' + (new Date().getTime() - $window.start) + 'ms');
  //           $timeout.cancel(timer);
  //         }, 0, false);
  //       });

  // $scope.icpc2key = [];
  // icpc2keyFactory.query({}, function(icpc2key){
  //   $scope.icpc2key = icpc2key;
  //   //console.log('forms: ',forms);
  // });

 


  $scope.icpc2lnk = [];
  codingFactory.getCodeLnk().query({}, function (icpc2lnk) {
    $scope.icpc2lnk = icpc2lnk;
    $scope.timelnk = true;

    //console.log('forms: ',forms);
  },
  function(error){
    alert('Error loading ICPC2LNK\nDetail: '+error.message);
  });

  $scope.icpc2trm = [];
  codingFactory.getCodeTrm().query({}, function (icpc2trm) {
    $scope.icpc2trm = icpc2trm;
    //console.log('forms: ',forms);
  },
  function(error){
    alert('Error loading ICPC2TRM\nDetail: '+error.message);
  });

  $scope.caps = [];
  drugFactory.getCaps().query({}, function (caps) {
    $scope.caps = caps;
    //console.log('forms: ',forms);
  },
  function(error){
    alert('Error loading CAPS\nDetail: '+error.message);
  });

  //console.log('capsSelected',$scope.capsSelected);
  $scope.lastnum = 0;
  formFactory.getLastFormOwner().query({owner:$scope.doctor._id},function (lastForm) {
    console.log('lastForm',lastForm);
    if(lastForm.length>0){
      $scope.lastForm = lastForm;
      // console.log('$scope.lastForm',$scope.lastForm);
      $scope.lastnum = $scope.lastForm[0].encnum + 1;
    }else{
      $scope.lastnum = 1;
    }
    
    console.log('$scope.lastnum',$scope.lastnum);
    //console.log('$scope.lastnum',$scope.lastnum);
  },
  function(error){
    alert('Error getLastForm\nDetail: '+error.message);
  });

  //console.log('lol',$scope.lastnum);
  $scope.today = moment(new Date()).format('DD/MM/YYYY');

  $scope.myDate = new Date();
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth();
  var day = d.getDay();
  var h = d.getHours();
  var m = d.getMinutes();
  var m2 = d.getMinutes() + 20;

  // $scope.currentDate = { value1: new Date(2016, 8, 28, h, m) };
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 5;

  // $scope.fTime = { value2: new Date(2016, 8, 28, h, m) };
  // $scope.finishtime = moment($scope.fTime.value2).format('hh:mm A');
  $scope.finishtime = new Date();
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
    if($scope.bill == 'MBS/DVA'){
      $scope.disablembs = false;
      // $("#otherpaid").attr('disabled','disabled');
      // $("#nocharge").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
    if($scope.bill == 'Other Paid'){
      // $("#otherpaid").removeAttr('disabled');
      // $("#mbs").attr('ng-disabled',true);
      $scope.disablembs = true;
      // $("#nocharge").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
    if($scope.bill == 'No Charge'){
      // $("#nocharge").removeAttr('disabled');
      $scope.disablembs = true;
      // $("#mbs").attr('disabled','disabled');
      // console.log('$scope.disablembs',$scope.disablembs);
    }
  }

  $scope.goOpenModal2= function(event,type,text){    
    if(event.keyCode == 13){
      event.preventDefault(); 
      if(text == 'reason'){
        createOFCtr.openMyModal2(type.rname,type.rnum,text);      
      }
      if(text == 'diagnosis'){
        createOFCtr.openMyModal2(type.name,type.dnum,text);
      }
    }    
  }

  $scope.goOpenModal= function(event,diagnum,type,text){    
    if(event.keyCode == 13){
      event.preventDefault(); 
      if(text == 'imaging'){
        createOFCtr.openMyModal(diagnum,type.iname,type.inum,text);
      }
      if(text == 'pathology'){
        createOFCtr.openMyModal(diagnum,type.pname,type.pnum,text);
      }
      if(text == 'procedure'){
        createOFCtr.openMyModal(diagnum,type.pname,type.pnum,text);
      }
      if(text == 'referral'){
        createOFCtr.openMyModal(diagnum,type.rname,type.rnum,text)
      }
    }    
  }

  //Conditions. 'New Patient','Health Care/Benefits Card','Veterans Affairs Card','NESB', 'Aboriginal','Torres Strait Islander'
  $scope.conditions = {
    newpatient: '',
    healthcare: '',
    veterans: '',
    nesb: '',
    aboriginal: '',
    torres: ''
  };

  $scope.resetConditions = function () {
    $scope.conditions = {
      newpatient: '',
      healthcare: '',
      veterans: '',
      nesb: '',
      aboriginal: '',
      torres: ''
    };
  }
  $scope.resetNewPatient = function () {
      $scope.conditions.newpatient = '';  
  }
  $scope.resetHealthcare = function () {
    $scope.conditions.healthcare= '';
  }
  $scope.resetVetarans = function () {
    console.log('veterans',$scope.conditions.veterans);
    $scope.conditions.veterans= '';
  }
  $scope.resetNesb = function () {
    $scope.conditions.nesb= '';
  }
  $scope.resetAboriginal = function () {
    $scope.conditions.aboriginal= '';
  }
  $scope.resetTorres = function () {
    $scope.conditions.torres= '';
  }

  $scope.gender = {
    name: ''
  }

  // $scope.toaster1 = function(){   
  //   toaster.pop({
  //           type: 'success',           
  //           title: 'Title example',
  //           body: 'This is example of Toastr notification box.',
  //           showCloseButton: true,
  //           timeout: 3000
  //       });
  //   $timeout(function () {
  //     $state.go('index.home');
  //   }, 3000);
  // }
  

  $scope.newReasonList = [{ rnum: 1, rname: '', icpc2plus: '' },
  { rnum: 2, rname: '', icpc2plus: '' },
  { rnum: 3, rname: '', icpc2plus: '' }];

  $scope.addNewReason = function () {
    var maxnum = 0;
    $scope.newReasonList.forEach(function (item) {
      if (item.rnum > maxnum) {
        maxnum = item.rnum;
      }
    });
    $scope.newReasonList.push({ rnum: maxnum + 1, rname: '', icpc2plus: '' });
  }

  $scope.deleteReason = function (reas) {
    //console.log(reas);
    var count = 0;
    $scope.newReasonList.forEach(function (item) {
      if (item == reas) {
        $scope.newReasonList.splice(count, 1);
      } else {
        count++;
      }
    });   

    //console.log($scope.newReasonList);
  }

  //Status diagnosis
  $scope.continuation = 'continuation';
  $scope.otc = 'otc';;
  $scope.supply = 'supply';
  $scope.new = 'new';
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

  /**
     * groups - used for Collapse panels in Tabs and Panels view     */

  $scope.groups = [
    {
      title: 'Diagnosis/Problems #1',
      status: { open: 'active' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #2',
      status: { open: '' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #3',
      status: { open: '' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #4',
      status: { open: '' },
      diagnosis: {
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
      }
    }
  ];

  $scope.deleteDiagnosis = function (group) {
    //console.log(group);
    var count = 0;
    $scope.groups.forEach(function (item) {
      if (item == group) {
        $scope.groups.splice(count, 1);
      } else {
        count++;
      }
    });
    //console.log($scope.groups);
  }

  $scope.$watch('groups',function(value){
    // console.log('groups',value);
    $scope.groups.forEach(function (item) {        
          item.diagnosis.drug.forEach(function (subitem) {           
            if (subitem.drname.label) {
              // console.log('drug before:', subitem.drname);
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

  $scope.$watch('dob',function(value){
    if($scope.dob){
      var dobarray = $scope.dob.split("/");
      var newdob = dobarray[2]+"/"+dobarray[1]+"/"+dobarray[0];
      var agedob = getAge(newdob);
      console.log('dob: ', newdob);
      console.log('age: ' + getAge(newdob));
      if(agedob < 18){        
        $("#smoking").attr('disabled','disabled');
        $("#drinking").attr('disabled','disabled');
        $("#drinks").attr('disabled','disabled');
        $("#moredrink").attr('disabled','disabled');
        $scope.smoking = '';
        $scope.drinking = '';
        $scope.drinks = '';
        $scope.moredrink = '';
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
  };

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
    
    /*$scope.groups.forEach(function(item){
        console.log(item.diagnosis.drug);
    });*/
  }

  $scope.deleteDrug = function (drugList, drug) {
    //console.log(group);
    var count = 0;
    drugList.forEach(function (item) {
      if (item == drug) {
        console.log('count drug to delete', count);
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
  //   $scope.groups.forEach(function (item) {
  //     item.status.open='';
      
  //   });
  //   group.status.open='active';
  // }

  $scope.addMoreDiag = function () {
    //var countTab = $scope.groups.length+1;
    //var titleTab = 'Diagnosis/Problems #'+countTab;
    var maxnum = 0;
    $scope.groups.forEach(function (item) {
      // item.status.open='';
      if (item.diagnosis.dnum > maxnum) {
        maxnum = item.diagnosis.dnum;
      }
    });
    
    var countTab = maxnum + 1;
    $scope.groups.push({
      title: 'Diagnosis/Problems #' + countTab,
      status: { open: 'active' },
      diagnosis: {
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
      }
    });

  }

  $scope.dateBeforeToday = function (dateString) {
    if (dateString) {
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

  var saveDraft = function(){
    // $scope.createOceanForm.dob.$error.validationError = false;
        // $scope.createOceanForm.dob.$invalid = false;
        // $scope.createOceanForm.dob.$valid = true;

        // var d = new Date();
        // var h = d.getHours();
        // var m = d.getMinutes();
        // $scope.fTime = { value2: new Date(2016, 8, 28, h, m) };
        $scope.finishtime = moment($scope.finishtime).format('hh:mm A');

        //Extract diagnosis list
        $scope.diagnosisList = [];
        $scope.groups.forEach(function (item) {
          $scope.diagnosisList.push(item.diagnosis);
        });

        var status = 'Draft';
        var enabled = true;
        var owneruid = Auth.getCurrentUser()._id;

        $scope.encdate = moment($scope.dt).format('DD/MM/YYYY');
        $scope.starttime = moment($scope.mytime).format('hh:mm A');

        if(!$scope.bill){
          $scope.bill = '';
        }
        if (!$scope.medicare) {
          $scope.medicare = [''];
        }
        // if (!$scope.nonmedicare) {
        //   $scope.nonmedicare = '';
        // }
        if (!$scope.consultation) {
          $scope.consultation = '';
        }
        if(!$scope.conditions){
          $scope.conditions = {
            newpatient: '',
            healthcare: '',
            veterans: '',
            nesb: '',
            aboriginal: '',
            torres: ''
          };
        }
        if(!$scope.gender){
          $scope.gender = {
            name: ''
          }
        }
        if(!$scope.post){
          $scope.post = '';
        }
        if(!$scope.dob){
          $scope.dob = '';
        }
        if(!$scope.height){
          $scope.height = '';
        }
        if(!$scope.weight){
          $scope.weight = '';
        }
        // if (!$scope.timesgp) {
        //   $scope.timesgp = 0;
        // }
        if (!$scope.smoking) {
          $scope.smoking = '';
        }
        if (!$scope.drinking) {
          $scope.drinking = '';
        }
        // if (!$scope.drinks) {
        //   $scope.drinks = 0;
        // }
        if (!$scope.moredrink) {
          $scope.moredrink = '';
        }

        $scope.sex = $scope.gender.name;
        // console.log('bill', $scope.bill);
        //console.log('conditions', $scope.conditions);
        //creating an Ocean object
        $scope.draftOcean.encnum = $scope.lastnum;
        $scope.draftOcean.encdate = $scope.encdate;
        $scope.draftOcean.starttime = $scope.starttime;
        $scope.draftOcean.finishtime = $scope.finishtime;
        $scope.draftOcean.status = 'Draft';
        $scope.draftOcean.bill = $scope.bill;
        if($scope.bill == 'MBS/DVA'){
          $scope.draftOcean.medicare = $scope.medicare;
        }else{
          $scope.draftOcean.medicare = [];
        }
        
        // $scope.draftOcean.nonmedicare = $scope.nonmedicare;
        $scope.draftOcean.patient.consultation = $scope.consultation;//patient seen
        $scope.draftOcean.patient.conditions = $scope.conditions;
        $scope.draftOcean.patient.timesgp = $scope.timesgp;
        $scope.draftOcean.patient.gender = $scope.sex;
        $scope.draftOcean.patient.post = $scope.post;
        $scope.draftOcean.patient.height = $scope.height;
        $scope.draftOcean.patient.weight = $scope.weight;
        $scope.draftOcean.patient.dob = $scope.dob;
        $scope.draftOcean.patient.smoking = $scope.smoking;
        $scope.draftOcean.patient.drinking = $scope.drinking;
        $scope.draftOcean.patient.drinks = $scope.drinks;
        $scope.draftOcean.patient.moredrink = $scope.moredrink;
        $scope.draftOcean.reason = $scope.newReasonList;
        $scope.draftOcean.diagnosis = $scope.diagnosisList;
        $scope.draftOcean.enabled = true;
        $scope.draftOcean.owner = owneruid;
        //console.log('draftOcean', $scope.draftOcean);

        formFactory.oceanForms().save($scope.draftOcean, function () {
          toaster1('warning','New Draft');
          // $state.go('index.home');
          // console.log('save form');
        },
        function(error){
          alert('Some wrong when you saved this form\nDetail: '+error.message);
        });
  }

  $scope.draftOcean = { patient: {} };
  $scope.saveAndExit = function () {

    if ($scope.dob) {
      var dobvalid = $scope.validateDate($scope.dob);
      console.log('dobvalid', dobvalid);
      var dobBeforeToday = $scope.dateBeforeToday($scope.dob);
      console.log('dobBeforeToday', dobBeforeToday);
      
      if (!dobvalid) {
        $scope.createOceanForm.dob.$error.validationError = true;    
        // $scope.createOceanForm.dob.$invalid = false;
        // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
        toaster2('error','Invalid DOB');
      }
      if (!dobBeforeToday) {
        $scope.createOceanForm.dob.$error.validationError = true;      
        // $scope.createOceanForm.dob.$invalid = true;
        // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
        toaster2('error','DOB cannot be after today');
      }
      
      if (dobvalid && dobBeforeToday) {
        $scope.createOceanForm.dob.$error.validationError = undefined;
        $scope.createOceanForm.dob.$invalid = false;
        $scope.createOceanForm.dob.$valid = true;
        saveDraft();
        
      }
    }else{
      saveDraft();
      // toaster1('warning','New Draft');
    }
  }

  

  $scope.confirmForm = function (size) {
    var dobvalid = $scope.validateDate($scope.dob);
    console.log('dobvalid', dobvalid);
    var dobBeforeToday = $scope.dateBeforeToday($scope.dob);
    console.log('dobBeforeToday', dobBeforeToday);
    var errors = $scope.validateForm();
    if( errors.length > 0){
      $scope.showMessageError(errors);
      // return;
    }
    if (!dobvalid && $scope.dob) {
      $scope.createOceanForm.dob.$error.validationError = true;    
      // $scope.createOceanForm.dob.$invalid = false;
      // console.log('$scope.createOceanForm.dob.$error', $scope.createOceanForm.dob.$error);
      toaster2('error','Invalid DOB');
    }
    if (!dobBeforeToday && $scope.dob) {
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
      // $scope.createOceanForm.dob.$invalid = undefined;
      // $scope.createOceanForm.dob.$valid = true;
      var modalInstance = $uibModal.open({
        templateUrl: 'app/common/form/modal_form.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'modal',
        size: size,
        resolve: {
          groups: function () {
            return $scope.groups;
          },
          encnum: function () {
            return $scope.lastnum;
          },
          encdate: function () {
            return $scope.dt;
          },
          starttime: function () {
            return $scope.mytime;
          },
          finishtime: function () {
            return $scope.finishtime;
          },
          bill: function(){
            return $scope.bill;
          },
          medicare: function () {
            return $scope.medicare;
          },
          // nonmedicare: function () {
          //   return $scope.nonmedicare;
          // },
          consultation: function () {
            return $scope.consultation;
          },
          condition: function () {
            return $scope.conditions;
          },
          timesgp: function () {
            return $scope.timesgp;
          },
          gender: function () {
            return $scope.gender.name;
          },
          post: function () {
            return $scope.post;
          },
          height: function () {
            return $scope.height;
          },
          weight: function () {
            return $scope.weight;
          },
          dob: function () {
            return $scope.dob;
          },
          reason: function () {
            return $scope.newReasonList;
          },
          smoking: function () {
            return $scope.smoking;
          },
          drinking: function () {
            return $scope.drinking;
          },
          drinks: function () {
            return $scope.drinks;
          },
          moredrink: function () {
            return $scope.moredrink;
          }

        }
      });
    }
    else{
      return;
    }
  }

  $scope.resetForm = function(){

        $scope.bill = '';
      
        $scope.medicare = [];
     
        $scope.consultation = '';
      
        $scope.conditions = {
          newpatient: '',
          healthcare: '',
          veterans: '',
          nesb: '',
          aboriginal: '',
          torres: ''
        };
      
        $scope.gender = { name: ''};
     
        $scope.post = '';
     
        $scope.dob = '';
      
        $scope.height = '';
      
        $scope.weight = '';
      
        $scope.timesgp = '';
      
        $scope.smoking = '';
     
        $scope.drinking = '';
      
        $scope.drinks = '';
      
        $scope.moredrink = '';
        $scope.newReasonList=[];

        $scope.newReasonList=[{ rnum: 1, rname: '', icpc2plus: '' },
  { rnum: 2, rname: '', icpc2plus: '' },
  { rnum: 3, rname: '', icpc2plus: '' }];

      $scope.groups = [];
       $scope.groups = [
    {
      title: 'Diagnosis/Problems #1',
      status: { open: 'active' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #2',
      status: { open: '' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #3',
      status: { open: '' },
      diagnosis: {
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
      }
    },
    {
      title: 'Diagnosis/Problems #4',
      status: { open: '' },
      diagnosis: {
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
      }
    }
  ];
     toaster2('warning','Reset form','');
  }

  createOFCtr.openMyModal2 = function (name,num, type) {

    var modalMyInstance = $uibModal.open({
      templateUrl: 'app/common/form/modal_icpc.html',
      controller: 'CodingModalCtrl',
      controllerAs: 'createOFCtr',
      //size: size,
      resolve: {
        name: function () {
          return name;
        },
        num: function () {
          return num;
        },
        // icpc2key:function(){
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
      createOFCtr.selectedCode2 = selectedItem;
      if (type == 'reason') {
        $scope.newReasonList.forEach(function (item) {
          if (item.rnum == createOFCtr.selectedCode2.num) {
            item.rname = createOFCtr.selectedCode2.trm.term30;
            item.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
            console.log('reason:', item);
          }
        });
      }
      if (type == 'diagnosis') {
        $scope.groups.forEach(function (item) {
          if (item.diagnosis.dnum == createOFCtr.selectedCode2.num) {
            item.diagnosis.name = createOFCtr.selectedCode2.trm.term30;
            item.diagnosis.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
            console.log('diagnosis:', item.diagnosis);
          }
        });
      }
      //console.log('createOFCtr.selectedCode2',createOFCtr.selectedCode2);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  createOFCtr.openMyModal = function (diagnum, name, num, type) {

    var modalMyInstance2 = $uibModal.open({
      templateUrl: 'app/common/form/modal_icpc.html',
      controller: 'DiagnosisModalCtrl',
      controllerAs: 'createOFCtr',
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
      createOFCtr.selectedCode2 = selectedItem;

      if (type == 'procedure') {
        $scope.groups.forEach(function (item) {
          if (item.diagnosis.dnum == createOFCtr.selectedCode2.diagnum) {
            item.diagnosis.procedure.forEach(function (subitem) {
              if (subitem.pnum == createOFCtr.selectedCode2.num) {
                subitem.pname = createOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('procedure:', subitem);
              }
            });
          }
        });
      }
      if (type == 'imaging') {
        $scope.groups.forEach(function (item) {
          if (item.diagnosis.dnum == createOFCtr.selectedCode2.diagnum) {
            item.diagnosis.imaging.forEach(function (subitem) {
              if (subitem.inum == createOFCtr.selectedCode2.num) {
                subitem.iname = createOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('imaging:', subitem);
              }
            });
          }
        });
      }
      if (type == 'referral') {
        $scope.groups.forEach(function (item) {
          if (item.diagnosis.dnum == createOFCtr.selectedCode2.diagnum) {
            item.diagnosis.referral.forEach(function (subitem) {
              if (subitem.rnum == createOFCtr.selectedCode2.num) {
                subitem.rname = createOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
                subitem.enabled = true;
                console.log('referral:', subitem);
              }
            });
          }
        });
      }
      if (type == 'pathology') {
        $scope.groups.forEach(function (item) {
          if (item.diagnosis.dnum == createOFCtr.selectedCode2.diagnum) {
            item.diagnosis.pathology.forEach(function (subitem) {
              if (subitem.pnum == createOFCtr.selectedCode2.num) {
                subitem.pname = createOFCtr.selectedCode2.trm.term30;
                subitem.icpc2plus = createOFCtr.selectedCode2.trm.codeformat;
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

angular.module('oceanSummerApp').controller('DrugModalCtrl', function ($scope, $uibModalInstance, caps) {

  var createOFCtr = this;
  $scope.codingCaps = caps;
  // capsFactory.query({}, function(caps){
  //   $scope.codingCaps = caps;
  //   //console.log('forms: ',forms);
  // });

  createOFCtr.ok = function () {
    $uibModalInstance.close(createOFCtr.capsSelected);
  };

  createOFCtr.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('oceanSummerApp').controller('CodingModalCtrl', function ($scope, $uibModalInstance, codingFactory, icpc2lnk, icpc2trm, name,num) {

  var createOFCtr = this;
  $scope.codelnk = icpc2lnk;
  $scope.codetrm = icpc2trm;
  $scope.customSelected = name;

  createOFCtr.selectedCode2 = {
    trm: createOFCtr.trm,
    num: num
  };

  $scope.showListTerms = false;
  $scope.searchCode = function() {
    // console.log('icpc2lnk.length',icpc2lnk.length);
    // console.log('icpc2trm.length',icpc2trm.length);
    if(icpc2lnk.length == 0 || icpc2trm.length == 0){
      $scope.showListTerms = false;
    }
    else{
      // console.log('aqui2');
      $scope.showListTerms = true;
      $scope.termids = [];

      //If keyword is 'oa', it will return keyid: 1013 and 2814
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
              alert('Errors in getCodeKeyword CodingModalCtrl\nDetail: '+error.message);
            });
          }else{
            codingFactory.getlookUpTable().query({ keyword: $scope.customSelected }, function (linkkey) {
              // console.log('linkkey',linkkey);
              if(linkkey.length > 0){
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
              }
              else{
                $scope.codeLength = 0;
                // $scope.showListTerms = false;
              }
            });
          }
        });
         
      }else{
        $scope.codeLength = 0;
        $scope.showListTerms = false;
      }
    }
  }

  $scope.searchCode();

  createOFCtr.ok = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.close(createOFCtr.selectedCode2);
  };

  createOFCtr.cancel = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('oceanSummerApp').controller('DiagnosisModalCtrl', function ($scope, $uibModalInstance, codingFactory, icpc2lnk, icpc2trm, diagnum, name, num) {

  var createOFCtr = this;
  $scope.codelnk = icpc2lnk;
  $scope.codetrm = icpc2trm;
  $scope.customSelected = name;

  createOFCtr.selectedCode2 = {
    trm: createOFCtr.trm,
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
              alert('Errors in getCodeKeyword CodingModalCtrl\nDetail: '+error.message);
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

  createOFCtr.ok = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.close(createOFCtr.selectedCode2);
    //console.log(createOFCtr.selectedCode2);
  };

  createOFCtr.cancel = function () {
    $scope.showListTerms = undefined;
    $uibModalInstance.dismiss('cancel');
  };
});

function ModalInstanceCtrl($scope, $state, $uibModalInstance,$timeout, groups, encnum, encdate, starttime, finishtime, bill, medicare,consultation, condition, timesgp, gender, post, height, weight, dob, reason, smoking, drinking, drinks, moredrink, Auth, formFactory,toaster) {

  $scope.encnum = encnum;
  $scope.encdate = moment(encdate).format('DD/MM/YYYY');
  $scope.starttime = moment(starttime).format('hh:mm A');
  $scope.finishtime = moment(finishtime).format('hh:mm A');
  $scope.bill = bill;
  if(bill == 'MBS/DVA'){
    $scope.medicare = medicare;
  }else{
    $scope.medicare = [];
  }
        
  
  // $scope.nonmedicare = nonmedicare;
  $scope.consultation = consultation;
  $scope.condition = condition;
  $scope.timesgp = timesgp;
  // console.log('condition scope: ',$scope.condition);
  // console.log('condition 1',condition);
  $scope.gender = gender;
  $scope.post = post;
  $scope.height = height;
  $scope.weight = weight;
  $scope.dob = dob;
  $scope.reason = reason;
  //console.log('reasons: ',$scope.reason);
  $scope.smoking = smoking;
  $scope.drinking = drinking;
  $scope.drinks = drinks;
  $scope.moredrink = moredrink;
  this.owner = Auth.getCurrentUser().name;
  //console.log('owner: ',this.owner);

  

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
  $scope.diagnosisList = [];
  groups.forEach(function (item) {
    $scope.diagnosisList.push(item.diagnosis);
  });
  //console.log('diagnosisList: ',$scope.diagnosisList);
  
  $scope.submitForm = function () {

    var status = 'Submitted';
    var enabled = true;
    var owneruid = Auth.getCurrentUser()._id;
    $scope.draftOcean = { patient: {} };
    $scope.draftOcean.encnum = encnum;
    $scope.draftOcean.encdate = $scope.encdate;
    $scope.draftOcean.starttime = $scope.starttime;
    $scope.draftOcean.finishtime = $scope.finishtime;
    $scope.draftOcean.status = 'Submitted';
    $scope.draftOcean.bill = bill;
    if(bill == 'MBS/DVA'){
      $scope.draftOcean.medicare = medicare;
    }else{
      $scope.draftOcean.medicare = [];
    }
    
    // $scope.draftOcean.nonmedicare = nonmedicare;
    $scope.draftOcean.patient.consultation = consultation;
    $scope.draftOcean.patient.conditions = condition;
    // console.log('$scope.draftOcean.patient.conditions ',$scope.draftOcean.patient.conditions );
    $scope.draftOcean.patient.timesgp = timesgp;
    $scope.draftOcean.patient.gender = gender;
    $scope.draftOcean.patient.post = post;
    $scope.draftOcean.patient.height = height;
    $scope.draftOcean.patient.weight = weight;
    $scope.draftOcean.patient.dob = dob;
    $scope.draftOcean.patient.smoking = smoking;
    $scope.draftOcean.patient.drinking = drinking;
    $scope.draftOcean.patient.drinks = drinks;
    $scope.draftOcean.patient.moredrink = moredrink;
    $scope.draftOcean.reason = reason;
    $scope.draftOcean.diagnosis = $scope.diagnosisList;
    $scope.draftOcean.enabled = true;
    $scope.draftOcean.owner = owneruid;
    // console.log('draftOcean', $scope.draftOcean);

    formFactory.oceanForms().save($scope.draftOcean, function () {
      toaster1('success','Form Submitted!');
    },
        function(error){
          alert('Errors in submitForm ModalInstanceCtrl\nDetail: '+error.message);
        });

    $uibModalInstance.close();

  }
}
