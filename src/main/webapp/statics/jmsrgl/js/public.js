var gp_width = window.screen.width;
var gp_height = window.screen.height;	
var gp_timeid = 0;
var gp_exportKey = "";
// 是否IE5.5以上版本
function IsIE55Up(){
	 var agt = navigator.userAgent.toLowerCase();
	 var isIE = (agt.indexOf("msie")!=-1);
	 if(isIE){
		  var stIEVer = agt.substring(agt.indexOf("msie ") + 5);
		  var verIEFull = parseFloat(stIEVer);
		  return verIEFull >= 5.5;
	 }
	 return false;
}

function fmtvalue(data,pre){
	if((data==null) || (data==undefined)){
		return data;
	}else{
		var prevalue = "";
		for (var i=0;i<pre;i++){
			prevalue = prevalue + "0";
		}
		var vf = ''+data+'';
		var dp = vf.indexOf('.');
		if(dp>0){
			vf = vf + prevalue;
		}else{
			vf = vf+'.' + prevalue;
		}
		return parseFloat(vf).toFixed(pre);
	}
}

//将数字转换为字符串 补 0
function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
}

//右键屏蔽       
//document.oncontextmenu=new Function("event.returnValue=false;");

/**
 * 删除两边的空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,"");
};

/**
 * 删除左边的空格
 */
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,"");
};

/**
 * 删除右边的空格
 */
String.prototype.rtrim=function()
{
    return this.replace(/(\s*$)/g,"");
};


// 日期格式转换
/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// 输入控制：
// 1、只能输入
// (1)只能输入数字onkeyup="value=value.replace(/[^\d]/g,'') "
// (2)只能输入数字和字母onkeyup="value=value.replace(/[\W]/g,'') "
// (3)只能输入汉字onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
// (4)只能输入汉字和字母onkeyup="value=value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,'')"
// 2、禁止输入
// (1)禁止输入汉字<INPUT TYPE="text"
// onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')">
// (2)禁止输入数字<INPUT TYPE="text" onkeyup="value=value.replace(/[\d]/g,'')">
// (3)禁止输入字母<INPUT TYPE="text" onkeyup="value=value.replace(/[a-z,A-Z]/g,'')">
// (4)禁止输入空格onkeyup="value=value.replace(/[/\s/g,]/g,'')"
// (5)禁止输入特殊字符<INPUT TYPE="text" onkeyup="value=value.replace(/[/\.-]/g,'')">
// 3、禁止粘贴onpaste="return false"

// 打印预览
function btn_view() {
	try {
		var printWindow = window
				.open(
						"",
						null,
						"width=800,height=600,status=no,help=no,scroll=no,top=0,left=0,scrollbars=yes,resizable=yes");
		var str = "<OBJECT   id=WebBrowser   classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2   height=0   width=0></OBJECT>"
		var s = "<html>\r\n";
		s += "<head>";
		s += "<LINK   href='css/css.css'   type='text/css'   rel='stylesheet'>";
		s += "<link href='../public/css/mytab.css' type='text/css' rel='STYLESHEET'>";
		s += "<style media='print' type='text/css'> .Noprint{display:none;}</style>";
		s += "<style type='text/css'>body,table {font-size:9pt;}</style>";
		s += "<meta   http-equiv='Content-Type'   content='text/html;   charset=gb2312'>";
		s += "</head>";
		s += "<body><center><br>";
		s += "<div style='font-size:12pt;' class='Noprint'>";
		s += "[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(7,1)'>预览</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(8,1)'>打印设置</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(6,1)'>打印</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(45,1)'>关闭</a>]";
		s += "</div>";
		s += '<DIV class=pageTitleCenter id=titleDiv></div> '
		s += "<br>"
		s += "<br>"
		s += "<div align='center' id='printpage'>";
		s += "<div   align=center   style='width:100%'>";
		s += document.all.item('printpage').innerHTML;
		s += "</div>";
		s += "</div>";
		s += "</center></body>";
		s += "</html>";
		printWindow.document.write(s);
		printWindow.document.close();
		printWindow.document.body.insertAdjacentHTML("beforeEnd", str);
	} catch (e) {

	}
}

