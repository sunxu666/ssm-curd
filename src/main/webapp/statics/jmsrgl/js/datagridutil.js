function displayMsg(grid){
	var rows = grid.datagrid("getRows");
	if(rows.length>0){
		grid.datagrid('getPager').pagination({displayMsg:'当前显示从{from}到{to}，共{total}记录。'});}
	else{
		grid.datagrid('getPager').pagination({displayMsg:'没有记录。'});
	}
}

//格式化数值成千分位
function toThousands(num) {
	var result = "";
	var fs = false;
	if (num.substr(0,1) == "-") {
		fs = true;
		num = num.substr(1);
	}
	var xs = "";
	var i = num.indexOf(".");
	if (i >= 0) {
		xs = num.substr(i);
		num = num.substr(0, i);
	}
	
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	if (i >= 0) {
		result = result + xs;
	}
	if (fs) {
		result = "-" + result;
	}
	return result;
}

//格式化数值
function formatNumeric(value, scale) {
	var str = "";
	
	if (typeof(value) != "undefined" && value != null) {
		if (value != 0 && value != 0.00) {
			str = value.toFixed(scale);
			str = toThousands(str);
		}	
	}

	return str;
}

//格式化数值为百分比
function format_percent(value, scale) {
	var str = "";
	var v1 ="";
	if (typeof(value) != "undefined" && value != null) {
		if (value != 0 && value != 0.00) {
			str = value.toFixed(scale);
			str =  str + '%';
			if (value < 0){
				v1 = '<span style="color: green;">'+ str +'</span>';
			}else{
				v1 = '<span style="color: red;">'+ str +'</span>';
			}
			
		}	
	}

	return v1;
}

//默认数值格式化
function numeric_formatter(value, rowData, rowIndex) {
	var scale = 2;
	var s = formatNumeric(value, scale);
	return s;
}

//格式化成整数
function numeric_formatter_0(value, rowData, rowIndex) {
	var scale = 0;
	var s = formatNumeric(value, scale);
	return s;
}

function formatCenter(str){
	var s = str;
	s = '<div align="center"><span style="text-align: center;">' +str+ '</span></div>';
	return s;
}


/**
* EasyUI DataGrid根据字段动态合并单元格
* 参数 tableID 要合并table的id
* 参数 colList 要合并的列,用逗号分隔(例如："name,department,office");
*/
function mergeCellsByField(tableID, colList) {
    var ColArray = colList.split(",");
    var tTable = $("#" + tableID);
    var TableRowCnts = tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
   // var PercolTxt = "";
   // var CurcolTxt = "";
    var alertStr = "";
    //var simplevalue =1;
    for (var j = ColArray.length - 1; j >= 0; j--) {
        PerTxt = "";
        tmpA = 1;
        tmpB = 0;

        for (var i = 0; i <= TableRowCnts; i++) {
            if (i == TableRowCnts) {
                CurTxt = "";
            }
            else  {
                
                
            CurTxt = tTable.datagrid("getRows")[i][ColArray[j]];
            if ((PerTxt == CurTxt)&&(CurTxt!=null)) {
                tmpA += 1;
               if (i==(TableRowCnts-1)){
            	   tTable.datagrid("mergeCells", {
                       index: i+1 - tmpA,
                       field: ColArray[j],　　//合并字段
                       rowspan: tmpA,
                       colspan:null
                   });
               }
            }
            else {
                tmpB += tmpA;
                if (PerTxt!=''){
                	 tTable.datagrid("mergeCells", {
                         index: i - tmpA,
                         field: ColArray[j],　　//合并字段
                         rowspan: tmpA,
                         colspan:null
                     });
                }
              /*  tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
                    index: i - tmpA,
                    field: "Ideparture",
                    rowspan: tmpA,
                    colspan: null
                });*/
               
                tmpA = 1;
            }
            PerTxt = CurTxt;
           
         }
        }
    }
}


