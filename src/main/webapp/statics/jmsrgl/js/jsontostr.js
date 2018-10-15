function JsonToStr(o) {      
	var arr = [];      
	var fmt = function(s) {      
	if (typeof s == 'object' && s != null) return JsonToStr(s);      
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;      
	};      
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));      
	return '{' + arr.join(',') + '}';      
}

function strToJson(str){ 
	var json = eval('(' + str + ')'); 
	return json; 
} 