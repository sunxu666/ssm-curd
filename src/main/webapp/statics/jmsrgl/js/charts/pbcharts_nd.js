
//折线变量定义
var zx_x_data = new Array();  //x轴变量定义

var arr_item;//字段英文名称
var arr_item_name;//字段中文名称
var data_qj;
var zx_data_qj;
var zx_arr_item;//字段英文名称 
var map_data_qj;
var gd_fdlist;
var gd_title;
var isxj_item = false; //判断是否有小计项
var curr_nd;

function display_item(){
	
	 var gdinfo_list =eval(gd_info);
	 for (var i=0;i<gdinfo_list.length;i++){
		 if (gdinfo_list[i].YQ==yq){
			 mkdm = gdinfo_list[i].MK_DM;
			 params.mkdm = mkdm;
			 params.data ='0';
			 params.ccdm=1;
			 var gd_fdlist_sr = gdinfo_list[i].GD_FDLIST_SR;
			 var gd_title_sr  = gdinfo_list[i].GD_TITLE_SR;
			 var gd_fdlist_ry = gdinfo_list[i].GD_FDLIST_RY;
			 var gd_title_ry  = gdinfo_list[i].GD_TITLE_RY;
		 }
	 }
	 if (cxlb=='01'){
		 gd_fdlist = gd_fdlist_sr;
		 gd_title  = gd_title_sr;
	 }else{
		 gd_fdlist = gd_fdlist_ry;
		 gd_title  = gd_title_ry; 
	 }
	 
	arr_item = gd_fdlist.split(',');
	zx_arr_item = gd_fdlist.split(',');
	arr_item_name = gd_title.split(',');
	data_qj =arr_item_name.slice(1);
	zx_data_qj =arr_item_name.slice(1);
	if ((arr_item_name.contains('小计'))||(arr_item_name.contains('户数'))){
		if (arr_item_name.contains('小计')){
			var index = arr_item_name.indexOf('小计');
			}else{
				var index = arr_item_name.indexOf('户数');
			}
		arr_item_name = arr_item_name.slice(0,index);
		arr_item = arr_item.slice(0,index);
		data_qj =arr_item_name.slice(1,index);
		
		zx_data_qj.splice(index-1,1,'合计');
		isxj_item =true;
	}else{
		arr_item_name.slice(0);
		isxj_item =false;
	}
	
}

