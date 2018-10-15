function add_radiobutton(cxfl,name){
	if (cxfl=='2'){
	var html = 	'<div id="radbt" style="text-align:center;color:aqua">'+
		'<input name="rd" value="01" type="radio">平均收入情况表'+
		'<input name="rd" value="02" checked="checked" type="radio">人数分布情况表'+
		'</div>';
	$('#'+name).prepend(html);
	cxlb='02';
	params.lb=cxlb;
	
	$("#radbt input:radio").live("change",function(){
		var value = $("input[name='rd']:checked").val();
		cxlb =value;
		params.lb=cxlb;
		 inittb(params);
		 //绘制分地图时发生错误暂时屏蔽,排查问题后再使用
		 //init_map(params);
	  })
	}else{
		//高收入模块特殊处理,显示人数
		if (sys_mouduleID=='0101'){
			cxlb='02';
		}else{
			cxlb='01';
		}
		
		params.lb=cxlb;
		
	}
}


function del_radiobutton(){
	$('#radbt').remove();
}


//关闭系统按钮事件
function exitsystem(){
	 location.href =path+'/exitsystem';
	
   } 



function load_tabs(){
	$('#tabs li').each(function (){
		if (yq_list.indexOf($(this).attr("id"))==-1){
			$(this).css('display','none');
		}
	})
	yqmc = $("#tabs li").eq(0).html();
	 if (params.hasOwnProperty("xmdm")){
		 delete params.xmdm;
	 }
	params.dt = yq;
}