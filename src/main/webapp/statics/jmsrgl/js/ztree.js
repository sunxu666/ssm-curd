//****************************************************************
//
//  初始化树函数
//
//****************************************************************				
function initTree(data) {
    var setting = {
	callback : {
	    onClick : zTreeOnClick
	},
	data : {
	    simpleData : {
		enable : true,
		idKey : "id",
		pIdKey : "pId",
		rootPId : "0"
	    },
	    key : {
	    // title: "title"
	    }
	},
	edit : {
	    enable : false
	},
	view : {
	    selectedMulti : false
	}
    };

    $.fn.zTree.init($("#tree"), setting, data.returnObject);

    var treeObj = $.fn.zTree.getZTreeObj("tree");
    treeObj.expandAll(false);
    var nodes = treeObj.getNodes();
    if (nodes.length > 0) {
	treeObj.selectNode(nodes[0], true);
	treeObj.expandNode(nodes[0], true, false, false);
	zTreeOnClick(null, "tree", nodes[0]);
    }
}

function refTreeOnClick(event, treeName, treeNode) {
    selectedNode = treeNode;
    // alert('test');
    btnQuery();
};

function ajaxData(actionUrl, args, name, setting, zTreeOnClick) {
    $.ajax({
	cache : false,
	url : actionUrl,
	type : "post",
	dataType : "json",
	data : args,
	async : true,
	beforeSend : function(XMLHttpRequest) {

	},
	success : function(data, textStatus) {
	    var analyMsg = data;

	    if (analyMsg.code == "0000") {
		initRefTree(name, data, setting, zTreeOnClick);
		return;
	    } else {
		$.messager.alert("友情提醒", analyMsg.msg, "info", function() {
		});
		return;
	    }
	},
	error : function(data, textStatus, errorThrown) {
	    $.messager.alert('友情提醒', data.responseText, 'info', function() {
	    });
	    // alert("网络出错！");
	},
	complete : function(XMLHttpRequest, textStatus) {

	}
    });

}

function ajaxDataFilter(treeId, parentNode, responseData) {
    var data;
    if (responseData) {
	data = responseData.returnObject
    }
    return data;
};

function initRefTree(treeName, data, setting, zTreeOnClick) {

    $.fn.zTree.init($("#" + treeName), setting, data.returnObject);
    var treeObj = $.fn.zTree.getZTreeObj(treeName);
    treeObj.expandAll(false);
    var nodes = treeObj.getNodes();
    if (nodes.length > 0) {
	treeObj.selectNode(nodes[0], true);
	treeObj.expandNode(nodes[0], true, false, false);
	selectedNode = nodes[0];
	if (typeof (zTreeOnClick) == "undefined"||zTreeOnClick==null) {

	} else {
	    zTreeOnClick(null, treeName, selectedNode);
	}
	// treeObj.setting.callback.onClick=(null, treeName, nodes[0]);
	// refTreeOnClick(null, treeName, nodes[0]);
    }
}

function initZTree(url, parameters, treeName, zTreeOnClick, selectedMulti,
	async, autoParam) {
    var setting = {
	check : {
	    enable : false,
	    chkStyle : "checkbox",
	    chkboxType : {
		"Y" : "ps",
		"N" : "ps"
	    }
	},

	data : {
	    simpleData : {
		enable : true,
		idKey : "id",
		pIdKey : "pId",
		rootPId : "0"
	    },
	    key : {
		title : "title"
	    }
	},
	edit : {
	    enable : false
	},
	view : {
	    selectedMulti : false
	},
	async : {
	    autoParam : [],
	    enable : false,
	    url : "",
	    dataFilter : ajaxDataFilter
	},
	callback : {
	    onClick : zTreeOnClick
	}
    };
    if (selectedMulti) {
	setting.view.selectedMulti = true;
	setting.check.enable = true;
	// this.setting.check.chkStyle = "checkbox";
	// this.setting.check.chkboxType = { "Y": "ps", "N": "ps" };
    }
    if (async) {
	setting.async.enable = true;
	setting.async.autoParam = [ autoParam ];
	setting.async.url = url;

    } else {

	$.fn.zTree.init($("#" + treeName), setting);
    }

    ajaxData(url, parameters, treeName, setting, zTreeOnClick);
}