/**
* EasyUI DataGrid根据字段动态合并单元格
* 参数 tableID 要合并table的id
* 参数 colList 要合并的列,用逗号分隔(例如："name,department,office");
*/
function mergeCellsByField1(tableID,megercollist) {
  
    var megercolArray = megercollist.split(",");
    var tTable = $("#" + tableID);
    var TableRowCnts = tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
   // var PercolTxt = "";
   // var CurcolTxt = "";
    var alertStr = "";
    //var simplevalue =1;
 
        PerTxt = "";
        tmpA = 1;
        tmpB = 0;

        for (var i = 0; i <= TableRowCnts; i++) {
            if (i == TableRowCnts) {
                CurTxt = "";
            }
            else  {
                
                colfields = tTable.datagrid("getColumnFields");
                var PercolTxt = "";
                var CurcolTxt = "";
                var simplevalue =1;
                for (var k=0;k<colfields.length;k++){
                if (megercolArray[k]==colfields[k]){
					CurcolTxt =tTable.datagrid("getRows")[i][colfields[k]];
					if ((PercolTxt==CurcolTxt)&&(PercolTxt!="")){
						simplevalue +=1;
						if (simplevalue==megercolArray.length){
							 tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
				                    index: i,
				                    field: megercolArray[0],
				                    colspan: simplevalue
				                });
						}else{
						 tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
			                    index: i,
			                    field: megercolArray[k-1],
			                    colspan: simplevalue
			                });
						}
					}else{
						//if (PercolTxt!="")
						 
					}
					PercolTxt = CurcolTxt;
				 }
                }
            
        
         }
        }
    
}




function mergeCellsByField2(tableID, colList,megercollist) {
    var ColArray = colList.split(",");
    var megercolArray = megercollist.split(",");
    var tTable = $("#" + tableID);
    var TableRowCnts = tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
   // var PercolTxt = "";
   // var CurcolTxt = "";
    var alertStr = "";
    //var simplevalue =1;
    for (var j = ColArray.length - 1; j >= 0; j--) {
        PerTxt = "";
        tmpA = 1;
        tmpB = 0;

        for (var i = 0; i <= TableRowCnts; i++) {
            if (i == TableRowCnts) {
                CurTxt = "";
            }
            else  {
            	 colfields = tTable.datagrid("getColumnFields");
                 var PercolTxt = "";
                 var CurcolTxt = "";
                 var simplevalue =1;
                 for (var k=0;k<colfields.length;k++){
                 if (megercolArray[k]==colfields[k]){
 					CurcolTxt =tTable.datagrid("getRows")[i][colfields[k]];
 					if ((PercolTxt==CurcolTxt)&&(PercolTxt!="")){
 						simplevalue +=1;
 						if (simplevalue==megercolArray.length){
 							 tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
 				                    index: i,
 				                    field: megercolArray[0],
 				                    colspan: simplevalue
 				                });
 						}else{
 						 tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
 			                    index: i,
 			                    field: megercolArray[k-1],
 			                    colspan: simplevalue
 			                });
 						}
 					}else{
 						//if (PercolTxt!="")
 						 
 					}
 					PercolTxt = CurcolTxt;
 				 }
                 
                 }    
                
            CurTxt = tTable.datagrid("getRows")[i][ColArray[j]];
            if ((PerTxt == CurTxt)&&(CurTxt!=null)) {
                tmpA += 1;
                var tmp = simplevalue;
                if (i==(TableRowCnts-1)){
             	   tTable.datagrid("mergeCells", {
                        index: i+1 - tmpA,
                        field: ColArray[j],　　//合并字段
                        rowspan: tmpA,
                        colspan:null
                    });
                }
            }
            else {
                tmpB += tmpA;
                if (PerTxt!=''){
                	var simplevalue =1;
                	for (var k=0;k<colfields.length;k++){
                        if (megercolArray[k]==colfields[k]){
        					CurcolTxt =tTable.datagrid("getRows")[i-1][colfields[k]];
        					if ((PercolTxt==CurcolTxt)&&(PercolTxt!="")){
        						simplevalue +=1;
        						
        					}else{
        						//if (PercolTxt!="")
        						 
        					}
        					PercolTxt = CurcolTxt;
        				 }
                        
                        }    
                	
               if (simplevalue!=1) {
            	   //列合并中包含行合并中字段
            	   tTable.datagrid("mergeCells", {
                       index: i - tmpA,
                       field: ColArray[0],　　//合并字段
                       rowspan: tmpA,
                       colspan:simplevalue
                   });
             
               }
               else{	
                tTable.datagrid("mergeCells", {
                    index: i - tmpA,
                    field: ColArray[j],　　//合并字段
                    rowspan: tmpA,
                    colspan:simplevalue
                });
               }
                }
              /*  tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
                    index: i - tmpA,
                    field: "Ideparture",
                    rowspan: tmpA,
                    colspan: null
                });*/
               
                tmpA = 1;
            }
            PerTxt = CurTxt;
         }
        }
    }
}


