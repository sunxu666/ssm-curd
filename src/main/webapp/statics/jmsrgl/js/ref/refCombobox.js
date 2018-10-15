/**
 * 下来参照对象
 * 参数:
 *    url 获取下来参照地址
 *    param 参数
 *    op 选项
 */
var refCombobox=function(url,param,op){
	//当前参照查询获取的参数
	this.parameters=param;
	//当前参照url
	this.refUrl=url;
	//当前参照获取的数据
	this.refData = null;
	//选项对象
	this.options=op;
	/**
	 * 获取当前参照数据
	 */
	this.getRefData=function(){
		return this.refData;
	}
	/**
	 * 设置当前参照数据
	 */
	this.setRefData=function(data){
		this.refData=data;
	}    
	/**
	 * 获取当前参照url
	 */
	this.getRefUrl=function(){
		return this.refUrl;
	}
	/**
	 * 设置当前参照url
	 */
	this.setRefUrl=function(url){
		this.refUrl = url;
	}
	/**
	 * 当前参照参数
	 */
	this.getParameters=function(){
		return this.parameters;
	}
	/**
	 * 设置参照参数
	 */
	this.setParameters=function(p){
		this.parameters=p;
	}
	/**
	 * 获取选项对象
	 */
	this.getOptions=function(){
		return this.options;
	}
	/**
	 * 设置选项对象
	 */
	this.setOptions=function(op){
		this.options=op;
	}
	/**
	 * 初始化参照方法
	 */
	this.init=function(url,param,op){
		this.setRefUrl(url);
		this.setParameters(param);
		this.setOptions(op)
	}
	/**
	 * 设置参照值字段
	 */
	this.setValueField=function(key){
		this.options.valueField=key;
	}
	/**
	 * 设置参照文本字段
	 */
	this.setTextField=function(key){
		this.options.textField=key;
	}
	/**
	 * 设置默认值键值
	 */
	this.setDefaultValueKey=function(key){
		this.options.defaultValueKey=key;
	}
	/**
	 * 设置参照默认值
	 */
	this.setDefaultValue=function(v){
		this.options.defaultValue=v;
	}
	/**
	 * 设置参照数据内容键值
	 */
	this.setDataKey=function(key){
		this.options.dataKey=key;
	}
	/**
	 * 绑定的onChange事件
	 */
	this.onChange=function(ev){
		this.options.onChange=ev;
	}
	/**
	 * 从新设置绑定的onChange事件
	 */
	this.onSelect=function(id,ev){
		var op = $(id).combobox('options');
		op.onSelect = ev;
	}
	/**
	 * 取得参照值
	 */
    this.getValue=function(id){
    	return  $(id).combobox('getValue');
    }
    /**
     * 设置参照值
     */
    this.setValue=function(id,v){
    	return  $(id).combobox('setValue',v);
    }
	/**
	 * 获取参照数据
	 */
	this.loadRefData=function(){
		var op = this.getOptions();
		var url = this.getRefUrl();
		var param = this.getParameters();
		var datas;
		$.ajax({
			type : "POST",
			url : url,
			data : param,
			dataType : "json",
			async:false,
			success:function callback(data){
				datas = data;
			},  
	        error : function(data,textstatus){  
	            alert(data.responseText);  
	        }
		}); 
		this.setRefData(datas);
		return datas;
	}
	/**
	 * 通过指定数据创建下拉参照
	 */
	this.createComboboxFromData=function(id,data){
		this.setRefData(data);
		var op = this.getOptions();
		var option = new Object();
		option.editable = false;
		option.data = data.returnObject[op.dataKey];
		option.valueField = op.valueField;
		option.textField = op.textField;
		if (op.onChange !=null && typeof(op.onChange)=='function'){
			option.onChange=op.onChange;
		}else{
			option.onChange=function(newValue, oldValue){};
		}
		$(id).combobox(option);
		if (typeof(op.defaultValueKey)!='undefined' && op.defaultValueKey != null && op.defaultValueKey!=''){
			for(var i=0;i<data.returnObject[op.dataKey].length;i++){
				if(data.returnObject[op.dataKey][i][op.defaultValueKey]==op.defaultValue){
					var v = data.returnObject[op.dataKey][i][op.valueField];
					$(id).combobox('setValue',v);
				}
			}	
		}
	}
	/**
	 * 创建下拉参照
	 */
    this.createCombobox=function(id){
    	var data = this.loadRefData();
    	this.createComboboxFromData(id,data);
    }
}

/**
 * 自定义下拉参照对象
 * 参数:
 *    ev_onchange 绑定事件
 */
var refZdyCombobox=function(ev_onchange){
	//给自定义参照赋默认值
    var url=path + "/publicRef/getZdyRefData";
	var parameters=new Object();
	var options=new Object();
	options.valueField='code';
	options.textField='name';
	//判断是否要绑定事件
	if (ev_onchange !=null && typeof(ev_onchange)=='function'){
		options.onChange=ev_onchange;
	}else{
		options.onChange=function(newValue, oldValue){};
	}
	options.defaultValueKey='code';
	options.defaultValue='';
	options.dataKey='data';
	//创建下拉参照方法,并继承属性方法
	var superRef = new refCombobox(url,parameters,options);
    for(var p in superRef){
    	refZdyCombobox.prototype[p] = superRef[p];
    }
    /**
     * 创建下拉参照
     */
    this.createCombobox=function(id,key){
    	var param = this.getParameters();
    	param.key=key;
    	this.setParameters(param);
    	var data = this.loadRefData();
    	this.setDefaultValue(data.returnObject.defaultValue);
    	this.createComboboxFromData(id, data);
    }
}