// 打印预览
function btn_view1() {
	try {
		var printWindow = window.open("", "_blank");
		var str = "<OBJECT   id=WebBrowser   classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2   height=0   width=0></OBJECT>"
		var s = "<html>\r\n";
		s += "<head>";
		s += "<LINK   href='css/css.css'   type='text/css'   rel='stylesheet'>";
		s += "<link href='../public/css/mytab.css' type='text/css' rel='STYLESHEET'>";
		s += "<style media='print' type='text/css'> .Noprint{display:none;}</style>";
		s += "<style type='text/css'>body,table {font-size:9pt;}</style>";
		s += "<meta   http-equiv='Content-Type'   content='text/html;   charset=gb2312'>";
		s += "</head>";
		s += "<body><center><br>";
		s += "<div style='font-size:12pt;' class='Noprint'>";
		s += "[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(7,1)'>预览</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(8,1)'>打印设置</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(6,1)'>打印</a>]";
		s += "&nbsp;&nbsp;&nbsp;&nbsp;[<a href='javascript:void(0)' onclick='document.all.WebBrowser.ExecWB(45,1)'>关闭</a>]";
		s += "</div>";
		s += '<DIV class=pageTitleCenter id=titleDiv></div> '
		s += "<br>"
		s += "<br>"
		s += "<div align='center' id='printpage'>";
		s += "<div   align=center   style='width:100%'>";
		s += document.all.item('printpage').innerHTML;
		s += "</div>";
		s += "</div>";
		s += "</center></body>";
		s += "</html>";
		printWindow.document.write(s);
		printWindow.document.close();
		printWindow.document.body.insertAdjacentHTML("beforeEnd", str);
	} catch (e) {

	}
}

function confirm1(title, msgString, callback) {
	$.messager.confirm(title, msgString, function(r) {
		if (r) {
			callback(r);
		}
	});
}
function prompt1(title, msgString, callback) {
	$.messager.prompt(title, msgString, function(r) {
		if (r) {
			callback(r);
		}
	});
}

function turnoff() {
	$("#loading").css("display", "none");
}
function turnon() {
	$("#loading").ajaxStart(function() {
		$("#loading").css("display", "block")
	});
}

var exportZt = "";

function setAjaxLoading(){
	$("#loading").ajaxStart(function () {
		if (exportZt == "" ) {
		 		  $(this).show();
		}
	}).ajaxStop(function () {
		if (exportZt == "1" || exportZt == "" ) {
			$(this).hide();
		}
	});
	  $("#loading").ajaxError(function(event,request,settings){
		  $(this).hide();

	  });
    
}

function setAjaxLoading1(){
	$("#loading").ajaxStart(function (){
		  //if(ifirst){
			  if(document.getElementById("Cell")){
				  document.getElementById("Cell").style.display="none";
			  }
		//  }
		  $(this).show();
	}).ajaxStop(function () {
	      $(this).hide();
	    //  if(ifirst){
			  if(document.getElementById("Cell")){
				  document.getElementById("Cell").style.display="";
			  }
	  //    }
	});
	  $("#loading").ajaxError(function(event,request,settings){
		  $(this).hide();
		 // self.location='./error.action';
	  });
	$.ajaxSetup({cache:false});
}

//税源报表专用
function setAjaxLoading2(){
	$("#loading").ajaxStart(function (){
		  if(ifirst){
			  if(document.getElementById("Cell")){
				  document.getElementById("Cell").style.display="none";
			  }
		  }
		  $(this).show();
	}).ajaxStop(function () {
	      $(this).hide();
	      if(ifirst){
			  if(document.getElementById("Cell")){
				  document.getElementById("Cell").style.display="";
			  }
	      }
	});
	  $("#loading").ajaxError(function(event,request,settings){
		  $(this).hide();
		 // self.location='./error.action';
	  });
	$.ajaxSetup({cache:false});
}

