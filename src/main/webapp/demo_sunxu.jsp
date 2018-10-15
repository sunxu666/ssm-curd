<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>监狱系统</title>
	<link href="/statics/css/admin.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" href="/statics/css/style.css" />
	<script type="text/javascript" src="statics/js/jquery-1.8.3.min.js"></script>
<style type="">
.h2_ch a:hover, .h2_ch a.here {
    color: #FFF;
    font-weight: bold;
    background-position: 0px -32px;
}
.h2_ch a {
    float: left;
    height: 32px;
    margin-right: -1px;
    padding: 0px 16px;
    line-height: 32px;
    font-size: 14px;
    font-weight: normal;
    border: 1px solid #C5C5C5;
    background: url('/statics/images/bg_ch.gif') repeat-x scroll 0% 0% transparent;
}
a {
    color: #06C;
    text-decoration: none;
}
</style>
<script type="text/javascript">
//点击标签时，标签变class为蓝并显示，其他为白并隐藏；
$(function(){
	var tObj;
	$("#tabs a").each(function(){
		if($(this).attr("class").indexOf("here") == 0){tObj = $(this)}
		$(this).click(function(){
			var c = $(this).attr("class");
			if(c.indexOf("here") == 0){return;}
			var ref = $(this).attr("ref");
			var ref_t = tObj.attr("ref");
			tObj.attr("class","nor");
			$(this).attr("class","here");
			$(ref_t).hide();
			$(ref).show();
			tObj = $(this);
			
		});
	});
});

</script>
</head>
<body>

<h2 class="h2_ch"><span id="tabs">
<a href="javascript:void(0);" ref="#tab_1" title="基本信息" class="here">基本信息</a>
<a href="javascript:void(0);" ref="#tab_2" title="犯人情况" class="nor">犯人情况</a>
<a href="javascript:void(0);" ref="#tab_3" title="犯人谁谁" class="nor">犯人谁谁</a>
<a href="javascript:void(0);" ref="#tab_4" title="李大鹏日" class="nor">李大鹏日</a>
</span></h2>
<div class="body-box" style="float:right">
	<form id="jvForm" action="add.do" method="post" enctype="multipart/form-data">
		<table cellspacing="1" cellpadding="2" width="100%" border="0" class="pn-ftable">
			<tbody id="tab_1" style="">
				<tr>
					<th>1</th>
					<th>2</th>
					<th>3</th>
					<th>4</th>
					<th>5</th>
					<th>6</th>

				</tr>
				<tr>
					<td>表一</td>
					<td>表一</td>
					<td>表一</td>
					<td>表一</td>
					<td>表一</td>
					<td>表一</td>
				</tr>
			</tbody>
			<tbody id="tab_2" style="display: none">
			<tr>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>

			</tr>
			<tr>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>

			</tr>
			</tbody>
			<tbody id="tab_3" style="display: none">
				<tr>
				<tr>
					<td>你</td>
					<td>大</td>
					<td>也</td>
					<td>大大</td>
					<td>ad</td>
					<td>表一</td>
				</tr>
				</tr>
			</tbody>
			<tbody id="tab_4" style="display: none">
				<tr>
					<td>
						4444
					</td>

				</tr>
			</tbody>
			<tbody>
				<tr>
					<td class="pn-fbutton" colspan="2">
						<input type="submit" class="submit" value="提交"/> &nbsp; <input type="reset" class="reset" value="重置"/>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>
</body>
</html>