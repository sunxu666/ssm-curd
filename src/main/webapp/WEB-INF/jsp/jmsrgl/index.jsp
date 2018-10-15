<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort() + path + "/";
	String loginname = (String) request.getSession().getAttribute("UserName");
	String username = (String) request.getSession().getAttribute("UserCode");
	Integer loginhours = (Integer) request.getSession().getAttribute("LoginHours");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"> -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>无锡市地方税务局居民收入与大数据分析系统</title>
	<link rel="stylesheet" href="<%=path%>/statics/jmsrgl/css/nav.css" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/statics/jmsrgl/js/stringutil.js"></script>
    <link type="text/css" rel="stylesheet"  href="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/themes/default/easyui.css" />
	<link type="text/css" rel="stylesheet"  href="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/themes/icon.css" />
	<script type="text/javascript" src="<%=path %>/statics/jmsrgl/ui/jquery/jquery-1.6.min.js"></script>
	<script type="text/javascript" src="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=path%>/statics/jmsrgl/ui/jquery-easyui-1.2.4/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript">
		//javaScript:window.history.forward(1); 
		var path='<%=path%>';
		var basePath='<%=basePath%>';
		var width = window.screen.width;
	  	var height = window.screen.height;
	  	var flag_title1 = "0";
	  	var flag_title2 = "0";
	  	var loginname ='<%=loginname%>';
	  	var loginhours = '<%=loginhours%>';
	  	var username = '<%=username%>';
	  	var wh="";
	  	
	  	
	  
	  	//页面加载脚本
          $(function(){
        	  var  url = "http://localhost:8080/jmsrgl/system/swry/login?username="+username;
        	    var browser = navigator.userAgent;
        	     //判定是不是谷歌浏览器
        	   if( browser.indexOf("Firefox") == -1){
        		   var run_cmd = new ActiveXObject("WScript.shell"); 
        		   run_cmd.run("firefox.exe "+url);
        	   }else{
        		  // window.location.href = url;
        	   }
        		var $guideSlider = $("#guideSlider").eq(0);

            	$guideSlider.find(".guide-list .guide").hover(function() {
            	$(this).addClass("on").siblings().removeClass("on");
            	});
        	
        	if (loginhours<12){
        		wh = "早上好,";
        	}else if (loginhours>=12&&loginhours<16){
        		wh = "中午好,";
        	}else if (loginhours>=16&&loginhours<19){
        		wh = "下午好,";
        	}else if (loginhours>=19&&loginhours<=24){
        		wh = "晚上好,";
        	}
        	
        	//$("#wh").html(wh+loginname);
        	$('.user img:first').after(wh+loginname);
        	getmk(); 
        	initDialog();
        });
	  	
        function shut(){
        	
            window.opener=null;  
            window.open('','_self');  
            window.close();  
        	/* window.location.href="about:blank";
        	window.close(); */
         }  
	  	
        //选中主页面的功能页签，对应的访问地址
		function getmk(){
			
			$('.function').find('a').click(function(x){
				var mkinfo = $(this).attr("name");
				var mkinfo_arry = mkinfo.split("|");
				//cxfl ---是否有收入和人数选择
				var url = String.format(path+'/doPublicMoudule?sys_mouduleID={0}&&sfnd={1}&&cxfl={2}',mkinfo_arry[0],mkinfo_arry[1],mkinfo_arry[2]);
				$(this).attr('href',url);
		              
		        	
        		
        	  })
        	  
        	  $('.function_zh').click(function(x){
				var url;
					 url = path+'/tjfx/nd/tjfxNbZdycx/index';
				$(this).find('a').attr('href',url);	
        		
        	  })
			
		}   
		/**
		修改账号密码
		**/
		function initDialog() {
            $('#ChangePasswordDlg').show();
            $('#ChangePasswordDlg').dialog({
                title: "修改密码",
                closed: true,
                width: 300,
                height: 160,
                modal: true,
                buttons: [{
                    text: "确定",
                    iconCls: "icon-ok",
                    handler: Submit_ChangePassword
                }, {
                    text: "取消",
                    iconCls: "icon-cancel",
                    handler: function () {
                        $("#ChangePasswordDlg").dialog('close');
                    }
                }]
            });

            $("#CurrentPassword").validatebox({
                required: true
            });

            $("#NewPassword").validatebox({
                required: true
            });

            $("#ConfirmNewPassword").validatebox({
                required: true
            });
		}
		
		 function ClearValidateMsg() {
            $('#CurrentPassword').val("CurrentPassword");
            $("#NewPassword").val("NewPassword");
            $("#ConfirmNewPassword").val("ConfirmNewPassword");

            $("#ChangePasswordForm").form("validate");
            $("#ChangePasswordForm").form("clear");
        } 
		
		 function ChangePassword() {
        	//mmbj=false;
            ClearValidateMsg();
            $('#ChangePasswordDlg').dialog('open');
        }
		
		 function Submit_ChangePassword() {
	            var formValidate = $("#ChangePasswordForm").form("validate");
	            if (!formValidate) {
	                return false;
	            }
	           

	            var oldpassword = $("#CurrentPassword").val();
	            var password = $("#NewPassword").val();
	            var ConfirmPassword = $("#ConfirmNewPassword").val();

	            if (password != ConfirmPassword) {
	                $.messager.alert("提示", "两次输入的新密码不一致，请检查。", "info", function () {
	                    $("#NewPassword")[0].select();
	                    $("#NewPassword")[0].focus();
	                });
	                return false;
	            }
	            
	        	var url = path + '/system/swry/changepwd';
	        	var params = new Object();
	        	params.oldpwd = oldpassword;
	        	params.newpwd = password;
	        	  		  	
	        	$.ajax({   
	        	    type: "POST",  
	        	    dataType: "json",  
	        	    url: url,   
	        	    data: params,   
	        	    async: false,
	                success: function(data) {
						if(data.code != '0000'){
		     				alert(data.msg);
		     			} else {
	                        $("#ChangePasswordDlg").dialog('close');                        
	                        alert("修改密码成功,请重新登录系统！");   
	                        exitsystem();
		    			}                	
	                },
					error: function() {
						alert('修改密码时发生错误！');
					}        	    
	        	});
	        }
			
