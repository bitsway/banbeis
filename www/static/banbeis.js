


var achPhoto="";
var achPhoto2="";
var imageName = "";
var imageName2 = "";
var imagePathA="";
var imagePath2A="";

var latitude="";
var longitude="";
var upListFlag=0;

function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}


//---- online 
var apipath="http://c003.cloudapp.net/banbeis/syncmobile/";
var apipath_compliance="http://c003.cloudapp.net/banbeis/syncmobile_compliance/";

//--- local
//var apipath="http://127.0.0.1:8000/banbeis/syncmobile/";
//var apipath_compliance="http://127.0.0.1:8000/banbeis/syncmobile_compliance/";

 url ="";


$(document).ready(function(){
	if (localStorage.synced!='YES'){
			 url = "#pagesync";						
		}else{
			
			if (upListFlag==0){
				$("#ffUpDiv").html(localStorage.upazilaList);	
				upListFlag=1;
			}else{
				$('#ffUpDiv').empty();
				$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
			}
			
			/*--------compliance-----------*/
			//$("input[name='agr_seqaep']:checked").val("");
			
			/*--------compliance-end----------*/
			
			
			url = "#homePage";
		}
	$.mobile.navigate(url);
	
	/*if (localStorage.selectedSchool!='YES'){
	 $("#c_search").show();
	 $("#c_selected").hide();
	 
	 */
		/*var temp='';
		temp=localStorage.cp1;
		if(temp.length > 3){
			$("#cp1").html(localStorage.cp1);
			}*/
	/*}else{		
		$("#c_search").hide();
		$("#c_selected").show();
	}*/
	
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=BANBEIS&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=BANBEIS&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.upazilaList=syncResultArray[2];						
						
						localStorage.mobile_no=mobile;
						
						
						$(".errorMsg").html("Sync Successful");
						//alert('aa');
						
						$('#syncBasic').show();
						
						/*--------------*/
						/*$("input[name='add_cls_seqaep']:checked").val("");
						$("#agr_type_con").hide();
						$("#des_cls_ref_sem").hide();*/
						/*--------------*/
						
						
						url = "#homePage";
						$.mobile.navigate(url);
						
						//localStorage.selectedSchool='NO';
						/*localStorage.cp1='NO';
						localStorage.cp2='NO';
						localStorage.cp3='NO';
						localStorage.cp4='NO';
						localStorage.cp5='NO';
						localStorage.cp6='NO';
						localStorage.cp7='NO';
						localStorage.cp8='NO';*/
												
					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
			
			
		 }//-----/field
			
	}
	

function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		$('#up_list_search').val('');
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//----------------back button
function backClick(){
	$(".errorChk").text("");
	}


	
//---------------------------Banbeis data page 
var banbeisFirstData="";
var banbeisData="";
var banbeisDataPage2="";
var banbeisDataPage3="";
var banbeisDataPage4="";
var banbeisDataPage5="";
var banbeisDataPage6="";


function pmthhVerification(){
	if(localStorage.sync_code==undefined || localStorage.sync_code==""){
			$(".errorChk").text("Required Sync");
		}else{
			//alert(apipath+'get_div_list?cid=BANBEIS&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'get_div_list?cid=BANBEIS&sync_code='+localStorage.sync_code,
			  success: function(divStr) {
					  divNameList=divStr.split("<fd>");
					  divCmbo="";
					  for (i=0;i<divNameList.length;i++){					 
						  divCmbo+="<option value="+encodeURIComponent(divNameList[i])+">"+divNameList[i]+"</option>";					  
					  }				  
					  				  
				  }		  
			});	 
			$("#s_div").html(divCmbo);
			
			url="#first_page";					
			$.mobile.navigate(url);		
		}
	
}


//-----------------
 function student(){
	studentQuickID=$("#studentQuickID").val();		
	sch_student_id=$("#studentID").val();
	
	if (studentQuickID==""){
		student_id=sch_student_id
	}else{
		student_id=studentQuickID
		}
			
	localStorage.student_id=student_id	
		
		///alert(apipath+'studentInfoCheck?cid=BANBEIS&sync_code='+localStorage.sync_code+'&student_id='+student_id);
		$.ajax({
			  url:apipath+'studentInfoCheck?cid=BANBEIS&sync_code='+localStorage.sync_code+'&student_id='+student_id,
			  success: function(result) {
				  resultStr=result.split("<fd>");
				  	//alert(resultStr);			  	
					  if (resultStr[0]=="Success"){
						  studentStr=resultStr[1].split("fdfd");
					  	  //alert(studentStr);
						 
						  union_name=studentStr[0]; 
						  union_ward_no=studentStr[1];
						  pourashava_name=studentStr[2];
						  pourashava_ward_no=studentStr[3];
						  upazila_thana=studentStr[4];
						  dist_name=studentStr[5];
						  div_name=studentStr[6];
						  student_name=studentStr[7];
						  student_id=studentStr[8];
						  dob=studentStr[9];
						  fathers_name=studentStr[10];
						  mothers_name=studentStr[11];
						  gender=studentStr[12];
						  current_eiin=studentStr[13];
						  current_school_name=studentStr[14];
						  current_class=studentStr[15];
						  previous_school_name=studentStr[16];
						  previous_eiin=studentStr[17];
						  previous_class=studentStr[18];
						  guardian_name=studentStr[19];
						  parents_village=studentStr[20];
						  parents_post=studentStr[21];
						  parents_union=studentStr[22];
						  parents_upazila=studentStr[23];						  
						
						  //alert(parents_village);
						 
						 $("#union_name").val(union_name);
						 $("#ward_no").val(union_ward_no);
						 $("#pourashave").val(pourashava_name);
						 $("#wardno_pourashave").val(pourashava_ward_no);
						 $("#upazila").val(upazila_thana);
						 $("#zila").val(dist_name);
						 $("#division").val(div_name);
						 $("#name_of_applicant").val(student_name);	 
						 $("#stu_id").val(student_id);
						 $("#dob").val(dob);
						 $("#fathers_name").val(fathers_name);	
						 $("#mothers_name").val(mothers_name);	
						 $("#gender").val(gender);
						 $("#insName").val(current_school_name);
						 $("#eiinNo").val(current_eiin);
						 $("#present_school").val(current_school_name);
						 $("#class_studied_present").val(current_class);
						 $("#dropped_school_name_enrolled").val(previous_school_name);
						 $("#dropped_class_studied_past").val(previous_class); 
						 $("#parents_village").val(parents_village); 
						 $("#parents_post").val(parents_post); 
						 $("#parents_union").val(parents_union); 
						 $("#parents_upazila").val(parents_upazila); 
						 
						 url="#page1";					
						 $.mobile.navigate(url);
						 
					}else if (resultStr[0]=="Failed"){
						$("#comp_error").text(resultStr[1]);						
					}	
									
			  }
			  
		});
			 
}


