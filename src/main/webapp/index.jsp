<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>员工列表</title>
    <%
        //服务器路径（http://localhost:3306/项目名）
        pageContext.setAttribute("APP_PATH",request.getContextPath());
    %>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <script type="text/javascript" src="statics/js/jquery.min.js"></script>
    <link rel="stylesheet" href="statics/bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <script type="text/javascript" src="statics/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/tree.css" />
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/icon.css" />
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/jquery.easyui.min.js"></script>

    <script type="text/javascript">
        $(function () {

          /* $("#dialog2").css(display,none);*/
            $("#open").click(function(){
                $("#dialog2").dialog({
                    width:400,
                    height:300,
                    title:"第二个弹出框",
                    modal:true,
                    toolbar:[{
                        text:'Edit',
                        iconCls:'icon-edit',
                        handler:function () { alert('edit') }
                    },{
                        text:'Help',
                        iconCls:'icon-help',
                        handler:function () {
                            alert('help')
                        }
                    }],
                    buttons:[
                        {
                            iconCls:"icon-ok",
                            text:"OK",
                            handler:function () {
                                alert("OK");
                            }
                        },{
                            iconCls:"icon-no",
                            text:"Cancel",
                            handler:function () {
                                $("#dialog2").dialog("close");
                            }
                        }
                    ]

                });
            });

                $("#close").click(function () {
                    $("#dialog2").dialog("close");
                });
        });

    </script>