function setLoading(info){
	if(info==""){
		info = "数据载入中";
	}
	var tt = '<p id="loading-one" style="display: block; color: #fff; position: absolute; top: 50%; left: 50%; margin: 20px 0 0 -50px; padding: 3px 10px">';
	tt = tt + info;
	tt = tt + '</p>';
	loading.innerHTML = "";
	loading.innerHTML = tt;
}

function setAjaxLoadingOfHintCell(){
	$("#loading").ajaxStart(function () {
		  if(document.getElementById("Cell")){
			  document.getElementById("Cell").style.display="none";
		  }
    }).ajaxStop(function () {

    });
	  $("#loading").ajaxError(function(event,request,settings){
		  $(this).hide();
		  //self.location='./error.action';
	  });
    $.ajaxSetup({cache:false});
}

function msgShow(title,info,type){
	if(document.getElementById("Cell")){
		document.getElementById("Cell").style.display="none";
	}
	$.messager.alert(title,info,type,function(){
		if(document.getElementById("Cell")){
			document.getElementById("Cell").style.display="";
		}
	});
}

function moveFocus(evt, objID) {
	var objx = ""
	var strFocus = "";
	objx = objID;
	evt = (evt) ? evt : ((window.event) ? window.event : "")
	key = evt.keyCode ? evt.keyCode : evt.which;
	if (key == 13) {
		strFocus = "document.getElementById(\"" + objx + "\").focus()";
		eval(strFocus);
		return false;
	}
}

function getServerTime() {
	// 因程序执行耗费时间,所以时间并不十分准确,误差大约在2000毫秒以下
	var xmlHttp = false;
	// 获取服务器时间
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			xmlHttp = false;
		}
	}

	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest();
	}

	xmlHttp.open("GET", "null.txt", false);
	xmlHttp.setRequestHeader("Range", "bytes=-1");
	xmlHttp.send(null);

	severtime = new Date(xmlHttp.getResponseHeader("Date"));
	return severtime;
}

function splitStr(str,splitstr){
	var strs = str.split(splitstr).length-1;
	var rtn = [];
	if(strs==0){
		rtn[0]=str;
		return rtn; 
	}
	for(var i=0;i<strs;i++){
		rtn[i] = str.substring(0,str.indexOf(splitstr,0));
		str = str.substring(str.indexOf(splitstr,0)+1,str.length);
	}
	rtn[strs-1]=str;
	return rtn;
}

function isnull(value){
	if(!value){
		return "";
	}else{
		return value;
	}
}

function KeyDown(){ // 屏蔽鼠标右键、Ctrl+n、shift+F10、F5刷新、退格键
	 // alert("ASCII代码是："+event.keyCode);
	  if ((window.event.altKey)&&
	      ((window.event.keyCode==37)||   // 屏蔽 Alt+ 方向键 ←
	       (window.event.keyCode==39))){  // 屏蔽 Alt+ 方向键 →
	     alert("不准你使用ALT+方向键前进或后退网页！");
	     event.returnValue=false;
	     }
	  if ((event.keyCode==8)  ||                 // 屏蔽退格删除键
	      (event.keyCode==116)||                 // 屏蔽 F5 刷新键
	      (event.keyCode==112)||                 // 屏蔽 F1 刷新键
	      (event.ctrlKey && event.keyCode==82)){ // Ctrl + R
	     event.keyCode=0;
	     event.returnValue=false;
	     }
	  if ((event.ctrlKey)&&(event.keyCode==78))   // 屏蔽 Ctrl+n
	     event.returnValue=false;
	  if ((event.shiftKey)&&(event.keyCode==121)) // 屏蔽 shift+F10
	     event.returnValue=false;
	  if (window.event.srcElement.tagName == "A" && window.event.shiftKey) 
	      window.event.returnValue = false;  // 屏蔽 shift 加鼠标左键新开一网页
	  if ((window.event.altKey)&&(window.event.keyCode==115)){ // 屏蔽Alt+F4
	      window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");
	      return false;}
}

function tuichuIE(flag){
			if(flag!="")
			  {url="logOutHT.action?subsysId="+flag;}
			else
				{url="logOutHT.action";}
        	$.ajax({
          		type:"POST",
          		url:url
	          		});

}

