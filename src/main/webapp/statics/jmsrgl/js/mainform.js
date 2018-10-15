var start = new Date();
var curtab = "";
var firstShowMM = true;
var setting;
var tree = null;
var zNodes = [];
function refreshTree(asyncUrl) {
	setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pId"
			}
		},
		checkable : false,
		open:true,
		async : {
			enable : true,
			url : asyncUrl,
			autoParam : [ "name", "id" ],
			type : "post"
		},
		callback : {
			onClick : zTreeOnClick,
			onRightClick : onRightClick,
			onAsyncSuccess: zTreeOnAsyncSuccess
		}
	};
	tree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	

}

function zTreeOnAsyncSuccess(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	//treeObj.expandAll(true);
	
}

// 延时
function delay(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime) {
			return;
		}
	}
}

function onRightClick(event, treeId, treeNode) {
	// 判断点击了tree的“空白”部分，即没有点击到tree节点上
	//if (!treeNode && event.target.tagName.toLowerCase() != "button"
	//		&& $(event.target).parents("a").length == 0) {
	//	tree.cancelSelectedNode();
		// 只显示添加菜单项，这个只是外观上的控制，不能控制到点击事件！菜单项的点击事件还要额外判断！
	//	$('#modifyNode').attr('disabled', true);
	//	$('#delNode').attr('disabled', true);
	//} else 
		$('#addNode').attr('disabled', true);
		$('#delNode').attr('disabled', true);
		if (treeNode && !treeNode.noR) { // 判断点击的是tree节点
			tree.selectNode(treeNode); // 选中tree节点
		//$('#modifyNode').attr('disabled', false);
		//$('#delNode').attr('disabled', false);
		//	if (treeNode.children && treeNode.children.length > 0) { // 这里父节点不能直接删除，也可以在菜单项的click事件中根据当前节点另作判断
		
			//$('#delNode').attr('disabled', true);
			if(!treeNode.isParent){
				if (treeNode.action_url!=""){
					$('#addNode').attr('disabled', false);
				}
				var id=treeNode.id;
				if(id.length>2){
					$('#delNode').attr('disabled', false);
				}
			}
		//}
	}
	// 在ztree右击事件中注册easyui菜单的显示和点击事件，让这两个框架实现共用event，这个是整合的关键点
	$('#mm1').menu(
			{
				onClick : function(item) {
					var nodes = tree.getSelectedNodes();
					var node = nodes[0];
					if (item.id == 'addNode') {
						
						addFunction(node);// alert("新增节点");
					} else if (item.id == 'delNode'
							&& !$('#delNode').attr('disabled')) {
						delMenu(node);
						/*
						 * if (treeNode.children && treeNode.children.length >
						 * 0) { alert("该节点是父节点，还要继续删除么？"); }
						 */
						
						//alert("删除节点");
					}else if (item.id == 'refNode') {
						refreshTree(basePath + '/system/xtmk/iniMenu');
					}
				}
			});
	$('#mm1').menu('show', {
		left : event.pageX,
		top : event.pageY
	});
	
    if (jgjc == '1'){
    	$('#addNode').attr('disabled', true);
    }
	
}

function zTreeOnClick(event, treeId, treeNode) {
	var now = new Date();
	if (now.getTime() - start.getTime() > 600) {
		if (!treeNode.isParent) {
			if (treeNode.menu_type != "0") {
			    if(treeNode.action_url==""){
			    	addTab(treeNode.name, "/blank", "", treeNode.id);
			    }else{
			    	addTab(treeNode.name, treeNode.action_url, "", treeNode.id);
			    	start = now;
				}
			} else {
				openUrl(treeNode.action_url);
			}

		}
	}
	// addTab(treeNode.name,treeNode.action_url,"");

}

$(function() {
	InitLeftMenu();
	
	tabClose();
	tabCloseEven();
	var currTab = $('#tabs').tabs('getSelected');
	$('#tabs').tabs('update', {
		tab : currTab,
		options : {
			content : createFrame('welcome', basePath + '/sysWelcome')
		}
	})

	$('#mm').menu({
		onShow : function(pos) {
			if (firstShowMM) {
				var mask_mm = $("#mm").next();

				var dom_obj = $('#iframebar').clone();
				dom_obj.width(mask_mm.width() - 2);
				dom_obj.height(mask_mm.height() - 2);

				$('#iframebar').remove();

				mask_mm.append(dom_obj);

				firstShowMM = false;
			}
		}
	});
})

