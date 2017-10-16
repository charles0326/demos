autosize(document.querySelectorAll('textarea'));

$('.date-picker').datepicker({
    format: 'yyyy/mm/dd',
    language: 'zh-CN',
    autoclose: true,
    todayHighlight: true
})
$(function(){
	var date=new Date();
	var today=date.getFullYear()+"/"+((date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1))+"/"+date.getDate();
	$("#fillform").val(today);
	$("#fillbirthday").val(today);
})

new PCAS("user.province1","user.city1","user.area1","-省/自治區/直轄市-","-市-","-區/縣-");
new PCAS("user.province2","user.city2","user.area2","-省/自治區/直轄市-","-市-","-區/縣-");

function certificateChange(obj){
	var selectId=$(obj).find('option:selected')[0].index;
	
	switch(selectId){
		case 0:
			show("none");
			break;
		case 1:
			show("");
			$("#cnum_title").html("2.身份證號碼");
			$("#cnum_describe").html("請填寫您的身份證號碼，與證件信息一致");
			$("#upload_c_title").html("3.上傳身份證掃描件或拍攝件");
			$("#upload_c_describe").html('請分別上傳身份證正面、背面的彩色掃描件或者彩色照片，四角須完整；并將文件分別命名為“您的姓名-身份證正面”、“您的姓名-身份<br>證背面”，例如“張妙音-身份證正面”、“張妙音-身份證背面”');
			break;
		case 2:
			show("");
			$("#cnum_title").html("2.護照號碼");
			$("#cnum_describe").html("請填寫您的護照號碼，與證件信息一致");
			$("#upload_c_title").html("3.上傳護照掃描件或拍攝件");
			$("#upload_c_describe").html('請上傳護照有效頁面的彩色掃描件或者彩色照片，四角須完整；并將文件命名為“您的姓名-護照”、例如“張妙音-護照”');
			break;
		case 3:
			show("");
			$("#cnum_title").html("2.港澳通行證號碼");
			$("#cnum_describe").html("請填寫您的港澳通行證號碼，與證件信息一致");
			$("#upload_c_title").html("3.上傳港澳通行證掃描件或拍攝件");
			$("#upload_c_describe").html('請分別上傳港澳通行證正面、背面的彩色掃描件或者彩色照片，四角須完整；并將文件分別命名為“您的姓名-港澳通行證正面”、“您的姓名+港澳通行證背面”，例如“張妙音-港澳通行證正面”、“張妙音-港澳通行證背面”');
			break;
		case 4:
			show("");
			$("#cnum_title").html("2.其他有效證件號碼");
			$("#cnum_describe").html("請填寫您的有效證件號碼，與證件信息一致");
			$("#upload_c_title").html("3.上傳其他有效證件的掃描件或拍攝件");
			$("#upload_c_describe").html('請上傳有效證件中有效頁面的彩色掃描件或者彩色照片，四角須完整；并將文件命名為“您的姓名-有效證件名”、例如“張妙音-駕駛證”');
			break;
	}
	
	function show(status){
		$("#c_num").css("display",status);
		$("#upload_c").css("display",status);
	}
}

for(var i=1;i<7;i++){
	$('#default_table tr:nth-child('+i+')').on('mouseover', function(){
		$(this).find('td:eq(0)').css("background-color","#E6F5FF");
		for(var j=1;j<7;j++){
			$(this).find('td:eq('+j+')').css("background-color","#F6FCFF");
		}
	})
	$("#default_table tr:nth-child("+i+")").on('mouseout', function(){
		$(this).find('td:eq(0)').css("background-color","#fff");
		for(var l=1;l<7;l++){
			$(this).find('td:eq('+l+')').css("background-color","#fff");
		}
	})
}