function MaxLength(event,object,maxlen){
    return (object.value.length < maxlen)||(event.keyCode == 8); 
} 

//设置输入框最大输入字符数name位控件名称前面加#  如="#stel" length=10 其中中文占两个字符
function SetLength(name,lenth){
    var _area=$(name); 
    var _max = lenth;
    var _val,_cur; 
    var chineseRegex = /[^\x00-\xff]/g;
    _area.bind('keyup change',function(){ //绑定keyup和change事件 
    _val=$(this).val(); 
    _cur = _val.replace(chineseRegex,"**").length; 
    //_cur=_val.length; 
    if(_val.indexOf('&')>=0){ 
       $(this).val(_val.replace('&','')); 
    }
    if(_val.indexOf('%')>=0){ 
        $(this).val(_val.replace('%','')); 
    }
    if(_val.indexOf('?')>=0){ 
        $(this).val(_val.replace('?','')); 
    }
    if(_val.indexOf('|')>=0){ 
       $(this).val(_val.replace('|','')); 
    }
    if(_val.indexOf('\"')>=0){ 
       $(this).val(_val.replace('\"','')); 
    }
    if(_val.indexOf('\'')>=0){ 
       $(this).val(_val.replace('\'','')); 
    }
    if(_cur>_max){ 
       $(this).val(subString(_val,_max)); 
       } 
    } 
    ); 
}