</head>
<body>
    <input id="open" type="button" value="open"/>
    <input id="close" type="button" value="close"/>
   <%-- <div id="--dialog1" class="easyui-dialog" data-options="" style="width:400px;height: 300px;">
        这是一个测试弹出框的asdfsfsd内容
    </div>--%>
    <div id="dialog2" style="display:'none'">
        这是二个测试弹出框的asdfsfsd内容
    </div>



    <%--员工修改模态框--%>
    <div class="modal fade" id="empUpdataModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">员工修改</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="empName_add_input" class="col-sm-2 control-label">UserName</label>
                            <div class="col-sm-10">
                                <p class="form-control-static" id="empName_update_static"></p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email_add_input" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" class="form-control" id="email_updata_input" placeholder="Email">
                                <span class="help-block"></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">Gender</label>
                            <div class="col-sm-10">
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender1_updata_input" value="M"> 男
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender2_updata_input" value="F"> 女
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">deptName</label>
                            <div class="col-sm-4">
                                <select id="dept_updata_select" class="form-control" name="dId">

                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="emp_updata_btn">更新</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 员工添加的模态框 -->
    <div class="modal fade" id="empAndModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">员工添加</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="empName_add_input" class="col-sm-2 control-label">UserName</label>
                            <div class="col-sm-10">
                                <input type="text" name="empName" class="form-control" id="empName_add_input" placeholder="UserName">
                                <span class="help-block"></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email_add_input" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" class="form-control" id="email_add_input" placeholder="Email">
                                <span class="help-block"></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">Gender</label>
                            <div class="col-sm-10">
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender1_add_input" value="M" checked="checked"> 男
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender2_add_input" value="F"> 女
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">deptName</label>
                            <div class="col-sm-4">
                                <select id="dept_add_select" class="form-control" name="dId">

                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="emp_save_btn">保存</button>
                </div>
            </div>
        </div>
    </div>

    <%--搭建显示页面--%>
    <div class="container">
        <%--标题--%>
        <div class="row"></div>
        <div class="col-md-12">
            <h1>SSM-CRUD</h1>
        </div>
        <%--按钮--%>
        <div class="row"></div>
        <div class="col-md-4 col-md-offset-8">
            <button class="btn btn-primary" id="emp_add_modal_btn">新增</button>
            <button class="btn btn-danger" id="emp_delete_all_btn">删除</button>
        </div>
        <%--显示表格数据--%>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-hover" id="emps_table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="check_all"/>
                            </th>
                            <th>#</th>
                            <th>emoName</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>deptName</th>
                            <th>操作</th>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
        <%--显示分页信息--%>
        <div class="row">
            <%--分页信息--%>
            <div class="col-md-6" id="page_info_area">

            </div>
            <div class="col-md-6"  id="page_nav_area">

            </div>
        </div>

    </div>
    <script type="text/javascript">
        var totalRecord,currentPage;
        //1.页面加载完成以后，直接去发动一个ajax请求，要到分页数据
        $(function(){
           to_page(1);
        });
        //①②③④⑤⑥⑦⑧⑨⑩
        //①方法：跳转到那个页面
        function to_page(pn){
            $.ajax({
                url:"${APP_PATH}/emps",
                data:"pn="+pn ,
                type:"GET",
                success:function (result) {
                    console.log(result);
                    //1.解析并显示员工数据
                    build_emps_table(result);
                    //2.解析并显示分页信息
                    build_page_info(result);
                    //3.解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }
        //①方法下调用的--1.解析并显示员工数据
        function build_emps_table(result) {
            $("#emps_table tbody").empty();
            var emps = result.extend.pageInfo.list;
            $.each(emps, function (index, item) {
                var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>")
                // var empIdTd = $("<td></td>").append(item.empId);
                var empIdTd = $("<td>"+item.empId+"</td>");
                var empNameTd = $("<td></td>").append(item.empName);
                var genderTd = $("<td></td>").append(item.gender == 'M' ? "男" : "女");
                var emailTd = $("<td></td>").append(item.email);
                var deptNameTd = $("<td></td>").append(item.tnlDept.deptName);
                var editBtn = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn")
                    .append($("<span></span>").addClass("glyphicon glyphicon-pencil"))
                    .append("编辑");
                //为编辑按钮添加自定义属性，表示当前id
                editBtn.attr("edit-id", item.empId);
                var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
                    .append($("<span></span>").addClass("glyphicon glyphicon-trash"))
                    .append("删除");
                //为删除按钮添加自定义属性，表示当前id
                delBtn.attr("del-id", item.empId);
                var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
                $("<tr></tr>")
                    .append(checkBoxTd)
                    .append(empIdTd)
                    .append(empNameTd)
                    .append(genderTd)
                    .append(emailTd)
                    .append(deptNameTd)
                    .append(btnTd)
                    .appendTo("#emps_table tbody");
            });
        }
        //①方法下调用的--2.解析显示分页信息
        function build_page_info(result){
            $("#page_info_area").empty();
            $("#page_info_area").append(
                "当前"+ result.extend.pageInfo.pageNum +"页,总"+
                result.extend.pageInfo.pages +"页,总共"+
                result.extend.pageInfo.total+"条记录"
            );
            totalRecord = result.extend.pageInfo.total;
            currentPage = result.extend.pageInfo.pageNum;
        }
        //①方法下调用的--3.解析显示分页条
        function build_page_nav(result){
            $("#page_nav_area").empty();
            var ul = $("<ul></ul>").addClass("pagination");
           //构建元素
            var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
            var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
           if(result.extend.pageInfo.hasPreviousPage == false){
                firstPageLi.addClass("disabled");
                prePageLi.addClass("disabled");
            } else {
                //为元素添加击翻页的时间
                firstPageLi.click(function () {
                    to_page(1);
                });

                prePageLi.click(function () {
                    to_page(result.extend.pageInfo.pageNum - 1);
                });
            }

            var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
            var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
            if(result.extend.pageInfo.hasNextPage == false){
                nextPageLi.addClass("disabled");
                lastPageLi.addClass("disabled");
            }else {
                nextPageLi.click(function () {
                    to_page(result.extend.pageInfo.pageNum + 1);
                });

                lastPageLi.click(function () {
                    to_page(result.extend.pageInfo.pages);
                });
            }
            //添加首页和前一页
            ul.append(firstPageLi).append(prePageLi);

            //添加1、2、3遍历ul中添加页码
            $.each(result.extend.pageInfo.navigatepageNums, function (index, item) {

                var numLi = $("<li></li>").append($("<a></a>").append(item));
                if(result.extend.pageInfo.pageNum == item){
                    numLi.addClass("active")
                }
                numLi.click(function () {
                    to_page(item);
                });
                ul.append(numLi);
            });

            //添加末页和下一页
            ul.append(nextPageLi).append(lastPageLi);

            var navEl = $("<nav></nav>").append(ul);

            $("#page_nav_area").append(navEl);
            //navEl.appendTo("#page_nav_area");


        }
        //②方法：清空表单样式及内容
        function reset_form(ele){
            //表单数据
            $(ele)[0].reset();
            //清空表单样式
            $(ele).find("*").removeClass("has-error has-success");
            $(ele).find(".help-block").text("");
        }
        //A.点击事件:新增
        $("#emp_add_modal_btn").click(function(){
            //清除表单数据（表单完整重置（表单的数据，表单的样式））
            reset_form("#empAndModal form");
           // $("#empAndModal form")[0].reset();

            //发送请求，查询部门信息 显示在下拉列表
            getDepts("#empAndModal select");

            $("#empAndModal").modal({
                backdrop:"static"
            });
        });
        //③方法：获取部门数据
       function getDepts(ele){
           //清空
           $(ele).empty();
            $.ajax({
                url:"${APP_PATH}/depts",
                type:"GET",
                success:function (result) {
                   /*code	100    msg	处理成功！
                    extend	{…}  depts	[…]  0	{…}deptId	1   deptName	開發部門
                                              1	{…}   deptId	2   deptName	测试部
                   * */
                    //console.log(result);
                    //显示部门
                    //${"#dept_add_select"}.append("")
                    $.each(result.extend.depts, function () {
                        var optionEle = $("<option></option>")
                            .append(this.deptName).attr("value", this.deptId);
                        optionEle.appendTo(ele);
                    });
                }
            });
       }
        //④方法：获取添加数据进行校验
        function valodate_add_form() {
            //1.拿到要校验的数据
            var empName = $("#empName_add_input").val();
            var regName = /(^[a-zA-Z0-9_-]{6,16}$)|([\u2E80-\u9FFF]{2,5})/;
            if(!regName.test(empName)){
               // alert("用户名应为6-16位英文和数字的组合或者2-5位中文");
                show_validate_msg("#empName_add_input","err","用户名应为6-16位英文和数字的组合或者2-5位中文");
               /* $("#empName_add_input").parent().removeClass("has-success");
                $("#empName_add_input").parent().addClass("has-error");
                $("#empName_add_input").next("span").text("用户名应为6-16位英文和数字的组合或者2-5位中文");*/
                return false;
            }else {
                show_validate_msg("#empName_add_input","success","");
               /* $("#empName_add_input").parent().removeClass("has-error");
                $("#empName_add_input").parent().addClass("has-success");
                $("#empName_add_input").next("span").text("");*/
            }

            //2.校验邮箱
            var email = $("#email_add_input").val();
            var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if(!regEmail.test(email)){
                //alert("邮箱格式不正确");
              /*  $("#email_add_input").parent().removeClass("has-error");
                $("#email_add_input").parent().addClass("has-error");
                $("#email_add_input").next("span").text("邮箱格式不正确");*/
              show_validate_msg("#email_add_input","err","邮箱格式不正确");
                return false;
            }else {
                show_validate_msg("#email_add_input","success","");
                /*$("#email_add_input").parent().removeClass("has-error");
                $("#email_add_input").parent().addClass("has-success");
                $("#email_add_input").next("span").text("");*/
            }
            return true;
        }
        //⑤方法：抽取上面的判断方法,显示校验结果的提示信息
        function show_validate_msg(ele,status,msg){
            $(ele).parent().removeClass("has-error has-success");
            $(ele).next("span").text("");

           if("success"==status){
               $(ele).parent().addClass("has-success");
           }else{
               $(ele).parent().addClass("has-error");
               $(ele).next("span").text(msg);
           }
        }
        //校验用户名是否可用，点击其他地方
        $("#empName_add_input").change(function () {
            //发送ajax请求校验用户名是否可用
            var empName = this.value;
            $.ajax({
                url:"${APP_PATH}/checkuse",
                data:"empName="+empName,
                type:"POST",
                success:function (result) {
                    if(result.code == 100){
                        show_validate_msg("#empName_add_input","success","用户名可用");
                        $("#emp_save_btn").attr("ajax-va","success");
                    }else{
                        show_validate_msg("#empName_add_input","error",result.extend.va_msg);
                        $("#emp_save_btn").attr("ajax-va","error")
                    }
                }

            });
        });
        //点击保存，保存员工
       $("#emp_save_btn").click(function(){
            //1.模拟框中填写的表单数据提交给服务器进行保存
           //1.先对要提交给服务器的数据进行校验
          /* if(!valodate_add_form()){
                return false;
           };*/
           //1、判断之前的ajax用户名校验是否成功了。
           if($(this).attr("ajax-va")=="error"){
                return false;
           }
           //2.发送ajax请求保存员工
          $.ajax({
              url:"${APP_PATH}/emp",
              type:"POST",
              data:$("#empAndModal form").serialize(),
              success:function(result){
                  //alert(result.msg)
                  if(result.code == 100){
                      //员工保存成功，关闭模态框，显示刚才保存的数据
                      $("#empAndModal").modal("hide");
                      to_page(totalRecord)
                  }else{
                      console.log(result);
                      //显示失败信息
                      //有那个错误信息就显示那个错误
                      if(undefined != result.extend.errorFields.email){
                          //在页面显示后台传过来的邮箱错误信息
                          show_validate_msg("#email_add_input","error",result.extend.errorFields.email);
                      }
                      if(undefined != result.extend.errorFields.empName){
                          //在页面显示后台传过来的用户错误信息
                          show_validate_msg("#empName_add_input","error",result.extend.errorFields.empName);
                      }

                  }

              }
          });
       });
       $(document).on("click",".edit_btn",function(){
           //alert("edit");
           //1.查出部门信息，显示部门列表
           getDepts("#empUpdataModal select");
           //2.查出员工信息，显示员工信息
           getEmp($(this).attr("edit-id"))
           //3、把员工的id传递给模拟框的更新按钮
           $("#emp_updata_btn").attr("edit-id",$(this).attr("edit-id"));
           //弹出模态框
           $("#empUpdataModal").modal({
               backdrop:"static"
           });

       });

       //根据id获取员工的信息
        function getEmp(id){
            $.ajax({
                url:"${APP_PATH}/emp/"+id,
                type:"GET",
                success:function (result) {
                    //console.log(result);
                    var empData = result.extend.emp;
                    $("#empName_update_static").text(empData.empName);
                    $("#email_updata_input").val(empData.email);
                    $("#empUpdataModal input[name=gender]").val([empData.gender]);
                    $("#empUpdataModal select").val([empData.dId]);
                }
            });
        }
        //点击更新 更新员工
        $("#emp_updata_btn").click(function () {
            //1.校验邮箱
            var email = $("#email_updata_input").val();
            var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if(!regEmail.test(email)){
                //alert("邮箱格式不正确");
                $("#email_updata_input").parent().removeClass("has-error");
                $("#email_updata_input").parent().addClass("has-error");
                $("#email_updata_input").next("span").text("邮箱格式不正确");
                return false;
            }else {
                $("#email_updata_input").parent().removeClass("has-error");
                $("#email_updata_input").parent().addClass("has-success");
                $("#email_updata_input").next("span").text("");
            }

            //发送Ajax请求
            $.ajax({
                url:"${APP_PATH}/emp/" + $(this).attr("edit-id"),
                type:"PUT",
                data:$("#empUpdataModal form").serialize(),
                //未配置HttpPutFormContentFilter使用如下方法。并用POST
                //data:$("#empUpdataModal form").serialize() + "&_method=PUT",
                success:function (result) {
                    //alert(result.msg);
                    //1.关闭模态框
                    $("#empUpdataModal").modal("hide");
                    //返回修改页面
                    to_page(currentPage);
                    //alert(currentPage);
                }
            });
        });

        //删除员工
        $(document).on("click", ".delete_btn", function () {
            //1.弹出确认对话框
            //得到姓名
            var empName = $(this).parents("tr").find("td:eq(2)").text();
            //得到ID
            var empId = $(this).attr("del-id");
            //确认发送请求
            if(confirm("确认删除【" + empName + "】吗？")){
                $.ajax({
                    url:"${APP_PATH}/emp/" + empId,
                    type:"DELETE",
                    success:function (result) {
                        alert(result.msg);
                        to_page(currentPage);
                    }
                });
            }
        });
        //完成全选/全不选功能
        $("#check_all").click(function(){
            //attr获取checked是undefined；
            //prop修改和读取dom原生的属性；attr获取自定义属性的值
            $(".check_item").prop("checked", $(this).prop("checked"));
        });
        //check_item全选后 check_all选择
        $(document).on("click", ".check_item", function () {
            //判断当前选中的元素是否为5个
            var flag = $(".check_item:checked").length ==  $(".check_item").length;
            $("#check_all").prop("checked", flag);
        });
        //批量删除事件
        $("#emp_delete_all_btn").click(function () {
            //$(".check_item")
            var empNames = "";
            var del_list = "";
            $.each($(".check_item:checked"), function () {
                empNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
                //组装id字符串
                del_list += $(this).parents("tr").find("td:eq(1)").text() + "-";
            });
            //去除多余的逗号
            empNames = empNames.substring(0, empNames.length - 1);
            del_list = del_list.substring(0, del_list.length - 1);
            if(confirm("确认删除【" + empNames + "】吗？")){
                //alert(empNames);
                $.ajax({
                    url:"${APP_PATH}/emp/" + del_list,
                    type:"DELETE",
                    success:function (result) {
                        alert(result.msg);
                        to_page(currentPage);
                    }
                });
            }
        });


    </script>

</body>
</html>





