var dele_num=0;
var certificates_count=0;
function change(obj){
	console.log("change:" + obj.name);
	/*解决上传相同文件onchange事件只触发一次的问题*/
	var nf = obj.cloneNode(true);
	nf.value=''; // 设计新控件value为空
	obj.parentNode.replaceChild(nf, obj);
	/**********************************************/				
	
	var reader=new FileReader();
	var file = obj.files[0];
	var imageType = /image.*/;
	var img=$('<img/>');
	var imgW=29;
	if (!/image\/\w+/.test(file.type)){
		alert("请上传图片");
		return false;
	}
	if(file.size > 20971520){
		alert("图片体积请在20.0MB以內");
		return false;  
	}
	function initImg(){
		img.attr('width', imgW+'px');
		img.attr('height', imgW+'px');
		img.attr('src', 'assets/img/jpg-icon.png');
	}
	if (file){
		var fileSize = (Math.round(((file.size * 100 / 1024) / 100))).toString() + ' KB';
		//console.log(file.name, fileSize, file.type);
		
		if(obj.name=="upload-file"||obj.name=="rechoose-file3"){
			initImg();
			$('#cropit-preview3').empty();
			$('#progressbar3').css('display','');			
			$('#attachment-select2').css('display','none');
			$('#attachment-preview').css('display','table');
			$('#cropit-preview3').append(img);
			$('#file-name3').text(file.name);
			$('#file-size3').html(fileSize);
		}
		else if(obj.name=="certificates-upload"){
			initImg();
			certificates_count++;
			console.log("certificates_count:" + certificates_count + "--" + dele_num);
			if(dele_num > 0){
				setPreviewStatus(dele_num, file.name, fileSize, img);
			}
			else{
				setPreviewStatus(certificates_count, file.name, fileSize, img);
			}
			
			if(certificates_count==2){
				$('#attachment-select1').css('display','none');
			}
		}
		else if(obj.name=="rechoose-file1"||obj.name=="rechoose-file2"){
			var rechooseNum=obj.name.substr(-1);
			$('#file-name'+rechooseNum).html(file.name);
			$('#file-size'+rechooseNum).html(fileSize);
		}
	}
	
	reader.onload=function(e){
		console.log("onload:"+obj.name);
		img.attr('src', e.target.result);
		img.attr('width', imgW+'px');
		img.attr('height', imgW+'px');
		if(obj.name=="upload-file"||obj.name=="rechoose-file3"){			
			$('#cropit-preview3').append(img);
		}
		else if(obj.name=="certificates-upload"){		
			if(dele_num > 0){
				$('#cropit-preview'+dele_num).append(img);
			}
			else{
				$('#cropit-preview'+certificates_count).append(img);
			}			
		}
		else if(obj.name=="rechoose-file1"||obj.name=="rechoose-file2"){
			var rechooseNum=obj.name.substr(-1);
			$('#cropit-preview'+rechooseNum).empty();
			$('#cropit-preview'+rechooseNum).append(img);
		}
	}
	reader.onprogress=function(e){					
		var percent=Math.round((e.loaded / file.size) * 100);
		if(obj.name=="upload-file"||obj.name=="rechoose-file3"){
			showProgress(3,percent);
		}
		else if(obj.name=="certificates-upload"){
			if(dele_num > 0){
				showProgress(dele_num,percent);				
			}
			else{
				showProgress(certificates_count,percent);
			}	
		}
		else if(obj.name=="rechoose-file1"||obj.name=="rechoose-file2"){
			var rechooseNum=obj.name.substr(-1);
			showProgress(rechooseNum,percent);
		}
	}
	
	reader.onabort=function(e){
		console.log("onabort");
	}
	reader.onerror=function(e){
		console.log("onerror");
	}
	reader.readAsDataURL(file);
		
	function setPreviewStatus(IDNum,fileName,fileSize,img){
		$('#certificates-preview'+IDNum).css('display','table');
		$('#cropit-preview'+IDNum).empty();			
		$('#file-name'+IDNum).text(fileName);
		$('#file-size'+IDNum).html(fileSize);
		$('#cropit-preview'+IDNum).append(img);
	}
	
	function showProgress(num,percent){
		$('#progressbar'+num).progressbar({
			value:percent,
			change:function(){
				//console.log("change:" + $('#progressbar'+num).progressbar("value"));
			},
			complete:function(){
				console.log("完成！");
				$('#progressbar'+num).css('display','none');
			}
		});
	}
}
$('#delete-link3').click(function(e){	
	$('#attachment-select2').css('display','block');
	$('#attachment-preview').css('display','none');	
})

for(var i=1; i <= 2; i++){
	$('#delete-link'+i).click(function(e){
		var id=e.target.id;
		dele_num=id.substr(-1);
		$('#certificates-preview'+dele_num).css('display','none');
		if(certificates_count==2)
			$('#attachment-select1').css('display','block');
		certificates_count--;
		if(certificates_count == 0)	dele_num = 0;
	})
}

var error_infos={singnum:"請填寫報名序號",fillform:"請填寫填表日期",inputname:"請填寫1.姓名",fillbirthday:"請填寫3.出生日期",inputage:"請填寫4.年齡",upload_file:"請填寫5.上傳近期免冠半身照",
				 introducer:"請填寫6.介紹人",province1:"請填寫7.籍貫",province2:"請填寫8.戶籍地",nation:"請填寫9.民族",
				 religion:"請填寫10.宗教信仰",hobby:"請填寫12.愛好特長",certificates1:"請填寫1.有效證件類型",certificates_num:"請填寫2.身份證號碼",
				 certificates_upload:"請填寫3.上傳護照掃描件或拍攝件",school_info:"請填寫3. 學校求學、社會工作經歷說明",father:"請填寫父親家族從事行業詳細說明",mother:"請填寫母親家族從事行業詳細說明"};
function blurHandler(obj){
	var id=obj.id;
	if(obj.type=="select-one"){
		if(obj.selectedIndex==0){
			setErrorTip(id, "<span class='glyphicon glyphicon-remove-sign'></span>"+error_infos[id]);
		}
		else{
			setErrorTip(id, "");
		}
	}
	else{
		if(obj.value==""){
			setErrorTip(id, "<span class='glyphicon glyphicon-remove-sign'></span>"+error_infos[id]);
			if(obj.type=="text"||obj.type=="number"){
				$(obj).css("border-color","red");
			}
		}
		else{
			setErrorTip(id, "");
			$(obj).css("border-color","#ccc");
		}
	}
}
function setErrorTip(id,content){
	$("#error_" + id).html(content);
}
$("#submit_btn").click(function(){
	for(var i in error_infos){
		if($("#"+i).val()==""){
			$("#error_" + i).html("<span class='glyphicon glyphicon-remove-sign'></span>"+error_infos[i]);
		}
	}
	alert($("form").serialize());	
})
