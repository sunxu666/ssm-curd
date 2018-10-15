 		var row_main = 0;
 		var row_mx = 0;
 		var url_action = "";
		var sfnd = 'Y'
		var gd_title = '';		//当年表格需要显示的表头字符串
		var gd_field = '';		//当前数据的字段列表串
		var gd_type  = '';     	//当前数据的字段数据类型列表串  
		var dm_field = '';		//当前数据需要显示的字段列表串
		var tb_name  = '';    	//当前模块的数据表名
		var tb_id = '';			//钻取时的grid的ID
		var jdxz_dm = '';     	//选中行的的确代码 
		var mk_info = {};	  	//菜单信息对象	
		var sField = '';      	//人员明细点击的字段名 
		var nsrsbh = '';        //选中企业的纳税人识别码
		var row_total = 0;
		var sumfield ='';
		var ccdm;
		$(function(){
 			document.getElementById('output1').style.marginLeft="51px";
 			document.getElementById('output1').style.marginTop="5px";
 			document.getElementById('output2').style.marginLeft="51px";
 		 	document.getElementById('output2').style.marginTop="5px";
 		 	document.getElementById('output3').style.marginLeft="51px";
 		 	document.getElementById('output3').style.marginTop="5px";
 		 	document.getElementById('output4').style.marginLeft="51px";
 		 	document.getElementById('output4').style.marginTop="5px";
		}); 
		
		//获取维护表信息
		function geturl(){
			 var gd_fdlist_sr;
			 var gd_title_sr;
			 var gd_type_sr;
			 var gd_fdlist_ry;
			 var gd_title_ry;
			 var gd_type_ry ;
			 var gdinfo_list =eval(gd_info);
			 for (var i=0;i<gdinfo_list.length;i++){
				 if (gdinfo_list[i].YQ==yq){
					 mkdm = gdinfo_list[i].MK_DM;
					 params.mkdm = mkdm;
					 gd_fdlist_sr = gdinfo_list[i].GD_FDLIST_SR;
					 gd_title_sr  = gdinfo_list[i].GD_TITLE_SR;
					 gd_type_sr  = gdinfo_list[i].GD_TPLIST_SR;
					 gd_fdlist_ry = gdinfo_list[i].GD_FDLIST_RY;
					 gd_title_ry  = gdinfo_list[i].GD_TITLE_RY;
					 gd_type_ry  = gdinfo_list[i].GD_TPLIST_RY;
				 }
			 }
			 if (cxlb=='01'){
				 gd_field = gd_fdlist_sr;
				 gd_title  = gd_title_sr;
				 gd_type = gd_type_sr;
			 }else{
				 gd_field = gd_fdlist_ry;
				 gd_title  = gd_title_ry; 
				 gd_type = gd_type_ry;
			 }
		}
		
		 //关闭一级grid
		 function closegrid(){
			 document.getElementById('popDiv_main').style.display='none';
			 document.getElementById('bg_main').style.display='none';
			 document.getElementById('popIframe_main').style.display='none';
//			 del_radiobutton();
		 }
		//关闭二级grid
		 function closemxgrid(iflag){
			 document.getElementById('popDiv_mx').style.display='none';
			 document.getElementById('bg_mx').style.display='none';
			 document.getElementById('popIframe_mx').style.display='none';
			 if (iflag == 0){
				 showgrid(1);
			 }
			 tb_id = '';
		 }
		//关闭人员明细grid
		 function closerygrid(iflag){
			 document.getElementById('popDiv_ry').style.display='none';
			 document.getElementById('bg_ry').style.display='none';
			 document.getElementById('popIframe_ry').style.display='none';
			 
			 if (ccdm == 2){
				 document.getElementById('popDiv_qy').style.display='block';
				 document.getElementById('popIframe_qy').style.display='block';
				 document.getElementById('bg_qy').style.display='block';
			 } else{
				 if (iflag == 0){
					 closeqygrid(1);
					 if (jdxz_dm.length > 6){
						 jdxz_dm = jdxz_dm.substring(1, 6);
					 }
				 } else if (iflag == 1){
					 closegrid();
					 closemxgrid(1);
				 }
			 }
			 tb_id = '';	 
		 }
		//关闭企业明细grid
		 function closeqygrid(iflag){
			 document.getElementById('popDiv_qy').style.display='none';
			 document.getElementById('bg_qy').style.display='none';
			 document.getElementById('popIframe_qy').style.display='none';
			 if (iflag == 0){
				 if (tb_id == "data_list_main") {
				 }else {
					var tb_list = tb_name.split("_");
		        	var tb_part = tb_list[1];	
		        	
		        	if ((tb_part == "rjsrbq") || ((tb_part == "rywdxbq"))) {
		        		
		        	}else {
		        		showmxgrid();
		        	}
				 }
			 } else {
				 
			 }
			 tb_id = '';
		 }
		 
		
		//显示一级grid及数据
		function showgrid(iflag){
			 document.getElementById('popDiv_main').style.display='block';
			 document.getElementById('popIframe_main').style.display='block';
			 document.getElementById('bg_main').style.display='block';
			 if (iflag == 0){
				 geturl();
				 document.getElementById('leftTop_main').innerText = main_title + "-" + yqmc;
				 addtbtitle("tr_list_main");
				 getgriddata(1);
				 $(".hide_dm").hide();
			 }
		 }
		
		//获取一级grid数据
		 function getgriddata(type_data){ 						
			 var func;
			 params.data='1';
			 params.ccdm = type_data;
			 params.pageNo =1;
			 params.pageSize =7;
			 if (params.hasOwnProperty("xmdm")){
				 delete params.xmdm;
			 }
			 
		     ajaxJson(url, params,func);
			 var objdata = eval(returndata.rows);
			 setPage('data_list_main','page_main',total,params.pageSize,1,10);
			 dataclear('data_list_main');
		     for (var i=0;i<objdata.length;i++){
		    	  var data_line = new Object();
		    	  data_line = objdata[i];
		    	  addrow(data_line,i,'data_list_main',type_data);
		    }
		     var tp_list = gd_type.split(",");
		     if (returndata.sum!=null){
		    	 applyTableSum("data_list_main",1,tp_list.length,type_data,returndata.sum);
		     }
		     
		     $('#data_list_main > tbody tr:odd').css('background','#31528d'); 
		     
		 }
		
		 //显示二级grid及数据
		 function showmxgrid(){
			 document.getElementById('output2').style.marginLeft="51px";
	 		 document.getElementById('output2').style.marginTop="5px";
			 document.getElementById('popDiv_mx').style.display='block';
			 document.getElementById('popIframe_mx').style.display='block';
			 document.getElementById('bg_mx').style.display='block';
			 if (yq == "dq"){
				 document.getElementById('leftTop_mx').innerText =  main_title + "-" + yqmc + '-乡镇街道' ;
			 } else if  (yq == "hy"){
				 document.getElementById('leftTop_mx').innerText =  main_title + "-" + yqmc + '-行业门类' ;
			 }
			 closegrid();
			 var line_row = 0;
			 obj = this.parentNode.parentNode.parentNode.parentNode;    
			 if(obj.tagName.toLowerCase() == "table"){
				 tb_id = obj.id;
				 addtbtitle("tr_list_mx");
				 //获取点击行号
				 if (this.id != null) {
					 line_row = this.id.substring(4,5);
					 row_main = line_row;
				 }else {
					 line_row = row_main; 
				 }
				 
				 //获取xmdm
				 var table_main=document.getElementById('data_list_main');
				 rows = table_main.rows.length;
				 var cols = table_main.rows.item(0).cells.length - 1 ;
				 xmdm =table_main.rows[line_row].cells[cols].innerHTML;
				 getqxgriddata(2,xmdm);
			 }
			 
		 }
		 
		 //获取二级grid数据
		 function getqxgriddata(type_data,xmdm){
			 var func;
			 params.ccdm = type_data;
			 params.xmdm = xmdm;
			 params.data='1';
		     ajaxJson(url, params,func);
			 var objdata = eval(returndata.rows);
			 setPage('data_list_mx','page_mx',total,params.pageSize,1,10);
			 dataclear('data_list_mx');
		     for (var i=0;i<objdata.length;i++){
		    	var data_line = new Object();
		    	data_line = objdata[i];
		    	addrow(data_line,i,'data_list_mx',type_data);
		     }
		     var tp_list = gd_type.split(",");
		     if (returndata.sum!=null){
		    	 applyTableSum("data_list_mx",1,tp_list.length,type_data,returndata.sum);
		     }
		     
		     $('#data_list_mx > tbody tr:odd').css('background','#31528d'); 
		 }
		 
		 //显示人员grid及数据
		 function showrygrid(value,type_data,xmdm,data_dm,zrs){
			 document.getElementById('popDiv_ry').style.display='block';
			 document.getElementById('popIframe_ry').style.display='block';
			 document.getElementById('bg_ry').style.display='block';
			 document.getElementById('leftTop_ry').innerText =  main_title + "-" + yqmc + '-人员明细' ;
			 closeqygrid(1);
			 ccdm =type_data;
			 getrygriddata(value,type_data,xmdm,data_dm,zrs);//直接到人员
		 }
		 
		//获取人员grid数据
		 function getrygriddata(value,type_data,xmdm,data_dm,zrs){
			 var func;
			 params.rs_count = zrs;
			 if (data_dm == "nsrsbh"){
				 params.nsrsbh  = value;
				 params.data='3';
				 if (params.hasOwnProperty("srqjdm")){
					 delete params.srqjdm;
				 }
			 } else {
				 if (cxlb=='02'){
					 params.srqjdm=data_dm; 
				 }
				 params.ccdm = type_data;
				 params.xmdm = xmdm;
				 params.data='3';
				 if (params.hasOwnProperty("nsrsbh")){
					 delete params.nsrsbh;
				 }
			 }
			 //获取连续三年人员明细时添加参数连续三年标记,否则不添加
			 if (data_dm =="lxsnzgrs"){
				 params.lxsnbj='1';
			 }else{
				 params.lxsnbj='0';
			 }
		     ajaxJson(url, params,func);
		     //var data = returndata;
			 var objdata = eval(returndata.rows);
			 setPage('data_list_ry','page_ry',total,params.pageSize,1,10);
			 dataclear('data_list_ry');
		     for (var i=0;i<objdata.length;i++){
		    	var data_line = new Object();
		    	data_line = objdata[i];
		    	//alert(objdata[i].XZQHMC);
		    	addrow_ry(data_line,i);
		     }
		     if (returndata.sum!=null){
		     applyRySum(returndata.sum,sField,xmdm,type_data);
		     }
		     $('#data_list_ry > tbody tr:odd').css('background','#31528d');
		 }
		 
		//显示企业grid及数据
		 function showqygrid(type_data,xmdm){
			 document.getElementById('popDiv_qy').style.display='block';
			 document.getElementById('popIframe_qy').style.display='block';
			 document.getElementById('bg_qy').style.display='block';
			 document.getElementById('leftTop_qy').innerText =  main_title + "-" + yqmc + '-企业明细' ;
			 closemxgrid(1);
			 getqygriddata(type_data,xmdm);
		 }

		 //获取企业数据
		 function getqygriddata(type_data,xmdm){
			 var func;
			 params.xmdm = xmdm;
			 params.ccdm = type_data;
			 params.data='2';
		      ajaxJson(url, params,func);
		     //var data = returndata;
			 var objdata = eval(returndata.rows);
			 setPage('data_list_qy','page_qy',total,params.pageSize,1,10);
			 dataclear('data_list_qy');
		     for (var i=0;i<objdata.length;i++){
		    	var data_line = new Object();
		    	data_line = objdata[i];
		    	//alert(objdata[i].XZQHMC);
		    	addrow_qy(data_line,i,xmdm,type_data);
		     }
		     
		     if (returndata.sum!=null){
		     applyQySum(returndata.sum);
		     }
		     $('#data_list_qy > tbody tr:odd').css('background','#31528d');
		 }
		 
		 function dataclear(tb_id){
			 var table=document.getElementById(tb_id);
			 var oBody=table.tBodies[0];
			 var rowIndex=oBody.rows.length;
		    if (rowIndex > 1) {
		    	for (i=rowIndex;i>1;i--) {
		    		oBody.deleteRow(i-1);	
		    	}
		    }
		 }
		 
		 function getTdValue()
		 {
			 var tableId = document.getElementById("data_list_main");
			 var str = "";
			 for(var i=1;i<tableId.rows.length;i++)
			 {
			 	alert(tableId.rows[i].cells[1].innerHTML);
		 	 }
		 } 
		 
		 function addtbtitle(tb_id){
			 if (gd_title != ""){
				 var tt_list = gd_title.split(",");
				 var tr = document.getElementById(tb_id);
				 //清除现有表头
				 if (tr.childNodes.length >= 1){
					 for (var i=tr.childNodes.length-1;i>0;i--){
						 var r_td = tr.childNodes[i];
						 tr.removeChild(r_td);
					 }
				 }
				 for(var i =0;i<=tt_list.length-1;i++){
                    //创建td
                    var td = document.createElement("td");
                    //追加到tr中
                    tr.appendChild(td);
                    //在td中添加文本框
                    td.innerHTML = tt_list[i].toString();
				 }
				 //添加隐藏代码列
				 var td = document.createElement("td");
				 td.setAttribute("class", "hide_dm");
                 tr.appendChild(td);
			 }
		 }
		 
		 function addrow(data_line,num_line,tb_id,type_data){
		 	var newItem;//保存table值，便于后台操作
		 	var table=document.getElementById(tb_id);
			
		    var oBody=table.tBodies[0];
		    var rowIndex=oBody.rows.length;
		    oBody.insertRow(rowIndex);
		    
		    var fd_list = gd_field.split(",");
		    var fd_type = gd_type.split(",");
		    for(var i =0;i<=fd_list.length-1;i++){
		    	oBody.rows[rowIndex].insertCell(i);
		    	var fd_name = fd_list[i].toString();
		    	if   (typeof(eval("data_line." + fd_name)) != "undefined") {
			    	if (i == 0 ){				//字符型
			    		oBody.rows[rowIndex].cells[i].appendChild(document.createTextNode(eval("data_line." + fd_name)));
			    	} else if (fd_type[i] == 2){//两位小数
			    		var dValue = eval("data_line." + fd_name).toFixed(2);
			    		if (dValue != 0.00){
			    			var value = dValue.split('.');
			    			dValue = toThousands(value[0]) + '.' + value[1];
			    		}
			    		oBody.rows[rowIndex].cells[i].appendChild(document.createTextNode(dValue));
		    		} else if (fd_type[i] == 1){//整形		    			
		    			oBody.rows[rowIndex].cells[i].appendChild(document.createTextNode(eval("data_line." + fd_name)));
		    			//高收入人群分析的分地区增加人员钻取
		    			if (fd_name != 'xj'){
		    				var tdd = oBody.rows[rowIndex].cells[i];
			    			var linid = "line" +  (parseInt(num_line) + parseInt(1));
		    				var fd_hs = fd_name.substring(fd_name.length-2,fd_name.length);
		    				if (issuperadmin){
		    					if (data_line[fd_name]>0){
		    						if (fd_hs == "hs"){
				    					tdd.innerHTML =String.format("<a href=javascript:void(0); id={0} onclick=showqygrid({1},'{2}')>{3}</a>",linid,type_data,data_line.zbxmdm,data_line[fd_name]);
				    				}else {
				    					tdd.innerHTML =String.format("<a href=javascript:void(0); id={0} onclick=showrygrid({1},'{2}','{3}','{4}',{5})>{6}</a>",linid,data_line[fd_name],type_data,data_line.zbxmdm,fd_name,data_line[fd_name],data_line[fd_name]);
				    				}
		    					}
			    				
		    				}
		    			}
		    			
			    	}
			    	oBody.rows[rowIndex].cells[i].noWrap=true;
		    	}	
		        
		    }   
		    
	        //隐藏的代码列
	        oBody.rows[rowIndex].insertCell(fd_list.length);
	        oBody.rows[rowIndex].cells[fd_list.length].appendChild(document.createTextNode(data_line.zbxmdm));
	        oBody.rows[rowIndex].cells[fd_list.length].noWrap=true;
	        oBody.rows[rowIndex].cells[fd_list.length].style.display='none';
	        
	        //钻取列处理
	       
	        if (yq == "dq" || yq == "hy" || yq == "qylx"){
		        var row = num_line + 1;
		        var col = 0;
		        var tr = table.getElementsByTagName("tr");
		        var tdd = tr[row].getElementsByTagName("td")[col];
		        line_id = "line" + row;
		        fd_name = fd_list[0].toString();
		        if (tb_id == "data_list_mx") {
		        	 if (issuperadmin){
		        		 tdd.innerHTML =String.format("<a href=javascript:void(0); id={0} onclick=showqygrid({1},'{2}')>{3}</a>",line_id,type_data,data_line.zbxmdm,data_line[fd_name]);
		        	
		          }	
		        }
		        else{
		        	tdd.innerHTML = "<a href='javascript:void(0);' id=" + line_id + " onclick='showmxgrid.call(this)'>" + eval("data_line." + fd_name) +"</a>";
		        }
	          
	        }
		 }
		 
		 function addrow_ry(data_line,num_line){
			 	var newItem;//保存table值，便于后台操作
			 	var table=document.getElementById("data_list_ry");
			    var oBody=table.tBodies[0];
			    var rowIndex=oBody.rows.length;
			    oBody.insertRow(rowIndex);
		        //姓名
		        oBody.rows[rowIndex].insertCell(0);
		        oBody.rows[rowIndex].cells[0].appendChild(document.createTextNode(data_line.xm));
		        oBody.rows[rowIndex].cells[0].noWrap=true;		        
		        //身份证号
		        oBody.rows[rowIndex].insertCell(1);
		        oBody.rows[rowIndex].cells[1].appendChild(document.createTextNode(data_line.sfzjhm));
		        oBody.rows[rowIndex].cells[1].noWrap=true;
		        newItem="1";
		        //工资总额
		        oBody.rows[rowIndex].insertCell(2);
		        value = data_line.sqgz;
		        if (value == undefined){
		        	oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode("0.00"));
		        } else{
		        	var dValue = data_line.sqgz.toFixed(2);
		    		if (dValue != 0.00){
		    			var value = dValue.split('.');
		    			dValue = toThousands(value[0]) + '.' + value[1];
		    		}
		    		oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode(dValue));
		        }
		        oBody.rows[rowIndex].cells[2].noWrap=true;
		        newItem=newItem + "," +"2";
		      	//个人所得税
		        oBody.rows[rowIndex].insertCell(3);
		        value = data_line.grsds;
		        if (value == undefined){
		        	oBody.rows[rowIndex].cells[3].appendChild(document.createTextNode("0.00"));
		        } else{
		        	var dValue = data_line.grsds.toFixed(2);
		    		if (dValue != 0.00){
		    			var value = dValue.split('.');
		    			dValue = toThousands(value[0]) + '.' + value[1];
		    		}
		    		oBody.rows[rowIndex].cells[3].appendChild(document.createTextNode(dValue));
		        }
		        oBody.rows[rowIndex].cells[3].noWrap=true;
		        newItem=newItem + "," +"3";
		        
		 }
		 
		 function addrow_qy(data_line,num_line,xmdm,type_data){
			 	var newItem;//保存table值，便于后台操作
			 	var table=document.getElementById("data_list_qy");
			    var oBody=table.tBodies[0];
			    var rowIndex=oBody.rows.length;
			    oBody.insertRow(rowIndex);
		        //企业名称
		        oBody.rows[rowIndex].insertCell(0);
		        oBody.rows[rowIndex].cells[0].appendChild(document.createTextNode(data_line.nsr_mc));
		        oBody.rows[rowIndex].cells[0].noWrap=true;		        
		        //纳税人识别号
		        oBody.rows[rowIndex].insertCell(1);
		        oBody.rows[rowIndex].cells[1].appendChild(document.createTextNode(data_line.nsrsbh));
		        oBody.rows[rowIndex].cells[1].noWrap=true;
		        newItem="1";
		      	//高收入人数
		        oBody.rows[rowIndex].insertCell(2);
		        value = data_line.rs;
		        if (value == undefined){
		        	oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode("0"));
		        } else{
		        	oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode(data_line.rs));
		        		var tdd = oBody.rows[rowIndex].cells[2];
		    			var linid = "line" +  (parseInt(num_line) + parseInt(1));
		    			tdd.innerHTML =String.format("<a href=javascript:void(0); id={0} onclick=showrygrid('{1}',{2},'{3}','nsrsbh',{4})>{5}</a>",linid,data_line.nsrsbh,type_data,xmdm,data_line.rs,data_line.rs);
		        }
		        oBody.rows[rowIndex].cells[2].noWrap=true;
		 }
		 
		 //处理合计行
		 //----参数列表
		 //id       :table的id
		 //col_star :合计起始列
		 //col_end  :合计截止列
		 function applyTableSum(id,col_star,col_end,type_data,sumdata) {  
			
			var totalRow = 0;
			var tp_list = gd_type.split(",");
			var fd_list = gd_field.split(",");
			var s_field = "";
			var bl_bj=0;
			
				var table=document.getElementById(id);
	  	        var table_trid = '#' + id + ' tr';
				var oBody=table.tBodies[0];
				var rowIndex=oBody.rows.length;
				oBody.insertRow(rowIndex);
				oBody.rows[rowIndex].insertCell(0);
		        oBody.rows[rowIndex].cells[0].appendChild(document.createTextNode("合计"));
		        oBody.rows[rowIndex].cells[0].noWrap=true;
		      
				for (i=col_star;i<col_end;i++){
					var svalue;
					if (fd_list[i]=='zzl'){
						svalue =0;
					}else{
					 svalue = sumdata[fd_list[i]];
					}
					if(tp_list[i] == 2){						
						oBody.rows[rowIndex].insertCell(i);
						svalue=svalue.toFixed(2);
						if (svalue != 0.00){
			    			var value = svalue.split('.');
			    			svalue = toThousands(value[0]) + '.' + value[1];
			    		}else{
			    			svalue ='';
			    		}
				        oBody.rows[rowIndex].cells[i].appendChild(document.createTextNode(svalue));
				        oBody.rows[rowIndex].cells[i].noWrap=true;
					}else if (tp_list[i] == 1){
						oBody.rows[rowIndex].insertCell(i);
				        oBody.rows[rowIndex].cells[i].appendChild(document.createTextNode(svalue));
				        oBody.rows[rowIndex].cells[i].noWrap=true;
					}
				}	
			
		 }; 
		 
		 function applyRySum(sumdata) { 
			
				 var table=document.getElementById('data_list_ry');
				 var oBody=table.tBodies[0];
				 var rowIndex=oBody.rows.length;
				 oBody.insertRow(rowIndex);	
				 var totalRow = 0;
				 oBody.rows[rowIndex].insertCell(0);
			     oBody.rows[rowIndex].cells[0].appendChild(document.createTextNode("合计"));
			     oBody.rows[rowIndex].cells[0].noWrap=true;
				 oBody.rows[rowIndex].insertCell(1);
				 oBody.rows[rowIndex].cells[1].noWrap=true;
				 oBody.rows[rowIndex].insertCell(2);
				 oBody.rows[rowIndex].cells[2].noWrap=true;		
				 oBody.rows[rowIndex].insertCell(3);
				 oBody.rows[rowIndex].cells[3].noWrap=true;
				
		    	 var svalue = "";
		    	 svalue = sumdata["sqgz"];		
		    	 svalue=svalue.toFixed(2);
				 if (svalue != 0.00){
	    			var value = svalue.split('.');
	    			svalue = toThousands(value[0]) + '.' + value[1];
	    		 }
		    	 oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode(svalue));
		    	 oBody.rows[rowIndex].cells[2].noWrap=true;
		    	 svalue = sumdata["grsds"];
		    	 svalue=svalue.toFixed(2);
		    	 if (svalue != 0.00){
	    			var value = svalue.split('.');
	    			svalue = toThousands(value[0]) + '.' + value[1];
	    		 }
		    	 oBody.rows[rowIndex].cells[3].appendChild(document.createTextNode(svalue));
		    	 oBody.rows[rowIndex].cells[3].noWrap=true;
			
		 }
		 
		 function applyQySum(sumdata) { 
			
				 var table=document.getElementById('data_list_qy');
				 var oBody=table.tBodies[0];
				 var rowIndex=oBody.rows.length;
				 oBody.insertRow(rowIndex);	
				 var totalRow = 0;
				 oBody.rows[rowIndex].insertCell(0);
			     oBody.rows[rowIndex].cells[0].appendChild(document.createTextNode("合计"));
			     oBody.rows[rowIndex].cells[0].noWrap=true;
				 oBody.rows[rowIndex].insertCell(1);
				 oBody.rows[rowIndex].cells[1].noWrap=true;
				 oBody.rows[rowIndex].insertCell(2);
				 oBody.rows[rowIndex].cells[2].noWrap=true;		
				 
		    	 var svalue = "";
		    	 svalue = sumdata["rs"];		
		    	 oBody.rows[rowIndex].cells[2].appendChild(document.createTextNode(svalue));
		    	 oBody.rows[rowIndex].cells[2].noWrap=true;

			 
		 }
		 
		 //导出Excel
		 function exportExcel(type) {
			    var path_list = url_action.split("/");
			    var spath = "";
			    for(var i =0;i<=path_list.length-2;i++){
			  	  	spath = spath + "/" + path_list[i].toString();
			    }
			    var nd ="";
			    if (zblx == 'Y'){
			    	nd = zzrq.substr(0,4);
				} 
				var url = '';
				if (type == 1){
					var table=document.getElementById('data_list_main');
					var oBody=table.tBodies[0];
					var tp_list = gd_type.split(",");
					jdxz_dm = oBody.rows[row_main].cells[tp_list.length].innerHTML;
					if (zblx == 'Y'){
						url = path + spath + '/exportqxXls?nd=' + nd + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field + '&gd_type=' + gd_type + '&type=' + type + '&jdxz_dm=' + jdxz_dm+'&sumfield='+sumfield;
					}else if (zblx == '') {
						url = path + spath + '/exportqxXls?qsrq=' + qsrq + '&zzrq=' + zzrq + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field + '&gd_type=' + gd_type + '&type=' + type + '&jdxz_dm=' + jdxz_dm+'&sumfield='+sumfield;
					}
				} 
				else {
					if (zblx == 'Y'){
						url = path + spath + '/exportXls?nd=' + nd + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field + '&gd_type=' + gd_type + '&type=' + type+'&sumfield='+sumfield;
					} else if (zblx == ''){
						url = path + spath + '/exportXls?qsrq=' + qsrq + '&zzrq=' + zzrq + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field + '&gd_type=' + gd_type + '&type=' + type+'&sumfield='+sumfield;
					}
				}
				//var url = String.format(path+'/gsrrqfx/fdqrs/gsrrqDqRs/exportXls?qsnd={0}&zznd={1}', qsnd, zznd);
				
				document.exportData.action =encodeURI( encodeURI(url));
				document.exportData.submit();
		 }
		 
		//导出Excel
		 function exportryExcel() {
			    var path_list = url_action.split("/");
			    var spath = "";
			    for(var i =0;i<=path_list.length-2;i++){
			  	  	spath = spath + "/" + path_list[i].toString();
			    }
			    
			    var nd ="";
			    if (zblx == 'Y'){
					 nd = zzrq.substr(0,4);
				} 
				var url = '';
				var table=document.getElementById('data_list_main');
				var oBody=table.tBodies[0];
				var tp_list = gd_type.split(",");
				jdxz_dm = oBody.rows[row_main].cells[tp_list.length].innerHTML;
				if (zblx == 'Y'){
					url = path + spath + '/exportryXls?nd=' + nd  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				} else {
					url = path + spath + '/exportryXls?qsrq=' + qsrq + '&zzrq=' + zzrq  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				}
				document.exportData.action = encodeURI(encodeURI(url));
				document.exportData.submit();
		 }
		 
		//导出Excel
		 function exportqyExcel() {
			    var path_list = url_action.split("/");
			    var spath = "";
			    for(var i =0;i<=path_list.length-2;i++){
			  	  	spath = spath + "/" + path_list[i].toString();
			    }
			    
			    var nd ="";
			    if (zblx == 'Y'){
					 nd = zzrq.substr(0,4);
				}
				var url = '';
				var tp_list = gd_type.split(",");
				if (zblx == 'Y'){
					url = path + spath + '/exportqyXls?nd=' + nd  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				} else {
					url = path + spath + '/exportqyXls?qsrq=' + qsrq + '&zzrq=' + zzrq  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				}
				
				document.exportData.action = encodeURI(encodeURI(url));
				document.exportData.submit();
		 }
		 
		//导出Excel
		 function exportqxExcel() {
			    var path_list = url_action.split("/");
			    var spath = "";
			    for(var i =0;i<=path_list.length-2;i++){
			  	  	spath = spath + "/" + path_list[i].toString();
			    }
			    
			    var nd ="";
			    if (zblx == 'Y'){
					 nd = zzrq.substr(0,4);
				}
				var url = '';
				var tp_list = gd_type.split(",");
				if (zblx == 'Y'){
					url = path + spath + '/exportqxXls?nd=' + nd  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				} else {
					url = path + spath + '/exportqxXls?qsrq=' + qsrq + '&zzrq=' + zzrq  + '&tb_name=' + tb_name + '&gd_title=' + gd_title + '&gd_field=' + gd_field +  '&sField=' + sField + '&gd_type=' + gd_type  + '&jdxz_dm=' + jdxz_dm;
				}
				
				document.exportData.action = encodeURI(encodeURI(url));
				document.exportData.submit();
		 }
		 
		 //处理分页
		 function setPage(tb_id,page_id,total_rows,pagesize,pg_star,pg_end){
			 var pg = document.getElementById(page_id);
			 var lis = pg.getElementsByTagName("li");
			 //清除中间的数字页li
			 for (var i = lis.length-2; i >0; i--) {
				 pg.removeChild(lis[i]);
			 }
			 var pg_num = Math.ceil(total_rows / pagesize);
//			 alert(Math.ceil(1 / 2);
			 //插入相应的页码
			 var pg_end_real = 0;
			 if (pg_end >= pg_num) {
				 pg_end_real = pg_num;
			 } else {
				 pg_end_real = pg_end;
			 }
			 for (var i = pg_star; i <= pg_end_real;i++) {
				 var li= document.createElement("li");
				 li.innerHTML =  i;
				 if (i == pg_star) {
					 li.className="current_page";
				 }
				 var li_num = lis.length;
				 pg.insertBefore(li,pg.childNodes[li_num]);
			 }
			 
			 setPageOnclick(page_id,tb_id);
		 }
		 
		 //获取点击前选中的页码li对象
		 function getCurrentpage(pg_id){
			 var pg = document.getElementById(pg_id);
			 var lis = pg.getElementsByTagName("li");
			 //清除中间的数字页li
			 for (var i = lis.length-2; i >0; i--) {
				 if (lis[i].className == "current_page"){
					 return lis[i];
				 }
			 }
		 }
		 
		 //根据参数获取grid数据
		 function getGridData(url,param,tb_id){
			 var func;			 
		     ajaxJson(url, param,func);
		     //var data = returndata;
			 var objdata = eval(returndata);
			 row_total = total;
			 dataclear(tb_id);
		     for (var i=0;i<objdata.length;i++){
		    	var data_line = new Object();
		    	data_line = objdata[i];
		    	if (tb_id == 'data_list_ry'){
		    		addrow_ry(data_line,i);
		    	}
		    	else if (tb_id == 'data_list_qy'){
		    		addrow_qy(data_line,i);
		    	}
		    	else {
		    		addrow(data_line,i,tb_id);
		    	}
		     }
		     if (tb_id == 'data_list_ry'){
		    	if (sField == "nsrsbh") {
		    		applyRySum(sField,nsrsbh);
		    	} 	else {
		    		applyRySum(sField,jdxz_dm);
		    	}
	    		
		     }
		     else if (tb_id == 'data_list_qy'){
		    	 applyQySum(jdxz_dm);
		     }
		     else {
	    		var tp_list = gd_type.split(",");
	    		if (tb_id == 'data_list_main'){
	    			applyTableSum(tb_id,1,tp_list.length,0);
	    		} else if (tb_id == 'data_list_mx'){
	    			applyTableSum(tb_id,1,tp_list.length,1);
	    		}
		     }
		     
		     $('#'+tb_id+' > tbody tr:odd').css('background','#31528d'); 
		 }

		 //设置页码点击事件
		 function setPageOnclick(pg_id,tb_id){
			 var pg = document.getElementById(pg_id);
			 var lis = pg.getElementsByTagName("li");
			 for (var i = 1; i < lis.length -1; i++) {
				 //挂鼠标点击事件
				 lis[i].onclick = function(){
					 var title = this.innerHTML;
					 var li_classname = this.className;
					 if (li_classname != 'current_page'){
						 var li = getCurrentpage(pg_id);
						 li.className = "";
						 this.className = "current_page";
						 //检索数据
						 var actionUrl = path + url_action;
						 if (tb_id == 'data_list_mx'){
							 var path_list = url_action.split("/");
							 var spath = "";
							 for(var i =0;i<=path_list.length-2;i++){
								 spath = spath + "/" + path_list[i].toString();
							 }
							 spath += '/queryQxByPageData?lb='+cxlb;
							 
							 actionUrl = path + spath;
						 } else if (tb_id == 'data_list_ry'){
							 var path_list = url_action.split("/");
							 var spath = "";
							 for(var i =0;i<=path_list.length-2;i++){
								 spath = spath + "/" + path_list[i].toString();
							 }
							 spath += '/queryMxByPageData?lb='+cxlb;
							 actionUrl = path + spath;
						 }	
						 else if (tb_id == 'data_list_qy'){
							 var path_list = url_action.split("/");
							 var spath = "";
							 for(var i =0;i<=path_list.length-2;i++){
								 spath = spath + "/" + path_list[i].toString();
							 }
							 spath += '/queryQyByPageData?lb='+cxlb;
							 actionUrl = path + spath;
						 }
						 var params = new Object();
						 if (zblx == 'Y'){
							 params.nd = zzrq.substr(0,4);
						 } else if (zblx == '') {
							 params.qsrq =qsrq;
							 params.zzrq =zzrq;
						 }
						 if (tb_id == 'data_list_main') {
							 params.type = 0;
						 }else {
							 params.type = 1; 
						 }
						 params.pageNo = title;
						 params.pageSize =7;
						 if (params.type == 1 || tb_id == 'data_list_ry') {
							 params.jdxz_dm = jdxz_dm;
						 }
						 if (tb_id == 'data_list_ry'){
							 if (sField == "nsrsbh"){
								 params.sfield = sField;
								 params.nsrsbh = nsrsbh;
							 } else {
								 params.sfield = sField;
								 params.jdxz_dm = jdxz_dm;
							 } 
						 }
						 
						 params.tb_name = tb_name;
						 params.gd_field = gd_field;
						 dataclear(tb_id);
						 getGridData(actionUrl,params,tb_id);
					 }
					
				 }
			 }
		 }
		 
		 //上一步下一步点击事件
		 function pgOnclick(Sender,tb_id){
			 var page_id = $(Sender).parent().attr("id");
			 var pg = document.getElementById(page_id);
			 var lis = pg.getElementsByTagName("li");
			 var li = getCurrentpage(page_id);
			 var pg_num = 0;
			 var pgString = Sender.innerHTML;
			 var refresh = 0;
			 if (pgString.indexOf('上一页') >= 0){
				 if (li.innerHTML != '1'){
					 li.className = "";
					 //上一页页码
					 pg_num = String(li.innerHTML - 1);
					 var gw = pg_num.substring(pg_num.length-1,pg_num.length);
					 //需要调整页码
					 if (gw == 0){
						 //删除原有的页码li
						 for (var i = lis.length-2; i >0; i--) {
							 pg.removeChild(lis[i]);
						 }
						 //创建新的页码li
						 for (var i = pg_num -9; i <= pg_num;i++) {
							 var li= document.createElement("li");
							 li.innerHTML =  i;
							 if (i == pg_num) {
								 li.className="current_page";
							 }
							 var li_num = lis.length;
							 pg.insertBefore(li,pg.childNodes[li_num]);
						 }
						 //挂点击事件
						 setPageOnclick(page_id,tb_id);
					 } else {
						
					 }
					 refresh = 1;
				 } 
			 } else if (pgString.indexOf('下一页') >= 0){
				 //总页码
				 var pg_total = Math.ceil(row_total / 7) ;
				 if (li.innerHTML != pg_total){
					 li.className = "";
					 pg_num = String(parseInt(li.innerHTML) + parseInt(1));
					 var gw = pg_num.substring(pg_num.length-1,pg_num.length);
					 //需要调整页码
					 if (gw == 1){
						 //删除原有的页码li
						 for (var i = lis.length-2; i >0; i--) {
							 pg.removeChild(lis[i]);
						 }
						 //创建新的页码li
						 var last_num = parseInt(pg_num) + 9;
						 if (last_num > pg_total){
							 last_num = pg_total
						 }
						 for (var i = pg_num ; i <= last_num ;i++) {
							 var li= document.createElement("li");
							 li.innerHTML =  i;
							 if (i == pg_num) {
								 li.className="current_page";
							 }
							 var li_num = lis.length;
							 pg.insertBefore(li,pg.childNodes[li_num]);
						 }
						 //挂点击事件
						 setPageOnclick(page_id,tb_id);
					 }else {
						 
					 }
					 refresh = 1;
				 }
			 }
			 if (refresh == 1) {
				//设置选中页
				 for (var i=1;i<lis.length-1;i++){
					if (lis[i].innerText == pg_num){
						lis[i].className="current_page";
					}
				 } 	
				//获取表格数据
				 var actionUrl = path + url_action;
				 if (tb_id == 'data_list_mx'){
					 var path_list = url_action.split("/");
					 var spath = "";
					 for(var i =0;i<=path_list.length-2;i++){
						 spath = spath + "/" + path_list[i].toString();
					 }
					 spath += '/queryQxByPageData?lb='+cxlb;
					 
					 actionUrl = path + spath;
				 } else if (tb_id == 'data_list_ry'){
					 var path_list = url_action.split("/");
					 var spath = "";
					 for(var i =0;i<=path_list.length-2;i++){
						 spath = spath + "/" + path_list[i].toString();
					 }
					 spath += '/queryMxByPageData?lb='+cxlb;
					 actionUrl = path + spath;
				 } else if (tb_id == 'data_list_qy'){
					 var path_list = url_action.split("/");
					 var spath = "";
					 for(var i =0;i<=path_list.length-2;i++){
						 spath = spath + "/" + path_list[i].toString();
					 }
					 spath += '/queryQyByPageData?lb='+cxlb;
					 actionUrl = path + spath;
				 }
				 var params = new Object();
				 if (zblx == 'Y'){
					 params.nd = zzrq.substr(0,4);
				 } else if (zblx == '') {
					 params.qsrq =qsrq;
					 params.zzrq =zzrq;
				 }
				 if (tb_id == 'data_list_main') {
					 params.type = 0;
				 }else {
					 params.type = 1; 
				 } 
				 if (tb_id == 'data_list_ry'){
//					 if (params.type == 1 || tb_id == 'data_list_ry') {
//						 params.jdxz_dm = jdxz_dm;
//					 }
					 if (sField == "nsrsbh"){
						 params.sfield = sField;
						 params.nsrsbh = nsrsbh;
					 } else {
						 params.sfield = sField;
						 params.jdxz_dm = jdxz_dm;
					 } 
					 
				 } else {
					 params.jdxz_dm = jdxz_dm; 
				 }
					 
				 params.pageNo = pg_num;
				 params.pageSize =7;
				 
				 params.tb_name = tb_name;
				 params.gd_field = gd_field;
				 dataclear(tb_id);
				 getGridData(actionUrl,params,tb_id);
			 }
			
		 }
		 
		 function toThousands(num) {
			    var num = (num || 0).toString(), result = '';
			    while (num.length > 3) {
			        result = ',' + num.slice(-3) + result;
			        num = num.slice(0, num.length - 3);
			    }
			    if (num) { result = num + result; }
			    return result;
			}
		 
		 