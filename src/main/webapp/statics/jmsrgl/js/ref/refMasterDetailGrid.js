

var refMasterDetailGrid=function(gridName,title){
    this.MasterGridName = gridName+"Master";
    this.DetailGridName = gridName+"Detail";
    this.title = title;
    this.masterCol ;
    this.DetailCol;
    //对话框名称
    this.refDlgName = gridName + 'Dlg';
    //回调函数
    this.callBack;
    this.opened = false;
    //数据查询URL
    this.url="";
    this.DetailUrl="";
    //数据查询参数
    this.parameters= new Object();
    this.detailPara= new Object();
    //主子表关联字段relatedM主表字段   relatedD子表字段
    this.relatedD="";
    this.relatedM="";
    //是否多选
    this.selectedMulti=false;
    //是否单次加载数据
    this.singleLoad=true;
    //是否分頁
    this.page=false;
    //grid對象
    this.masterGrid;
    this.detailGrid;
    
    this.init=function(){
	this.initRefDlg();
	this.masterGrid=$("#"+this.MasterGridName);
	this.detailGrid=$("#"+this.DetailGridName);
	if(this.page){
	    //分页单选
	    initPageGrid(this.masterGrid,this.parameters, this.url,this.masterCol);
	}else if(!(this.page)){
	   // 不分页单选
	    initGrid(this.masterGrid,this.masterCol);
	}else{
	    alert("错误的参数！");
	}
	

	
	if(this.selectedMulti){
	    //分页多选
	    initPageGridWithCheck(this.detailGrid,this.detailPara, this.DetailUrl,this.DetailCol);
	}else if(!(this.selectedMulti)){
	    //分页单选
	    initPageGrid(this.detailGrid,this.detailPara, this.DetailUrl,this.DetailCol);
	}else{
	    alert("错误的参数！");
	}
	
	this.initSearchbox();
	
	var detail=this.detailGrid;
	var detailUrl=this.DetailUrl;
	var detailPara=this.detailPara;
	var relatedD = this.relatedD;
	var relatedM = this.relatedM;
	
	var gridOptions = this.masterGrid.datagrid("options");
	gridOptions.onSelect=function(rowIndex, rowData){
		
		detailPara[relatedD]=rowData[relatedM];
		detailPara.pageNumber=1;
		getPage(detail, detailPara, detailUrl);	
		}
	

    }
    
    
    this.openRef = function() {
	if(this.singleLoad){
	    if (!this.opened ) {
        	this.opened = true;
        	if(this.page){
        	    getPage(this.masterGrid, this.parameters, this.url);
        	}else{
        	    getData(this.masterGrid, this.parameters, this.url);
        	}   
        	getPage(this.detailGrid, this.detailPara, this.DetailUrl);	
	    }
	}else{
	    if(this.page){
		    getPage(this.masterGrid, this.parameters, this.url);
        	}else{
        	    getData(this.masterGrid, this.parameters, this.url);
        	}
	    getPage(this.detailGrid, this.detailPara, this.DetailUrl);	
	    
	}
	$('#' + this.refDlgName).dialog('open');
    }
    
    this.createElement = function() {
	var div = '<div id="'
		+ this.refDlgName
		+ '" title="'+this.title+'参照" closed="true" style="width: 700px; height: 500px; display: none;">'
		+ '<div id="'+this.refDlgName+'layout'+'" class="easyui-layout" fit="true">'
		+ '<div region="north" border="false" style="border-bottom:1px solid #ddd;height:40px;padding:2px 5px;background:#fafafa;">'
		+ '    <div style="float:left;">'
		+ ' <input id="MDss" class="easyui-searchbox" style="width:350px" ></input>  '
		+ '   </div>'
	        + '</div>'
	        + '<div region="center" border="false" style="height:260px;">'
	        + '    <table id="'+this.MasterGridName+'" title="'+this.title+'列表"></table>'
	        + ' </div>'
	        + '<div border="false"  data-options="region:\'south\',title:\'明细信息\',split:true" style="height:200px;">'
	        + '    <table id="'+this.DetailGridName+'" title="'+this.title+'列表"></table>'
	        + ' </div>'
	        + '</div>'
	        + '<div id="MDssmm" style="width:120px"></div>'
		
		
		+ '</div>'
	$(document.body).append(div);

    }
    this.initSearchbox = function() {
	var grid=this.masterGrid;
	var param=this.parameters;
	var url=this.url;
	
	var fields =grid.datagrid('getColumnFields');
	for(var i=0; i<fields.length; i++){
	var opts = grid.datagrid('getColumnOption', fields[i]);  
	var muit = "<div name='"+  fields[i] +"'>"+ opts.title +"</div>";
	$('#MDssmm').html($('#MDssmm').html()+muit);
	}
	
	$('#MDss').searchbox({   
	    searcher:function(value,name){   
	        //alert(value + "," + name)  ;
	        param[name]=value;
		getPage(grid, param, url);
		//param[name]="";
	    },   
	    menu:'#MDssmm', 
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
	    var row = this.detailGrid.datagrid('getSelected');
	   
    	    if (row){
    		return row;
            }else{
            	$.messager.alert('友情提醒','请选择一个项目','info',function(){});
        	return;
            }
	}else{
	    var rows = this.detailGrid.datagrid('getSelections');
		if(rows.length>0){
		    return rows;
		}else{
		    $.messager.alert('友情提醒','请选择一个项目','info',function(){});
		    return;  
		}		
		
	}
    }


}