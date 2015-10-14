


var achPhoto="";
var imageName = "";
var imagePathA="";

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
var apipath="http://e.businesssolutionapps.com/banbeis/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/banbeis/syncmobile/";

 url ="";


$(document).ready(function(){
	if (localStorage.synced!='YES'){
			 url = "#pagesync";						
		}else{
			
			url = "#homePage";
		}
	$.mobile.navigate(url);
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorChk").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorChk").html("Sync in progress. Please wait...");
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
						
						
						if (upListFlag==0){
							$("#ffUpDiv").html(localStorage.upazilaList);	
							upListFlag=1;
						}else{
							$('#ffUpDiv').empty();
							$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
						}
						
						//localStorage.ach_save="";
						
						$(".errorChk").html("Sync Successful");
						//alert('aa');
						
						$('#syncBasic').show();
						
						url = "#pagesync";
						$.mobile.navigate(url);

					}else{
						
						$(".errorChk").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
		 
		 }//-----/field
			
	}
	




function menuClick(){
		$(".errorChk").text("");
		$("#sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		if (upListFlag==0){
			$("#ffUpDiv").html(localStorage.upazilaList);	
			upListFlag=1;
		}else{
			$('#ffUpDiv').empty();
			$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
		}
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}


//----------------back button
function backClick(){
	$(".errorChk").text("");
	}


	
//---------------------------Banbeis data page 
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
			
			if (upListFlag==0){
				$("#ffUpDiv").html(localStorage.upazilaList);	
				upListFlag=1;
			}else{
				$('#ffUpDiv').empty();
				$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
			}			
			
			url="#page1";					
			$.mobile.navigate(url);		
		}
	
}


function banbeisDataNext(){
		
		ff_upazila=$("#ff_upazila").val();
		student_serial_no=$("#student_serial_no").val();
		booth_no=$("#booth_no").val();
		union_name=$("#union_name").val();
		ward_no=$("#ward_no").val();
		pourashave=$("#pourashave").val();
		wardno_pourashave=$("#wardno_pourashave").val();
		upazila=$("#upazila").val();
		zila=$("#zila").val();
		division=$("#division").val();
		lengthSerialNo=student_serial_no.length;
		lengthBooth_no=booth_no.length;
		
		if (ff_upazila==""){
			$(".errorChk").text("Required Upazila");
		}else if (student_serial_no=="" ){
			$(".errorChk").text("Required Student Serial No");
		}else if (lengthSerialNo>12 ){
			$(".errorChk").text("Maximum 12 Digit");
		}else if (booth_no=="" ){
			$(".errorChk").text("Required Data [1]");
		}else if (lengthBooth_no>6 ){
			$(".errorChk").text("Maximum 6 Digit [6]");
		}else if (union_name=="" ){
			$(".errorChk").text("Required Data [2]");	
		}else if (ward_no=="" ){
			$(".errorChk").text("Required Data [3]");
		}else if (pourashave=="" ){
			$(".errorChk").text("Required Data [4]");	
		}else if (wardno_pourashave=="" ){
			$(".errorChk").text("Required Data [5]");	
		}else if (upazila=="" ){
			$(".errorChk").text("Required Data [6]");	
		}else if (zila=="" ){
			$(".errorChk").text("Required Data [7]");	
		}else if (division=="" ){
			$(".errorChk").text("Required Data [8]");	
		}else{
				
				student_serial_no=student_serial_no
				booth_no=booth_no
				union_name=union_name
				ward_no=ward_no
				pourashave=pourashave
				wardno_pourashave=wardno_pourashave
				upazila=upazila
				zila=zila
				division=division
				
				banbeisData="&ff_upazila="+ff_upazila+"&student_serial_no="+student_serial_no+"&booth_no="+booth_no+"&union_name="+union_name+"&ward_no="+ward_no+"&pourashave="+pourashave+"&wardno_pourashave="+wardno_pourashave+"&upazila="+upazila+"&zila="+zila+"&division="+division
				
							/*banbeisData=student_serial_no+'fdfd'+booth_no+'fdfd'+union_name+'fdfd'+ward_no+'fdfd'+pourashave+'fdfd'+wardno_pourashave+'fdfd'+upazila+'fdfd'+zila+'fdfd'+division*/
				
				//alert(wardno_pourashave);
						
				$(".errorChk").text("");
				
				url="#page2"
				//url="#inPhoto"
				$.mobile.navigate(url);				
				
			}
	
	};	

