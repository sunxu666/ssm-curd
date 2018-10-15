<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>员工列表</title>
    <%
        //服务器路径（http://localhost:3306/项目名）
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <script type="text/javascript" src="statics/js/jquery.min.js"></script>
    <%--<link rel="stylesheet" href="statics/bootstrap-3.3.7-dist/css/bootstrap.min.css">--%>
    <script type="text/javascript" src="statics/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/tree.css"/>
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/icon.css"/>
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/jquery.easyui.min.js"></script>

    <script type="text/javascript">
        $(function () {

            $("#loginBox").dialog({
                title: "系统登录",
                width: 400,
                height: 200,
                closed: false,
                modal: true,
                closable:false,
                iconCls:"icon-ok",
                buttons:[
                    {
                        iconCls:"icon-ok",
                        text:"登录",
                        handler:function () {
                            $('#myform').form('submit', {
                                    url:"./data/login.php",
                                onSubmit: function(){
                                $.messager.progress({text:"正在登陆。。。"});
                            },
                            success: function(){
                                // $.messager.progress('close');	// 当成功提交之后隐藏进度条
                            }
                        });

                        }
                    },{
                        iconCls:"icon-no",
                        text:"重置",
                        handler:function () {

                        }
                    }
                ]


            });

            $("#close").click(function () {
                $("#dialog1").dialog("close");
            });
        });
    </script>
</head>
<body>
<div id="loginBox">
    <form id="myform" method="post" class="p30" action="">
        <div class="h30 1h28">
            <%--@declare id="name"--%><label for="name">用户名：</label>
            <input type="text" name="name" class="easyui-validatebox" data-options="required:true">
        </div>
        <div class="h30 1h28">
            <%--@declare id="password"--%><label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
            <input type="text" name="password" class="easyui-validatebox" data-options="required:true">
        </div>

    </form>
</div>


</body>
</html>





