</script>
</head>
<body >
	<div class="user">
		<img src="/statics/jmsrgl/images/tx.png" width="30" height="29" /> <!-- <img
			src="images/index_2_06.png" width="9" height="6" /> -->
	</div>
	<div class="quit">
	<img src="/statics/jmsrgl/images/setting.png" alt="" width="15" height="15" onclick="javascript:return  ChangePassword();"/>设置 &nbsp;&nbsp;&nbsp;&nbsp;
	<img src="/statics/jmsrgl/images/index_2_03.png" width="12" height="14" onclick="javascript:return  exitsystem();"> 退出系统</div>
<div class="guide-slider" id="guideSlider">
  <ul class="guide-list">
		<li class="guide on">
			<div class="display" style="background:url(/statics/jmsrgl/images/nav_11.png) repeat-x;">
				<div class="icon icon1 animated flipInY"></div>
				<div class="title">收入人群分析</div>
			</div>
			<div class="behind">
				<div class="function-list-wrap">
					<ul class="function-list">
						<li class="function corner corner-hot"><a href="" name="0105|Y|1" >高净值人群分析</a></li>
						<li class="function corner"><a href="" name="0102|Y|2" >新增就业人群分析</a></li>
						<li class="function corner"><a href="" name="0103|N|2" >外籍人群工薪所得分析</a></li>
						<li class="function"><a href="" name="0104|N|2" >两处以上所得分析</a></li>
						<li class="function"><a href="" name="0101|Y|1" >高收入人群分析</a></li>
					</ul>
				</div>
			</div>
		</li>
		<li class="guide">
			<div class="display" style="background:url(/statics/jmsrgl/images/nav_13.png) repeat-x;">
				<div class="icon icon2 animated flipInY"></div>
				<div class="title">收入所得分析</div>
			</div>
			<div class="behind">
				<div class="function-list-wrap">
					<ul class="function-list">
						<li class="function"><a href="" name="0201|N|2" >工资薪金所得分析</a></li>
						<li class="function"><a href="" name="0202|N|1" >利股红所得分析</a></li>
						<li class="function"><a href="" name="0203|N|1" >限售股解禁分析</a></li>
						<li class="function"><a href="" name="0204|N|1" >股权转让分析</a></li>
					</ul>
				</div>
			</div>
		</li>
		<li class="guide">
			<div class="display" style="background:url(/statics/jmsrgl/images/nav_15.png) repeat-x;">
				<div class="icon icon3 animated flipInY"></div>
				<div class="title">人才吸引力分析</div>
			</div>
			<div class="behind">
				<div class="function-list-wrap">
					<ul class="function-list">
						<li class="function"><a href=""  name="0301|Y|1">人均收入排行榜</a></li>
						<li class="function"><a href=""  name="0302|Y|1">人员稳定性排行榜</a></li>
						<!-- <li class="function"><a href="">个人所得税减免分析</a></li> -->
					</ul>
				</div>
			</div>
		</li>
		<li class="guide">
			<div class="display"  style="background:url(/statics/jmsrgl/images/nav_17.png) repeat-x;">
				<div class="icon icon4 animated flipInY"></div>
				<div class="title">综合分析</div>
			</div>
			<div class="behind">
				<div class="function-list-wrap">
					<ul class="function-list">
					<li class="function_zh"><a href="" name="0401">全员全额查询</a></li>
						<!-- <li class="function_zh"><a href="">两处以上查询</a></li>
						<li class="function_zh"><a href="">12万以上查询</a></li> -->
					</ul>
				</div>
			</div>
		</li>
	
	</ul>
</div>

 <div id="ChangePasswordDlg" align="center" style="padding:5px; display: none;">
            <form id="ChangePasswordForm" action="" method="">
            <br />
            <table>
                <tr>
                    <td align="left">当前密码：</td>
                    <td align="left">
                        <input type="password" id="CurrentPassword" name="CurrentPassword" style="width:150px;"/>
                    </td>
                </tr>
                <tr>
                    <td  align="left">新密码：</td>
                    <td align="left">
                        <input type="password" id="NewPassword" name="NewPassword" maxLength="18" style="width:150px;"/>
                    </td>
                </tr>
                <tr>
                    <td align="left">确认新密码：</td>
                    <td align="left">
                        <input type="password" id="ConfirmNewPassword" name="ConfirmNewPassword" maxLength="18" style="width:150px;"/>
                    </td>
                </tr>
                <tr>
                
                </tr>
            </table>
        </form>
    </div>
</body>
</html>