function inittb(params) {
	display_item();
	var legend_data;
	var obj = new Object();
	var zbxmmc_array = new Array();//指标项目名称
	
	//折线变量定义
	
	var zx_data  = new Array();      //折线数据项

	//饼图变量定义
	var item_bt_array=[];

	//柱状图变量定义
	var zz_item_array=[];
	
	
	
	var func;
	ajaxJson(url, params, func);
	var objdata = eval(returndata.datalist);
	curr_nd = returndata.defaultyear;
	
	//折线x轴连续5年,年度赋值
	zx_x_data.splice(0, zx_x_data.length);
	for (var i=curr_nd-4;i<=curr_nd;i++){
		zx_x_data.push(i);
	}
	
	var curr_nd_data = objdata[curr_nd];
	//饼图不显示比例指标
	var bt_yw_arry =new Array('zzl');
	var bt_zw_arry =new Array('收入增长率','人员稳定率');
	
	//判断当前选择的月度是否有数据，1：无 ，地图、柱状、饼图不显示
	 if (curr_nd_data.length!=0){
	 var step=0; 
		for (var j=0;j<data_qj.length;j++){
			 zz_item_array[j] = new Array();
			 item_bt_array[j] = new Array();
			 var zbxmmc ;
			for ( var i = 0; i < curr_nd_data.length; i++) {
				zbxmmc = curr_nd_data[i][arr_item[0]];
				if (step<curr_nd_data.length){ 
				
				zbxmmc_array.push(zbxmmc);
				}
		
			 
			zz_item_array[j][i]= curr_nd_data[i][arr_item[j+1]];
			
			if (bt_yw_arry.contains(arr_item[j+1])){
				//step++;
				//continue;
				break;
			}else{
			var item_bt ={
					value : curr_nd_data[i][arr_item[j+1]],
					name : zbxmmc	
			 }
			}
			item_bt_array[j][i] = item_bt;
		    step++;
		  }
			if (bt_zw_arry.contains(data_qj[j])){
				item_bt_array.splice(j,1);
			}
		}
		//收入类表的特殊处理
		
		var srbj =false;
		
		if (cxlb=='01'){
			srbj =true;
		}
		
		initchart_bt(item_bt_array,zbxmmc_array);
		initchart_zz(zz_item_array,zbxmmc_array,srbj);
		
		//地图数据处理
		if (yq=='dq'){
			init_map(curr_nd_data);
		}
	 }
	//折线数据处理
	 zbxmmc_array.splice(0, zbxmmc_array.length); //清除zbxmmc_array里面数据
	 for (var i=0;i<zx_x_data.length;i++){
		 var nd_data = objdata[zx_x_data[i]];
		 if (nd_data.length>0){
			  for ( var j = 0; j < nd_data.length; j++) {
					var zbxmmc = nd_data[j][arr_item[0]];
					if (!zbxmmc_array.contains(zbxmmc)){
						zbxmmc_array.push(zbxmmc);
					}
			  }
		 }
	
	 }
	 
	var mkdm = new Array('0301','0302');
	if (mkdm.contains(sys_mouduleID)){
		for (var k =0;k<zbxmmc_array.length;k++){
			var zx_xx_data = new Array();      //折线小项
			
			for (var j=0;j<zx_x_data.length;j++){
				var filterdata = objdata[zx_x_data[j]];
				if (filterdata.length==0){
					zx_xx_data.push(0);	
				}else{
					zx_xx_data.push(filterdata[k][arr_item[3]]);
				}
			 }
		   
		
		    var item = {
				name : zbxmmc_array[k],
				type : 'line',
				data : zx_xx_data
			};
		
			zx_data.push(item);
		}
		
	}else{
	if(isxj_item){
		//dq_array.push("合计");
	}
	for (var k =0;k<zbxmmc_array.length;k++){
		var zx_xx_data = new Array();      //折线小项
		for (var j=0;j<zx_x_data.length;j++){
			var filterdata = objdata[zx_x_data[j]];
			if (filterdata.length==0){
				zx_xx_data.push(0);	
			}else{
			if (!isxj_item){
			zx_xx_data.push(filterdata[k][arr_item[1]]);
			}else{
				zx_xx_data.push(filterdata[k].xjrs);	
			  }
		    }
		 }
	   
	if (zbxmmc_array[k]=='合计'){
		 var item = {
					name : dq_array[k],
					type : 'line',
					 lineStyle:{
			                normal:{
			                    width:4
			                }
			            },
					data : zx_xx_data
				};
	}else{
	    var item = {
			name : zbxmmc_array[k],
			type : 'line',
			data : zx_xx_data
		};
	}
		zx_data.push(item);
	 }
	}
	initchart_zx(zx_data,zbxmmc_array);
	
	


}

function init_map(data){
	var map_item_array = gen_mapdata1(data);
	initchart2_map(map_item_array);
}



//通过visualmap 生成地图数据
function gen_mapdata1(data){
	var map_mk_data;
	//地图变量定义
	var map_item_array = [];
	var map_litem_array = gd_title.split(',');
	var map_arr_item = gd_fdlist.split(',');
	if ((map_litem_array.contains('小计'))||(map_litem_array.contains('户数'))){
		if (map_litem_array.contains('小计')){
		var index = map_litem_array.indexOf('小计');
		}else{
			var index = map_litem_array.indexOf('户数');
		}
		 map_litem_array.splice(index,1,'合计');
		map_data_qj = map_litem_array.slice(1);
	}else{
	map_data_qj =map_litem_array.slice(1);
	}

		for (var j=0;j<map_data_qj.length;j++){
			map_item_array[j] = new Array();
			for ( var i = 0; i < data.length; i++) {
				var item = {
						name : data[i].zbxmmc,
						value : data[i][map_arr_item[j+1]]
					};
				map_item_array[j][i] = item;
			}
		}
	
		 map_data_sort(map_item_array);
    return map_item_array;
	
}

