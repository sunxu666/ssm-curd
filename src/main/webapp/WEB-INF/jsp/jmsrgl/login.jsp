<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>无锡市地方税务局居民收入与大数据分析系统</title>

	<link href="<%=path%>/statics/jmsrgl/css/login.css" rel="stylesheet" type="text/css" />

    <link type="text/css" rel="stylesheet" href="<%=path%>/statics/jmsrgl/css/style.css"/>
	<link type="text/css" rel="stylesheet"  href="<%=path %>/statics/jmsrgl/css/select.css"/>
	<link type="text/css" rel="stylesheet"  href="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/themes/icon.css" />
	<link type="text/css" rel="stylesheet"  href="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/themes/default/easyui.css" />
	<script type="text/javascript" src="<%=path%>/statics/jmsrgl/js/public.js"></script>
	<script type="text/javascript" src="<%=path %>/statics/jmsrgl/ui/jquery/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/locale/easyui-lang-zh_CN.js"></script>
	
	<script  type="text/javascript">
	 javaScript:window.history.forward(1); 
	 var path="<%=path%>";
	   var znjg="";
	   var znjgcode="";
	   var znjgname="";
      //设置登录窗口
	   $(document).ready(function(){
		   var  url = "http://localhost:8080/jmsrgl";
		    var browser = navigator.userAgent;
		     //判定是不是谷歌浏览器
		   if( browser.indexOf("Firefox") == -1){
			   var run_cmd = new ActiveXObject("WScript.shell"); 
			   run_cmd.run("firefox.exe "+url);
		   }else{
			   //window.location.href = url;
		   }
	       
	       	$("#btnEp").click(function() {
	       		serverLogin();
	       	});  
           
	       	$("#password1").focus(function() {
	       		$("#password1").hide();
	       		$("#password").show().focus();
	       	}); 
	       	
	       	$("#password").blur(function() {
	       		if ($("#password").val()=="密码"){
	       		$("#password").hide();
	       		$("#password1").show();
	       		}
	       		
	       	});
           
       }); 
	
        
        //登录验证
        function serverLogin() {
            var username = $("#username");
            var password = $("#password");
              
            if (username.val() == "") {
                msgShow("友情提醒", "请输入用户名", "warning");
                return false;
            }
            if (password.val() == "") {
                msgShow("友情提醒", "密&nbsp&nbsp码为空，请输入", "warning");
                return false;
            }
            
            var userid = $("#username").val(); 
            var url = path + "/system/swry/loginSystem";   
            var params = {  
       			username:userid,
                password:$("#password").val()
            };
            
            $.ajax({
        		type:"POST",
       			url:url, 
       			data:params,
        		dataType:"json",
       			success:function callback(data){
       				if(data.code=="0000"){
                	 	loginFrame();
                    }else{
                       msgShow("友情提醒", data.msg, "info");
                    }
       			},
       			error:function(data,textstatus){
					alert(data.responseText);
				}
        	}); 
        }
        
        function loginFrame(){
            var url = path + "/system/swry/loginFrame";   
            var params = {  
       			znjgid:znjg,
       			znjgname:znjgname,
       			znjgcode:znjgcode
            };
            
            var　tempForm　=　document.createElement("form");　  
           	　tempForm.action=url;　  
           	　tempForm.method="post";　  
           　		document.body.appendChild(tempForm);　  
           　　  
           　　　　//create　a　submit　button　　  
           　		var　tempInput0　=　document.createElement("input");　  
           	　tempInput0.type="hidden";　  
           　			tempInput0.name="znjgid";　　  
           　			tempInput0.value=znjg;　//the　parameter　of　method　in　the　code　of　DispatchAction.　  
           　		var　tempInput1　=　document.createElement("input");　  
           　			 tempInput1.type="hidden";　  
           　		           　tempInput1.name="znjgname";　　  
           　		           　tempInput1.value=znjgname;
           　		var　tempInput2　=　document.createElement("input");　  
           　		           　tempInput2.type="hidden";　  
           　		           　tempInput2.name="znjgcode";　　  
           　		           　tempInput2.value=znjgcode;
           　  
           　	tempForm.appendChild(tempInput0);　  
           　	tempForm.appendChild(tempInput1);　 
           　	tempForm.appendChild(tempInput2);　 
           　　　　//submit　the　form　  
           	　tempForm.submit();  
            
           // $.post(url,params, function(data) {
                 
           // });
            //location.href = url+"znjg="+znjg+"&&znjgname"+znjgname+"&&znjgcode"+znjgcode;

        }
        
        function getZnjgInfo(){
        	$.ajax({
        		type:"POST",
       			url:"system/swry/getZnjg", 
        		dataType:"json",
       			success:function callback(data){
       				var analyMsg = data;
       				if(!(analyMsg.code=="0000")){
        				$.messager.alert("友情提醒",analyMsg.msg,"info",function(){});
        			}else{  
       					$("#znjg").combobox({
							editable:false,
						   	data:analyMsg.returnObject.down,
						    valueField:"id",
						    textField:"name",
						    onSelect:function(n){
						    	znjg = n.id;
						    	znjgname = n.name;
						    	znjgcode = n.code;
						    },
						    onLoadSuccess:function(){
						    	$("#znjg").combobox("setValue",analyMsg.returnObject.znjg_0);
						    	znjgcode = analyMsg.returnObject.znjg_0_code;
						    	znjg = $("#znjg").combobox("getValue");
						    	znjgname = $("#znjg").combobox("getText");
							}
						});
						var ss = analyMsg.returnObject.size;
       					if(ss>1){
       						openZnjg();
       					}else if(ss==1){
       						znjg = analyMsg.returnObject.down[0].id;
       						znjgname = analyMsg.returnObject.down[0].name;
       						loginFrame();
       					}else{
       						msgShow("友情提醒","职能机关信息不存在", "info");
       						return false;
       					}
       				}
       			},
       			error:function(data,textstatus){
					alert(data.responseText);
				}
        	}); 
        }
        
        function keypress(evt, objID){
        	var isFocus=$("#"+objID).is(":hidden"); 
        	if (isFocus==true){
        		 moveFocus(evt, "password1");
        	}else{
        		 moveFocus(evt, objID);
        	}
        }
        
      
        function onKeyPress(e)
        {
            var keyCode = null;

            if(e.which)
                keyCode = e.which;
            else if(e.keyCode)
                keyCode = e.keyCode;
               
            if(keyCode == 13)
            {
            	serverLogin();
                return false;
            }
           
        } 
    	
    </script>	
    


	</head>

<body style="text-align:center;">

<div class="login_div">
  <div class="login_content">
  	<div class="login_form">
<div class="login_label">
			<input type="text" class="input_user" id="username" value="用户名" onfocus="if(this.value=='用户名'){this.value=''}" onblur="if(this.value==''){this.value='用户名'}" onKeyPress="javascript:return keypress(event, 'password');">
            <img src="/statics/jmsrgl/images/login_10.png" width="257" height="9" />
            <input  id="password1" name="password"  value="密码"  type="text" class="input_password" >
            <input id="password" type="password" class="input_password"  value="密码" onfocus="if(this.value=='密码'){this.value=''}" onblur="if(this.value==''){this.value='密码'}" onKeyPress="javascript:return onKeyPress(event);" style=" display:none;">
            
            
             <img src="/statics/jmsrgl/images/login_10.png" width="257" height="9" />
           
    </div>
    <div class="login_btn" id="btnEp"><img src="/statics/jmsrgl/images/login_18.png" width="125" height="123" /></div>
    </div>
    <div class="copyright">&copy; 2017无锡地税局 版权所有. All Rights Reserved. 建议您使用IE8.0以上版本浏览器使用本系统</div>
</div>
</div>

</body>
</html>
