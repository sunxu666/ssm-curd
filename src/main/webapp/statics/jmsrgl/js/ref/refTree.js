var selectedNode = "";
/**
 * var swjg2=new refTree('swjg','税务机关单选');
 * var object=new Object();
		    object.sjswjg_dm='25100000000';
		    swjg2.url=path+'/system/swjg/getTreeData';
		    swjg2.parameters=object;
		    swjg2.callBack=refCallBack2;
		    swjg2.singleLoad=0;
		    swjg2.init();
 * 
 * swjg2.openRef();
 * 
 * 
 * 
 * 
 */
var refTree = function(treeName,title) {
    //ztree的id
    this.treeName = treeName;
    //对话框名称
    this.refDlgName = treeName + 'Dlg';
    //回调函数
    this.callBack;
    //参照是否打开过
    this.opened = false;
    //数据查询URL
    this.url="";
    //数据查询参数
    this.parameters= new Object();
    this.returnObject=new Object();
    //对话框标题
    this.title=title;
    //是否多选
    this.selectedMulti=false;
    //是否单次加载数据
    this.singleLoad=true;
    this.setting;
    //是否返回父節點
    this.returnParent=false;
    //異步加載
    this.async=false;
    //異步加載參數
    this.autoParam="";
    
    this.init=function(){
	this.initRefDlg();
	this.setting = {
		check: {
		        enable: false,
		        chkStyle: "checkbox",
		        chkboxType: { "Y": "ps", "N": "ps" }
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
		async:{  
		        autoParam:[],  
		        enable:false,  
		        url:"",
		        dataFilter: ajaxDataFilter
		    },  
		callback : {
		    //onClick : refTreeOnClick
		}
	    };
	 if(this.selectedMulti){
	     this.setting.view.selectedMulti=true;
	     this.setting.check.enable=true;
	    // this.setting.check.chkStyle = "checkbox";
	     //this.setting.check.chkboxType =  { "Y": "ps", "N": "ps" };
	 }
	if(this.async){
	    this.setting.async.enable=true;
	    this.setting.async.autoParam=[this.autoParam];
	    this.setting.async.url=this.url;
	    
	}else{
	 
	$.fn.zTree.init($("#" + this.treeName), this.setting);}
    }


    this.openRef = function() {
	if(this.singleLoad){
	    if (!this.opened ) {
        	this.opened = true;
        	ajaxData(this.url, this.parameters, this.treeName,this.setting);
	    }
	}else{
	    ajaxData(this.url, this.parameters, this.treeName,this.setting);   
	}
	$('#' + this.refDlgName).dialog('open');
    }

    this.createElement = function() {
	var div = '<div id="'
		+ this.refDlgName
		+ '" title="'+this.title+'参照" closed="true" style="width: 550px; height: 400px; display: none;">'
		+ '<div >' + '<ul id="' + this.treeName
		+ '" class="ztree" style="width: 90%; height: 90%;"></ul>'
		+ '</div>' + '</div>'
	$(document.body).append(div);

    }
    /**
     * 
     */
    this.initRefDlg = function() {
	this.createElement();
	var name=this.refDlgName;
	var callBack=this.callBack;
	$("#" + this.refDlgName).show();
	$("#" + this.refDlgName).dialog({
	    iconCls : "icon-add",
	    modal : true,
	    buttons : [ {
		text : "确定",
		iconCls : "icon-ok",
		handler : function() {
		     $("#"+name).dialog("close");
		     callBack();
		}
	    } ],
	    onOpen : function() {
		isNeedReload = false;
	    },
	    onClose : function() {
		if (isNeedReload && isQueryed) {
		    btnQuery();
		}
	    }
	});
    }
    
    this.getReturnData=function(){
	var treeObj  = $.fn.zTree.getZTreeObj(this.treeName);
	
	if (this.selectedMulti==1){
	    var checkNodes = treeObj.getCheckedNodes(true);
    	    if (checkNodes!=null && checkNodes.length>0){
    		if(this.returnParent){
    		    return checkNodes;
    		}else{
    		    var selectNodes=new Array();
    		    for(var i=0; i<checkNodes.length; i++){
			if(checkNodes[i].check_Child_State < 0){
			    selectNodes.push(checkNodes[i]);
			} 
    		    }
    		    return selectNodes;
    		}
    		
            }else{
            	$.messager.alert('友情提醒','请选择一个项目','info',function(){});
        	return;
            }
	}else{
	    var selectNode=treeObj .getSelectedNodes();
		if(selectNode!=null ){
			return selectNode;
		}else{
		    $.messager.alert('友情提醒','请选择一个项目','info',function(){});
		    return;  
		}		
		
	}
    }

}