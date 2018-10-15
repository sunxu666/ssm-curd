

var refGrid=function(gridName,title,columns){
    this.gridName = gridName;
    this.title = title;
    this.columns = columns;
    //对话框名称
    this.refDlgName = gridName + 'Dlg';
    //回调函数
    this.callBack;
    this.opened = false;
    //数据查询URL
    this.url="";
    //数据查询参数
    this.parameters= new Object();
    //是否多选
    this.selectedMulti=false;
    //是否单次加载数据
    this.singleLoad=true;
    //是否分頁
    this.page=false;
    //grid對象
    this.grid;
    
    this.init=function(){
	this.initRefDlg();
	this.grid=$("#"+this.gridName);
	if(this.page&&this.selectedMulti){
	    //分页多选
	    initPageGridWithCheck(this.grid,this.parameters, this.url,this.columns);
	}else if(this.page&&!(this.selectedMulti)){
	    //分页单选
	    initPageGrid(this.grid,this.parameters, this.url,this.columns);
	}else if(!(this.page)&&this.selectedMulti){
	    //不分页多选
	    initGridWithCheck(this.grid,this.columns);
	}else if(!(this.page)&&!(this.selectedMulti)){
	   // 不分页多选
	    initGrid(this.grid,this.columns);
	}else{
	    alert("错误的参数！");
	}
	
	
	this.initSearchbox();
    }
    
    
    this.openRef = function() {
	if(this.singleLoad){
	    if (!this.opened ) {
        	this.opened = true;
        	if(this.page){
        	    getPage(this.grid, this.parameters, this.url);
        	}else{
        	    getData(this.grid, this.parameters, this.url);
        	}    
	    }
	}else{
	    if(this.page){
		    getPage(this.grid, this.parameters, this.url);
        	}else{
        	    getData(this.grid, this.parameters, this.url);
        	}    
	    
	}
	$('#' + this.refDlgName).dialog('open');
    }
    
    this.createElement = function() {
	var div = '<div id="'
		+ this.refDlgName
		+ '" title="'+this.title+'参照" closed="true" style="width: 550px; height: 400px; display: none;">'
		+ '<div id="'+this.refDlgName+'layout'+'" class="easyui-layout" fit="true">'
		+ '<div region="north" border="false" style="border-bottom:1px solid #ddd;height:40px;padding:2px 5px;background:#fafafa;">'
		+ '    <div style="float:left;">'
		+ ' <input id="ss" class="easyui-searchbox" style="width:300px" ></input>  '
		+ '   </div>'
	        + '</div>'
	        + '<div region="center" border="false">'
	        + '    <table id="'+this.gridName+'" title="'+this.title+'列表"></table>'
	        + ' </div>'
	        + '</div>'
	        + '<div id="ssmm" style="width:120px"></div>'
		
		
		+ '</div>'
	$(document.body).append(div);

    }
    this.initSearchbox = function() {
	var grid=this.grid;
	var param=this.parameters;
	var url=this.url;
	
	var fields =grid.datagrid('getColumnFields');
	for(var i=0; i<fields.length; i++){
	var opts = grid.datagrid('getColumnOption', fields[i]);  
	var muit = "<div name='"+  fields[i] +"'>"+ opts.title +"</div>";
	$('#ssmm').html($('#ssmm').html()+muit);
	}
	
	$('#ss').searchbox({   
	    searcher:function(value,name){   
	        alert(value + "," + name)  ;
	        param[name]=value;
		getPage(grid, param, url);
		//param[name]="";
	    },   
	    menu:'#ssmm', 
	    prompt:'Please Input Value'  
	});  
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
    
    this.getReturnData=function(){
	if (!this.selectedMulti){
	    var row = this.grid.datagrid('getSelected');
	   
    	    if (row){
    		return row;
            }else{
            	$.messager.alert('友情提醒','请选择一个项目','info',function(){});
        	return;
            }
	}else{
	    var rows = this.grid.datagrid('getSelections');
		if(rows.length>0){
		    return rows;
		}else{
		    $.messager.alert('友情提醒','请选择一个项目','info',function(){});
		    return;  
		}		
		
	}
    }


}