function getDist(){	
	
	div_name=$("#s_div").val();
	
	//localStorage.sDivName=div_name		
	//alert(apipath+'get_div_dist_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name);
	$.ajax({
		  url:apipath+'get_div_dist_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name,
		  success: function(distStr) {
				  distNameList=distStr.split("<fd>");
				  distCmbo="";
				  for (i=0;i<distNameList.length;i++){					 
					  distCmbo+="<option value="+distNameList[i]+">"+distNameList[i]+"</option>";					  
				  }	
				 
				  var rpt_rep_ob=$("#s_dist");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(distCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
				 // url="#first_page";					
				 // $.mobile.navigate(url);				  	  
				   
			  }		  
		});	
		
		
}
	

function getUp(){	
	div_name=$("#s_div").val();
	dist_name=$("#s_dist").val();	
	//alert(apipath+'get_dist_up_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name);
	$.ajax({
		  url:apipath+'get_dist_up_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name,
		  success: function(upStr) {
				  upNameList=upStr.split("<fd>");
				  upCmbo="";
				  for (i=0;i<upNameList.length;i++){					 
					  upCmbo+="<option value="+upNameList[i]+">"+upNameList[i]+"</option>";					  
				  }			  
				  //$("#s_up").html(upCmbo);
				  var rpt_rep_ob=$("#s_up");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(upCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
				 // url="#first_page";					
				 // $.mobile.navigate(url);
				 
			  }		  
		});	 
		
}
 
function getUpSchool(){	
	div_name=$("#s_div").val();
	dist_name=$("#s_dist").val();
	up_name=$("#s_up").val();	
	//alert(apipath+'get_up_school_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name+'&up_name='+up_name);
	$.ajax({
		  url:apipath+'get_up_school_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name+'&up_name='+up_name,
		  success: function(schoolStr) {
				  schIdNameList=schoolStr.split("<fd>");
				  schoolCmbo="";
				  for (i=0;i<schIdNameList.length;i++){					  
						 schoolCmbo+="<option value="+schIdNameList[i]+">"+schIdNameList[i]+"</option>";						  				  		
				  }			
				  	  
				  //$("#s_school").html(schoolCmbo);
				   var rpt_rep_ob=$("#s_school");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(schoolCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
				  //url="#first_page";					
				  //$.mobile.navigate(url);
			  }		  
		});	 
}



function getStudent(){
	
	div_name=$("#s_div").val();
	dist_name=$("#s_dist").val();
	up_name=$("#s_up").val();	
	schIdNameList=$("#s_school").val();
	
	schIdName=schIdNameList.split("-");
	
	if (schIdName.length>=1){
		schoolId=schIdName[0];
		}
	//alert(apipath+'get_school_stuid_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name+'&up_name='+up_name+'&schoolId='+schoolId);
	var scStIdListStr="";
		$.ajax({
			  url:apipath+'get_school_stuid_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name+'&dist_name='+dist_name+'&up_name='+up_name+'&schoolId='+schoolId,
			  success: function(resStr) {				  
				  scStIdListStr=resStr.split("<fd>");
				  schoolStuCmbo="";
				  for (i=0;i<scStIdListStr.length;i++){					  
						 schoolStuCmbo+="<option value="+scStIdListStr[i]+">"+scStIdListStr[i]+"</option>";						  				  
				  }				  
				  //$("#studentID").html(schoolStuCmbo);
				  var rpt_rep_ob=$("#studentID");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(schoolStuCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
				 // url="#first_page";					
				 // $.mobile.navigate(url);
				  				  
			  }
			});
	
}

	
//===================		
function banbeisDataNext(){
		insName=$("#insName").val();
		eiinNo=$("#eiinNo").val();
		union_name=$("#union_name").val();
		//new_union_name=$("#new_union_name").val();
		ward_no=$("#ward_no").val();
		//new_ward_no=$("#new_ward_no").val();
		pourashave=$("#pourashave").val();
		//new_pourashave=$("#new_pourashave").val();
		wardno_pourashave=$("#wardno_pourashave").val();
		//new_wardno_pourashave=$("#new_wardno_pourashave").val();
		upazila=$("#upazila").val();
		zila=$("#zila").val();
		division=$("#division").val();

		if (upazila=="" ){
			$(".errorChk").text("Required Data [7]");	
		}else if (zila=="" ){
			$(".errorChk").text("Required Data [8]");	
		}else if (division=="" ){
			$(".errorChk").text("Required Data [9]");	
		}else{
				insName=insName
				eiinNo=eiinNo
				union_name=union_name
				//new_union_name=new_union_name
				ward_no=ward_no
				//new_ward_no=new_ward_no
				pourashave=pourashave
				//new_pourashave=new_pourashave
				wardno_pourashave=wardno_pourashave
				//new_wardno_pourashave=new_wardno_pourashave
				upazila=upazila
				zila=zila
				division=division
				//&new_union_name="+new_union_name+"&new_ward_no="+new_ward_no+"&new_pourashave="+new_pourashave+"&new_wardno_pourashave="+new_wardno_pourashave+"
				banbeisData="&insName="+insName+"&eiinNo="+eiinNo+"&union_name="+union_name+"&ward_no="+ward_no+"&pourashave="+pourashave+"&wardno_pourashave="+wardno_pourashave+"&upazila="+upazila+"&zila="+zila+"&division="+division
				
							/*banbeisData=student_serial_no+'fdfd'+booth_no+'fdfd'+union_name+'fdfd'+ward_no+'fdfd'+pourashave+'fdfd'+wardno_pourashave+'fdfd'+upazila+'fdfd'+zila+'fdfd'+division*/
				
				//alert(banbeisData);
						
				$(".errorChk").text("");
				$("input[name='checkConfirmAddress']").attr('checked',false);
				
				url="#page2"
				//url="#inPhoto"
				$.mobile.navigate(url);				
				
			}
	
	};	

//---------------------------Banbeis data page 2  
function banbeisData2Next(){
		name_of_applicant=$("#name_of_applicant").val();
		//new_name_of_applicant=$("#new_name_of_applicant").val();
		stu_id=$("#stu_id").val();
		dob=$("#dob").val();
		//new_dob=$("#new_dob").val();
		fathers_name=$("#fathers_name").val();
		//new_fathers_name=$("#new_fathers_name").val();
		fathers_nid=$("#fathers_nid").val();
		mothers_name=$("#mothers_name").val();
		//new_mothers_name=$("#new_mothers_name").val();
		mothers_nid=$("#mothers_nid").val();
		gender=$("#gender").val();
		//new_gender=$("#new_gender").val();
		present_school=$("#present_school").val();
		//new_present_school=$("#new_present_school").val();
		class_studied_present=$("#class_studied_present").val();
		dropped_school_name_enrolled=$("#dropped_school_name_enrolled").val();
		dropped_class_studied_past=$("#dropped_class_studied_past").val();
		guardian_absence_of_parents=$("#guardian_absence_of_parents").val();
		relation_student_with_guardian=$("#relation_student_with_guardian").val();
		parents_village=$("#parents_village").val();
		parents_post=$("#parents_post").val();
		parents_union=$("#parents_union").val();
		parents_upazila=$("#parents_upazila").val();
		//----------
		student_village=$("#student_village").val();
		student_post=$("#student_post").val();
		student_union=$("#student_union").val();
		student_upazila=$("#student_upazila").val();
		//
//		var tempVdate=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
//		}else if(!dob.match(tempVdate)){
//			$(".errorChk").text("Invalid Data [2]");
		if (class_studied_present=="" ){
			$(".errorChk").text("Required Data [10]");
		}else if (class_studied_present<=4 || class_studied_present>9 ){
			$(".errorChk").text("Required Data [10] class 5-9");
		}else if (relation_student_with_guardian=="" ){
			$(".errorChk").text("Required Data [13] ");
		}else if (parents_village=="" ){
			$(".errorChk").text("Required Data [14] (ক)");
		}else if (parents_post=="" ){
			$(".errorChk").text("Required Data [14] (ক)");	
		}else if (parents_union=="" ){
			$(".errorChk").text("Required Data [14] (ক)");
		//}else if (parents_upazila=="" ){
			//$(".errorChk").text("Required Data [14] (ক)");		
		}else{
			
			name_of_applicant=name_of_applicant
			//new_name_of_applicant=new_name_of_applicant
			stu_id=stu_id
			dob=dob
			//new_dob=new_dob
			fathers_name=fathers_name
			//new_fathers_name=new_fathers_name
			fathers_nid=fathers_nid
			mothers_name=mothers_name
			//new_mothers_name=new_mothers_name
			mothers_nid=mothers_nid
			gender=gender
			//new_gender=new_gender		
			present_school=present_school
			//new_present_school=new_present_school
			class_studied_present=class_studied_present
			dropped_school_name_enrolled=dropped_school_name_enrolled
			dropped_class_studied_past=dropped_class_studied_past
			guardian_absence_of_parents=guardian_absence_of_parents
			relation_student_with_guardian=relation_student_with_guardian
			parents_village=parents_village
			parents_post=parents_post
			parents_union=parents_union
			parents_upazila=parents_upazila
			//----------
			student_village=student_village
			student_post=student_post
			student_union=student_union
			student_upazila=student_upazila
			//&new_name_of_applicant="+new_name_of_applicant+"&new_dob="+new_dob+"&new_fathers_name="+new_fathers_name+"&new_mothers_name="+new_mothers_name+"&new_gender="+new_gender+"&new_present_school="+new_present_school+"
			banbeisDataPage2="&name_of_applicant="+name_of_applicant+"&stu_id="+stu_id+"&dob="+dob+"&fathers_name="+fathers_name+"&fathers_nid="+fathers_nid+"&mothers_name="+mothers_name+"&mothers_nid="+mothers_nid+"&gender="+gender+"&present_school="+present_school+"&class_studied_present="+class_studied_present+"&dropped_school_name_enrolled="+dropped_school_name_enrolled+"&dropped_class_studied_past="+dropped_class_studied_past+"&guardian_absence_of_parents="+guardian_absence_of_parents+"&relation_student_with_guardian="+relation_student_with_guardian+"&parents_village="+parents_village+"&parents_post="+parents_post+"&parents_union="+parents_union+"&parents_upazila="+parents_upazila+"&student_village="+student_village+"&student_post="+student_post+"&student_union="+student_union+"&student_upazila="+student_upazila
			//alert(banbeisDataPage2);
			
			<!--banbeisDataPage2=name_of_applicant+'fdfd'+dob+'fdfd'+fathers_name+'fdfd'+fathers_nid+'fdfd'+mothers_name+'fdfd'+mothers_nid+'fdfd'+present_school+'fdfd'+class_studied_present+'fdfd'+dropped_school_name_enrolled+'fdfd'+dropped_class_studied_past+'fdfd'+guardian_absence_of_parents+'fdfd'+relation_student_with_guardian+'fdfd'+parents_village+'fdfd'+parents_post+'fdfd'+parents_union+'fdfd'+parents_upazila-->
			
			 $(".errorChk").text("");
			 			 
			 url="#page3";
			 //url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
	
	};	


//---------------------------Banbeis data page 3

function banbeisData3Next(){
		
		q1_a=$("#q1_a").val();
		q2_a=$("#q2_a").val();
		q3_a=$("#q3_a").val();
		q4_a=$("#q4_a").val();
		q5_a=$("#q5_a").val();
		q6_a=$("#q6_a").val();
		q7_a=$("#q7_a").val();
		q8_a=$("#q8_a").val();
			
		if (q1_a=="" ){
			$(".errorChk").text("Required Q1 প্রকৃত তথ্য ");
		}else if (q2_a=="" ){
			$(".errorChk").text("Required Q2 প্রকৃত তথ্য ");	
		}else if (q3_a=="" ){
			$(".errorChk").text("Required Q3 প্রকৃত তথ্য ");		
		}else if (q4_a=="" ){
			$(".errorChk").text("Required Q4 প্রকৃত তথ্য ");		
		}else if (q5_a=="" ){
			$(".errorChk").text("Required Q5 প্রকৃত তথ্য ");	
		}else if (q6_a=="" ){
			$(".errorChk").text("Required Q6 প্রকৃত তথ্য ");		
		}else if (q7_a=="" ){
			$(".errorChk").text("Required Q7 প্রকৃত তথ্য ");		
		}else if (q8_a=="" ){
			$(".errorChk").text("Required Q8 প্রকৃত তথ্য ");		
		
		}else{
			
			q1_a=q1_a
			q2_a=q2_a
			q3_a=q3_a
			q4_a=q4_a
			q5_a=q5_a
			q6_a=q6_a
			q7_a=q7_a
			q8_a=q8_a
			
			banbeisDataPage3="&q1_a="+q1_a+"&q2_a="+q2_a+"&q3_a="+q3_a+"&q4_a="+q4_a+"&q5_a="+q5_a+"&q6_a="+q6_a+"&q7_a="+q7_a+"&q8_a="+q8_a
			//alert(banbeisDataPage3);
							
			 	
			$(".errorChk").text("");
						 
			url="#page4";
			//url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	


//---------------------------Banbeis data page 4

function banbeisData4Next(){
		
		q9_a=$("#q9_a").val();
		q10_a=$("#q10_a").val();
		q11_a=$("#q11_a").val();
		q12_a=$("#q12_a").val();
		q13_a=$("#q13_a").val();
		q14_a=$("#q14_a").val();	
		q15_a=$("#q15_a").val();
		q16_a=$("#q16_a").val();
		
		if (q9_a=="" ){
			$(".errorChk").text("Required Q9 প্রকৃত তথ্য ");
		}else if (q10_a=="" ){
			$(".errorChk").text("Required Q10 প্রকৃত তথ্য ");	
		}else if (q11_a=="" ){
			$(".errorChk").text("Required Q11 প্রকৃত তথ্য ");		
		}else if (q12_a=="" ){
			$(".errorChk").text("Required Q12 প্রকৃত তথ্য ");		
		}else if (q13_a=="" ){
			$(".errorChk").text("Required Q13 প্রকৃত তথ্য ");	
		}else if (q14_a=="" ){
			$(".errorChk").text("Required Q14 প্রকৃত তথ্য ");		
		}else if (q15_a=="" ){
			$(".errorChk").text("Required Q15 প্রকৃত তথ্য ");		
		}else if (q16_a=="" ){
			$(".errorChk").text("Required Q16 প্রকৃত তথ্য ");		
			
		}else{
						
			q9_a=q9_a
			q10_a=q10_a
			q11_a=q11_a
			q12_a=q12_a
			q13_a=q13_a
			q14_a=q14_a
			q15_a=q15_a
			q16_a=q16_a
			
			banbeisDataPage4="&q9_a="+q9_a+"&q10_a="+q10_a+"&q11_a="+q11_a+"&q12_a="+q12_a+"&q13_a="+q13_a+"&q14_a="+q14_a+"&q15_a="+q15_a+"&q16_a="+q16_a
			
			//alert(banbeisDataPage4);
						
			
			$(".errorChk").text("");
			
							
			 url="#page5";	
			//url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	


//---------------------------Banbeis data page 5

function banbeisData5Next(){
		
		q17_a=$("#q17_a").val();
		q18_a=$("#q18_a").val();
		q19_a=$("#q19_a").val();
		q20_a=$("#q20_a").val();
		q21_a=$("#q21_a").val();
		q22_a=$("#q22_a").val();
		q23_a=$("#q23_a").val();
		q24_a=$("#q24_a").val();
		
		if (q17_a=="" ){
			$(".errorChk").text("Required Q17 প্রকৃত তথ্য ");		
		}else if (q18_a=="" ){
			$(".errorChk").text("Required Q18 প্রকৃত তথ্য ");		
		}else if (q19_a=="" ){
			$(".errorChk").text("Required Q19 প্রকৃত তথ্য ");
		}else if (q20_a=="" ){
			$(".errorChk").text("Required Q20 প্রকৃত তথ্য ");	
		}else if (q21_a=="" ){
			$(".errorChk").text("Required Q21 প্রকৃত তথ্য ");		
		}else if (q22_a=="" ){
			$(".errorChk").text("Required Q22 প্রকৃত তথ্য ");		
		}else if (q23_a=="" ){
			$(".errorChk").text("Required Q23 প্রকৃত তথ্য ");	
		}else if (q24_a=="" ){
			$(".errorChk").text("Required Q24 প্রকৃত তথ্য ");		
		
		}else{
			
			q17_a=q17_a
			q18_a=q18_a
			q19_a=q19_a
			q20_a=q20_a
			q21_a=q21_a
			q22_a=q22_a
			q23_a=q23_a
			q24_a=q24_a
			
			banbeisDataPage5="&q17_a="+q17_a+"&q18_a="+q18_a+"&q19_a="+q19_a+"&q20_a="+q20_a+"&q21_a="+q21_a+"&q22_a="+q22_a+"&q23_a="+q23_a+"&q24_a="+q24_a
			
			//alert(banbeisDataPage5);
			
			$(".errorChk").text("");
						
							
			 url="#page6";	
			 //url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};


//---------------------------Banbeis data page 6

function banbeisData6Next(){
		
		q25_a=$("#q25_a").val();
		q26_a=$("#q26_a").val();
		q27_a=$("#q27_a").val();
		comments=$("#comments").val();
		overall_comments=$("#overall_comments").val();
		
		if (q25_a=="" ){
			$(".errorChk").text("Required Q25 প্রকৃত তথ্য ");		
		}else if (q26_a=="" ){
			$(".errorChk").text("Required Q26 প্রকৃত তথ্য ");	
		}else if (q27_a=="" ){
			$(".errorChk").text("Required Q27 প্রকৃত তথ্য ");	
			
		}else{
			
			q25_a=q25_a
			q26_a=q26_a
			q27_a=q27_a
			comments=comments
			overall_comments=overall_comments			
						
			banbeisDataPage6="&q25_a="+q25_a+"&q26_a="+q26_a+"&q27_a="+q27_a+"&comments="+comments+"&overall_comments="+overall_comments
			
			//alert(banbeisDataPage6);
			
			$(".errorChk").text("");
							
			url="#inPhoto";	
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};


function banbeisDataSubmit(){
		$("#btn_ach_submit").hide();
		
		var d = new Date();	
		var get_time=d.getTime();		

		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();

		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		if (achPhoto=='' || achPhoto==undefined){
			$(".errorChk").text("Please confirm Photo ");
			$("#btn_ach_submit").show();
		}else{		
			if(latitude==0 || longitude==0){
				$(".errorChk").text("Please confirm your location ");
				$("#btn_ach_submit").show();
			}else{				
				imagePathA="test"
				if (imagePathA!=""){							
					$(".errorChk").text("Syncing photo..");
					imageName = localStorage.mobile_no+"_"+get_time+".jpg";
					uploadPhotoAch(imagePathA, imageName);
					
				}
					
				
			}//end check location
		}//chk photo
		
	}


function getAchivementImage() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccessA(imageURI) {		
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePathA = imageURI;	
	$("#achPhoto").val(imagePathA);
	
}

function onFailA(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


function uploadPhotoAch(imageURI, imageName) {
	
	//winAchInfo();
	
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/que_image/quem_image_sync/fileUploader/"),winAchInfo,onfail,options);
	
}



function winAchInfo(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$("#err_truck_info").text('File upload Successful. Syncing Data...');
	syncData();
}

function onfail(r) {
	$("#err_truck_info").text('File upload Failed. Syncing Data...');
	syncData();
}



function syncData(){	
			//alert(apipath+"submitData?cid=BANBEIS&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+banbeisData+banbeisDataPage2+banbeisDataPage3+banbeisDataPage4+banbeisDataPage5+banbeisDataPage6+'&st_photo='+imageName+'&latitude='+latitude+'&longitude='+longitude);
			$.ajax({
					type: 'POST',
					url:apipath+"submitData?cid=BANBEIS&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+banbeisData+banbeisDataPage2+banbeisDataPage3+banbeisDataPage4+banbeisDataPage5+banbeisDataPage6+'&st_photo='+imageName+'&latitude='+latitude+'&longitude='+longitude,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//------------------------	
							$("#studentID").val("");
							
							$("#insName").val("");
							$("#eiinNo").val("");		
												 		
							$("#union_name").val("");
							//$("#new_union_name").val("");
							$("#ward_no").val("");
							//$("#new_ward_no").val("");
							$("#pourashave").val("");
							//$("#new_pourashave").val("");
							$("#wardno_pourashave").val("");
							//$("#new_wardno_pourashave").val("");
							$("#upazila").val("");
							$("#zila").val("");
							$("#division").val("");
							
							$("#name_of_applicant").val("");
							//$("#new_name_of_applicant").val("");
							$("#stu_id").val(""); 
							$("#dob").val("");
							//$("#new_dob").val("");
							$("#fathers_name").val("");
							//$("#new_fathers_name").val("");
							$("#fathers_nid").val("");
							$("#mothers_name").val("");
							//$("#new_mothers_name").val("");
							$("#mothers_nid").val("");
							$("#gender").val("");
							//$("#new_gender").val("");
							$("#present_school").val("");
							//$("#new_present_school").val("");
							$("#class_studied_present").val("");
							$("#dropped_school_name_enrolled").val("");
							$("#dropped_class_studied_past").val("");
							$("#guardian_absence_of_parents").val("");
							$("#relation_student_with_guardian").val("");
							$("#parents_village").val("");
							$("#parents_post").val("");
							$("#parents_union").val("");
							$("#parents_upazila").val("");
							//----------
							$("#checkConfirmAddress").val("");
							//----------
							$("#student_village").val("");
							$("#student_post").val("");
							$("#student_union").val("");
							$("#student_upazila").val("");
							
							
							$("#q1_a").val("");
							$("#q2_a").val("");
							$("#q3_a").val("");
							$("#q4_a").val("");
							$("#q5_a").val("");
							$("#q6_a").val("");
							$("#q7_a").val("");
							$("#q8_a").val("");
							$("#q9_a").val("");
							$("#q10_a").val("");
							$("#q11_a").val("");
							$("#q12_a").val("");
							$("#q13_a").val("");
							$("#q14_a").val("");
							$("#q15_a").val("");
							$("#q16_a").val("");
							$("#q17_a").val("");
							$("#q18_a").val("");
							$("#q19_a").val("");
							$("#q20_a").val("");
							$("#q21_a").val("");
							$("#q22_a").val("");
							$("#q23_a").val("");
							$("#q24_a").val("");
							$("#q25_a").val("");
							$("#q26_a").val("");
							$("#q27_a").val("");
							$("#comments").val("");
							$("#overall_comments").val("");		
								
							$("#ach_lat").val("");
							$("#ach_long").val("");
							$("#achPhoto").val("");
														
						
							$(".sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
							$("#btn_pmt_save").hide();
							$("#btn_take_pic").hide();
							$("#btn_ach_lat_long").hide();
							//$("#btn_pmt_submit").hide();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#btn_pmt_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}
	



//============================compliance Verification============================

function complianceVerification(){
	$("#com_division").empty();
	if(localStorage.sync_code==undefined || localStorage.sync_code==""){
			$(".errorChk").text("Required Sync");
			
		}else{
			//alert(apipath_compliance+'get_com_div_list?cid=BANBEIS&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath_compliance+'get_com_div_list?cid=BANBEIS&sync_code='+localStorage.sync_code,
			  success: function(divStr) {
					  divNameList=divStr.split("<fd>");
					  divCmbo="<label for='s_com_div'>Division </label><select name='s_com_div' id='s_com_div' data-native-menu='false' onchange='getDistCom()'><option value=''>Select Division</option>";
					  for (i=0;i<divNameList.length;i++){					 
						  divCmbo+="<option value="+encodeURIComponent(divNameList[i])+">"+divNameList[i]+"</option>";					  
					  }	
					  
					  divCmbo+="</select>"
					  
					  $("#com_division").html(divCmbo);
					  
						url="#com_first_page";					
						$.mobile.navigate(url);				  
										  
				  }		  
			});	 
			
				
		}
	
}

function getDistCom(){	
	
	div_name=$("#s_com_div").val();
	//alert(apipath_compliance+'get_comp_div_dist_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+div_name);
	$.ajax({
		  url:apipath_compliance+'get_comp_div_dist_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+encodeURIComponent(div_name),
		  success: function(distStr) {
				  distNameList=distStr.split("<fd>");				  
				  distCmbo="";
				  for (i=0;i<distNameList.length;i++){					 
					  distCmbo+="<option value="+encodeURIComponent(distNameList[i])+">"+distNameList[i]+"</option>";					  
				  }	
				 
				  var rpt_rep_ob=$("#s_com_dist");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(distCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
			  }		  
		});	
		
		
}

 
function getUpCom(){	
	div_name=$("#s_com_div").val();
	dist_name=$("#s_com_dist").val();	
	
	$.ajax({
		  url:apipath_compliance+'get_comp_dist_up_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+encodeURIComponent(div_name)+'&dist_name='+encodeURIComponent(dist_name),
		  success: function(upStr) {
				  upNameList=upStr.split("<fd>");
				  upCmbo="";
				  for (i=0;i<upNameList.length;i++){					 
					  upCmbo+="<option value="+encodeURIComponent(upNameList[i])+">"+upNameList[i]+"</option>";					  
				  }	
				  			  
				 var rpt_rep_ob=$("#s_com_up");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(upCmbo);
					rpt_rep_ob.selectmenu("refresh");
		
			  }		  
		});	 
}
 
 
 function getUpSchoolCom(){	
	div_name=$("#s_com_div").val();
	dist_name=$("#s_com_dist").val();
	up_name=$("#s_com_up").val();	
	
	
	$.ajax({		
		  url:apipath_compliance+'get_comp_up_school_list?cid=BANBEIS&sync_code='+localStorage.sync_code+'&div_name='+encodeURIComponent(div_name)+'&dist_name='+encodeURIComponent(dist_name)+'&up_name='+encodeURIComponent(up_name),
		  success: function(schoolStr) {
				  schIdNameList=schoolStr.split("<fd>");				  
				  schoolCmbo="";
				  for (i=0;i<schIdNameList.length;i++){
					  	var com_school_id_name=schIdNameList[i].split('-');
						var com_school_id=com_school_id_name[0];					  
						 schoolCmbo+="<option value="+com_school_id+">"+schIdNameList[i]+"</option>";						  				  
				  }	
				  			  
				  var rpt_rep_ob=$("#s_com_school");
					rpt_rep_ob.empty();
					rpt_rep_ob.append(schoolCmbo);
					rpt_rep_ob.selectmenu("refresh");
	
			  }		  
		});	 
}


function banbeisFirstDataNext(){
	var s_school=$("#s_com_school").val();
	$("#s_com_school").val(s_school);
	
	url="#com_first_next_page";					
	$.mobile.navigate(url);	
	
	}
	

 function school(type){
	$(".comp_error").text("");
	
	if (type=="QUICKS"){
		var s_school=$("#s_quick_school").val();
		
	}else if (type=="BTNS"){
		var s_school=$("#s_com_school").val();
		
		}
		
	
	if (s_school==""){
		$(".comp_error").text("Required School");
				
	}else{
		
		//alert(apipath_compliance+'org_nameCheck?cid=BANBEIS&s_school='+s_school);
		$.ajax({
			  url:apipath_compliance+'org_nameCheck?cid=BANBEIS&s_school='+s_school,
			  success: function(result) {				  
				  	resultStr=result.split("<fd>");
					//alert(resultStr);			  	
					 if (resultStr[0]=="Success"){
						  var schoolNameStr=resultStr[1].split("fdfd");	
						  					  
						  var school_name=schoolNameStr[0];
						  var union_name=schoolNameStr[1];		
						  var upazila_thana=schoolNameStr[2];
						  var dist_name=schoolNameStr[3];
						  var school_code=schoolNameStr[4];
						  
						  $("#institute_name").val(school_name);
						  $("#com_union").val(union_name);
						  $("#com_upzila").val(upazila_thana);
						  $("#com_district").val(dist_name);
						  $("#com_eiin").val(school_code);
						  
						  
						 url="#compliancePage1";					
						 $.mobile.navigate(url);
						 
						 //localStorage.selectedSchool='YES';
						 //localStorage.selectedSName=school_name;
						 
						 //$("#c_selected_school").html(localStorage.selectedSName);
						 //$("#c_search").hide();
						 //$("#c_selected").show();
						 
					}else if (resultStr[0]=="Failed"){
						$(".comp_error").text("Invalid School");
											
					} 
				
			  }
		});
	}
	
		
}



function complianceDataNext(){
		
		var institute_name=$("#institute_name").val();
		var com_union=$("#com_union").val();
		var com_upzila=$("#com_upzila").val();
		var com_district=$("#com_district").val();
		var com_eiin=$("#com_eiin").val();
		var com_phoneno=$("#com_phoneno").val();
		var com_ict_email=$("#com_ict_email").val();
		var com_other_email=$("#com_other_email").val();
		var com_web_address=$("#com_web_address").val();
		var com_institute_category=$("#com_institute_category").val();
		var com_type_institute=$("#com_type_institute").val();
		var agr_seqaep=$("input[name='agr_seqaep']:checked").val();
		var agr_type=$("input[name='agr_type']:checked").val();
			
		//alert(agr_seqaep);		
		if (institute_name==""){
			$(".errorChk").text("Required Institute Name");
		}else if (com_union=="" ){
			$(".errorChk").text("Required Union");
		}else if (com_upzila=="" ){
			$(".errorChk").text("Required Upzila");
		}else if (com_district=="" ){
			$(".errorChk").text("Required District");
		}else if (com_eiin=="" ){
			$(".errorChk").text("Required EIIN");
		}else if (com_institute_category=="" ){
			$(".errorChk").text("Required Institute Category");	
		}else if (com_type_institute=="" ){
			$(".errorChk").text("Required Institute Type");	
		/*}else if (agr_seqaep=="" ){
			$(".errorChk").text("Required ");	
		}else if (agr_type=="" ){
			$(".errorChk").text("Required ");*/
					
		}else{
				
				institute_name=institute_name
				com_union=com_union
				com_upzila=com_upzila
				com_district=com_district
				com_eiin=com_eiin
				com_phoneno=com_phoneno
				com_ict_email=com_ict_email
				com_other_email=com_other_email
				com_web_address=com_web_address
				com_institute_category=com_institute_category
				com_type_institute=com_type_institute
				agr_seqaep=agr_seqaep
				agr_type=agr_type			
				
				banbeisComData="&institute_name="+institute_name+"&com_union="+com_union+"&com_upzila="+com_upzila+"&com_district="+com_district+"&com_eiin="+com_eiin+"&com_phoneno="+com_phoneno+"&com_ict_email="+com_ict_email+"&com_other_email="+com_other_email+"&com_web_address="+com_web_address+"&com_institute_category="+com_institute_category+"&com_type_institute="+com_type_institute+"&agr_seqaep="+agr_seqaep+"&agr_type="+agr_type
								
				//alert(banbeisComData);
						
				$(".errorChk").text("");
				
				url="#compliancePage2"
				//url="#inPhoto"
				$.mobile.navigate(url);				
				
			}
			
		/*localStorage.cp1=$("#cp1").html();
		alert($("#cp1").html());*/
		
	};	


/*function agrementSeq(){
	
	agr=$("input[name='agr_seqaep']:checked").val();
	
	if(agr=="2"){
		$("#agr_type_con").show();
	}else{
	 	$("#agr_type_con").hide();
	}
}*/


function complianceData2Next(){
		
		var pmt_boys_6=$("#pmt_boys_6").val()
		var not_pmt_boys_6=$("#not_pmt_boys_6").val()
		var pmt_girls_6=$("#pmt_girls_6").val()
		var not_pmt_girls_6=$("#not_pmt_girls_6").val()
		
		var pmt_boys_7=$("#pmt_boys_7").val()
		var not_pmt_boys_7=$("#not_pmt_boys_7").val()
		var pmt_girls_7=$("#pmt_girls_7").val()
		var not_pmt_girls_7=$("#not_pmt_girls_7").val()
		
		var pmt_boys_8=$("#pmt_boys_8").val()
		var not_pmt_boys_8=$("#not_pmt_boys_8").val()
		var pmt_girls_8=$("#pmt_girls_8").val()
		var not_pmt_girls_8=$("#not_pmt_girls_8").val()
		
		var pmt_boys_9=$("#pmt_boys_9").val()
		var not_pmt_boys_9=$("#not_pmt_boys_9").val()
		var pmt_girls_9=$("#pmt_girls_9").val()
		var not_pmt_girls_9=$("#not_pmt_girls_9").val()
		
		var pmt_boys_10=$("#pmt_boys_10").val()
		var not_pmt_boys_10=$("#not_pmt_boys_10").val()
		var pmt_girls_10=$("#pmt_girls_10").val()
		var not_pmt_girls_10=$("#not_pmt_girls_10").val()
		//alert(pmt_boys_6+','+not_pmt_boys_6+','+pmt_girls_6+','+not_pmt_girls_6+','+pmt_boys_7+','+not_pmt_boys_7+','+pmt_girls_7+','+not_pmt_girls_7+','+pmt_boys_8+','+not_pmt_boys_8+','+pmt_girls_8+','+not_pmt_girls_8+','+pmt_boys_9+','+not_pmt_boys_9+','+pmt_girls_9+','+not_pmt_girls_9+','+pmt_boys_10+','+not_pmt_boys_10+','+pmt_girls_10+','+not_pmt_girls_10);
		/**********PMT Based Stipend Program**********/
				
		var stip_pro_semister=$("#stip_pro_semister").val()
		var disbursement_date=$("#disbursement_date").val()
		
		var stu_rec_stipend_6=$("#stu_rec_stipend_6").val()
		var stu_attendance_6=$("#stu_attendance_6").val()
		var stu_pass_annual_exam_6=$("#stu_pass_annual_exam_6").val()
		var stu_got_married_6=$("#stu_got_married_6").val()
		var stu_present_visit_6=$("#stu_present_visit_6").val()
		
		var stu_rec_stipend_7=$("#stu_rec_stipend_7").val()
		var stu_attendance_7=$("#stu_attendance_7").val()
		var stu_pass_annual_exam_7=$("#stu_pass_annual_exam_7").val()
		var stu_got_married_7=$("#stu_got_married_7").val()
		var stu_present_visit_7=$("#stu_present_visit_7").val()
		
		var stu_rec_stipend_8=$("#stu_rec_stipend_8").val()
		var stu_attendance_8=$("#stu_attendance_8").val()
		var stu_pass_annual_exam_8=$("#stu_pass_annual_exam_8").val()
		var stu_got_married_8=$("#stu_got_married_8").val()
		var stu_present_visit_8=$("#stu_present_visit_8").val()
		
		var stu_rec_stipend_9=$("#stu_rec_stipend_9").val()
		var stu_attendance_9=$("#stu_attendance_9").val()
		var stu_pass_annual_exam_9=$("#stu_pass_annual_exam_9").val()
		var stu_got_married_9=$("#stu_got_married_9").val()
		var stu_present_visit_9=$("#stu_present_visit_9").val()	
		
		var stu_rec_stipend_10=$("#stu_rec_stipend_10").val()
		var stu_attendance_10=$("#stu_attendance_10").val()
		var stu_pass_annual_exam_10=$("#stu_pass_annual_exam_10").val()
		var stu_got_married_10=$("#stu_got_married_10").val()
		var stu_present_visit_10=$("#stu_present_visit_10").val()
		//alert(stip_pro_semister+','+disbursement_date+','+stu_rec_stipend_6+','+stu_attendance_6+','+stu_pass_annual_exam_6+','+stu_got_married_6+','+stu_present_visit_6+','+stu_rec_stipend_7+','+stu_attendance_7+','+stu_pass_annual_exam_7+','+stu_got_married_7+','+stu_present_visit_7+','+stu_rec_stipend_8+','+stu_attendance_8+','+stu_pass_annual_exam_8+','+stu_got_married_8+','+stu_present_visit_8+','+stu_rec_stipend_9+','+stu_attendance_9+','+stu_pass_annual_exam_9+','+stu_got_married_9+','+stu_present_visit_9+','+stu_rec_stipend_10+','+stu_attendance_10+','+stu_pass_annual_exam_10+','+stu_got_married_10+','+stu_present_visit_10);
		/**********Enrolmentby Grade and Gender Check*********/	
		var total6=(+stu_attendance_6)+(+stu_pass_annual_exam_6)+(+stu_got_married_6);
		var total7=(+stu_attendance_7)+(+stu_pass_annual_exam_7)+(+stu_got_married_7);
		var total8=(+stu_attendance_8)+(+stu_pass_annual_exam_8)+(+stu_got_married_8);
		var total9=(+stu_attendance_9)+(+stu_pass_annual_exam_9)+(+stu_got_married_9);
		var total10=(+stu_attendance_10)+(+stu_pass_annual_exam_10)+(+stu_got_married_10);	
		
		
		if (pmt_boys_6==""){
			$(".errorChk").text("Required Numeric");
		}else if (not_pmt_boys_6=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (pmt_girls_6=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_girls_6=="" ){
			$(".errorChk").text("Required Numeric");	
			
		}else if (pmt_boys_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_boys_7=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (pmt_girls_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_girls_7=="" ){
			$(".errorChk").text("Required Numeric");
				
		}else if (pmt_boys_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_boys_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (pmt_girls_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_girls_8=="" ){
			$(".errorChk").text("Required Numeric");
			
			}else if (pmt_boys_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_boys_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (pmt_girls_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_girls_9=="" ){
			$(".errorChk").text("Required Numeric");	
			
		}else if (pmt_boys_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_boys_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (pmt_girls_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (not_pmt_girls_10=="" ){
			$(".errorChk").text("Required Numeric");		
		
		}else if (stip_pro_semister=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (disbursement_date=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_6=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_attendance_6=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_pass_annual_exam_6=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_got_married_6=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_rec_stipend_6<total6){             //3 col check cls 6
			$(".errorChk").text("Less than Number of students who received PMT stipend VI");			
		}else if (stu_present_visit_6=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_attendance_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_pass_annual_exam_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_got_married_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_7<total7){             //3 col check cls 7
			$(".errorChk").text("Less than Number of students who received PMT stipend VII");			
		}else if (stu_present_visit_7=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_attendance_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_pass_annual_exam_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_got_married_8=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_rec_stipend_8<total8){             //3 col check cls 8
			$(".errorChk").text("Less than Number of students who received PMT stipend VIII");			
		}else if (stu_present_visit_8=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_attendance_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_pass_annual_exam_9=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_got_married_9=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_rec_stipend_9<total9){             //3 col check cls 9
			$(".errorChk").text("Less than Number of students who received PMT stipend IX");
		}else if (stu_present_visit_9=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_rec_stipend_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_attendance_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_pass_annual_exam_10=="" ){
			$(".errorChk").text("Required Numeric");	
		}else if (stu_got_married_10=="" ){
			$(".errorChk").text("Required Numeric");
		}else if (stu_rec_stipend_10<total10){             //3 col check cls 10
			$(".errorChk").text("Less than Number of students who received PMT stipend X");	
		}else if (stu_present_visit_10=="" ){
			$(".errorChk").text("Required Numeric");	
									
		}else{ 
		
		/*pmt_boys_6=pmt_boys_6
		not_pmt_boys_6=not_pmt_boys_6
		pmt_girls_6=pmt_girls_6
		not_pmt_girls_6=not_pmt_girls_6
		
		pmt_boys_7=pmt_boys_7
		not_pmt_boys_7=not_pmt_boys_7
		pmt_girls_7=pmt_girls_7
		not_pmt_girls_7=not_pmt_girls_7
		
		pmt_boys_8=pmt_boys_8
		not_pmt_boys_8=not_pmt_boys_8
		pmt_girls_8=pmt_girls_8
		not_pmt_girls_8=not_pmt_girls_8
		
		pmt_boys_9=pmt_boys_9
		not_pmt_boys_9=not_pmt_boys_9
		pmt_girls_9=pmt_girls_9
		not_pmt_girls_9=not_pmt_girls_9
		
		pmt_boys_10=pmt_boys_10
		not_pmt_boys_10=not_pmt_boys_10
		pmt_girls_10=pmt_girls_10
		not_pmt_girls_10=not_pmt_girls_10*/	
		
		
		banbeisComData2="&pmt_boys_6="+pmt_boys_6+"&not_pmt_boys_6="+not_pmt_boys_6+"&pmt_girls_6="+pmt_girls_6+"&not_pmt_girls_6="+not_pmt_girls_6+"&pmt_boys_7="+pmt_boys_7+"&not_pmt_boys_7="+not_pmt_boys_7+"&pmt_girls_7="+pmt_girls_7+"&not_pmt_girls_7="+not_pmt_girls_7+"&pmt_boys_8="+pmt_boys_8+"&not_pmt_boys_8="+not_pmt_boys_8+"&pmt_girls_8="+pmt_girls_8+"&not_pmt_girls_8="+not_pmt_girls_8+"&pmt_boys_9="+pmt_boys_9+"&not_pmt_boys_9="+not_pmt_boys_9+"&pmt_girls_9="+pmt_girls_9+"&not_pmt_girls_9="+not_pmt_girls_9+"&pmt_boys_10="+pmt_boys_10+"&not_pmt_boys_10="+not_pmt_boys_10+"&pmt_girls_10="+pmt_girls_10+"&not_pmt_girls_10="+not_pmt_girls_10+"&stip_pro_semister="+stip_pro_semister+"&disbursement_date="+disbursement_date+"&stu_rec_stipend_6="+stu_rec_stipend_6+"&stu_attendance_6="+stu_attendance_6+"&stu_pass_annual_exam_6="+stu_pass_annual_exam_6+"&stu_got_married_6="+stu_got_married_6+"&stu_present_visit_6="+stu_present_visit_6+"&stu_rec_stipend_7="+stu_rec_stipend_7+"&stu_attendance_7="+stu_attendance_7+"&stu_pass_annual_exam_7="+stu_pass_annual_exam_7+"&stu_got_married_7="+stu_got_married_7+"&stu_present_visit_7="+stu_present_visit_7+"&stu_rec_stipend_8="+stu_rec_stipend_8+"&stu_attendance_8="+stu_attendance_8+"&stu_pass_annual_exam_8="+stu_pass_annual_exam_8+"&stu_got_married_8="+stu_got_married_8+"&stu_present_visit_8="+stu_present_visit_8+"&stu_rec_stipend_9="+stu_rec_stipend_9+"&stu_attendance_9="+stu_attendance_9+"&stu_pass_annual_exam_9="+stu_pass_annual_exam_9+"&stu_got_married_9="+stu_got_married_9+"&stu_present_visit_9="+stu_present_visit_9+"&stu_rec_stipend_10="+stu_rec_stipend_10+"&stu_attendance_10="+stu_attendance_10+"&stu_pass_annual_exam_10="+stu_pass_annual_exam_10+"&stu_got_married_10="+stu_got_married_10+"&stu_present_visit_10="+stu_present_visit_10
				
		//alert(banbeisComData2);
		
		url="#compliancePage3";					
		$.mobile.navigate(url);		
		}
	};


function complianceData3Next(){
	
		var pmt_st_1_name=$("#pmt_st_1_name").val()
		//pmt_st_1_grade=$("#pmt_st_1_grade").val()
		var pmt_st_1_id=$("#pmt_st_1_id").val()
		var pmt_st_1_attendance=$("#pmt_st_1_attendance").val()
		var pmt_st_1_final_exam_mark=$("#pmt_st_1_final_exam_mark").val()
		var current_school_1=$("input[name='current_school_1']:checked").val();
		var status_married_1=$("input[name='status_married_1']:checked").val();
		
		var pmt_st_2_name=$("#pmt_st_2_name").val()
		//pmt_st_2_grade=$("#pmt_st_2_grade").val()
		var pmt_st_2_id=$("#pmt_st_2_id").val()
		var pmt_st_2_attendance=$("#pmt_st_2_attendance").val()
		var pmt_st_2_final_exam_mark=$("#pmt_st_2_final_exam_mark").val()
		var current_school_2=$("input[name='current_school_2']:checked").val();
		var status_married_2=$("input[name='status_married_2']:checked").val();
		
		var pmt_st_3_name=$("#pmt_st_3_name").val()
		//pmt_st_3_grade=$("#pmt_st_3_grade").val()
		var pmt_st_3_id=$("#pmt_st_3_id").val()
		var pmt_st_3_attendance=$("#pmt_st_3_attendance").val()
		var pmt_st_3_final_exam_mark=$("#pmt_st_3_final_exam_mark").val()
		var current_school_3=$("input[name='current_school_3']:checked").val();
		var status_married_3=$("input[name='status_married_3']:checked").val();
		
		var pmt_st_4_name=$("#pmt_st_4_name").val()
		//pmt_st_4_grade=$("#pmt_st_4_grade").val()
		var pmt_st_4_id=$("#pmt_st_4_id").val()
		var pmt_st_4_attendance=$("#pmt_st_4_attendance").val()
		var pmt_st_4_final_exam_mark=$("#pmt_st_4_final_exam_mark").val()
		var current_school_4=$("input[name='current_school_4']:checked").val();
		var status_married_4=$("input[name='status_married_4']:checked").val();
		
		var pmt_st_5_name=$("#pmt_st_5_name").val()
		//pmt_st_5_grade=$("#pmt_st_5_grade").val()
		var pmt_st_5_id=$("#pmt_st_5_id").val()
		var pmt_st_5_attendance=$("#pmt_st_5_attendance").val()
		var pmt_st_5_final_exam_mark=$("#pmt_st_5_final_exam_mark").val()
		var current_school_5=$("input[name='current_school_5']:checked").val();
		var status_married_5=$("input[name='status_married_5']:checked").val();
		
		if (pmt_st_1_name==""){
			$(".errorChk").text("Required Name");
		}else if (pmt_st_1_id==""){
			$(".errorChk").text("Required PMT ID");
		}else if (pmt_st_1_attendance==""){
			$(".errorChk").text("Required Attendance");	
		}else if (pmt_st_1_final_exam_mark==""){
			$(".errorChk").text("Required Final Exam Marks");	
		}else if (current_school_1==""){
			$(".errorChk").text("Required Currently School");	
		}else if (status_married_1==""){
			$(".errorChk").text("Required Married/Unmarried");	
			
		}else if (pmt_st_2_name==""){
			$(".errorChk").text("Required Name");
		}else if (pmt_st_2_id==""){
			$(".errorChk").text("Required PMT ID");
		}else if (pmt_st_2_attendance==""){
			$(".errorChk").text("Required Attendance");	
		}else if (pmt_st_2_final_exam_mark==""){
			$(".errorChk").text("Required Final Exam Marks");	
		}else if (current_school_2==""){
			$(".errorChk").text("Required Currently School");	
		}else if (status_married_2==""){
			$(".errorChk").text("Required Married/Unmarried");		
			
		}else if (pmt_st_3_name==""){
			$(".errorChk").text("Required Name");
		}else if (pmt_st_3_id==""){
			$(".errorChk").text("Required PMT ID");
		}else if (pmt_st_3_attendance==""){
			$(".errorChk").text("Required Attendance");	
		}else if (pmt_st_3_final_exam_mark==""){
			$(".errorChk").text("Required Final Exam Marks");	
		}else if (current_school_3==""){
			$(".errorChk").text("Required Currently School");	
		}else if (status_married_3==""){
			$(".errorChk").text("Required Married/Unmarried");	
			
		}else if (pmt_st_4_name==""){
			$(".errorChk").text("Required Name");
		}else if (pmt_st_4_id==""){
			$(".errorChk").text("Required PMT ID");
		}else if (pmt_st_4_attendance==""){
			$(".errorChk").text("Required Attendance");	
		}else if (pmt_st_4_final_exam_mark==""){
			$(".errorChk").text("Required Final Exam Marks");	
		}else if (current_school_4==""){
			$(".errorChk").text("Required Currently School");	
		}else if (status_married_4==""){
			$(".errorChk").text("Required Married/Unmarried");	
			
		}else if (pmt_st_5_name==""){
			$(".errorChk").text("Required Name");
		}else if (pmt_st_5_id==""){
			$(".errorChk").text("Required PMT ID");
		}else if (pmt_st_5_attendance==""){
			$(".errorChk").text("Required Attendance");	
		}else if (pmt_st_5_final_exam_mark==""){
			$(".errorChk").text("Required Final Exam Marks");	
		}else if (current_school_5==""){
			$(".errorChk").text("Required Currently School");	
		}else if (status_married_5==""){
			$(".errorChk").text("Required Married/Unmarried");	
			
		}else{
				
				
		banbeisComData3="&pmt_st_1_name="+pmt_st_1_name+"&pmt_st_1_id="+pmt_st_1_id+"&pmt_st_1_attendance="+pmt_st_1_attendance+"&pmt_st_1_final_exam_mark="+pmt_st_1_final_exam_mark+"&current_school_1="+current_school_1+"&status_married_1="+status_married_1+"&pmt_st_2_name="+pmt_st_2_name+"&pmt_st_2_id="+pmt_st_2_id+"&pmt_st_2_attendance="+pmt_st_2_attendance+"&pmt_st_2_final_exam_mark="+pmt_st_2_final_exam_mark+"&current_school_2="+current_school_2+"&status_married_2="+status_married_2+"&pmt_st_3_name="+pmt_st_3_name+"&pmt_st_3_id="+pmt_st_3_id+"&pmt_st_3_attendance="+pmt_st_3_attendance+"&pmt_st_3_final_exam_mark="+pmt_st_3_final_exam_mark+"&current_school_3="+current_school_3+"&status_married_3="+status_married_3+"&pmt_st_4_name="+pmt_st_4_name+"&pmt_st_4_id="+pmt_st_4_id+"&pmt_st_4_attendance="+pmt_st_4_attendance+"&pmt_st_4_final_exam_mark="+pmt_st_4_final_exam_mark+"&current_school_4="+current_school_4+"&status_married_4="+status_married_4+"&pmt_st_5_name="+pmt_st_5_name+"&pmt_st_5_id="+pmt_st_5_id+"&pmt_st_5_attendance="+pmt_st_5_attendance+"&pmt_st_5_final_exam_mark="+pmt_st_5_final_exam_mark+"&current_school_5="+current_school_5+"&status_married_5="+status_married_5
		
		//alert(banbeisComData3);
					
		url="#compliancePage4";					
		$.mobile.navigate(url);		
		}
	
}


function complianceData4Next(){

		var add_cls_seqaep=$("input[name='add_cls_seqaep']:checked").val();
		var add_class_semister=$("#add_class_semister").val()			
		var act_1_dis_date=$("#act_1_dis_date").val()
		var act_1_ag_date=$("#act_1_ag_date").val()
		var act_1_total_work=$("#act_1_total_work").val()
		var sub_add_cls=$("input[name='sub_add_cls']:checked").val();
		
		var act_1_name=$("#act_1_name").val()	
		var act_1_ag_inst=$("#act_1_ag_inst").val()
		var act_1_sub=$("#act_1_sub").val()
		var act_1_last_academic_cft=$("#act_1_last_academic_cft").val()
		var receive_mark_1=$("input[name='receive_mark_1']:checked").val();
		var act_1_cft_verify=$("#act_1_cft_verify").val()
		var act_1_leave=$("#act_1_leave").val()
		var act_1_absent=$("#act_1_absent").val()
		var act_1_total_class=$("#act_1_total_class").val()
		
		var act_2_name=$("#act_2_name").val()	
		var act_2_ag_inst=$("#act_2_ag_inst").val()
		var act_2_sub=$("#act_2_sub").val()
		var act_2_last_academic_cft=$("#act_2_last_academic_cft").val()
		var receive_mark_2=$("input[name='receive_mark_2']:checked").val();
		var act_2_cft_verify=$("#act_2_cft_verify").val()
		var act_2_leave=$("#act_2_leave").val()
		var act_2_absent=$("#act_2_absent").val()
		var act_2_total_class=$("#act_2_total_class").val()
		
		var act_3_name=$("#act_3_name").val()	
		var act_3_ag_inst=$("#act_3_ag_inst").val()
		var act_3_sub=$("#act_3_sub").val()
		var act_3_last_academic_cft=$("#act_3_last_academic_cft").val()
		var receive_mark_3=$("input[name='receive_mark_3']:checked").val();
		var act_3_cft_verify=$("#act_3_cft_verify").val()
		var act_3_leave=$("#act_3_leave").val()
		var act_3_absent=$("#act_3_absent").val()
		var act_3_total_class=$("#act_3_total_class").val()
		
		var eng_enro_add_cls_6=$("#eng_enro_add_cls_6").val()	
		var math_enro_add_cls_6=$("#math_enro_add_cls_6").val()
		var sci_enro_add_cls_6=$("#sci_enro_add_cls_6").val()
		var eng_reg_cls_6=$("#eng_reg_cls_6").val()
		var math_reg_cls_6=$("#math_reg_cls_6").val()
		var sci_reg_cls_6=$("#sci_reg_cls_6").val()
		var eng_add_cls_6=$("#eng_add_cls_6").val()
		var math_add_cls_6=$("#math_add_cls_6").val()
		var sci_add_cls_6=$("#sci_add_cls_6").val()
		var eng_ave_cls_6=$("#eng_ave_cls_6").val()
		var math_ave_cls_6=$("#math_ave_cls_6").val()
		var sci_ave_cls_6=$("#sci_ave_cls_6").val()
		
		var eng_enro_add_cls_7=$("#eng_enro_add_cls_7").val()	
		var math_enro_add_cls_7=$("#math_enro_add_cls_7").val()
		var sci_enro_add_cls_7=$("#sci_enro_add_cls_7").val()
		var eng_reg_cls_7=$("#eng_reg_cls_7").val()
		var math_reg_cls_7=$("#math_reg_cls_7").val()
		var sci_reg_cls_7=$("#sci_reg_cls_7").val()
		var eng_add_cls_7=$("#eng_add_cls_7").val()
		var math_add_cls_7=$("#math_add_cls_7").val()
		var sci_add_cls_7=$("#sci_add_cls_7").val()
		var eng_ave_cls_7=$("#eng_ave_cls_7").val()
		var math_ave_cls_7=$("#math_ave_cls_7").val()
		var sci_ave_cls_7=$("#sci_ave_cls_7").val()
		
		var eng_enro_add_cls_8=$("#eng_enro_add_cls_8").val()	
		var math_enro_add_cls_8=$("#math_enro_add_cls_8").val()
		var sci_enro_add_cls_8=$("#sci_enro_add_cls_8").val()
		var eng_reg_cls_8=$("#eng_reg_cls_8").val()
		var math_reg_cls_8=$("#math_reg_cls_8").val()
		var sci_reg_cls_8=$("#sci_reg_cls_8").val()
		var eng_add_cls_8=$("#eng_add_cls_8").val()
		var math_add_cls_8=$("#math_add_cls_8").val()
		var sci_add_cls_8=$("#sci_add_cls_8").val()
		var eng_ave_cls_8=$("#eng_ave_cls_8").val()
		var math_ave_cls_8=$("#math_ave_cls_8").val()
		var sci_ave_cls_8=$("#sci_ave_cls_8").val()
		
		var eng_enro_add_cls_9=$("#eng_enro_add_cls_9").val()	
		var math_enro_add_cls_9=$("#math_enro_add_cls_9").val()
		var sci_enro_add_cls_9=$("#sci_enro_add_cls_9").val()
		var eng_reg_cls_9=$("#eng_reg_cls_9").val()
		var math_reg_cls_9=$("#math_reg_cls_9").val()
		var sci_reg_cls_9=$("#sci_reg_cls_9").val()
		var eng_add_cls_9=$("#eng_add_cls_9").val()
		var math_add_cls_9=$("#math_add_cls_9").val()
		var sci_add_cls_9=$("#sci_add_cls_9").val()
		var eng_ave_cls_9=$("#eng_ave_cls_9").val()
		var math_ave_cls_9=$("#math_ave_cls_9").val()
		var sci_ave_cls_9=$("#sci_ave_cls_9").val()
		
		var eng_enro_add_cls_10=$("#eng_enro_add_cls_10").val()	
		var math_enro_add_cls_10=$("#math_enro_add_cls_10").val()
		var sci_enro_add_cls_10=$("#sci_enro_add_cls_10").val()
		var eng_reg_cls_10=$("#eng_reg_cls_10").val()
		var math_reg_cls_10=$("#math_reg_cls_10").val()
		var sci_reg_cls_10=$("#sci_reg_cls_10").val()
		var eng_add_cls_10=$("#eng_add_cls_10").val()
		var math_add_cls_10=$("#math_add_cls_10").val()
		var sci_add_cls_10=$("#sci_add_cls_10").val()
		var eng_ave_cls_10=$("#eng_ave_cls_10").val()
		var math_ave_cls_10=$("#math_ave_cls_10").val()
		var sci_ave_cls_10=$("#sci_ave_cls_10").val()
		
		
		/*
		math_reg_cls_total=$("#math_reg_cls_total").val()
		sci_reg_cls_total=$("#sci_reg_cls_total").val()
		eng_add_cls_total=$("#eng_add_cls_total").val()
		math_add_cls_total=$("#math_add_cls_total").val()
		sci_add_cls_total=$("#sci_add_cls_total").val()
		eng_ave_cls_total=$("#eng_ave_cls_total").val()
		math_ave_cls_total=$("#math_ave_cls_total").val()
		sci_ave_cls_total=$("#sci_ave_cls_total").val()	*/	
		
		/*if (add_cls_seqaep==""){
			$(".errorChk").text("Required Additional Class");
		}else if (add_cls_seqaep==""){
			$(".errorChk").text("Required Semester and Year");	
		}else*/ if (act_1_dis_date==""){
			$(".errorChk").text("Required Disbursement Date ");	
		}else if (act_1_ag_date==""){
			$(".errorChk").text("Required Agreement Date");	
		}else if (act_1_total_work==""){
			$(".errorChk").text("Required Total Working days ");	
		}else if (sub_add_cls==""){
			$(".errorChk").text("Required Subject Wise Routine for Additional Class");
				
		}else if (act_1_name==""){
			$(".errorChk").text("Required Name 1.1");	
		}else if (act_1_ag_inst==""){
			$(".errorChk").text("Required Agreement Date 1.2");
		}else if (act_1_sub==""){
			$(".errorChk").text("Required Subject taught 1.3");
		}else if (act_1_last_academic_cft==""){
			$(".errorChk").text("Required Educational Qualification 1.4");
		}else if (receive_mark_1==""){
			$(".errorChk").text("Required Received 300 Marks 1.5");	
		}else if (act_1_cft_verify==""){
			$(".errorChk").text("Required Certificate Checked 1.6");	
		}else if (act_1_leave==""){
			$(".errorChk").text("Required No of Leave taken 1.7");	
		}else if (act_1_absent==""){
			$(".errorChk").text("Required No of days Absent 1.8");	
		}else if (act_1_total_class==""){
			$(".errorChk").text("Required Total classes taken 1.9");
				
		}else if (act_2_name==""){
			$(".errorChk").text("Required Name 2.1");	
		}else if (act_2_ag_inst==""){
			$(".errorChk").text("Required Agreement Date 2.2");
		}else if (act_2_sub==""){
			$(".errorChk").text("Required Subject taught 2.3");
		}else if (act_2_last_academic_cft==""){
			$(".errorChk").text("Required Educational Qualification 2.4");
		}else if (receive_mark_2==""){
			$(".errorChk").text("Required Received 300 Marks 2.5");	
		}else if (act_2_cft_verify==""){
			$(".errorChk").text("Required Certificate Checked 2.6");	
		}else if (act_2_leave==""){
			$(".errorChk").text("Required No of Leave taken 2.7");	
		}else if (act_2_absent==""){
			$(".errorChk").text("Required No of days Absent 2.8");	
		}else if (act_2_total_class==""){
			$(".errorChk").text("Required Total classes taken 2.9");	
			
		}else if (act_3_name==""){
			$(".errorChk").text("Required Name 3.1");	
		}else if (act_3_ag_inst==""){
			$(".errorChk").text("Required Agreement Date 3.2");
		}else if (act_3_sub==""){
			$(".errorChk").text("Required Subject taught 3.3");
		}else if (act_3_last_academic_cft==""){
			$(".errorChk").text("Required Educational Qualification 3.4");
		}else if (receive_mark_3==""){
			$(".errorChk").text("Required Received 300 Marks 3.5");	
		}else if (act_3_cft_verify==""){
			$(".errorChk").text("Required Certificate Checked 3.6");	
		}else if (act_3_leave==""){
			$(".errorChk").text("Required No of Leave taken 3.7");	
		}else if (act_3_absent==""){
			$(".errorChk").text("Required No of days Absent 3.8");	
		}else if (act_3_total_class==""){
			$(".errorChk").text("Required Total classes taken 3.9");	
		
		}else if (eng_enro_add_cls_6==""){
			$(".errorChk").text("Required Enrolled Student English VI");	
		}else if (math_enro_add_cls_6==""){
			$(".errorChk").text("Required Enrolled Student Math VI");
		}else if (sci_enro_add_cls_6==""){
			$(".errorChk").text("Required Enrolled Student Science VI");
		}else if (eng_reg_cls_6==""){
			$(".errorChk").text("Required Regular Class English VI");
		}else if (math_reg_cls_6==""){
			$(".errorChk").text("Required Regular Class Math VI");	
		}else if (sci_reg_cls_6==""){
			$(".errorChk").text("Required Regular Class Science VI");	
		}else if (eng_add_cls_6==""){
			$(".errorChk").text("Required Additional Class English VI");
		}else if (math_add_cls_6==""){
			$(".errorChk").text("Required Additional Class Math VI");	
		}else if (sci_add_cls_6==""){
			$(".errorChk").text("Required Additional Class Science VI");
		}else if (eng_ave_cls_6==""){
			$(".errorChk").text("Required Average Attendance English VI");
		}else if (math_ave_cls_6==""){
			$(".errorChk").text("Required Average Attendance Math VI");	
		}else if (sci_ave_cls_6==""){
			$(".errorChk").text("Required Average Attendance Science VI");
		
		}else if (eng_enro_add_cls_7==""){
			$(".errorChk").text("Required Enrolled Student English VII");	
		}else if (math_enro_add_cls_7==""){
			$(".errorChk").text("Required Enrolled Student Math VII");
		}else if (sci_enro_add_cls_7==""){
			$(".errorChk").text("Required Enrolled Student Science VII");
		}else if (eng_reg_cls_7==""){
			$(".errorChk").text("Required Regular Class English VII");
		}else if (math_reg_cls_7==""){
			$(".errorChk").text("Required Regular Class Math VII");	
		}else if (sci_reg_cls_7==""){
			$(".errorChk").text("Required Regular Class Science VII");	
		}else if (eng_add_cls_7==""){
			$(".errorChk").text("Required Additional Class English VII");
		}else if (math_add_cls_7==""){
			$(".errorChk").text("Required Additional Class Math VII");	
		}else if (sci_add_cls_7==""){
			$(".errorChk").text("Required Additional Class Science VII");
		}else if (eng_ave_cls_7==""){
			$(".errorChk").text("Required Average Attendance English VII");
		}else if (math_ave_cls_7==""){
			$(".errorChk").text("Required Average Attendance Math VII");	
		}else if (sci_ave_cls_7==""){
			$(".errorChk").text("Required Average Attendance Science VII");
		
		}else if (eng_enro_add_cls_8==""){
			$(".errorChk").text("Required Enrolled Student English VIII");	
		}else if (math_enro_add_cls_8==""){
			$(".errorChk").text("Required Enrolled Student Math VIII");
		}else if (sci_enro_add_cls_8==""){
			$(".errorChk").text("Required Enrolled Student Science VIII");
		}else if (eng_reg_cls_8==""){
			$(".errorChk").text("Required Regular Class English VIII");
		}else if (math_reg_cls_8==""){
			$(".errorChk").text("Required Regular Class Math VIII");	
		}else if (sci_reg_cls_8==""){
			$(".errorChk").text("Required Regular Class Science VIII");	
		}else if (eng_add_cls_8==""){
			$(".errorChk").text("Required Additional Class English VIII");
		}else if (math_add_cls_8==""){
			$(".errorChk").text("Required Additional Class Math VIII");	
		}else if (sci_add_cls_8==""){
			$(".errorChk").text("Required Additional Class Science VIII");
		}else if (eng_ave_cls_8==""){
			$(".errorChk").text("Required Average Attendance English VIII");
		}else if (math_ave_cls_8==""){
			$(".errorChk").text("Required Average Attendance Math VIII");	
		}else if (sci_ave_cls_8==""){
			$(".errorChk").text("Required Average Attendance Science VIII");
		
		}else if (eng_enro_add_cls_9==""){
			$(".errorChk").text("Required Enrolled Student English IX");	
		}else if (math_enro_add_cls_9==""){
			$(".errorChk").text("Required Enrolled Student Math IX");
		}else if (sci_enro_add_cls_9==""){
			$(".errorChk").text("Required Enrolled Student Science IX");
		}else if (eng_reg_cls_9==""){
			$(".errorChk").text("Required Regular Class English IX");
		}else if (math_reg_cls_9==""){
			$(".errorChk").text("Required Regular Class Math IX");	
		}else if (sci_reg_cls_9==""){
			$(".errorChk").text("Required Regular Class Science IX");	
		}else if (eng_add_cls_9==""){
			$(".errorChk").text("Required Additional Class English IX");
		}else if (math_add_cls_9==""){
			$(".errorChk").text("Required Additional Class Math IX");	
		}else if (sci_add_cls_9==""){
			$(".errorChk").text("Required Additional Class Science IX");
		}else if (eng_ave_cls_9==""){
			$(".errorChk").text("Required Average Attendance English IX");
		}else if (math_ave_cls_9==""){
			$(".errorChk").text("Required Average Attendance Math IX");	
		}else if (sci_ave_cls_9==""){
			$(".errorChk").text("Required Average Attendance Science IX");
		
		}else if (eng_enro_add_cls_10==""){
			$(".errorChk").text("Required Enrolled Student English X");	
		}else if (math_enro_add_cls_10==""){
			$(".errorChk").text("Required Enrolled Student Math X");
		}else if (sci_enro_add_cls_10==""){
			$(".errorChk").text("Required Enrolled Student Science X");
		}else if (eng_reg_cls_10==""){
			$(".errorChk").text("Required Regular Class English X");
		}else if (math_reg_cls_10==""){
			$(".errorChk").text("Required Regular Class Math X");	
		}else if (sci_reg_cls_10==""){
			$(".errorChk").text("Required Regular Class Science X");	
		}else if (eng_add_cls_10==""){
			$(".errorChk").text("Required Additional Class English X");
		}else if (math_add_cls_10==""){
			$(".errorChk").text("Required Additional Class Math X");	
		}else if (sci_add_cls_10==""){
			$(".errorChk").text("Required Additional Class Science X");
		}else if (eng_ave_cls_10==""){
			$(".errorChk").text("Required Average Attendance English X");
		}else if (math_ave_cls_10==""){
			$(".errorChk").text("Required Average Attendance Math X");	
		}else if (sci_ave_cls_10==""){
			$(".errorChk").text("Required Average Attendance Science X");
						
		}else{
					
		banbeisComData4="&add_cls_seqaep="+add_cls_seqaep+"&add_class_semister="+add_class_semister+"&act_1_dis_date="+act_1_dis_date+"&act_1_ag_date="+act_1_ag_date+"&act_1_total_work="+act_1_total_work+"&sub_add_cls="+sub_add_cls
		+"&act_1_name="+act_1_name+"&act_1_ag_inst="+act_1_ag_inst+"&act_1_sub="+act_1_sub+"&act_1_last_academic_cft="+act_1_last_academic_cft+"&receive_mark_1="+receive_mark_1+"&act_1_cft_verify="+act_1_cft_verify+"&act_1_leave="+act_1_leave+"&act_1_absent="+act_1_absent+"&act_1_total_class="+act_1_total_class+"&act_2_name="+act_2_name+"&act_2_ag_inst="+act_2_ag_inst+"&act_2_sub="+act_2_sub+"&act_2_last_academic_cft="+act_2_last_academic_cft+"&receive_mark_2="+receive_mark_2+"&act_2_cft_verify="+act_2_cft_verify+"&act_2_leave="+act_2_leave+"&act_2_absent="+act_2_absent+"&act_2_total_class="+act_2_total_class+"&act_3_name="+act_3_name+"&act_3_ag_inst="+act_3_ag_inst+"&act_3_sub="+act_3_sub+"&act_3_last_academic_cft="+act_3_last_academic_cft+"&receive_mark_3="+receive_mark_3+"&act_3_cft_verify="+act_3_cft_verify+"&act_3_leave="+act_3_leave+"&act_3_absent="+act_3_absent+"&act_3_total_class="+act_3_total_class+"&eng_enro_add_cls_6="+eng_enro_add_cls_6+"&math_enro_add_cls_6="+math_enro_add_cls_6+"&sci_enro_add_cls_6="+sci_enro_add_cls_6+"&eng_reg_cls_6="+eng_reg_cls_6+"&math_reg_cls_6="+math_reg_cls_6+"&sci_reg_cls_6="+sci_reg_cls_6+"&eng_add_cls_6="+eng_add_cls_6+"&math_add_cls_6="+math_add_cls_6+"&sci_add_cls_6="+sci_add_cls_6+"&eng_ave_cls_6="+eng_ave_cls_6+"&math_ave_cls_6="+math_ave_cls_6+"&sci_ave_cls_6="+sci_ave_cls_6+"&eng_enro_add_cls_7="+eng_enro_add_cls_7+"&math_enro_add_cls_7="+math_enro_add_cls_7+"&sci_enro_add_cls_7="+sci_enro_add_cls_7+"&eng_reg_cls_7="+eng_reg_cls_7+"&math_reg_cls_7="+math_reg_cls_7+"&sci_reg_cls_7="+sci_reg_cls_7+"&eng_add_cls_7="+eng_add_cls_7+"&math_add_cls_7="+math_add_cls_7+"&sci_add_cls_7="+sci_add_cls_7+"&eng_ave_cls_7="+eng_ave_cls_7+"&math_ave_cls_7="+math_ave_cls_7+"&sci_ave_cls_7="+sci_ave_cls_7+"&eng_enro_add_cls_8="+eng_enro_add_cls_8+"&math_enro_add_cls_8="+math_enro_add_cls_8+"&sci_enro_add_cls_8="+sci_enro_add_cls_8+"&eng_reg_cls_8="+eng_reg_cls_8+"&math_reg_cls_8="+math_reg_cls_8+"&sci_reg_cls_8="+sci_reg_cls_8+"&eng_add_cls_8="+eng_add_cls_8+"&math_add_cls_8="+math_add_cls_8+"&sci_add_cls_8="+sci_add_cls_8+"&eng_ave_cls_8="+eng_ave_cls_8+"&math_ave_cls_8="+math_ave_cls_8+"&sci_ave_cls_8="+sci_ave_cls_8+"&eng_enro_add_cls_9="+eng_enro_add_cls_9+"&math_enro_add_cls_9="+math_enro_add_cls_9+"&sci_enro_add_cls_9="+sci_enro_add_cls_9+"&eng_reg_cls_9="+eng_reg_cls_9+"&math_reg_cls_9="+math_reg_cls_9+"&sci_reg_cls_9="+sci_reg_cls_9+"&eng_add_cls_9="+eng_add_cls_9+"&math_add_cls_9="+math_add_cls_9+"&sci_add_cls_9="+sci_add_cls_9+"&eng_ave_cls_9="+eng_ave_cls_9+"&math_ave_cls_9="+math_ave_cls_9+"&sci_ave_cls_9="+sci_ave_cls_9+"&eng_enro_add_cls_10="+eng_enro_add_cls_10+"&math_enro_add_cls_10="+math_enro_add_cls_10+"&sci_enro_add_cls_10="+sci_enro_add_cls_10+"&eng_reg_cls_10="+eng_reg_cls_10+"&math_reg_cls_10="+math_reg_cls_10+"&sci_reg_cls_10="+sci_reg_cls_10+"&eng_add_cls_10="+eng_add_cls_10+"&math_add_cls_10="+math_add_cls_10+"&sci_add_cls_10="+sci_add_cls_10+"&eng_ave_cls_10="+eng_ave_cls_10+"&math_ave_cls_10="+math_ave_cls_10+"&sci_ave_cls_10="+sci_ave_cls_10//+"&eng_enro_add_cls_total="+eng_enro_add_cls_total+"&math_enro_add_cls_total="+math_enro_add_cls_total+"&sci_enro_add_cls_total="+sci_enro_add_cls_total+"&eng_reg_cls_total="+eng_reg_cls_total+"&math_reg_cls_total="+math_reg_cls_total+"&sci_reg_cls_total="+sci_reg_cls_total+"&eng_add_cls_total="+eng_add_cls_total+"&math_add_cls_total="+math_add_cls_total+"&sci_add_cls_total="+sci_add_cls_total+"&eng_ave_cls_total="+eng_ave_cls_total+"&math_ave_cls_total="+math_ave_cls_total+"&sci_ave_cls_total="+sci_ave_cls_total
		
		//alert(banbeisComData4);		
		
		url="#compliancePage5";					
		$.mobile.navigate(url);		
		}
}

/*function ins_agr_cls(){
	
	cls_seq=$("input[name='add_cls_seqaep']:checked").val();
	//alert(cls_seq);
	if(cls_seq=="2"){
		$("#des_cls_ref_sem").show();
	}else{
	 	$("#des_cls_ref_sem").hide();
	}
}*/


function complianceData5Next(){

		inst_type_manag=$("#inst_type_manag").val()
		smc_type=$("#smc_type").val()		
		smc_member=$("#smc_member").val()	
		smc_tran_seqaep=$("#smc_tran_seqaep").val()
		cha_att_seqaep=$("input[name='cha_att_seqaep']:checked").val();		
		smc_meeting=$("#smc_meeting").val()
		smc_meet_chec_min=$("input[name='smc_meet_chec_min']:checked").val();
		ins_annu_sch_dev_plan=$("input[name='ins_annu_sch_dev_plan']:checked").val();
		
		pta_exist_ins=$("input[name='pta_exist_ins']:checked").val();
		pta_reformed_ins=$("#pta_reformed_ins").val()			
		pta_ins_rec_taka=$("#pta_ins_rec_taka").val()		
		ins_grant_rec_date=$("#ins_grant_rec_date").val()
		why_not_pta_formed=$("input[name='why_not_pta_formed']:checked").val();
		overall_com_mda=$("input[name='overall_com_mda']:checked").val();
		pta_meet=$("#pta_meet").val()		
		pta_meet_chec_min=$("input[name='pta_meet_chec_min']:checked").val();
		pta_meet_min_seqaep=$("input[name='pta_meet_min_seqaep']:checked").val();
		eacm=$("#eacm").val()
		ins_rec_grant_eacm=$("input[name='ins_rec_grant_eacm']:checked").val();
		acti_with_eacm_grant=$("#acti_with_eacm_grant").val()
		
		topic_dis_eacm_pro=$("#topic_dis_eacm_pro").val()
		chai_aware_eacm_expe=$("input[name='chai_aware_eacm_expe']:checked").val();
		social_audit=$("#social_audit").val()
		ins_rec_grant_sa=$("input[name='ins_rec_grant_sa']:checked").val();
		report_pre_annu_exam=$("input[name='report_pre_annu_exam']:checked").val();
		give_report_prepa=$("#give_report_prepa").val()
		last_soc_rep_dis=$("#last_soc_rep_dis").val()		
		
		banbeisComData5="&inst_type_manag="+inst_type_manag+"&smc_type="+smc_type+"&smc_member="+smc_member+"&smc_tran_seqaep="+smc_tran_seqaep+"&cha_att_seqaep="+cha_att_seqaep+"&smc_meeting="+smc_meeting+"&smc_meet_chec_min="+smc_meet_chec_min+"&ins_annu_sch_dev_plan="+ins_annu_sch_dev_plan+"&pta_exist_ins="+pta_exist_ins+"&pta_reformed_ins="+pta_reformed_ins+"&pta_ins_rec_taka="+pta_ins_rec_taka+"&ins_grant_rec_date="+ins_grant_rec_date+"&why_not_pta_formed="+why_not_pta_formed+"&overall_com_mda="+overall_com_mda+"&pta_meet="+pta_meet+"&pta_meet_chec_min="+pta_meet_chec_min+"&pta_meet_min_seqaep="+pta_meet_min_seqaep+"&eacm="+eacm+"&ins_rec_grant_eacm="+ins_rec_grant_eacm+"&acti_with_eacm_grant="+acti_with_eacm_grant+"&topic_dis_eacm_pro="+topic_dis_eacm_pro+"&chai_aware_eacm_expe="+chai_aware_eacm_expe+"&social_audit="+social_audit+"&ins_rec_grant_sa="+ins_rec_grant_sa+"&report_pre_annu_exam="+report_pre_annu_exam+"&give_report_prepa="+give_report_prepa+"&last_soc_rep_dis="+last_soc_rep_dis
				
		//alert(banbeisComData5);
		
		url="#compliancePage6";					
		$.mobile.navigate(url);		
		
	
}


function complianceData6Next(){
		
		ict_grant=$("#ict_grant").val()
		ins_internet_con=$("input[name='ins_internet_con']:checked").val();
		ins_assi_ict_grant=$("input[name='ins_assi_ict_grant']:checked").val();
		how_sec_email=$("#how_sec_email").val()
		email_sent_seqaep=$("#email_sent_seqaep").val()
		ict_grant_rec=$("input[name='ict_grant_rec']:checked").val();
		sch_one_mail_seqaep=$("input[name='sch_one_mail_seqaep']:checked").val();
		ins_rec_isf=$("input[name='ins_rec_isf']:checked").val();
		
		work_status_isf_1=$("#work_status_isf_1").val()
		use_group_com_1=$("input[name='use_group_com_1']:checked").val();
		total_taka_seqaep_1=$("#total_taka_seqaep_1").val()
		total_taka_commu_1=$("#total_taka_commu_1").val()
		money_stil_spent_1=$("#money_stil_spent_1").val()
		pre_condi_work_1=$("#pre_condi_work_1").val()
		
		work_status_isf_2=$("#work_status_isf_2").val()
		use_group_com_2=$("input[name='use_group_com_2']:checked").val();
		total_taka_seqaep_2=$("#total_taka_seqaep_2").val()
		total_taka_commu_2=$("#total_taka_commu_2").val()
		money_stil_spent_2=$("#money_stil_spent_2").val()
		pre_condi_work_2=$("#pre_condi_work_2").val()
		
		work_status_isf_3=$("#work_status_isf_3").val()
		use_group_com_3=$("input[name='use_group_com_3']:checked").val();
		total_taka_seqaep_3=$("#total_taka_seqaep_3").val()
		total_taka_commu_3=$("#total_taka_commu_3").val()
		money_stil_spent_3=$("#money_stil_spent_3").val()
		pre_condi_work_3=$("#pre_condi_work_3").val()
		
		work_status_isf_4=$("#work_status_isf_4").val()
		use_group_com_4=$("input[name='use_group_com_4']:checked").val();
		total_taka_seqaep_4=$("#total_taka_seqaep_4").val()
		total_taka_commu_4=$("#total_taka_commu_4").val()
		money_stil_spent_4=$("#money_stil_spent_4").val()
		pre_condi_work_4=$("#pre_condi_work_4").val()
		
		work_status_isf_5=$("#work_status_isf_5").val()
		use_group_com_5=$("input[name='use_group_com_5']:checked").val();
		total_taka_seqaep_5=$("#total_taka_seqaep_5").val()
		total_taka_commu_5=$("#total_taka_commu_5").val()
		money_stil_spent_5=$("#money_stil_spent_5").val()
		pre_condi_work_5=$("#pre_condi_work_5").val()
		
		work_status_isf_6=$("#work_status_isf_6").val()
		use_group_com_6=$("input[name='use_group_com_6']:checked").val();
		total_taka_seqaep_6=$("#total_taka_seqaep_6").val()
		total_taka_commu_6=$("#total_taka_commu_6").val()
		money_stil_spent_6=$("#money_stil_spent_6").val()
		pre_condi_work_6=$("#pre_condi_work_6").val()
		
		work_status_isf_7=$("#work_status_isf_7").val()
		use_group_com_7=$("input[name='use_group_com_7']:checked").val();
		total_taka_seqaep_7=$("#total_taka_seqaep_7").val()
		total_taka_commu_7=$("#total_taka_commu_7").val()
		money_stil_spent_7=$("#money_stil_spent_7").val()
		pre_condi_work_7=$("#pre_condi_work_7").val()
		
		name_work_isf_grant=$("input[name='name_work_isf_grant']:checked").val();
		work_status=$("#work_status").val()
		ins_total_tub=$("#ins_total_tub").val()
		test_tubewell=$("#test_tubewell").val()
		test_arsenic=$("#test_arsenic").val()
		tested_manganese=$("#tested_manganese").val()
		tubewell_arsenic_free=$("#tubewell_arsenic_free").val()
		tub_ars_cont=$("#tub_ars_cont").val()
		tub_manga_free=$("#tub_manga_free").val()
		tub_manga_conta=$("#tub_manga_conta").val()
		ins_per_dphe_water=$("input[name='ins_per_dphe_water']:checked").val();
		ins_arc_man_rep_card=$("input[name='ins_arc_man_rep_card']:checked").val();
		arsenic=$("input[name='arsenic']:checked").val();
		manganese=$("input[name='manganese']:checked").val();
		tube_setup_ins=$("input[name='tube_setup_ins']:checked").val();
		how_tub_install=$("#how_tub_install").val()
		
		banbeisComData6="&ict_grant="+ict_grant+"&ins_internet_con="+ins_internet_con+"&ins_assi_ict_grant="+ins_assi_ict_grant+"&how_sec_email="+how_sec_email+"&email_sent_seqaep="+email_sent_seqaep+"&ict_grant_rec="+ict_grant_rec+"&sch_one_mail_seqaep="+sch_one_mail_seqaep+"&ins_rec_isf="+ins_rec_isf+"&work_status_isf_1="+work_status_isf_1+"&use_group_com_1="+use_group_com_1+"&total_taka_seqaep_1="+total_taka_seqaep_1+"&total_taka_commu_1="+total_taka_commu_1+"&money_stil_spent_1="+money_stil_spent_1+"&pre_condi_work_1="+pre_condi_work_1+"&work_status_isf_2="+work_status_isf_2+"&use_group_com_2="+use_group_com_2+"&total_taka_seqaep_2="+total_taka_seqaep_2+"&total_taka_commu_2="+total_taka_commu_2+"&money_stil_spent_2="+money_stil_spent_2+"&pre_condi_work_2="+pre_condi_work_2+"&work_status_isf_3="+work_status_isf_3+"&use_group_com_3="+use_group_com_3+"&total_taka_seqaep_3="+total_taka_seqaep_3+"&total_taka_commu_3="+total_taka_commu_3+"&money_stil_spent_3="+money_stil_spent_3+"&pre_condi_work_3="+pre_condi_work_3+"&work_status_isf_4="+work_status_isf_4+"&use_group_com_4="+use_group_com_4+"&total_taka_seqaep_4="+total_taka_seqaep_4+"&total_taka_commu_4="+total_taka_commu_4+"&money_stil_spent_4="+money_stil_spent_4+"&pre_condi_work_4="+pre_condi_work_4+"&work_status_isf_5="+work_status_isf_5+"&use_group_com_5="+use_group_com_5+"&total_taka_seqaep_5="+total_taka_seqaep_5+"&total_taka_commu_5="+total_taka_commu_5+"&money_stil_spent_5="+money_stil_spent_5+"&pre_condi_work_5="+pre_condi_work_5+"&work_status_isf_6="+work_status_isf_6+"&use_group_com_6="+use_group_com_6+"&total_taka_seqaep_6="+total_taka_seqaep_6+"&total_taka_commu_6="+total_taka_commu_6+"&money_stil_spent_6="+money_stil_spent_6+"&pre_condi_work_6="+pre_condi_work_6+"&work_status_isf_7="+work_status_isf_7+"&use_group_com_7="+use_group_com_7+"&total_taka_seqaep_7="+total_taka_seqaep_7+"&total_taka_commu_7="+total_taka_commu_7+"&money_stil_spent_7="+money_stil_spent_7+"&pre_condi_work_7="+pre_condi_work_7+"&name_work_isf_grant="+name_work_isf_grant+"&work_status="+work_status+"&ins_total_tub="+ins_total_tub+"&test_tubewell="+test_tubewell+"&test_arsenic="+test_arsenic+"&tested_manganese="+tested_manganese+"&tubewell_arsenic_free="+tubewell_arsenic_free+"&tub_ars_cont="+tub_ars_cont+"&tub_manga_free="+tub_manga_free+"&tub_manga_conta="+tub_manga_conta+"&ins_per_dphe_water="+ins_per_dphe_water+"&ins_arc_man_rep_card="+ins_arc_man_rep_card+"&arsenic="+arsenic+"&manganese="+manganese+"&tube_setup_ins="+tube_setup_ins+"&how_tub_install="+how_tub_install
		
		//alert(banbeisComData6);
		
		url="#compliancePage7";					
		$.mobile.navigate(url);	
		
	
}

function complianceData7Next(){
		
		ins_receive_tk=$("input[name='ins_receive_tk']:checked").val();
		receive_amount_iaa=$("input[name='receive_amount_iaa']:checked").val();
		amount_dis_manual=$("input[name='amount_dis_manual']:checked").val();
		smc_awared_dis=$("input[name='smc_awared_dis']:checked").val();	
		reason=$("#reason").val()
		smc_meet_dis=$("input[name='smc_meet_dis']:checked").val();	
		pta_aware_dis=$("input[name='pta_aware_dis']:checked").val();
		
		pmt_stu_app_ssc_exam_13=$("#pmt_stu_app_ssc_exam_13").val()
		pmt_stu_pass_ssc_exam_13=$("#pmt_stu_pass_ssc_exam_13").val()
		pmt_stu_gpa_13=$("#pmt_stu_gpa_13").val()
		nonpmt_stu_app_ssc_exam_13=$("#nonpmt_stu_app_ssc_exam_13").val()
		nonpmt_stu_pass_ssc_exam_13=$("#nonpmt_stu_pass_ssc_exam_13").val()
		nonpmt_stu_gpa_13=$("#nonpmt_stu_gpa_13").val()
		
		pmt_stu_app_ssc_exam_14=$("#pmt_stu_app_ssc_exam_14").val()
		pmt_stu_pass_ssc_exam_14=$("#pmt_stu_pass_ssc_exam_14").val()
		pmt_stu_gpa_14=$("#pmt_stu_gpa_14").val()
		nonpmt_stu_app_ssc_exam_14=$("#nonpmt_stu_app_ssc_exam_14").val()
		nonpmt_stu_pass_ssc_exam_14=$("#nonpmt_stu_pass_ssc_exam_14").val()
		nonpmt_stu_gpa_14=$("#nonpmt_stu_gpa_14").val()
		
		pmt_stu_app_ssc_exam_15=$("#pmt_stu_app_ssc_exam_15").val()
		pmt_stu_pass_ssc_exam_15=$("#pmt_stu_pass_ssc_exam_15").val()
		pmt_stu_gpa_15=$("#pmt_stu_gpa_15").val()
		nonpmt_stu_app_ssc_exam_15=$("#nonpmt_stu_app_ssc_exam_15").val()
		nonpmt_stu_pass_ssc_exam_15=$("#nonpmt_stu_pass_ssc_exam_15").val()
		nonpmt_stu_gpa_15=$("#nonpmt_stu_gpa_15").val()	
		
		/*************************/
		total_stu_rec_stipend=$("#total_stu_rec_stipend").val()	
		pmt_stu_app_ssc_exam=$("#pmt_stu_app_ssc_exam").val()	
		pmt_stu_pass_ssc=$("#pmt_stu_pass_ssc").val()	
		pmt_stu_coll_ssc_award=$("#pmt_stu_coll_ssc_award").val()
		pmt_stu_higher_study=$("#pmt_stu_higher_study").val()
		pass_award_dis=$("#pass_award_dis").val()
		stu_award_ref_period=$("#stu_award_ref_period").val()
		
		rece_award_boys_7=$("input[name='rece_award_boys_7']:checked").val();
		rece_pmt_stipen_boys_7=$("input[name='rece_pmt_stipen_boys_7']:checked").val();
		per_mark_ann_exam_boys_7=$("input[name='per_mark_ann_exam_boys_7']:checked").val();
		pre_day_visit_boys_7=$("input[name='pre_day_visit_boys_7']:checked").val();
		about_award_amo_tell_boys_7=$("input[name='about_award_amo_tell_boys_7']:checked").val();
		rece_award_girls_7=$("input[name='rece_award_girls_7']:checked").val();
		rece_pmt_stipen_girls_7=$("input[name='rece_pmt_stipen_girls_7']:checked").val();
		per_mark_ann_exam_girls_7=$("input[name='per_mark_ann_exam_girls_7']:checked").val();
		pre_day_visit_girls_7=$("input[name='pre_day_visit_girls_7']:checked").val();
		about_award_amo_tell_girls_7=$("input[name='about_award_amo_tell_girls_7']:checked").val();
		
		rece_award_boys_8=$("input[name='rece_award_boys_8']:checked").val();
		rece_pmt_stipen_boys_8=$("input[name='rece_pmt_stipen_boys_8']:checked").val();
		per_mark_ann_exam_boys_8=$("input[name='per_mark_ann_exam_boys_8']:checked").val();
		pre_day_visit_boys_8=$("input[name='pre_day_visit_boys_8']:checked").val();
		about_award_amo_tell_boys_8=$("input[name='about_award_amo_tell_boys_8']:checked").val();
		rece_award_girls_8=$("input[name='rece_award_girls_8']:checked").val();
		rece_pmt_stipen_girls_8=$("input[name='rece_pmt_stipen_girls_8']:checked").val();
		per_mark_ann_exam_girls_8=$("input[name='per_mark_ann_exam_girls_8']:checked").val();
		pre_day_visit_girls_8=$("input[name='pre_day_visit_girls_8']:checked").val();
		about_award_amo_tell_girls_8=$("input[name='about_award_amo_tell_girls_8']:checked").val();
		
		rece_award_boys_10=$("input[name='rece_award_boys_10']:checked").val();
		rece_pmt_stipen_boys_10=$("input[name='rece_pmt_stipen_boys_10']:checked").val();
		per_mark_ann_exam_boys_10=$("input[name='per_mark_ann_exam_boys_10']:checked").val();
		pre_day_visit_boys_10=$("input[name='pre_day_visit_boys_10']:checked").val();
		about_award_amo_tell_boys_10=$("input[name='about_award_amo_tell_boys_10']:checked").val();
		rece_award_girls_10=$("input[name='rece_award_girls_10']:checked").val();
		rece_pmt_stipen_girls_10=$("input[name='rece_pmt_stipen_girls_10']:checked").val();
		per_mark_ann_exam_girls_10=$("input[name='per_mark_ann_exam_girls_10']:checked").val();
		pre_day_visit_girls_10=$("input[name='pre_day_visit_girls_10']:checked").val();
		about_award_amo_tell_girls_10=$("input[name='about_award_amo_tell_girls_10']:checked").val();
		
		/*rece_award_boys_total=$("#rece_award_boys_total").val()	
		rece_pmt_stipen_boys_total=$("#rece_pmt_stipen_boys_total").val()	
		per_mark_ann_exam_boys_total=$("#per_mark_ann_exam_boys_total").val()	
		pre_day_visit_boys_total=$("#pre_day_visit_boys_total").val()	
		about_award_amo_tell_boys_total=$("#about_award_amo_tell_boys_total").val()	
		rece_award_girls_total=$("#rece_award_girls_total").val()	
		rece_pmt_stipen_girls_total=$("#rece_pmt_stipen_girls_total").val()	
		per_mark_ann_exam_girls_total=$("#per_mark_ann_exam_girls_total").val()	
		pre_day_visit_girls_total=$("#pre_day_visit_girls_total").val()	
		about_award_amo_tell_girls_total=$("#about_award_amo_tell_girls_total").val()	*/
		
		award_dis=$("#award_dis").val()				
		
		banbeisComData7="&ins_receive_tk="+ins_receive_tk+"&receive_amount_iaa="+receive_amount_iaa+"&amount_dis_manual="+amount_dis_manual+"&smc_awared_dis="+smc_awared_dis+"&reason="+reason+"&smc_meet_dis="+smc_meet_dis+"&pta_aware_dis="+pta_aware_dis+"&pmt_stu_app_ssc_exam_13="+pmt_stu_app_ssc_exam_13+"&pmt_stu_pass_ssc_exam_13="+pmt_stu_pass_ssc_exam_13+"&pmt_stu_gpa_13="+pmt_stu_gpa_13+"&nonpmt_stu_app_ssc_exam_13="+nonpmt_stu_app_ssc_exam_13+"&nonpmt_stu_pass_ssc_exam_13="+nonpmt_stu_pass_ssc_exam_13+"&nonpmt_stu_gpa_13="+nonpmt_stu_gpa_13+"&pmt_stu_app_ssc_exam_14="+pmt_stu_app_ssc_exam_14+"&pmt_stu_pass_ssc_exam_14="+pmt_stu_pass_ssc_exam_14+"&pmt_stu_gpa_14="+pmt_stu_gpa_14+"&nonpmt_stu_app_ssc_exam_14="+nonpmt_stu_app_ssc_exam_14+"&nonpmt_stu_pass_ssc_exam_14="+nonpmt_stu_pass_ssc_exam_14+"&nonpmt_stu_gpa_14="+nonpmt_stu_gpa_14+"&pmt_stu_app_ssc_exam_15="+pmt_stu_app_ssc_exam_15+"&pmt_stu_pass_ssc_exam_15="+pmt_stu_pass_ssc_exam_15+"&pmt_stu_gpa_15="+pmt_stu_gpa_15+"&nonpmt_stu_app_ssc_exam_15="+nonpmt_stu_app_ssc_exam_15+"&nonpmt_stu_pass_ssc_exam_15="+nonpmt_stu_pass_ssc_exam_15+"&nonpmt_stu_gpa_15="+nonpmt_stu_gpa_15+"&total_stu_rec_stipend="+total_stu_rec_stipend+"&pmt_stu_app_ssc_exam="+pmt_stu_app_ssc_exam+"&pmt_stu_pass_ssc="+pmt_stu_pass_ssc+"&pmt_stu_coll_ssc_award="+pmt_stu_coll_ssc_award+"&pmt_stu_higher_study="+pmt_stu_higher_study+"&pass_award_dis="+pass_award_dis+"&stu_award_ref_period="+stu_award_ref_period+"&rece_award_boys_7="+rece_award_boys_7+"&rece_pmt_stipen_boys_7="+rece_pmt_stipen_boys_7+"&per_mark_ann_exam_boys_7="+per_mark_ann_exam_boys_7+"&pre_day_visit_boys_7="+pre_day_visit_boys_7+"&about_award_amo_tell_boys_7="+about_award_amo_tell_boys_7+"&rece_award_girls_7="+rece_award_girls_7+"&rece_pmt_stipen_girls_7="+rece_pmt_stipen_girls_7+"&per_mark_ann_exam_girls_7="+per_mark_ann_exam_girls_7+"&pre_day_visit_girls_7="+pre_day_visit_girls_7+"&about_award_amo_tell_girls_7="+about_award_amo_tell_girls_7+"&rece_award_boys_8="+rece_award_boys_8+"&rece_pmt_stipen_boys_8="+rece_pmt_stipen_boys_8+"&per_mark_ann_exam_boys_8="+per_mark_ann_exam_boys_8+"&pre_day_visit_boys_8="+pre_day_visit_boys_8+"&about_award_amo_tell_boys_8="+about_award_amo_tell_boys_8+"&rece_award_girls_8="+rece_award_girls_8+"&rece_pmt_stipen_girls_8="+rece_pmt_stipen_girls_8+"&per_mark_ann_exam_girls_8="+per_mark_ann_exam_girls_8+"&pre_day_visit_girls_8="+pre_day_visit_girls_8+"&about_award_amo_tell_girls_8="+about_award_amo_tell_girls_8+"&rece_award_boys_10="+rece_award_boys_10+"&rece_pmt_stipen_boys_10="+rece_pmt_stipen_boys_10+"&per_mark_ann_exam_boys_10="+per_mark_ann_exam_boys_10+"&pre_day_visit_boys_10="+pre_day_visit_boys_10+"&about_award_amo_tell_boys_10="+about_award_amo_tell_boys_10+"&rece_award_girls_10="+rece_award_girls_10+"&rece_pmt_stipen_girls_10="+rece_pmt_stipen_girls_10+"&per_mark_ann_exam_girls_10="+per_mark_ann_exam_girls_10+"&pre_day_visit_girls_10="+pre_day_visit_girls_10+"&about_award_amo_tell_girls_10="+about_award_amo_tell_girls_10+"&award_dis="+award_dis
	
	
	
                                                                                                                                        // alert(banbeisComData7);                                                                                               		
			
		url="#compliancePage8";					
		$.mobile.navigate(url);		
	
}

function complianceData8Next(){
	
		dev_ref_period=$("#dev_ref_period").val()
		ins_drh_pro=$("input[name='ins_drh_pro']:checked").val();		
		org_drh_pro=$("#org_drh_pro").val()
		rec_org_ref_per=$("input[name='rec_org_ref_per']:checked").val();
		
		stu_inc_drh_6=$("#stu_inc_drh_6").val()
		pro_book_rec_6=$("#pro_book_rec_6").val()
		stu_per_eva_6=$("#stu_per_eva_6").val()
		stu_pass_eval_test_6=$("#stu_pass_eval_test_6").val()
		no_award_6=$("#no_award_6").val()
		only_drh_book_6=$("#only_drh_book_6").val()
		inc_drh_book_6=$("#inc_drh_book_6").val()	
		
		stu_inc_drh_7=$("#stu_inc_drh_7").val()
		pro_book_rec_7=$("#pro_book_rec_7").val()
		stu_per_eva_7=$("#stu_per_eva_7").val()
		stu_pass_eval_test_7=$("#stu_pass_eval_test_7").val()
		no_award_7=$("#no_award_7").val()
		only_drh_book_7=$("#only_drh_book_7").val()
		inc_drh_book_7=$("#inc_drh_book_7").val()
		
		stu_inc_drh_8=$("#stu_inc_drh_8").val()
		pro_book_rec_8=$("#pro_book_rec_8").val()
		stu_per_eva_8=$("#stu_per_eva_8").val()
		stu_pass_eval_test_8=$("#stu_pass_eval_test_8").val()
		no_award_8=$("#no_award_8").val()
		only_drh_book_8=$("#only_drh_book_8").val()
		inc_drh_book_8=$("#inc_drh_book_8").val()
		
		stu_inc_drh_9=$("#stu_inc_drh_9").val()
		pro_book_rec_9=$("#pro_book_rec_9").val()
		stu_per_eva_9=$("#stu_per_eva_9").val()
		stu_pass_eval_test_9=$("#stu_pass_eval_test_9").val()
		no_award_9=$("#no_award_9").val()
		only_drh_book_9=$("#only_drh_book_9").val()
		inc_drh_book_9=$("#inc_drh_book_9").val()
		
		stu_inc_drh_10=$("#stu_inc_drh_10").val()
		pro_book_rec_10=$("#pro_book_rec_10").val()
		stu_per_eva_10=$("#stu_per_eva_10").val()
		stu_pass_eval_test_10=$("#stu_pass_eval_test_10").val()
		no_award_10=$("#no_award_10").val()
		only_drh_book_10=$("#only_drh_book_10").val()
		inc_drh_book_10=$("#inc_drh_book_10").val()
		
		ver_rec_qty_pro_book=$("#ver_rec_qty_pro_book").val()
		total_drh_book=$("#total_drh_book").val()
		rec_book_ins=$("#rec_book_ins").val()
		ins_book_drh=$("#ins_book_drh").val()
		ins_book_drh_ref=$("#ins_book_drh_ref").val()		
		
		banbeisComData8="&dev_ref_period="+dev_ref_period+"&ins_drh_pro="+ins_drh_pro+"&org_drh_pro="+org_drh_pro+"&rec_org_ref_per="+rec_org_ref_per+"&stu_inc_drh_6="+stu_inc_drh_6+"&pro_book_rec_6="+pro_book_rec_6+"&stu_per_eva_6="+stu_per_eva_6+"&stu_pass_eval_test_6="+stu_pass_eval_test_6+"&no_award_6="+no_award_6+"&only_drh_book_6="+only_drh_book_6+"&inc_drh_book_6="+inc_drh_book_6+"&stu_inc_drh_7="+stu_inc_drh_7+"&pro_book_rec_7="+pro_book_rec_7+"&stu_per_eva_7="+stu_per_eva_7+"&stu_pass_eval_test_7="+stu_pass_eval_test_7+"&no_award_7="+no_award_7+"&only_drh_book_7="+only_drh_book_7+"&inc_drh_book_7="+inc_drh_book_7+"&stu_inc_drh_8="+stu_inc_drh_8+"&pro_book_rec_8="+pro_book_rec_8+"&stu_per_eva_8="+stu_per_eva_8+"&stu_pass_eval_test_8="+stu_pass_eval_test_8+"&no_award_8="+no_award_8+"&only_drh_book_8="+only_drh_book_8+"&inc_drh_book_8="+inc_drh_book_8+"&stu_inc_drh_9="+stu_inc_drh_9+"&pro_book_rec_9="+pro_book_rec_9+"&stu_per_eva_9="+stu_per_eva_9+"&stu_pass_eval_test_9="+stu_pass_eval_test_9+"&no_award_9="+no_award_9+"&only_drh_book_9="+only_drh_book_9+"&inc_drh_book_9="+inc_drh_book_9+"&stu_inc_drh_10="+stu_inc_drh_10+"&pro_book_rec_10="+pro_book_rec_10+"&stu_per_eva_10="+stu_per_eva_10+"&stu_pass_eval_test_10="+stu_pass_eval_test_10+"&no_award_10="+no_award_10+"&only_drh_book_10="+only_drh_book_10+"&inc_drh_book_10="+inc_drh_book_10+"&ver_rec_qty_pro_book="+ver_rec_qty_pro_book+"&total_drh_book="+total_drh_book+"&rec_book_ins="+rec_book_ins+"&ins_book_drh="+ins_book_drh+"&ins_book_drh_ref="+ins_book_drh_ref
		
		//alert(banbeisComData8);
			
		url="#compliancePage9";					
		$.mobile.navigate(url);	
			
}



function complianceDataSubmit(){
		//$("#btn_com_submit").hide();
		
		var d = new Date();	
		var get_time=d.getTime();		

		
		com_latitude=$("#com_ach_lat").val();
		com_longitude=$("#com_ach_long").val();
		
		com_achPhoto=$("#com_achPhoto").val();
		com_achPhoto_2=$("#com_achPhoto_2").val();
		
		if (com_latitude==undefined || com_latitude==''){
			com_latitude=0;
			}
		if (com_longitude==undefined || com_longitude==''){
			com_longitude=0;
			}
		
		if (com_achPhoto=='' || com_achPhoto==undefined){
			$(".errorChk").text("Please confirm Photo 1 ");
			$("#btn_com_submit").show();
		}else{
			if (com_achPhoto_2=='' || com_achPhoto_2==undefined){
				$(".errorChk").text("Please confirm Photo 2 ");
				$("#btn_com_submit").show();
			}else{		
				//if(com_latitude==0 || com_latitude==0){
				//	$(".errorChk").text("Please confirm your location ");
				//	$("#btn_com_submit").show();
				//}else{				
					//imagePathA="test"					
					if (imagePathA!=""){							
						$(".errorChk").text("Syncing photo 1..");
						imageName = localStorage.mobile_no+"_"+get_time+".jpg";										
						uploadPhotoAch(imagePathA, imageName);						
					}
										
				/*}*/ //-end check location
				
			}//Photo 2
		}//chk photo
		
	}

//------------------------------------image 1
function getAchivementImageCom() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true});		
}

function onSuccessA(imageURI) {		
    var image = document.getElementById('com_myImageA');
    image.src = imageURI;
	imagePathA = imageURI;	
	$("#com_achPhoto").val(imagePathA);
	
}

function onFailA(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}

function uploadPhotoAch(imageURI, imageName) {
		
	//winAchInfo();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/que_image/quem_image_sync/fileUploader/"),winAchInfo,onfail,options);
	
}

function winAchInfo(r) {	
	$("#err_truck_info").text('File upload Successful. Syncing Data...');
	
	var d = new Date();	
	var get_time=d.getTime();
		
	//imagePath2A="test2"
	if (imagePath2A!=""){							
		$(".errorChk").text("Syncing photo 2..");
		imageName2 = localStorage.mobile_no+"_"+get_time+".jpg";
				
		uploadPhoto2Ach(imagePath2A, imageName2);		
	}
	
	
}

function onfail(r) {
	$("#err_truck_info").text('File upload Failed. Syncing Data...');
	
	var d = new Date();	
	var get_time=d.getTime();
	
	//imagePath2A="test2"
	if (imagePath2A!=""){							
		$(".errorChk").text("Syncing photo 2..");
		imageName2 = localStorage.mobile_no+"_"+get_time+".jpg";		
		uploadPhoto2Ach(imagePath2A, imageName2);		
	}
}

//-----------------------image 2

function getAchivementImage2Com() {
	navigator.camera.getPicture(onSuccess2A, onFail2A, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccess2A(imageURI) {		
    var image = document.getElementById('com_myImage2A');
    image.src = imageURI;
	imagePath2A = imageURI;	
	$("#com_achPhoto_2").val(imagePath2A);
	
}

function onFail2A(message) {
	imagePath2A="";
    alert('Failed because: ' + message);
}


function uploadPhoto2Ach(imageURI, imageName2) {
	//winComInfo2();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName2;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://i01.businesssolutionapps.com/que_image/quem_image_sync/fileUploader/"),winComInfo2,onfail,options);
	
}

function winComInfo2(r) {
	$("#err_truck_info").text('File upload Successful. Syncing Data 2...');
	syncDataCom();
}

function onfail(r) {
	$("#err_truck_info").text('File upload Failed. Syncing Data 2...');
	syncDataCom();
}



function syncDataCom(){
	
	//alert(apipath_compliance+"submitData_compliance?cid=BANBEIS&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+banbeisComData+banbeisComData2+banbeisComData3+banbeisComData4+banbeisComData5+banbeisComData6+banbeisComData7+banbeisComData8+'&com_achPhoto='+imageName+'&com_achPhoto2='+imageName2+'&latitude='+com_latitude+'&longitude='+com_longitude);
			$.ajax({
					type: 'POST',
					url:apipath_compliance+"submitData_compliance?cid=BANBEIS&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+banbeisComData+banbeisComData2+banbeisComData3+banbeisComData4+banbeisComData5+banbeisComData6+banbeisComData7+banbeisComData8+'&com_achPhoto='+imageName+'&com_achPhoto2='+imageName2+'&latitude='+com_latitude+'&longitude='+com_longitude,
					   
					   success: function(result) {
						
						if(result=='Success'){							
							
							$("#com_latitude").val("");
							$("#com_longitude").val("");
							$("#com_achPhoto").val("");
							$("#com_achPhoto_2").val("");
										
						
							$(".sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
							$("#btn_pmt_save").hide();
							$("#btn_take_pic").hide();
							$("#btn_ach_lat_long").hide();
							//$("#btn_com_submit").hide();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#btn_com_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}




function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}