//产生visualmap的无地理位置map数据
function gen_mapdata2(){
	var func;
	//地图数据处理
	var map_mk_data;
	//地图变量定义
	var map_item_array = [];
 	var map_litem_array = gd_title.split(',');
	var map_arr_item = gd_fdlist.split(',');
	
	if ((map_litem_array.contains('小计'))||(map_litem_array.contains('户数'))){
		if (map_litem_array.contains('小计')){
		var index = map_litem_array.indexOf('小计');
		}else{
			var index = map_litem_array.indexOf('户数');
		}
		 map_litem_array.splice(index,1,'合计');
		map_data_qj = map_litem_array.slice(1);
	}else{
	map_data_qj =map_litem_array.slice(1);
	}
	
	ajaxJson(url, params, func);
	var return_data = eval(returndata.datalist);
	   var data = return_data[curr_nd];
		for (var j=0;j<map_data_qj.length;j++){
			map_item_array[j] = new Array();
			for ( var i = 0; i < data.length; i++) {
			var item = {
					name : data[i].zbxmmc,
					value : data[i][map_arr_item[j+1]],
					jdxz_dm : data[i].zbxmdm
				};
			var data_item=new Object();
			data_item.item=item;
			data_item.map_data_qj=map_data_qj[j];
			data_item.jdxz_dm = data[i].zbxmdm;
			
			map_item_array[j][i] = item;
			}
		}
	
		map_data_sort(map_item_array);
	return map_item_array;
}


function initchart_zx(zx_data,zbxmmc_array){
	echarts.dispose(document.getElementById('main_zx'));
	echarts.dispose(document.getElementById('main_zx_max'));
	var myChart_zx = echarts.init(document.getElementById('main_zx'), 'dark');

	var myChart_zx_zoom = echarts.init(document.getElementById('main_zx_max'),'dark');
	
	option = {
		title : {
			left : 'center'
		},
		backgroundColor : 'rgba(51, 51, 51, 0)',
		tooltip : {
			trigger : 'axis',
			textStyle : {
				fontSize : 20,
				fontFamily :'仿宋',
				fontWeight : 'bolder'
			}
		},
		xAxis : {
			type : 'category',
			name : 'x',
			axisLabel : {
				interval : 0
			},
			data : zx_x_data
		},
		yAxis : {
			type : 'log',
			name : 'y',
			axisLabel : {
				interval : 0,
				rotate: 60//60度角倾斜显示

			}
		},
		series : zx_data
	};
	
	option.legend = {
			bottom : 'bottom',
			data : zbxmmc_array
		}
		myChart_zx.setOption(option);
	option.yAxis ={
			type : 'log',
			name : 'y'
	}
		myChart_zx_zoom.setOption(option);

}

function initchart_bt(item_bt_array,zbxmmc_array){
	//饼图
	echarts.dispose(document.getElementById('main_bt'));
	echarts.dispose(document.getElementById('main_bt_max'));
	var myChart_bt = echarts.init(document.getElementById('main_bt'), 'dark');
	var myChart_bt_zoom = echarts.init(document.getElementById('main_bt_max'),
			'dark');
	option_bt ={ 
		tooltip : {
			trigger : 'item',
			textStyle : {
				fontSize : 20,
				fontFamily :'仿宋',
				fontWeight : 'bolder'
				
			},
			formatter:function(params){
				return  params.seriesName+'<br>'+params.name+':'+toThousands1(params.value)+' ('+params.percent+'%)';
			}
		},
		backgroundColor : 'rgba(51, 51, 51, 0)',
		legend : {
			orient : 'vertical',

			x : 'left',
			data : zbxmmc_array

		},
		series : []
	};
	var bt_zw_arry =new Array('收入增长率','人员稳定率');
	for ( var i = 0; i < data_qj.length; i++) {
		if (bt_zw_arry.contains(data_qj[i])){
			continue;
		}
		//设置内半径，外半径
		var nbj=(i*parseInt(100/data_qj.length))+(i*3);
		var wbj =(i+1)*parseInt(100/data_qj.length);
		if (nbj==wbj){
			wbj = wbj+2;
		}
		var series_item = {
				name :data_qj[i],
				type : 'pie',
				radius : [ nbj+'%', wbj+'%' ],
				label : {
					normal : {
						show:false,
						position : 'inner'
					}
				},
				data:item_bt_array[i]
		}
		option_bt.series[i] = series_item;
	}

	myChart_bt.setOption(option_bt);
	myChart_bt_zoom.setOption(option_bt);
}