// 初始化左侧
function InitLeftMenu() {
	refreshTree(basePath + '/system/xtmk/iniMenu');
}
// 获取左侧导航的图标
function getIcon(menuid) {
	var icon = 'icon ';
	$.each(_menus.menus, function(i, n) {
		$.each(n.menus, function(j, o) {
			if (o.menuid == menuid) {
				icon += o.icon;
			}
		})
	})

	return icon;
}

function openUrl(url) {
	window
			.showModalDialog(
					path  + url,
					"",
					"dialogwidth:"
							+ width
							+ ";dialogheight:"
							+ height
							+ ";help=no;status=no;center=yes;edge=sunken;resizable=yes;Minimize=no;Maximize=no");
}

function addTab(subtitle, url, icon, id) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(id, path + url),
			closable : true,
			icon : icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		// 刷新
		// $('#mm-tabupdate').click();
	}
	curtab = subtitle;
	tabClose();
}

function selectTab(subtitle) {
	$('#tabs').tabs('select', subtitle);
}
//关闭当前tab
function closeCurrentTab(){
	var tab = $('#tabs').tabs('getSelected'); 
	var subtitle=$('.tabs-selected').text();
	$('#tabs').tabs('close', subtitle);
}




function createFrame(id, url) {
	var s = '<iframe id="' + id + '" scrolling="auto" frameborder="0"  src='
			 + url + ' " style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	})
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		var id = $(currTab.panel('options').content).attr('id');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(id, url)
			}
		})
	})
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != "我的桌面")
				$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			// alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != "我的桌面")
				$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			// alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != "我的桌面")
				$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	})
}

// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function addFunction(node) {
//	var s = $(window.frames["welcome"].document).find("#functionList");
//	s.append("<li id='" + id + "'style='HEIGHT: 200px'>" + name
//			+ "<input type='button' onclick=\"javascript:del('" + id
//			+ "');\"> </li>");
//	
	
	$.ajax({
  		type:"POST",
  		url:path+ "/system/xtmk/addKjfs",
  		data:{code:node.id},
 		dataType:"json",
 		success:function callback(data){ 
 			var analyMsg = data;
 			//$.messager.alert("友情提醒",analyMsg.msg,"info",function(){});  
 			if(analyMsg.code=="0000"){
 				var s = $(window.frames["welcome"].document).find("#functionList");
 				s.append("<li id='" + node.id + "'style='HEIGHT: auto'>"
 						+ "<input type='image' src='images/u4_original_1.png' onclick=\"open1('" + node.name +"','"+node.action_url+"','','"+node.id+"');\">"
 						+ "<input type='image' src='images/remove.png' onclick=\"delKjfs('" + node.id + "');\">"
 						+ "<br><a>" + node.name +"</a>"
 						+ "</li>");
 			}else if(analyMsg.code=="0001"){
 				$.messager.alert("友情提醒",analyMsg.msg,"info",function(){});  
 			}else{
 				alert("增加菜单失败！");
 			}         			       							         		
 		},
 		error:function(data,textstatus){
			alert(data.responseText);
		}
		});   
	

}

function delMenu(node){
	$.ajax({
  		type:"POST",
  		url:path+ "/system/xtmk/delYhmk",
  		data:{code:node.id},
 		dataType:"json",
 		success:function callback(data){ 
 			var analyMsg = data;
 			$.messager.alert("友情提醒",analyMsg.msg,"info",function(){});  
 			if(analyMsg.code=="0000"){
 				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
 				//beforeRemove("#treeDemo",node);
 				treeObj.removeNode(node);
 				$(window.frames["welcome"].document).find("#"+node.id).remove();
 			}else{
 				alert("删除菜单失败！");
 			}         			       							         		
 		},
 		error:function(data,textstatus){
			alert(data.responseText);
		}
		});   
	
	
	
}
