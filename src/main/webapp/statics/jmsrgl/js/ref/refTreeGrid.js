

var refTreeGrid=function(name,title,columns){
    this.gridName = "grid_"+name;
    this.treeName = "tree_"+name;
    this.title = title;
    this.columns = columns;
    //对话框名称
    this.refDlgName = name + 'Dlg';
    //回调函数
    this.callBack;
    this.opened = false;
    //数据查询URL
    this.url="";
    this.gridUrl="";
    //数据查询参数
    this.parameters= new Object();
    //数据查询参数
    this.gridParameters= new Object();
    //是否多选
    this.selectedMulti=false;
    //是否单次加载数据
    this.singleLoad=true;
    //是否分頁
    this.page=false;
    //異步加載
    this.async=false;
    //異步加載參數
    this.autoParam="";
    //grid對象
    this.grid;
    this.tree;
    this.setting;

    this.init=function(){
	this.initRefDlg();
	
	var tree=$("#"+this.treeName);
	var grid=$("#"+this.gridName);
	var para=this.gridParameters;
	var url = this.gridUrl;
	var page=this.page;
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
		    onClick : function(event, treeName, treeNode){
			    var id=treeNode.id
			    para[para.related]=id;
			    if(page){
				
			        getPage(grid, para, url);
			    }else{
			        getData(grid, para, url);
			    }   
			
		    }
		}
	    };

	if(this.async){
	    this.setting.async.enable=true;
	    this.setting.async.autoParam=[this.autoParam];
	    this.setting.async.url=this.url;
	    
	}else{}
	 
	$.fn.zTree.init($("#" + this.treeName), this.setting);
	
	//初始化grid
	this.grid=$("#"+this.gridName);
	if(this.page&&this.selectedMulti){
	    //分页多选
	    initPageGridWithCheck(this.grid,this.gridParameters, this.gridUrl,this.columns);
	}else if(this.page&&!(this.selectedMulti)){
	    //分页单选
	    initPageGrid(this.grid,this.gridParameters, this.gridUrl,this.columns);
	}else if(!(this.page)&&this.selectedMulti){
	    //不分页多选
	    initGridWithCheck(this.grid,this.columns);
	}else if(!(this.page)&&!(this.selectedMulti)){
	   // 不分页多选
	    initGrid(this.grid,this.columns);
	}else{
	    alert("错误的参数！");
	}
    
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
	var div = '<div id="'+ this.refDlgName
		+ '" title="'+this.title+'参照" closed="true" style="width: 800px; height: 600px; display: none;">'
		+ '	<div id="'+this.refDlgName+'layout'+'"  fit="true"  border="false">'
		+ '<div id="divNorth" region="north" title="查询条件" border="true" noheader="false" style="padding: 5px; height: 66px; background: none repeat scroll 0 0 #EFEFEF;">'
		+ '<input id="typeName" style="width: 200px" />'
		+ '<input type="button" id="query"  />'
		+ '</div>' 
		+ '	<div region="west" title="报表表页" border="true" noheader="false" split="true" style="width: 300px;">'
		+ '		<div>	'	    		
		+ '	    	  <ul id="'+this.treeName+'" class="ztree" style="width: 90%; height: 90%;"></ul>'
		+ '	    	</div>'
		+ '	</div>	'		 	
		+ '	   <div region="center" title="信息" border="true" noheader="false" split="true" style="width: 300px;">'
		+ '	        <table id="'+this.gridName+'" title="实体列表"></table>'
		+ '	    </div>'
		+ '    </div>'
		+ '</div>';
	$(document.body).append(div);

    }
    
    
    this.initRefDlg = function() {
	this.createElement();
	var name=this.refDlgName;
	var callBack=this.callBack;
	$("#" + this.refDlgName+'layout').layout();  
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
    


} 