function initchart_zz(zz_item_array,zbxmmc_array,srbj){
	//柱状图
	echarts.dispose(document.getElementById('main_zz'));
	echarts.dispose(document.getElementById('main_zz_max'));
	var myChart_zz = echarts.init(document.getElementById('main_zz'), 'dark');
	var myChart_zz_zoom = echarts.init(document.getElementById('main_zz_max'),'dark');
	option_zz = {
		tooltip : {
			trigger : 'axis',
			textStyle : {
				fontSize : 20,
				fontFamily :'仿宋',
				fontWeight : 'bolder'
				
			},
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		backgroundColor : 'rgba(51, 51, 51, 0)',
		
		legend : {
           // bottom:'bottom',
			top:'top',
			data : data_qj
		},
		xAxis : [],
		yAxis : [],
		series : [ ]
	};

	option_zz.xAxis.push({
		type : 'category',
		data : zbxmmc_array,
		axisLabel : {
			interval : 0,
			rotate: 45//60度角倾斜显示

		}
	});
	
	if (srbj){
		option_zz.yAxis.push({
			type : 'value',
			//name:'单位：万元',
			splitNumber:2,
			axisLabel : {
				interval : 1,
				rotate: 60,//60度角倾斜显示

				  formatter:function(val){
					  if (val>10000 ){
						  return val/10000; 
					  }
				}

			}
		} );
	}else{
		option_zz.yAxis.push({
			type : 'value',
			splitNumber:2,
			axisLabel : {
				interval : 1,
				rotate: 60//60度角倾斜显示

			}
		} );
	}
	
	var selectitem = new Object();;
	for ( var i = 0; i < data_qj.length; i++) {
		selectitem[data_qj[i]] = true;
		if ((data_qj[i]=='人数')||(data_qj[i]=='外籍人数')||(data_qj[i]=='高净值人数')||(data_qj[i]=='净资产总额(元)')){
			selectitem[data_qj[i]] = false;
		}
		var item ={
				name:data_qj[i],
				type : 'bar',
				data : zz_item_array[i]
		}
		option_zz.series[i] = item;
	}
	
	option_zz.legend.selected = selectitem;
	
	myChart_zz.setOption(option_zz);
	
	
	
	option_zz.yAxis[0] ={
			type : 'value'
	}
	myChart_zz_zoom.setOption(option_zz);
}


//地图显示方式3.visualMap
function initchart2_map(map_item_array){
	$('#star').remove();
	$('.zs').remove();
	var div =String.format("<div id='star'><a title='' href='#'><img src='{0}/images/star.png'  width='40' height='38'/></></div>",path);
	$('.content').append(div);
	$('#star').css({"position": "relative","top":"430px","right":"550px","cursor":"pointer"});
	
	var div = '<div class="zs" style="display:none;text-align:center;position: absolute;  border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgb(231, 113, 110); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: bolder 20px/30px 仿宋; padding: 5px; left: 590px; top: 407px;"></div>';
	$('body').append(div);
	zsfj_map();
	$.getJSON(path + '/ui/Echarts-3.0/map/json/wuxi.json', function(data) {
		echarts.registerMap('wuxi', data);
		echarts.dispose(document.getElementById('main_map'));
		var myChart_map = echarts.init(document.getElementById('main_map'));
		option_map = {
			legend : {
				left : 'left',
				data : map_data_qj,
				selectedMode:'single',
				textStyle : {
					color : '#ccc'
				}
			},
			visualMap: {
		        type: 'continuous',
		        right:'10px',
		        min: 0,
		        max: 44898,
		        text:['高','低'],
		        realtime: true,
		        calculable : true,
		        outOfRange: {
		            color: ['#e0e0ee'/*, 'rgba(3,4,5,0.4)', '#e14646'*/],
		            symbolSize: [100, 100]
		        },
		        inRange: {
		        	color: [
'rgb(3 ,231 ,171)','rgb(36 ,181 ,232)','rgb(38 ,207 ,230)','rgb(26 ,238 ,233)','rgb(64,183,236)','rgb(67 ,138 ,171)','rgb(98 ,195 ,195)','rgb(47 ,160 ,206)','rgb(32 ,144 ,236)','rgb(20 ,54 ,222)',],
		            symbol:['circle', 'rect', 'diamond'],
		            symbolSize: [100, 100]
		        }, 
		        textStyle : {
					fontSize : 15,
		        	color : '#ccc',
					fontFamily :'仿宋',
					fontWeight : 'bolder'
				}
		    },
			tooltip : {
				backgroundColor:'#e7716e',
				textStyle : {
					fontSize : 20,
					fontFamily :'仿宋',
					fontWeight : 'bolder'
				},
				formatter:function (param){
		           
		            var arr = toThousands1(param.value);
		            var name = param.name;
		            var sn_name = param.seriesName;
		            if (sn_name!='合计'){
		            	sn_name = sn_name+'<br>';
		            }else{
		            	sn_name = '';
		            }
		            if (isNaN(arr)){
		            	arr = 0;
		            }else{
		            	arr = toThousands1(arr);
		            }
		            return sn_name+name+':'+arr;
		        }

			},
			series : []
		};
		
		
		var item = new Object();
		var seriesName  ;
		for ( var i = 0; i < map_data_qj.length; i++) {
			var item_map = {
					name : map_data_qj[i],
					type : 'map',
					map : 'wuxi',
					top:'100',
					zoom :1.2,
					data : map_item_array[i],
					label : {
						emphasis : {
							show : true,
							textStyle : {
								fontSize : 15,
								fontFamily :'仿宋',
								fontWeight : 'bolder'
							}
						},
						normal : {
							show : true,
							textStyle : {
								fontSize : 15,
								fontFamily :'仿宋',
								fontWeight : 'bolder'
							}
						}
					},
					itemStyle : {
						normal : {
							areaColor : '#678ce7',

							borderColor : '#444444'
						},
						emphasis : {
							areaColor : 'rgba(142,153,189,0.8)'
						}
					}
				
				}
			option_map.series[i] = item_map;
			item[map_data_qj[i]] = false;
			if (i== (map_data_qj.length-1)){
				item[map_data_qj[i]] = true;
				seriesName =map_data_qj[i];
				var s =map_item_array[i].slice(-1);
				var s1 =map_item_array[i].slice(0,1);
				var v = s.value;
				option_map.visualMap.max =(map_item_array[i].slice(-1))[0].value;
				option_map.visualMap.min =(map_item_array[i].slice(0,1))[0].value-1;
				option_map.visualMap.range =[(map_item_array[i].slice(0,1))[0].value-1,(map_item_array[i].slice(-1))[0].value];
				
			}
			if (i==map_data_qj.length-1){
				seriesName =map_data_qj[i];
				for (var j=0;j<map_item_array[i].length;j++){
					if (map_item_array[i][j].name=="市直属"){
						$(".zs").html(seriesName+'<br>市直属:'+map_item_array[i][j].value);
					}
				}
				
			}
		}
		option_map.legend.selected = item;
		myChart_map.setOption(option_map);
		
		
		myChart_map.on('legendselectchanged', function(params) {
			 seriesName = params.name;
			var index = map_data_qj.indexOf(seriesName);
			
			option_map.visualMap.max =(map_item_array[index].slice(-1))[0].value;
			option_map.visualMap.min =(map_item_array[index].slice(0,1))[0].value;
			option_map.visualMap.range =[(map_item_array[index].slice(0,1))[0].value-1,(map_item_array[index].slice(-1))[0].value];
			option_map.legend.selected = params.selected;
			myChart_map.setOption(option_map);
			
			
				for (var j=0;j<map_item_array[index].length;j++){
					if (map_item_array[index][j].name=="市直属"){
						$(".zs").html(seriesName+'<br>市直属:'+map_item_array[index][j].value);
					}
				}
				
			
			
			
		});
		
		myChart_map.on('click', function(data) {
			var city = data.name;
			if (!isNaN(data.value)){
			loadChart(city,map_item_array,seriesName);
			}
		});
	});
	
}

function zsfj_map(){
	/*增加直属*/
	
	var x=20;
	var y=20;
	$("#star a ").mouseover(function(e){
		
		//var div ="<div class='us'><table cellpadding='0' cellspacing='0' border='1'><tr><th>aaaaa</></></></div>";
		
		$(".zs").css({"display":"block","top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
		//$(".us").html('合计<br>梁溪区1:3399999238');
	}).mouseout(function(){
		$(".zs").css({"display":"none"});
	}).mousemove(function(e){
		$(".zs").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"});
	})
}
 
function loadChart(city,arr1,seriesName){
	
	 showDiv1(city,arr1,seriesName);
	 
}

function map_data_sort(array){
	for (var i=0;i<map_data_qj.length;i++){
		array[i].sort(function(a,b){
			return a.value-b.value;
		})
		
	}
	return array;
}

function map_symbolSize(value){
	var size;
	if (value<100){
		//size = parseInt(value/10);
	size =value/10;
}else if (value>=100&&value<1000){
	size =value/50;
}else if (value>=1000&&value<10000){
		size =value/200;
	}else if (value>=10000&&value<100000){
		size =value/10000;
	}else if (value>=100000&&value<1000000){
		size = value/100000;
	}else if (value>=1000000&&value<10000000){
		size = value/1000000
	}else if (value>=10000000){
		size = value/10000000;
		if (size>10) {
			size =10;
		}
	}
	return size;
}

function convertcity(city){
	var city_zw,city_yw,jdxz_dm;
	var city_item = new Object();
	var index = city.indexOf('-');
	if (index>0){
		city_zw = city.slice(0,index);
	}else{
		city_zw = city;
	}
	switch (city_zw){
	case "江阴市":city_yw ="jiangyin";jdxz_dm = "320281";break;
	case '宜兴市':city_yw ='yixing';jdxz_dm = "320282"; break;
	case '滨湖区':city_yw ='binhu';jdxz_dm = "320211"; break;
	case '惠山区':city_yw ='huishan';jdxz_dm = "320206"; break;
	case '梁溪区':city_yw ='liangxi';jdxz_dm = "320213"; break;
	case '锡山区':city_yw ='xishan';jdxz_dm = "320205"; break;
	case '新吴区':city_yw ='xinwu';jdxz_dm = "320214"; break;
	}
	city_item.city_zw = city_zw;
	city_item.city_yw = city_yw;
	city_item.jdxz_dm = jdxz_dm;
	return city_item;
}


//子地图通过VISUALMAP方式展示
function load_sub_map1(cv_city,submap_array,seriesName){
	var sub_map_data_qj = map_data_qj.slice(0);

	$.getJSON(String.format(path + '/ui/Echarts-3.0/map/json/{0}.json',cv_city.city_yw), function(data) {
		echarts.registerMap(cv_city.city_yw, data);
		echarts.dispose(document.getElementById('main_map_sub'));
		var chart_sub_map = echarts.init(document.getElementById('main_map_sub'));
		option_sub_map = {
			legend : {
				left : 'left',
				data : sub_map_data_qj,
				selectedMode:'single',
				textStyle : {
					color : '#ccc'
				}
			},
			visualMap: {
		        type: 'continuous',
		        min: 0,
		        max: 44898,
		        bottom: '8%',
		        text:['高','低'],
		        realtime: true,
		        calculable : true,
		        outOfRange: {
		        	color: ['#e0e0ee'/*, 'rgba(3,4,5,0.4)', '#e14646'*/],
		            symbolSize: [100, 100]
		        },
		        inRange: {
		        	color: [
'rgb(3 ,231 ,171)','rgb(36 ,181 ,232)','rgb(38 ,207 ,230)','rgb(26 ,238 ,233)','rgb(64,183,236)','rgb(67 ,138 ,171)','rgb(98 ,195 ,195)','rgb(47 ,160 ,206)','rgb(32 ,144 ,236)','rgb(20 ,54 ,222)',],
		        	
		            symbol:['circle', 'rect', 'diamond'],
		            symbolSize: [100, 100]
		        },
		     
		        textStyle : {
					fontSize : 15,
		        	color : '#ccc',
					fontFamily :'仿宋',
					fontWeight : 'bolder'
				}
		    },
			tooltip : {
				//position : [ 10, 50 ],
				backgroundColor:'#e7716e',
				textStyle : {
					fontSize : 20,
					fontFamily :'仿宋',
					fontWeight : 'bolder'
				},
				formatter:function (param){
			           
		            var arr = param.value;
		            var name = param.name;
		            var sn_name = param.seriesName;
		            if (sn_name!='合计'){
		            	sn_name = sn_name+'<br>';
		            }else{
		            	sn_name = '';
		            }
		            if (isNaN(arr)){
		            	arr = 0;
		            }else{
		            	arr = toThousands1(arr);
		            }
		            return sn_name+name+':'+arr;
		        }

			},
			series : []
		};
		var item = new Object();
		for ( var i = 0; i < sub_map_data_qj.length; i++) {
			var data_item = new Object();
			var data_item_array = new Array();
			for (j=0;j<submap_array[i].length;j++){
			 data_item={
					name:submap_array[i][j].name,
			        value:submap_array[i][j].value
			}
			 data_item_array.push(data_item);
			}
			var item_map = {
					name : sub_map_data_qj[i],
					type : 'map',
					map : cv_city.city_yw,
					data : data_item_array,
					label : {
						emphasis : {
							show : true,
							textStyle : {
								fontSize : 15,
								fontFamily :'仿宋',
								fontWeight : 'bolder'
							}
						},
						normal : {
							show : true,
							
							textStyle : {
								fontSize : 12,
								fontWeight : 'bolder',
								fontFamily :'仿宋'
							}
						}
					},
					itemStyle : {
						normal : {
							//areaColor : '#678ce7',
							areaColor:'rgb(169 ,249, 109)',
							borderColor : '#444444'
						},
						emphasis : {
							areaColor : 'rgba(142,153,189,0.8)'
						}
					}
				};
			option_sub_map.series[i] = item_map;
			item[sub_map_data_qj[i]] = false;
			if (sub_map_data_qj[i]==seriesName){
				item[sub_map_data_qj[i]] = true;
				option_sub_map.visualMap.max =(submap_array[i].slice(-1))[0].value;
				option_sub_map.visualMap.min =(submap_array[i].slice(0,1))[0].value-1;
				option_sub_map.visualMap.range =[(submap_array[i].slice(0,1))[0].value-1,(submap_array[i].slice(-1))[0].value];
			  }
			
		}
		option_sub_map.legend.selected = item;
		chart_sub_map.setOption(option_sub_map);
		
		
		chart_sub_map.on('legendselectchanged', function(params) {
			 seriesName = params.name;
			var index = sub_map_data_qj.indexOf(seriesName);
			option_sub_map.visualMap.max =(submap_array[index].slice(-1))[0].value;
			option_sub_map.visualMap.min =(submap_array[index].slice(0,1))[0].value;
			option_sub_map.visualMap.range =[(submap_array[index].slice(0,1))[0].value-1,(submap_array[index].slice(-1))[0].value];
			option_sub_map.legend.selected = params.selected;
			chart_sub_map.setOption(option_sub_map);
			
			
		});
		chart_sub_map.on('click', function(params) {
			var jdxz_mc = params.name;
			var index = sub_map_data_qj.indexOf(seriesName);
			
				var data =submap_array[index];
				for (var i=0;i<data.length;i++){
					if (data[i].name==jdxz_mc){
						var jdxz_dm = data[i].jdxz_dm;
						showqygrid_map(jdxz_dm);
					}
				}
			
			
			
			
		});
		
	});
}
	
 

 function showDiv1(city,arr,seriesName) {
	document.getElementById('popDiv1').style.display = 'block';
	document.getElementById('popIframe1').style.display = 'block';
	document.getElementById('bg1').style.display = 'block';
	var cv_city = convertcity(city);
     
	params.xmdm = cv_city.jdxz_dm;
	params.ccdm =2;
	var submap_array = gen_mapdata2();  //产生子地图数据
	load_sub_map1(cv_city,submap_array,seriesName);
	
}
 
function closeDiv1() {
	document.getElementById('popDiv1').style.display = 'none';
	document.getElementById('bg1').style.display = 'none';
	document.getElementById('popIframe1').style.display = 'none';

}
	 
function showDiv2() {
	document.getElementById('popDiv2').style.display = 'block';
	document.getElementById('popIframe2').style.display = 'block';
	document.getElementById('bg2').style.display = 'block';
	//add_radiobutton(params,'popDiv2');
}
	 
function closeDiv2() {
	document.getElementById('popDiv2').style.display = 'none';
	document.getElementById('bg2').style.display = 'none';
	document.getElementById('popIframe2').style.display = 'none';
	//del_radiobutton();
}

function showDiv3() {
	document.getElementById('popDiv3').style.display = 'block';
	document.getElementById('popIframe3').style.display = 'block';
	document.getElementById('bg3').style.display = 'block';
}

function closeDiv3() {
	document.getElementById('popDiv3').style.display = 'none';
	document.getElementById('bg3').style.display = 'none';
	document.getElementById('popIframe3').style.display = 'none';

}

function showDiv4() {
	document.getElementById('popDiv4').style.display = 'block';
	document.getElementById('popIframe4').style.display = 'block';
	document.getElementById('bg4').style.display = 'block';
}
function closeDiv4() {
	document.getElementById('popDiv4').style.display = 'none';
	document.getElementById('bg4').style.display = 'none';
	document.getElementById('popIframe4').style.display = 'none';

}

/**
 * 随机生成颜色
 * @return 随机生成的十六进制颜色
*/

function randomColor(){
　　var colorStr=Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
　　return"#"+"000000".substring(0,6-colorStr)+colorStr;
}


//显示企业grid及数据
function showqygrid_map(jdxz_dm){
	 document.getElementById('popDiv_qy').style.display='block';
	 document.getElementById('popIframe_qy').style.display='block';
	 document.getElementById('bg_qy').style.display='block';
	 document.getElementById('leftTop_qy').innerText =  main_title + "-" + mk_info.SJMK_MC + '-企业明细' ;
	/* //获取点击行号
	 var line_row = 0; 
	 obj = this.parentNode.parentNode.parentNode.parentNode;
	 var tbname = obj.id;
	 if(obj.tagName.toLowerCase() == "table"){
		 
		 //获取总列数
		 var table_main=document.getElementById(tbname);
		 rows = table_main.rows.length;
		 var cols = table_main.rows.item(0).cells.length - 1;
		 
		 //获取点击行号
		 if (this.id != null) {
			 line_row = this.id.substring(4,5);
			 row_main = line_row;
		 }else {
			 line_row = row_main; 
		 }*/
	 
		 //获取jdxz_dm
		 
		// jdxz_dm =table_main.rows[line_row].cells[cols].innerHTML;	
		// closemxgrid(1);
	// var jdxz_dm='320205001';
	 geturl();
		 getqygriddata(jdxz_dm);
		$('#leftTop_qy').parent().children('div').eq(2).children('a').eq(1).remove();
		 //.css('display','none');
		// tb_id = obj.id;
	 }


//格式化数值成千分位
function toThousands1(num) {
	var result = "";
	var fs = false;
	num = num.toString();
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


//格式化数值成千分位
function toThousands2(num) {
	var value = "";
	var fs = false;
	var i =0;
	num = num.toString();
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
		value = ',' + num.slice(-3) + value;
		num = num.slice(0, num.length - 3);
		i =i+1;
	}
	
	return i;
}