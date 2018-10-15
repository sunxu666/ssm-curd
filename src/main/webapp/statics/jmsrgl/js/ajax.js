var ajax_type = "post";  
var ajax_cache = false; 
var asyncType = false;
var returndata;
var total;
/** 
 * 使用ajax方式向服务器发送请求,如果执行成功,则将服务器返回传给回调函数. 
 * @param actionUrl 需要访问的url 
 * @param args 参数 
 * 
 */  
function ajaxJson(actionUrl, args,func){ 
	
    $.ajax({  
        url: actionUrl,  
        type: ajax_type,  
        dataType: "json",  
        data: args,  
        async:asyncType,
        cache:ajax_cache,
        beforeSend:function(XMLHttpRequest){
            
        },
        success: function(data,textStatus){  
            var analyMsg = data;

	    if (analyMsg.code == "0000") {
		if (typeof(func) == "undefined") { 
			returndata = data.returnObject;
			total = data.returnObject.total;
			return returndata;
		 }else{
		     func(data);
		     return;
		 }
		
	    }else{
	    	alert(analyMsg.msg);
		return;
	    }  
	    
        },  
        error: function (data, textStatus, errorThrown) {  
        	alert(data.responseText);
            alert("网络出错！"); 
        },
        complete:function(XMLHttpRequest, textStatus){
            
        }
    });   
}  