//---------------------------Banbeis data page 2  
function banbeisData2Next(){
		name_of_applicant=$("#name_of_applicant").val();
		dob=$("#dob").val();
		fathers_name=$("#fathers_name").val();
		fathers_nid=$("#fathers_nid").val();
		mothers_name=$("#mothers_name").val();
		mothers_nid=$("#mothers_nid").val();
		gender=$("#gender").val();
		present_school=$("#present_school").val();
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
		
		var tempVdate=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
		//alert(tempVdate)
		if (name_of_applicant=="" ){
			$(".errorChk").text("Required Data [1]");
		}else if (dob=="" ){
			$(".errorChk").text("Required Data [2]");
		/*}else if(!dob.match(tempVdate)){
			$(".errorChk").text("Invalid Data [2]");*/
		}else if (fathers_name=="" ){
			$(".errorChk").text("Required Data [3]");	
		}else if (fathers_nid=="" ){
			$(".errorChk").text("Required Data [4]");
		}else if (mothers_name=="" ){
			$(".errorChk").text("Required Data [5]");
		}else if (mothers_nid=="" ){
			$(".errorChk").text("Required Data [6]");
		}else if (gender=="" ){
			$(".errorChk").text("Required Data [7]");		
		}else if (present_school=="" ){
			$(".errorChk").text("Required Data [8]");
		}else if (class_studied_present=="" ){
			$(".errorChk").text("Required Data [9]");
		}else if (class_studied_present<=4 || class_studied_present>9 ){
			$(".errorChk").text("Required Data [10] (ক) class 5-9");
		}else if (dropped_school_name_enrolled=="" ){
			$(".errorChk").text("Required Data [10] (ক) ");
		}else if (dropped_class_studied_past=="" ){
			$(".errorChk").text("Required Data [10] (খ) ");
		}else if (dropped_class_studied_past<=4 || dropped_class_studied_past>9 ){
			$(".errorChk").text("Required Data [10] (খ) class 5-9");
		}else if (guardian_absence_of_parents=="" ){
			$(".errorChk").text("Required Data [11");
		}else if (relation_student_with_guardian=="" ){
			$(".errorChk").text("Required Data [12] ");
		}else if (parents_village=="" ){
			$(".errorChk").text("Required Data [13] (ক)");
		}else if (parents_post=="" ){
			$(".errorChk").text("Required Data [13] (ক)");	
		}else if (parents_union=="" ){
			$(".errorChk").text("Required Data [13] (ক)");
		}else if (parents_upazila=="" ){
			$(".errorChk").text("Required Data [13] (ক)");		
		}else{
			
			name_of_applicant=name_of_applicant
			dob=dob
			fathers_name=fathers_name
			fathers_nid=fathers_nid
			mothers_name=mothers_name
			mothers_nid=mothers_nid
			gender=gender			
			present_school=present_school
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
			//alert(relation_student_with_guardian);
			banbeisDataPage2="&name_of_applicant="+name_of_applicant+"&dob="+dob+"&fathers_name="+fathers_name+"&fathers_nid="+fathers_nid+"&mothers_name="+mothers_name+"&mothers_nid="+mothers_nid+"&gender="+gender+"&present_school="+present_school+"&class_studied_present="+class_studied_present+"&dropped_school_name_enrolled="+dropped_school_name_enrolled+"&dropped_class_studied_past="+dropped_class_studied_past+"&guardian_absence_of_parents="+guardian_absence_of_parents+"&relation_student_with_guardian="+relation_student_with_guardian+"&parents_village="+parents_village+"&parents_post="+parents_post+"&parents_union="+parents_union+"&parents_upazila="+parents_upazila+"&student_village="+student_village+"&student_post="+student_post+"&student_union="+student_union+"&student_upazila="+student_upazila
			//alert(banbeisDataPage2);
			
			<!--banbeisDataPage2=name_of_applicant+'fdfd'+dob+'fdfd'+fathers_name+'fdfd'+fathers_nid+'fdfd'+mothers_name+'fdfd'+mothers_nid+'fdfd'+present_school+'fdfd'+class_studied_present+'fdfd'+dropped_school_name_enrolled+'fdfd'+dropped_class_studied_past+'fdfd'+guardian_absence_of_parents+'fdfd'+relation_student_with_guardian+'fdfd'+parents_village+'fdfd'+parents_post+'fdfd'+parents_union+'fdfd'+parents_upazila-->
			
			 $(".errorChk").text("");
			 
			 $("#q2_s").val("সঠিক");
			 $("#q3_s").val("সঠিক");
			 $("#q4_s").val("সঠিক");
			 $("#q5_s").val("সঠিক");
			 $("#q6_s").val("সঠিক");
			 
			 url="#page3";
			 //url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
	
	};	


//---------------------------Banbeis data page 3

function banbeisData3Next(){
		
		q1_g=$("#q1_g").val();
		q1_a=$("#q1_a").val();
		q1_s=$("#q1_s").val();
		
		q2_g=$("#q2_g").val();
		q2_a=$("#q2_a").val();
		q2_s=$("#q2_s").val();
		
		q3_g=$("#q3_g").val();
		q3_a=$("#q3_a").val();
		q3_s=$("#q3_s").val();
		
		q4_g=$("#q4_g").val();
		q4_a=$("#q4_a").val();
		q4_s=$("#q4_s").val();
		
		q5_g=$("#q5_g").val();
		q5_a=$("#q5_a").val();
		q5_s=$("#q5_s").val();
		
		q6_g=$("#q6_g").val();
		q6_a=$("#q6_a").val();
		q6_s=$("#q6_s").val();
		
		q7_g=$("#q7_g").val();
		q7_a=$("#q7_a").val();
		q7_s=$("#q7_s").val();
		
		q8_g=$("#q8_g").val();
		q8_a=$("#q8_a").val();
		q8_s=$("#q8_s").val();
			
			
		if (q1_g=="" ){
			$(".errorChk").text("Required Q1 প�?রদত�?ত তথ�?য ");
		}else if (q1_a=="" ){
			$(".errorChk").text("Required Q1 প�?রকৃত তথ�?য ");
		}else if (q1_s=="" ){
			$(".errorChk").text("Required Q1 ভ�?ল / সঠিক ");
		
		}else if (q2_g=="" ){
			$(".errorChk").text("Required Q2 প�?রদত�?ত তথ�?য ");
		}else if (q2_a=="" ){
			$(".errorChk").text("Required Q2 প�?রকৃত তথ�?য ");	
		}else if (q2_s=="" ){
			$(".errorChk").text("Required Q2 ভ�?ল / সঠিক ");
		
		}else if (q3_g=="" ){
			$(".errorChk").text("Required Q3 প�?রদত�?ত তথ�?য ");
		}else if (q3_a=="" ){
			$(".errorChk").text("Required Q3 প�?রকৃত তথ�?য ");		
		}else if (q3_s=="" ){
			$(".errorChk").text("Required Q3 ভ�?ল / সঠিক ");
		
		}else if (q4_g=="" ){
			$(".errorChk").text("Required Q4 প�?রদত�?ত তথ�?য ");
		}else if (q4_a=="" ){
			$(".errorChk").text("Required Q4 প�?রকৃত তথ�?য ");		
		}else if (q4_s=="" ){
			$(".errorChk").text("Required Q4 ভ�?ল / সঠিক ");	
		
		}else if (q5_g=="" ){
			$(".errorChk").text("Required Q5 প�?রদত�?ত তথ�?য ");
		}else if (q5_a=="" ){
			$(".errorChk").text("Required Q5 প�?রকৃত তথ�?য ");	
		}else if (q5_s=="" ){
			$(".errorChk").text("Required Q5 ভ�?ল / সঠিক ");
		
		}else if (q6_g=="" ){
			$(".errorChk").text("Required Q6 প�?রদত�?ত তথ�?য ");
		}else if (q6_a=="" ){
			$(".errorChk").text("Required Q6 প�?রকৃত তথ�?য ");		
		}else if (q6_s=="" ){
			$(".errorChk").text("Required Q6 ভ�?ল / সঠিক ");
		
		}else if (q7_g=="" ){
			$(".errorChk").text("Required Q7 প�?রদত�?ত তথ�?য ");
		}else if (q7_a=="" ){
			$(".errorChk").text("Required Q7 প�?রকৃত তথ�?য ");		
		}else if (q7_s=="" ){
			$(".errorChk").text("Required Q7 ভ�?ল / সঠিক ");
		
		}else if (q8_g=="" ){
			$(".errorChk").text("Required Q8 প�?রদত�?ত তথ�?য ");
		}else if (q8_a=="" ){
			$(".errorChk").text("Required Q8 প�?রকৃত তথ�?য ");		
		}else if (q8_s=="" ){
			$(".errorChk").text("Required Q8 ভ�?ল / সঠিক ");
		
		}else{
			
			q1_g=q1_g
			q1_a=q1_a
			var q1_s_value=''
			if(q1_s=='ভ�?ল'){
				q1_s_value='0'	
			}else if(q1_s=='সঠিক'){
				q1_s_value='1'				
			}
			q1_s_value=q1_s_value
			
			//--------
			q2_g=q2_g
			q2_a=q2_a
			var q2_s_value=''
			if(q2_s=='ভ�?ল'){
				q2_s_value='0'	
			}else if(q2_s=='সঠিক'){
				q2_s_value='1'				
			}
			q2_s_value=q2_s_value
			
			//--------
			q3_g=q3_g
			q3_a=q3_a
			var q3_s_value=''
			if(q3_s=='ভ�?ল'){
				q3_s_value='0'	
			}else if(q3_s=='সঠিক'){
				q3_s_value='1'				
			}
			q3_s_value=q3_s_value
			
			//--------
			q4_g=q4_g
			q4_a=q4_a
			var q4_s_value=''
			if(q4_s=='ভ�?ল'){
				q4_s_value='0'	
			}else if(q4_s=='সঠিক'){
				q4_s_value='1'				
			}
			q4_s_value=q4_s_value
			
			//---------
			q5_g=q5_g
			q5_a=q5_a
			var q5_s_value=''
			if(q5_s=='ভ�?ল'){
				q5_s_value='0'	
			}else if(q5_s=='সঠিক'){
				q5_s_value='1'				
			}
			q5_s_value=q5_s_value
			
			//--------
			q6_g=q6_g
			q6_a=q6_a
			var q6_s_value=''
			if(q6_s=='ভ�?ল'){
				q6_s_value='0'	
			}else if(q6_s=='সঠিক'){
				q6_s_value='1'				
			}
			q6_s_value=q6_s_value
			
			//---------
			q7_g=q7_g
			q7_a=q7_a
			var q7_s_value=''
			if(q7_s=='ভ�?ল'){
				q7_s_value='0'	
			}else if(q7_s=='সঠিক'){
				q7_s_value='1'				
			}
			q7_s_value=q7_s_value
			
			//--------
			q8_g=q8_g
			q8_a=q8_a
			var q8_s_value=''
			if(q8_s=='ভ�?ল'){
				q8_s_value='0'	
			}else if(q8_s=='সঠিক'){
				q8_s_value='1'				
			}
			q8_s_value=q8_s_value
			
			banbeisDataPage3="&q1_g="+q1_g+"&q1_a="+q1_a+"&q1_s_value="+q1_s_value+"&q2_g="+q2_g+"&q2_a="+q2_a+"&q2_s_value="+q2_s_value+"&q3_g="+q3_g+"&q3_a="+q3_a+"&q3_s_value="+q3_s_value+"&q4_g="+q4_g+"&q4_a="+q4_a+"&q4_s_value="+q4_s_value+"&q5_g="+q5_g+"&q5_a="+q5_a+"&q5_s_value="+q5_s_value+"&q6_g="+q6_g+"&q6_a="+q6_a+"&q6_s_value="+q6_s_value+"&q7_g="+q7_g+"&q7_a="+q7_a+"&q7_s_value="+q7_s_value+"&q8_g="+q8_g+"&q8_a="+q8_a+"&q8_s_value="+q8_s_value
			//alert(banbeisDataPage3);
			<!--banbeisDataPage3=q1_g+'fdfd'+q1_a+'fdfd'+q1_s+'fdfd'+q2_g+'fdfd'+q2_a+'fdfd'+q2_s+'fdfd'+q3_g+'fdfd'+q3_a+'fdfd'+q3_s+'fdfd'+q4_g+'fdfd'+q4_a+'fdfd'+q4_s+'fdfd'+q5_g+'fdfd'+q5_a+'fdfd'+q5_s+'fdfd'+q6_g+'fdfd'+q6_a+'fdfd'+q6_s+'fdfd'+q7_g+'fdfd'+q7_a+'fdfd'+q7_s+'fdfd'+q8_g+'fdfd'+q8_a+'fdfd'+q8_s-->
							
			 	
			$(".errorChk").text("");
			
			
			$("#q11_s").val("সঠিক");
			$("#q12_s").val("সঠিক");
			$("#q14_s").val("সঠিক");
			$("#q15_s").val("সঠিক");
			$("#q16_s").val("সঠিক");
			 
			url="#page4";
			//url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	


//---------------------------Banbeis data page 4

function banbeisData4Next(){
		
		q9_g=$("#q9_g").val();
		q9_a=$("#q9_a").val();
		q9_s=$("#q9_s").val();
		
		q10_g=$("#q10_g").val();
		q10_a=$("#q10_a").val();
		q10_s=$("#q10_s").val();
		
		q11_g=$("#q11_g").val();
		q11_a=$("#q11_a").val();
		q11_s=$("#q11_s").val();
		
		q12_g=$("#q12_g").val();
		q12_a=$("#q12_a").val();
		q12_s=$("#q12_s").val();
		
		q13_g=$("#q13_g").val();
		q13_a=$("#q13_a").val();
		q13_s=$("#q13_s").val();
		
		q14_g=$("#q14_g").val();
		q14_a=$("#q14_a").val();
		q14_s=$("#q14_s").val();
		
		q15_g=$("#q15_g").val();
		q15_a=$("#q15_a").val();
		q15_s=$("#q15_s").val();
		
		q16_g=$("#q16_g").val();
		q16_a=$("#q16_a").val();
		q16_s=$("#q16_s").val();
				
		
		if (q9_g=="" ){
			$(".errorChk").text("Required Q9 প�?রদত�?ত তথ�?য ");
		}else if (q9_a=="" ){
			$(".errorChk").text("Required Q9 প�?রকৃত তথ�?য ");
		}else if (q9_s=="" ){
			$(".errorChk").text("Required Q9 ভ�?ল / সঠিক ");
		
		}else if (q10_g=="" ){
			$(".errorChk").text("Required Q10 প�?রদত�?ত তথ�?য ");
		}else if (q10_a=="" ){
			$(".errorChk").text("Required Q10 প�?রকৃত তথ�?য ");	
		}else if (q10_s=="" ){
			$(".errorChk").text("Required Q10 ভ�?ল / সঠিক ");
		
		}else if (q11_g=="" ){
			$(".errorChk").text("Required Q11 প�?রদত�?ত তথ�?য ");
		}else if (q11_a=="" ){
			$(".errorChk").text("Required Q11 প�?রকৃত তথ�?য ");		
		}else if (q11_s=="" ){
			$(".errorChk").text("Required Q11 ভ�?ল / সঠিক ");
		
		}else if (q12_g=="" ){
			$(".errorChk").text("Required Q12 প�?রদত�?ত তথ�?য ");
		}else if (q12_a=="" ){
			$(".errorChk").text("Required Q12 প�?রকৃত তথ�?য ");		
		}else if (q12_s=="" ){
			$(".errorChk").text("Required Q12 ভ�?ল / সঠিক ");	
		
		}else if (q13_g=="" ){
			$(".errorChk").text("Required Q13 প�?রদত�?ত তথ�?য ");
		}else if (q13_a=="" ){
			$(".errorChk").text("Required Q13 প�?রকৃত তথ�?য ");	
		}else if (q13_s=="" ){
			$(".errorChk").text("Required Q13 ভ�?ল / সঠিক ");
		
		}else if (q14_g=="" ){
			$(".errorChk").text("Required Q14 প�?রদত�?ত তথ�?য ");
		}else if (q14_a=="" ){
			$(".errorChk").text("Required Q14 প�?রকৃত তথ�?য ");		
		}else if (q14_s=="" ){
			$(".errorChk").text("Required Q14 ভ�?ল / সঠিক ");
		
		}else if (q15_g=="" ){
			$(".errorChk").text("Required Q15 প�?রদত�?ত তথ�?য ");
		}else if (q15_a=="" ){
			$(".errorChk").text("Required Q15 প�?রকৃত তথ�?য ");		
		}else if (q15_s=="" ){
			$(".errorChk").text("Required Q15 ভ�?ল / সঠিক ");
		
		}else if (q16_g=="" ){
			$(".errorChk").text("Required Q16 প�?রদত�?ত তথ�?য ");
		}else if (q16_a=="" ){
			$(".errorChk").text("Required Q16 প�?রকৃত তথ�?য ");		
		}else if (q16_s=="" ){
			$(".errorChk").text("Required Q16 ভ�?ল / সঠিক ");
		}else{
			
			q9_g=q9_g
			q9_a=q9_a
			var q9_s_value=''
			if(q9_s=='ভ�?ল'){
				q9_s_value='0'	
			}else if(q9_s=='সঠিক'){
				q9_s_value='1'				
			}
			q9_s_value=q9_s_value
			
			//-----------
			q10_g=q10_g
			q10_a=q10_a
			var q10_s_value=''
			if(q10_s=='ভ�?ল'){
				q10_s_value='0'	
			}else if(q10_s=='সঠিক'){
				q10_s_value='1'				
			}
			q10_s_value=q10_s_value
			
			//-----------
			q11_g=q11_g
			q11_a=q11_a
			var q11_s_value=''
			if(q11_s=='ভ�?ল'){
				q11_s_value='0'	
			}else if(q11_s=='সঠিক'){
				q11_s_value='1'				
			}
			q11_s_value=q11_s_value
			
			q12_g=q12_g
			q12_a=q12_a
			var q12_s_value=''
			if(q12_s=='ভ�?ল'){
				q12_s_value='0'	
			}else if(q12_s=='সঠিক'){
				q12_s_value='1'				
			}
			q12_s_value=q12_s_value
			
			q13_g=q13_g
			q13_a=q13_a
			var q13_s_value=''
			if(q13_s=='ভ�?ল'){
				q13_s_value='0'	
			}else if(q13_s=='সঠিক'){
				q13_s_value='1'				
			}
			q13_s_value=q13_s_value
			
			q14_g=q14_g
			q14_a=q14_a
			var q14_s_value=''
			if(q14_s=='ভ�?ল'){
				q14_s_value='0'	
			}else if(q14_s=='সঠিক'){
				q14_s_value='1'				
			}
			q14_s_value=q14_s_value
			
			q15_g=q15_g
			q15_a=q15_a
			var q15_s_value=''
			if(q15_s=='ভ�?ল'){
				q15_s_value='0'	
			}else if(q15_s=='সঠিক'){
				q15_s_value='1'				
			}
			q15_s_value=q15_s_value
			
			q16_g=q16_g
			q16_a=q16_a
			var q16_s_value=''
			if(q16_s=='ভ�?ল'){
				q16_s_value='0'	
			}else if(q16_s=='সঠিক'){
				q16_s_value='1'				
			}
			q16_s_value=q16_s_value
			
			banbeisDataPage4="&q9_g="+q9_g+"&q9_a="+q9_a+"&q9_s_value="+q9_s_value+"&q10_g="+q10_g+"&q10_a="+q10_a+"&q10_s_value="+q10_s_value+"&q11_g="+q11_g+"&q11_a="+q11_a+"&q11_s_value="+q11_s_value+"&q12_g="+q12_g+"&q12_a="+q12_a+"&q12_s_value="+q12_s_value+"&q13_g="+q13_g+"&q13_a="+q13_a+"&q13_s_value="+q13_s_value+"&q14_g="+q14_g+"&q14_a="+q14_a+"&q14_s_value="+q14_s_value+"&q15_g="+q15_g+"&q15_a="+q15_a+"&q15_s_value="+q15_s_value+"&q16_g="+q16_g+"&q16_a="+q16_a+"&q16_s_value="+q16_s_value
			
						<!--banbeisDataPage4=q9_g+'fdfd'+q9_a+'fdfd'+q9_s+'fdfd'+q10_g+'fdfd'+q10_a+'fdfd'+q10_s+'fdfd'+q11_g+'fdfd'+q11_a+'fdfd'+q11_s+'fdfd'+q12_g+'fdfd'+q12_a+'fdfd'+q12_s+'fdfd'+q13_g+'fdfd'+q13_a+'fdfd'+q13_s+'fdfd'+q14_g+'fdfd'+q14_a+'fdfd'+q14_s+'fdfd'+q15_g+'fdfd'+q15_a+'fdfd'+q15_s+'fdfd'+q16_g+'fdfd'+q16_a+'fdfd'+q16_s-->
			
			$(".errorChk").text("");
			
			$("#q17_s").val("সঠিক");
			$("#q18_s").val("সঠিক");
			$("#q19_s").val("সঠিক");
			$("#q20_s").val("সঠিক");
			$("#q21_s").val("সঠিক");
			$("#q22_s").val("সঠিক");
			$("#q23_s").val("সঠিক");
			$("#q24_s").val("সঠিক");
			
							
			 url="#page5";	
			//url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	


//---------------------------Banbeis data page 5

function banbeisData5Next(){
		
		q17_g=$("#q17_g").val();
		q17_a=$("#q17_a").val();
		q17_s=$("#q17_s").val();
		
		q18_g=$("#q18_g").val();
		q18_a=$("#q18_a").val();
		q18_s=$("#q18_s").val();
		
		q19_g=$("#q19_g").val();
		q19_a=$("#q19_a").val();
		q19_s=$("#q19_s").val();
		
		q20_g=$("#q20_g").val();
		q20_a=$("#q20_a").val();
		q20_s=$("#q20_s").val();
		
		q21_g=$("#q21_g").val();
		q21_a=$("#q21_a").val();
		q21_s=$("#q21_s").val();
		
		q22_g=$("#q22_g").val();
		q22_a=$("#q22_a").val();
		q22_s=$("#q22_s").val();
		
		q23_g=$("#q23_g").val();
		q23_a=$("#q23_a").val();
		q23_s=$("#q23_s").val();
		
		q24_g=$("#q24_g").val();
		q24_a=$("#q24_a").val();
		q24_s=$("#q24_s").val();
		
		if (q17_g=="" ){
			$(".errorChk").text("Required Q17 প�?রদত�?ত তথ�?য ");
		}else if (q17_a=="" ){
			$(".errorChk").text("Required Q17 প�?রকৃত তথ�?য ");		
		}else if (q17_s=="" ){
			$(".errorChk").text("Required Q17 ভ�?ল / সঠিক ");
		
		}else if (q18_g=="" ){
			$(".errorChk").text("Required Q18 প�?রদত�?ত তথ�?য ");
		}else if (q18_a=="" ){
			$(".errorChk").text("Required Q18 প�?রকৃত তথ�?য ");		
		}else if (q18_s=="" ){
			$(".errorChk").text("Required Q18 ভ�?ল / সঠিক ");
		
		}else if (q19_g=="" ){
			$(".errorChk").text("Required Q19 প�?রদত�?ত তথ�?য ");
		}else if (q19_a=="" ){
			$(".errorChk").text("Required Q19 প�?রকৃত তথ�?য ");
		}else if (q19_s=="" ){
			$(".errorChk").text("Required Q19 ভ�?ল / সঠিক ");
		
		}else if (q20_g=="" ){
			$(".errorChk").text("Required Q20 প�?রদত�?ত তথ�?য ");
		}else if (q20_a=="" ){
			$(".errorChk").text("Required Q20 প�?রকৃত তথ�?য ");	
		}else if (q20_s=="" ){
			$(".errorChk").text("Required Q20 ভ�?ল / সঠিক ");
		
		}else if (q21_g=="" ){
			$(".errorChk").text("Required Q21 প�?রদত�?ত তথ�?য ");
		}else if (q21_a=="" ){
			$(".errorChk").text("Required Q21 প�?রকৃত তথ�?য ");		
		}else if (q21_s=="" ){
			$(".errorChk").text("Required Q21 ভ�?ল / সঠিক ");
		
		}else if (q22_g=="" ){
			$(".errorChk").text("Required Q22 প�?রদত�?ত তথ�?য ");
		}else if (q22_a=="" ){
			$(".errorChk").text("Required Q22 প�?রকৃত তথ�?য ");		
		}else if (q22_s=="" ){
			$(".errorChk").text("Required Q22 ভ�?ল / সঠিক ");	
		
		}else if (q23_g=="" ){
			$(".errorChk").text("Required Q23 প�?রদত�?ত তথ�?য ");
		}else if (q23_a=="" ){
			$(".errorChk").text("Required Q23 প�?রকৃত তথ�?য ");	
		}else if (q23_s=="" ){
			$(".errorChk").text("Required Q23 ভ�?ল / সঠিক ");
		
		}else if (q24_g=="" ){
			$(".errorChk").text("Required Q24 প�?রদত�?ত তথ�?য ");
		}else if (q24_a=="" ){
			$(".errorChk").text("Required Q24 প�?রকৃত তথ�?য ");		
		}else if (q24_s=="" ){
			$(".errorChk").text("Required Q24 ভ�?ল / সঠিক ");

		}else{
			
			q17_g=q17_g
			q17_a=q17_a
			var q17_s_value=''
			if(q17_s=='ভ�?ল'){
				q17_s_value='0'	
			}else if(q17_s=='সঠিক'){
				q17_s_value='1'				
			}
			q17_s_value=q17_s_value
			
			//------------
			q18_g=q18_g
			q18_a=q18_a
			var q18_s_value=''
			if(q18_s=='ভ�?ল'){
				q18_s_value='0'	
			}else if(q18_s=='সঠিক'){
				q18_s_value='1'				
			}
			q18_s_value=q18_s_value
			
			//------------
			q19_g=q19_g
			q19_a=q19_a
			var q19_s_value=''
			if(q19_s=='ভ�?ল'){
				q19_s_value='0'	
			}else if(q19_s=='সঠিক'){
				q19_s_value='1'				
			}
			q19_s_value=q19_s_value
			
			//------------
			q20_g=q20_g
			q20_a=q20_a
			var q20_s_value=''
			if(q20_s=='ভ�?ল'){
				q20_s_value='0'	
			}else if(q20_s=='সঠিক'){
				q20_s_value='1'				
			}
			q20_s_value=q20_s_value
			
			//------------
			q21_g=q21_g
			q21_a=q21_a
			var q21_s_value=''
			if(q21_s=='ভ�?ল'){
				q21_s_value='0'	
			}else if(q21_s=='সঠিক'){
				q21_s_value='1'				
			}
			q21_s_value=q21_s_value
			
			//--------------
			q22_g=q22_g
			q22_a=q22_a
			var q22_s_value=''
			if(q22_s=='ভ�?ল'){
				q22_s_value='0'	
			}else if(q22_s=='সঠিক'){
				q22_s_value='1'				
			}
			q22_s_value=q22_s_value
			
			//------------
			q23_g=q23_g
			q23_a=q23_a
			var q23_s_value=''
			if(q23_s=='ভ�?ল'){
				q23_s_value='0'	
			}else if(q23_s=='সঠিক'){
				q23_s_value='1'				
			}
			q23_s_value=q23_s_value
			
			//---------------
			q24_g=q24_g
			q24_a=q24_a
			var q24_s_value=''
			if(q24_s=='ভ�?ল'){
				q24_s_value='0'	
			}else if(q24_s=='সঠিক'){
				q24_s_value='1'				
			}
			q24_s_value=q24_s_value
			
			banbeisDataPage5="&q17_g="+q17_g+"&q17_a="+q17_a+"&q17_s_value="+q17_s_value+"&q18_g="+q18_g+"&q18_a="+q18_a+"&q18_s_value="+q18_s_value+"&q19_g="+q19_g+"&q19_a="+q19_a+"&q19_s_value="+q19_s_value+"&q20_g="+q20_g+"&q20_a="+q20_a+"&q20_s_value="+q20_s_value+"&q21_g="+q21_g+"&q21_a="+q21_a+"&q21_s_value="+q21_s_value+"&q22_g="+q22_g+"&q22_a="+q22_a+"&q22_s_value="+q22_s_value+"&q23_g="+q23_g+"&q23_a="+q23_a+"&q23_s_value="+q23_s_value+"&q24_g="+q24_g+"&q24_a="+q24_a+"&q24_s_value="+q24_s_value
			
			<!--banbeisDataPage5=q17_g+'fdfd'+q17_a+'fdfd'+q17_s+'fdfd'+q18_g+'fdfd'+q18_a+'fdfd'+q18_s+'fdfd'+q19_g+'fdfd'+q19_a+'fdfd'+q19_s+'fdfd'+q20_g+'fdfd'+q20_a+'fdfd'+q20_s+'fdfd'+q21_g+'fdfd'+q21_a+'fdfd'+q21_s+'fdfd'+q22_g+'fdfd'+q22_a+'fdfd'+q22_s+'fdfd'+q23_g+'fdfd'+q23_a+'fdfd'+q23_s+'fdfd'+q24_g+'fdfd'+q24_a+'fdfd'+q24_s-->
			
			$(".errorChk").text("");
			
			$("#q25_s").val("সঠিক");
			$("#q26_s").val("সঠিক");
			$("#q27_s").val("সঠিক");
			
			
							
			 url="#page6";	
			 //url="#inPhoto"
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};


//---------------------------Banbeis data page 6

function banbeisData6Next(){
		
		q25_g=$("#q25_g").val();
		q25_a=$("#q25_a").val();
		q25_s=$("#q25_s").val();
		
		q26_g=$("#q26_g").val();
		q26_a=$("#q26_a").val();
		q26_s=$("#q26_s").val();
		
		q27_g=$("#q27_g").val();
		q27_a=$("#q27_a").val();
		q27_s=$("#q27_s").val();
		
		if (q25_g=="" ){
			$(".errorChk").text("Required Q25 প�?রদত�?ত তথ�?য ");
		}else if (q25_a=="" ){
			$(".errorChk").text("Required Q25 প�?রকৃত তথ�?য ");		
		}else if (q25_s=="" ){
			$(".errorChk").text("Required Q25 ভ�?ল / সঠিক ");	
		
		}else if (q26_g=="" ){
			$(".errorChk").text("Required Q26 প�?রদত�?ত তথ�?য ");
		}else if (q26_a=="" ){
			$(".errorChk").text("Required Q26 প�?রকৃত তথ�?য ");	
		}else if (q26_s=="" ){
			$(".errorChk").text("Required Q26 ভ�?ল / সঠিক ");
		
		}else if (q27_g=="" ){
			$(".errorChk").text("Required Q27 প�?রদত�?ত তথ�?য ");
		}else if (q27_a=="" ){
			$(".errorChk").text("Required Q27 প�?রকৃত তথ�?য ");		
		}else if (q27_s=="" ){
			$(".errorChk").text("Required Q27 ভ�?ল / সঠিক ");

		}else{
			
			q25_g=q25_g
			q25_a=q25_a
			var q25_s_value=''
			if(q25_s=='ভ�?ল'){
				q25_s_value='0'	
			}else if(q25_s=='সঠিক'){
				q25_s_value='1'				
			}
			q25_s_value=q25_s_value
			
			//--------------
			q26_g=q26_g
			q26_a=q26_a
			var q26_s_value=''
			if(q26_s=='ভ�?ল'){
				q26_s_value='0'	
			}else if(q26_s=='সঠিক'){
				q26_s_value='1'				
			}
			q26_s_value=q26_s_value
			
			//-------------
			q27_g=q27_g
			q27_a=q27_a
			var q27_s_value=''
			if(q27_s=='ভ�?ল'){
				q27_s_value='0'	
			}else if(q27_s=='সঠিক'){
				q27_s_value='1'				
			}
			q27_s_value=q27_s_value
			
			/*var q27_s_value_show=''
			if(q27_s_value==1){
				q27_s_value_show='হ�?যা�?';
			}else if(q27_s_value==0){
				q27_s_value_show='না';	
			}*/
			
			banbeisDataPage6="&q25_g="+q25_g+"&q25_a="+q25_a+"&q25_s_value="+q25_s_value+"&q26_g="+q26_g+"&q26_a="+q26_a+"&q26_s_value="+q26_s_value+"&q27_g="+q27_g+"&q27_a="+q27_a+"&q27_s_value="+q27_s_value
			
			<!--banbeisDataPage6=q25_g+'fdfd'+q25_a+'fdfd'+q25_s+'fdfd'+q26_g+'fdfd'+q26_a+'fdfd'+q26_s+'fdfd'+q27_g+'fdfd'+q273_a+'fdfd'+q27_s-->
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
//				imagePathA="test"
				if (imagePathA!=""){							
					$(".errorChk").text("Syncing photo..");
					imageName = localStorage.mobile_no+"_"+get_time+".jpg";
					uploadPhotoAch(imagePathA, imageName);
					
				}
					
				
			}//end check location
		}//chk photo
		
	}


function getAchivementImage() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 10,
	destinationType: Camera.DestinationType.FILE_URI });		
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
	
//	winAchInfo();
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
							
							/*$("#student_serial_no").val("");
							$("#booth_no").val("");
							$("#union_name").val("");
							$("#ward_no").val("");
							$("#pourashave").val("");
							$("#wardno_pourashave").val("");
							$("#upazila").val("");
							$("#zila").val("");
							$("#division").val("");
							
							$("#name_of_applicant").val("");
							$("#dob").val("");
							$("#fathers_name").val("");
							$("#fathers_nid").val("");
							$("#mothers_name").val("");
							$("#mothers_nid").val("");
							$("#gender").val("");
							$("#present_school").val("");
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
							
							
							$("#q1_g").val("");
							$("#q1_a").val("");
							$("#q1_s").val("");
							
							$("#q2_g").val("");
							$("#q2_a").val("");
							$("#q2_s").val("");
							
							$("#q3_g").val("");
							$("#q3_a").val("");
							$("#q3_s").val("");
							
							$("#q4_g").val("");
							$("#q4_a").val("");
							$("#q4_s").val("");
							
							$("#q5_g").val("");
							$("#q5_a").val("");
							$("#q5_s").val("");
							
							$("#q6_g").val("");
							$("#q6_a").val("");
							$("#q6_s").val("");
							
							$("#q7_g").val("");
							$("#q7_a").val("");
							$("#q7_s").val("");
							
							$("#q8_g").val("");
							$("#q8_a").val("");
							$("#q8_s").val("");
							
							$("#q9_g").val("");
							$("#q9_a").val("");
							$("#q9_s").val("");
							
							$("#q10_g").val("");
							$("#q10_a").val("");
							$("#q10_s").val("");
							
							$("#q11_g").val("");
							$("#q11_a").val("");
							$("#q11_s").val("");
							
							$("#q12_g").val("");
							$("#q12_a").val("");
							$("#q12_s").val("");
							
							$("#q13_g").val("");
							$("#q13_a").val("");
							$("#q13_s").val("");
							
							$("#q14_g").val("");
							$("#q14_a").val("");
							$("#q14_s").val("");
							
							$("#q15_g").val("");
							$("#q15_a").val("");
							$("#q15_s").val("");
							
							$("#q16_g").val("");
							$("#q16_a").val("");
							$("#q16_s").val("");
							
							
							$("#q17_g").val("");
							$("#q17_a").val("");
							$("#q17_s").val("");
							
							$("#q18_g").val("");
							$("#q18_a").val("");
							$("#q18_s").val("");
							
							$("#q19_g").val("");
							$("#q19_a").val("");
							$("#q19_s").val("");
							
							$("#q20_g").val("");
							$("#q20_a").val("");
							$("#q20_s").val("");
							
							$("#q21_g").val("");
							$("#q21_a").val("");
							$("#q21_s").val("");
							
							$("#q22_g").val("");
							$("#q22_a").val("");
							$("#q22_s").val("");
							
							$("#q23_g").val("");
							$("#q23_a").val("");
							$("#q23_s").val("");
							
							$("#q24_g").val("");
							$("#q24_a").val("");
							$("#q24_s").val("");
							
							$("#q25_g").val("");
							$("#q25_a").val("");
							$("#q25_s").val("");
							
							$("#q26_g").val("");
							$("#q26_a").val("");
							$("#q26_s").val("");
							
							$("#q27_g").val("");
							$("#q27_a").val("");
							$("#q27_s").val("");*/
										
							$("#ach_lat").val("");
							$("#ach_long").val("");
							$("#achPhoto").val("");
														
						
							$("#sucChk").text('Successfully Submitted');
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
	
	
/*function banbeisDataSubmit(){
	
	abc=banbeisDataPage6+'fdfd'+banbeisDataPage5+'fdfd'+banbeisDataPage4+'fdfd'+banbeisDataPage3+'fdfd'+banbeisDataPage2+'fdfd'+banbeisData
	alert(abc);
	
	}*/


function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}




