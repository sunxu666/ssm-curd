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

    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/default/tree.css"/>
    <link rel="stylesheet" type="text/css" href="statics/jquery-easyui-1.2.4/themes/icon.css"/>
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="statics/jquery-easyui-1.2.4/jquery.easyui.min.js"></script>


</head>
<body>


<%--显示表格数据--%>

<table id="emps_table" style="height: 500px;"></table>


<script type="text/javascript">
    var totalRecord, currentPage;

    //1.页面加载完成以后，直接去发动一个ajax请求，要到分页数据
    $(function () {


        //初始化表格
        initGrid();
        to_page();
    });
    //①②③④⑤⑥⑦⑧⑨⑩
    //①方法：跳转到那个页面
    function to_page() {
        var page = $('#emps_table').datagrid('getPager');
        var datagrid_option = $('#emps_table').datagrid('options');
        var option = page.pagination("options");
        var pn = new Object();
        pn.pageSize = option.pageSize;
        pn.pageNumber = option.pageNumber;
        pn.order = datagrid_option.sortName+' '+datagrid_option.sortOrder;
        $.ajax({
            url: "${APP_PATH}/emps",
            data: pn,
            type: "GET",
            success: function (result) {
                console.log(result);

                var data = result.extend.pageInfo.list;


                if (result.code != 100) {
                    alert('获取数据时发生错误：' + result.msg);
                } else {
                    $("#emps_table").datagrid("loadData", data);
                    $("#emps_table").datagrid("resize", {height: 1});
                    $('#emps_table').datagrid('getPager').pagination({
                        total : result.extend.pageInfo.total,
                        pageSize: result.extend.pageInfo.pageSize,
                        pageNumber:result.extend.pageInfo.pageNum,

                        onSelectPage: function (pageNumber, pageSize) {
                            to_page();
                        }
                    });
                    isQueryed = true;
                }
            }
        });
    }

    //初始化表格
    function initGrid() {
        $('#emps_table').datagrid({
            fit: true,
            // height:500,
            // nowrap:false,
            striped: true,
            singleSelect: true,
            //分页条
            pagination: true,
            pageList: [10, 20, 30],
            rownumbers: true,
            idField: "",
            toolbar: '',
            columns: [[
                {title: '用户名称', field: 'empName', width: '120', align: 'center',sortable:true},
                {title: '性别', field: 'gender', width: '200', align: 'center'},
                {title: '邮箱', field: 'email', width: '100', align: 'center'}
            ]],
            onLoadSuccess: function () {
                // easyui.datagrid.headcenter();


            },
            //按字段名升降序
            onSortColumn: function(sort, order) {
                console.log(sort+'-----'+order);
                var datagrid_option = $('#emps_table').datagrid('options');
                datagrid_option.sortName=sort;
                datagrid_option.sortOrder=order;
              // var condition = sort+" "+order;
                to_page();

        }

        });

        $('#emps_table').datagrid("loadData", []);
    }


    //获取表格数据
    // function build_emps_table(result) {
    //     var data = result.extend.pageInfo.list;
    //
    //
    //     if (result.code != 100) {
    //         alert('获取数据时发生错误：' + result.msg);
    //     } else {
    //         $("#emps_table").datagrid("loadData", data);
    //         $("#emps_table").datagrid("resize", {height: 1});
    //         $('#emps_table').datagrid('getPager').pagination({
    //
    //             pageSize: 5,
    //             pageNumber: 5,
    //             pageList: [10, 20, 30],
    //             onSelectPage: function (pageNumber, pageSize) {
    //
    //             }
    //         });
    //         isQueryed = true;
    //     }
    //
    // }


    //①方法下调用的--2.解析显示分页信息
    function build_page_info(result) {
        $("#page_info_area").empty();
        $("#page_info_area").append(
            "当前" + result.extend.pageInfo.pageNum + "页,总" +
            result.extend.pageInfo.pages + "页,总共" +
            result.extend.pageInfo.total + "条记录"
        );
        totalRecord = result.extend.pageInfo.total;
        currentPage = result.extend.pageInfo.pageNum;
    }

    //①方法下调用的--3.解析显示分页条
    function build_page_nav(result) {
        $("#page_nav_area").empty();
        var ul = $("<ul></ul>").addClass("pagination");
        //构建元素
        var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
        var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
        if (result.extend.pageInfo.hasPreviousPage == false) {
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
        if (result.extend.pageInfo.hasNextPage == false) {
            nextPageLi.addClass("disabled");
            lastPageLi.addClass("disabled");
        } else {
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
            if (result.extend.pageInfo.pageNum == item) {
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
    function reset_form(ele) {
        //表单数据
        $(ele)[0].reset();
        //清空表单样式
        $(ele).find("*").removeClass("has-error has-success");
        $(ele).find(".help-block").text("");
    }


</script>

</body>
</html>





