//替换非法SQL注入字符
function replaceIllegalitySql(str){
	if (str != null && str != ""){
	    if(str.indexOf('&')>=0){ 
	    	str = str.replace(/\&/g,''); 
	     }
	     if(str.indexOf('%')>=0){ 
	    	 str = str.replace(/\%/g,''); 
	     }
	     if(str.indexOf('?')>=0){ 
	    	 str = str.replace(/\?/g,''); 
	     }
	     if(str.indexOf('|')>=0){ 
	    	 str = str.replace(/\|/g,''); 
	     }
	     if(str.indexOf('\"')>=0){ 
	    	 str = str.replace(/\"/g,''); 
	     }
	     if(str.indexOf('\'')>=0){ 
	    	 str = str.replace(/\'/g,'');
	     }
	     return str;
	}else{
		return str;
	}
}

function subString(str, len, hasDot){ 
	var newLength = 0; 
	var newStr = ""; 
	var chineseRegex = /[^\x00-\xff]/g; 
	var singleChar = ""; 
	var strLength = str.replace(chineseRegex,"**").length; 
	for(var i=0;i< strLength;i++){ 
		singleChar = str.charAt(i).toString(); 
		if(singleChar.match(chineseRegex) != null){ 
			newLength += 2; 
		}else{ 
			newLength++; 
		} 
		if(newLength > len){ 
			break; 
		} 
		newStr += singleChar; 
	} 
	if(hasDot && strLength > len){ 
		newStr += "..."; 
	} 
	return newStr; 
}

function datagridExtends(){
	var easyui = easyui || {};
	easyui.datagrid = easyui.datagrid || {}; 
	easyui.datagrid.headcenter = function () {
		 $(".datagrid-header .datagrid-cell").css('text-align', 'center').css('color', '#173967');
		};
	
	easyui.datagrid.fixRownumber = function(){
		var headerTds = $(".datagrid-header-inner table tr:first-child").children();
		var bodyTds = $(".datagrid-body table tr:first-child").children();
		var headerTd = $(headerTds.get(0));
		headerTd.width(50);
		var bodyTd = $(bodyTds.get(0));
		bodyTd.width(50);
	};
	
	
	easyui.datagrid.fixColwidth = function(){
		//datagrid头部 table 的第一个tr 的td们，即columns的集合
        var headerTds = $(".datagrid-header-inner table tr:first-child").children();
        //datagrid主体 table 的第一个tr 的td们，即第一个数据行
        var bodyTds = $(".datagrid-body table tr:first-child").children();
        var totalWidth = 0; //合计宽度，用来为datagrid头部和主体设置宽度
        //循环设置宽度
        bodyTds.each(function (i, obj) {
            var headerTd = $(headerTds.get(i));
            var bodyTd = $(bodyTds.get(i));
            $("div:first-child", headerTds.get(i)).css("text-align", "center");
            var headerTdWidth = headerTd.width(); //获取第i个头部td的宽度
            //这里加5个像素 是因为数据主体我们取的是第一行数据，不能确保第一行数据宽度最宽，预留5个像素。有兴趣的朋友可以先判断最大的td宽度都在进行设置
            var bodyTdWidth = bodyTd.width() + 5;
            var width = 0;
            //如果头部列名宽度比主体数据宽度宽，则它们的宽度都设为头部的宽度。反之亦然
            if (headerTdWidth > bodyTdWidth) {
                width = headerTdWidth;
                bodyTd.width(width);
                headerTd.width(width);
                totalWidth += width;
            } else {
                width = bodyTdWidth;
                headerTd.width(width);
                bodyTd.width(width);
                totalWidth += width;
            }
        });
        var headerTable = $(".datagrid-header-inner table:first-child");
        var bodyTable = $(".datagrid-body table:first-child");
        //循环完毕即能得到总得宽度设置到头部table和数据主体table中
        headerTable.width(totalWidth);
        bodyTable.width(totalWidth);
        bodyTds.each(function (i, obj) {
            var headerTd = $(headerTds.get(i));
            var bodyTd = $(bodyTds.get(i));
            var headerTdWidth = headerTd.width();
            bodyTd.width(headerTdWidth);
        });
	}
	
	
	
	return easyui;
}

/**
 * 数字、负号、及小数点
 * @param event
 * @param obj
 */
function clearNoNum(event,obj){ 
    //响应鼠标事件，允许左右方向键移动 
    event = window.event||event; 
    if(event.keyCode == 37 | event.keyCode == 39){ 
        return; 
    }
    //得到第一个字符是否为负号  
    var t = obj.value.charAt(0);
    //先把非数字的都替换掉，除了数字和. 
    obj.value = obj.value.replace(/[^\d.]/g,""); 
    //必须保证第一个为数字而不是. 
    obj.value = obj.value.replace(/^\./g,""); 
    //保证只有出现一个.而没有多个. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); 
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    //如果第一位是负号，则允许添加  
    if(t == '-'){  
      obj.value = '-'+obj.value;  
    } 
} 

function checkNum(obj){ 
    //为了去除最后一个. 
    obj.value = obj.value.replace(/\.$/g,""); 
} 

function checkVerify(mkCode){
	var params = {mkCode:mkCode};
	var rtn;
	$.ajax({
		type:"POST",
			url:path+"/system/swry/checkVerify", 
			data:params,
			dataType:"json",
			async: false, 
			success:function callback(data){
				if(data.code=="0000"){
					rtn=true;
	            }else{
	              rtn=false;
	            }
			},
			error:function(data,textstatus){
			alert(data.responseText);
		}
	});
    
    return rtn;
    
}


function checkLogin(data){
	var code = data.code;
	if(code!="1000"){
		if(code=="20000"){
			alert("用户未登录或登录超时.");
			top.location.href =path;
			return true;
		}else{
			//alert(data.)
			return true;
		}
	}
	
	
}

function changeThemeFun(themeName) {/* 更换主题 */
    var $easyuiTheme = $('#easyuiTheme');
    var url = $easyuiTheme.attr('href');
    var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
    $easyuiTheme.attr('href', href);

    var $iframe = $('iframe');
    if ($iframe.length > 0) {
        for (var i = 0; i < $iframe.length; i++) {
            var ifr = $iframe[i];
            $(ifr).contents().find('#easyuiTheme').attr('href', href);
        }
    }
    $.cookies.set('easyuiThemeName',themeName , { hoursToLive: 10000 }); 
   /* $.cookie('easyuiThemeName', themeName, {
        expires: 7
    });*/
};	

function   formatDate(now)   {     
    var   year=now.getYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
}

//调整panel的宽度
function layoutResize(objId,region,width) {
	$('#'+objId).layout('panel', region).panel('resize',{width:width});
	$('#'+objId).layout('resize');
}

function showResponseError(data){
	var aa = '<div id="errorinfo" title="页面请求错误信息" collapsible="false" minimizable="false" maximizable="true" icon="icon-tip" style="padding: 5px; background: #fafafa;display:none"></div>';
	$('body').append(aa);
	$('#errorinfo').show();
	$('#errorinfo').window({modal:true,width:700,height:400});
	$('#errorinfo').window('open');
	errorinfo.innerHTML = data;
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e){   
    var ev = e || window.event;//获取event对象   
    var obj = ev.target || ev.srcElement;//获取事件源   
    var t = obj.type || obj.getAttribute('type');//获取事件源类型  
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    //处理null值情况
    vReadOnly = (vReadOnly == "") ? false : vReadOnly;
   //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
   var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea" || t=="textbox") 
                && vReadOnly=="readonly")?true:false;
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" || t=="textbox")
                ?true:false;        
    
    //判断
    if(flag2){
        return false;
    }
    if(flag1){   
        return false;   
    }   
}

window.onload=function(){
	//禁止后退键 作用于Firefox、Opera
	document.onkeypress=banBackSpace;
	//禁止后退键  作用于IE、Chrome
	document.onkeydown=banBackSpace;
	
}

function getServertime(){
	var rq = new Object();
	var pathName =  window.location.pathname.substring(1);
	var path = pathName.substring(0,pathName.indexOf("/"));
	var url = window.location.protocol + '//' + window.location.host+'/'+path+'/getServerTime';
		 $.ajax({
     		type:"POST",
    			url:url, 
     		    dataType:"json",
     		    async:false,
    			success:function callback(data){
    				if(data.code=="0000"){
    					rq = data.returnObject;
             	 	
                 }else{
                    msgShow("友情提醒", data.msg, "info");
                 }
    			},
    			error:function(data,textstatus){
					alert(data.responseText);
				}
     	});
	return rq;
}

/*
var globle_rq = {
			 year : getServertime().year,
			 month : getServertime().month
			}
*/

/*
 * 从iframe中下载文件
 * @param url
 * @param id
 */
function loadIframeURL(url,id){
	var f = document.getElementById(id);
	f.style.display="none";
	f.src= url;			
    var explorer = window.navigator.userAgent ;
    //是ie浏览器开启遮罩
    if (explorer.indexOf("MSIE") >= 0) {
    	$("#loading").css("display", "block");
    	setLoading("正在导出数据");
		/*
		f.addEventListener( "onreadystatechange", function(){
			if(f.readyState == 'interactive'){
				$("#loading").css("display", "none");
			}
		},false);				
		*/
		f.onreadystatechange=function(){
			if(f.readyState == 'interactive'){
				$("#loading").css("display", "none");
			}
		};
    }
}

/*
 * 从iframe中下载文件
 * @param url
 * @param id
 * @param exportKey
 */
function loadIframeURL2(url,id,exportKey){
	var f = document.getElementById(id);
	f.style.display="none";
	f.src= url;
   	$("#loading").css("display", "block");
   	setLoading("正在导出数据");
   	gp_exportKey = exportKey;
   	gp_timeid = window.setTimeout(getDownloadExportZt, 1000);
}

/*
 * 从iframe中下载文件
 * @param url
 * @param id
 * @param params
 * @param exportKey
 */
function loadIframeURL3(url,id,params,exportKey){
   	$("#loading").css("display", "block");
   	setLoading("正在导出数据");
   	if (params == null) params = new Object();
   	params.downloadkey = exportKey;
   	var downloadId = "";
   	
	$.ajax({
		type:"POST",
		url:url,
		dataType:"json",
		data:params,
		success:function callback(data){
			var analyMsg = data;
			if(analyMsg.code != '0000'){
					$.messager.alert('友情提醒',analyMsg.msg,'info',function(){});
					exportZt = "";
					return;
			}else{
				downloadId = analyMsg.returnObject.downloadId;
				var f = document.getElementById(id);
				var downloadurl = path + "/system/filepublic/downloadById?downloadId={0}&exportKey={1}";
				downloadurl = String.format(downloadurl,downloadId,exportKey);	
				f.style.display="none";
				f.src= downloadurl;				
			}			
		},  
	    error : function(data,textstatus){  
	    	alert(data.responseText);
	    	return;
		}
	}); 

}

//获取导出下载状态Excel状态
function getDownloadExportZt(){
	var params = new Object();
	params.exportKey=gp_exportKey;
	$.ajax({
			type:"POST",
			url:path+"/system/filepublic/getDownloadExportZt",
		dataType:"json",
		data:params,
		success:function callback(data){
			var analyMsg = data;
			if(analyMsg.code != '0000'){
 				$.messager.alert('友情提醒',analyMsg.msg,'info',function(){});
 				exportZt = "";
 			}else{
				exportZt = analyMsg.returnObject.zt;
			}			
		},  
        error : function(data,textstatus){  
        	alert(data.responseText);  
    	},
		complete: function (XMLHttpRequest, textStatus) {
			if (exportZt=="0") {
				gp_timeid = window.setTimeout(getDownloadExportZt, 1000);
			}else{
				window.clearTimeout(gp_timeid);
				exportZt = "";
			}       			    
		} 		
	});  
}

function setButtonDisabled(obj,lb){
	if (lb == 1) {
		obj.attr("disabled",true);
		obj.removeClass("anniu2");
		obj.addClass("anniu2_disabled");
	} else {
		obj.attr("disabled",false);
		obj.removeClass("anniu2_disabled");
		obj.addClass("anniu2");
	}
}

function exportExcWithprogress(id,download_url,ztdownload_url,interval){
	 
	    
	    $("#loading").show();
	    document.getElementById(id).src = download_url;
	   
	     var timer = setInterval(function(){
	    	
	         $.ajax({
	        	   type:"POST",
	                url: isdownload_url,
	                dataType:"json",
	                success: function(data){
	                    if(data.returnObject == null){
	                      
	                        clearInterval(timer);
	                    }else{
	                    	$("#loading").show();
	                    }
	                },
	                beforeSend:function(){
	                	
	                },
	                error:function(e){
	                    console.log(e.responseText);
	                }
	            }); 
	          }, interval);
}

function viewQskj(id){
	id = "#" + id;
    $(id).show();
    $(id).dialog({
	    iconCls: "icon-help",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        closed: true,
        onOpen: function () {
        	$(id).window("maximize");	
        },
        onClose: function () {
            
        }
    });
    
    $(id).dialog('open');
}

function formatColValue_String(value,rec){
    return value;
}

function formatColValue_Double(value,rec){
	var s;
    if(value!=null&&value!=0){
    	s = fmtvalue(value,2);
  	}  
    return s;
}

function formatColValue_Fixed(value,rec){
	var s;
    if(value!=null&&value!=0){
    	s = (value * 100).toFixed(2) + '%';
  	}  
    return s;
}

//RAS加密密码
function encrypedPwd_RAS(pwd,publicKeyExponent,publicKeyModulus){
    RSAUtils.setMaxDigits(200);  
    var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
    var encrypedPwd = RSAUtils.encryptedString(key,pwd);
    return encrypedPwd;
}

//RAS解密密码
function decryptedPwd_RAS(pwd,publicKeyExponent,publicKeyModulus,privateKeyExponent){
    RSAUtils.setMaxDigits(200);  
    var key = new RSAUtils.getKeyPair(publicKeyExponent, privateKeyExponent, publicKeyModulus);
    var decryptedPwd = RSAUtils.decryptedString(key,pwd);
    return decryptedPwd;
}

//获取RAS公共KEY
function enrcyedRAS_PUBLICKEY(){
	var pwd = new Object();
    $.ajax({
		type:"POST",
			url: path + "/loginPublicKey", 
			data:null,
			dataType:"json",
			async:false,
			success:function callback(data){
				if(data.code=="0000"){
					pwd.publicKeyExponent=data.returnObject.publicKeyExponent;
					pwd.publicKeyModulus=data.returnObject.publicKeyModulus;
				}else{
					msgShow("友情提醒", data.msg, "info");
				}
			},
				error:function(data,textstatus){
				alert(data.responseText);
			}
	});
    return pwd;
}
