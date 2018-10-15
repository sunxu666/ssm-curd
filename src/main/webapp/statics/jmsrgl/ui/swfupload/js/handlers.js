function fileQueueError(file, errorCode, message) {
	try {
		var imageName = "<font color='red'>文件导入错误</font>";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "You have attempted to queue too many files.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			imageName = "<font color='red'>文件大小为0</font>";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			imageName = "<font color='red'>文件大小超过限制</font>";
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		default:
			alert(message);
			break;
		}
		addReadyFileInfo(file.id,file.name,imageName,"无法导入");

	} catch (ex) {
		this.debug(ex);
	}
}

/**
 * 当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，
 * 那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）。
 * @param {} file
 * id : string,			    // SWFUpload控制的文件的id,通过指定该id可启动此文件的上传、退出上传等
 * index : number,			// 文件在选定文件队列（包括出错、退出、排队的文件）中的索引，getFile可使用此索引
 * name : string,			// 文件名，不包括文件的路径。
 * size : number,			// 文件字节数
 * type : string,			// 客户端操作系统设置的文件类型
 * creationdate : Date,		// 文件的创建时间
 * modificationdate : Date,	// 文件的最后修改时间
 * filestatus : number		// 文件的当前状态，对应的状态代码可查看SWFUpload.FILE_STATUS }
 */
function fileQueued(file){
	addReadyFileInfo(file.id,file.name,file.size,"");
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
			document.getElementById('btnCancel').disabled = "";
			//this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {

	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  this.customSettings.upload_target);
		progress.setProgress(percent);
		if (percent === 100) {
			progress.setStatus("");
			progress.toggleCancel(false, this);
		} else {
			progress.setStatus("正在导入...");
			progress.toggleCancel(true, this);
		} 
	} catch (ex) {
		this.debug(ex);
	}
}

/**
 * 接收服务端返回信息
 * @param file
 * @param serverData
 */
function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file,  this.customSettings.upload_target);

		serverData = strToJson(serverData);
		var message = serverData.msg;
		var code = serverData.code;
		var returnObject = serverData.returnObject;

		if(returnObject.length>0){
		    var error="";
		    for(var i=0;i<returnObject.length;i++){
		    	if (error == "") {
		    		error = returnObject[i].msg;
		    	} else {
		    		error = error + "&" + returnObject[i].msg;
		    	}
			}
		    
			var row = document.getElementById(file.id);
			$(row).data("errmsg", error);
			
		    message = "具体见详细信息" + "&nbsp&nbsp&nbsp<a href='javascript:showDetails(\""+file.id+"\")'>详细信息</a>";
		}
		showMessage(file.id, message);
	} catch (ex) {
		this.debug(ex);
	}
}

function showDetails(id){
	var row = document.getElementById(id);
	var flag = $(row).data("errmsg");
	rtnlist = flag.split("&");
	var str = "<br>";
	for(var i=0;i<rtnlist.length;i++){
		str = str + "<tr>&nbsp&nbsp" + rtnlist[i]+ "</tr><br>";
	}
	str = "<table cellpadding=3 width='100%'>" + str + "</table>"
	infoBar.innerHTML = str;
}

function showMessage(fileId,message){
	var row = document.getElementById(fileId);
	if (message == "导入成功"){
		row.cells[2].innerHTML = "<font color='green' size='1'>"+message+"</font>";
	}else{
		row.cells[2].innerHTML = "<font color='red' size='1'>"+message+"</font>";
	}
}


function convertMessage(flag){
	var rtn = "";
	switch(flag){
    case '1':
    	rtn = "导入成功";
    	break;
    case '11':
    	rtn = "数据文件异常";
    	break;
    case '2':
    	rtn = "数据文件异常";
    	break;
    case '3':
    	rtn = "申报项目与鉴定信息不符";
    	break;
    case '4':
    	rtn = "数据文件异常";
    	break;
    case '5':
    	rtn = "申报项目已通过审核";
    	break;
    case '6':
    	rtn = "申报项目与鉴定信息不符";
    	break;
    case '60':
    	rtn = "申报项目与鉴定信息不符";
    	break;
    case '0':
    	rtn = "数据文件异常";
    	break;
    case '00':
    	rtn = "数据文件异常";
    	break;
    case '99':
    	rtn = "申报项目与鉴定信息不符";
    	break;
    case '99X':
    	rtn = "申报项目与鉴定信息不符-空类型";
    	break;
    case '01':
    	rtn = "申报项目与鉴定信息不符";
    	break;
	}
	return rtn;
}

function convertCellName(flag){
	var rtn = "";
	switch(flag){
    case 'nda':
    	rtn = "企业所得税年度纳税申报表（A类）";
    	break;
    case 'ndb':
    	rtn = "企业所得税年度纳税申报表（B类）";
    	break;
    case 'yja':
    	rtn = "企业所得税预缴纳税申报表（A类）";
    	break;
    case 'yjb':
    	rtn = "企业所得税预缴纳税申报表（B类）";
    	break;
    case 'lr1':
    	rtn = "财务报表-利润表";
    	break;
    case 'lr7':
    	rtn = "财务报表-利润表";
    	break;
    case 'xj1':
    	rtn = "财务报表-现金流量表";
    	break;
    case 'xj7':
    	rtn = "财务报表-现金流量表";
    	break;
    case 'zc1':
    	rtn = "财务报表-资产负债表";
    	break;
    case 'zc7':
    	rtn = "财务报表-资产负债表";
    	break;
    case 'syz':
    	rtn = "财务报表-所有者权益变动表";
    	break;
    case 'glb':
    	rtn = "关联业务往来报告表";
    	break;
    case 'zjg':
    	rtn = "汇总纳税分支机构所得税分配表";
    	break;
    case 'xxw':
    	rtn = "小型微利企业认定表";
    	break;
    case 'gzd':
    	rtn = "企业所得税汇算清缴工作底稿";
    	break;
    case 'jjk':
    	rtn = "可加计扣除研究开发费及其他新增";
    	break;	
	case 'sc1':
		rtn = "四川地税工资薪金比对表";
		break;	
	case 'sc2':
	    rtn = "四川地税金融企业财务报表";
	    break;	
	case 'sc3':
    	rtn = "四川地税事业及行政单位财务报表";
    	break;
	case 'xqy':
    	rtn = "小企业财务报表";
    	break;	
	case 'fjg':
    	rtn = "分支机构企业所得税年度纳税申报表";
    	break;	
	}
	
	return rtn;
}



function addFileInfo(fileId,message){
	var row = document.getElementById(fileId);
	row.cells[2].innerHTML = "<font color='green'>"+message+"</font>";
}

function addReadyFileInfo(fileid,fileName,fileSize,message){
	//用表格显示
	var infoTable = document.getElementById("infoTable");
	var row = infoTable.insertRow();
	row.id = fileid;
	var col1 = row.insertCell();
	var col2 = row.insertCell();
	var col3 = row.insertCell();
	var col4 = row.insertCell();
	col4.align = "right";
	col1.innerHTML = fileName;
	col2.innerHTML = message+"";
	col3.innerHTML = fileSize;
	if(fileSize!=null&&fileSize!=""){
		col3.innerHTML=fileSize + "字节";
	}else{
		col3.innerHTML="";
	}
	col4.innerHTML = "<a href='javascript:deleteFile(\""+fileid+"\")'>删除</a>";
	col1.style.width="150";
	col2.style.width="80";
	col3.style.width="180";
	col4.style.width="80";
}

function cancelUpload(){
	var infoTable = document.getElementById("infoTable");
	var rows = infoTable.rows;
	var ids = new Array();
	var row;
	if(rows==null){
		return false;
	}
	for(var i=0;i<rows.length;i++){
		ids[i] = rows[i].id;
	}	
	for(var i=0;i<ids.length;i++){
		deleteFile(ids[i]);
	}
	divFileProgressContainer.style.display = "none";
	
	infoBar.innerHTML = "";
}

function deleteFile(fileId){
	//用表格显示
	var infoTable = document.getElementById("infoTable");
	var row = document.getElementById(fileId);
	infoTable.deleteRow(row.rowIndex);
	swfu.cancelUpload(fileId,false);
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			document.getElementById("showState").style.display = "";
			this.startUpload();
		} else {
			var progress = new FileProgress(file,  this.customSettings.upload_target);
			progress.setComplete();
			progress.setStatus("<font color='red'>电子数据已成功上传，导入结果见列表！<b/></font>");
			progress.toggleCancel(false);
			//导入文件完毕后显示所有删除链接
			document.getElementById("showState").style.display = "none";
			var infoTable = document.getElementById("infoTable");
			for (var i=0;i<infoTable.rows.length;i++)
			{
				if (infoTable.rows[i].cells[3].style.display == "none")
				{
					infoTable.rows[i].cells[3].style.display = "";
				}
			}
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	var imageName =  "<font color='red'>文件出错!</font>";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>取消!</font>");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>停止!</font>");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "<font color='red'>文件大小超过限制!</font>";
			break;
		default:
			alert(message);
			break;
		}
		addFileInfo(file.id,imageName);
	} catch (ex3) {
		this.debug(ex3);
	}

}


function addImage(src) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";

	document.getElementById("thumbnails").appendChild(newImg);
	if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}

	newImg.onload = function () {
		fadeIn(newImg, 0);
	};
	newImg.src = src;
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */

function FileProgress(file, targetID) {
	//正在处理中，使删除链接不显示
	var infoTable = document.getElementById("infoTable");
	for (var i=0;i<infoTable.rows.length;i++)
	{
		var fileId = infoTable.rows[i].id;
		if (fileId == file.id)
		{
			infoTable.rows[i].cells[3].style.display = "none";
		}
		else
		{
			infoTable.rows[i].cells[3].style.display = "";
		}
	}
	
	this.fileProgressID = "divFileProgress";

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode("正在处理文件: "+file.name));
		progressText.id = "showState";
		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		//document.getElementById(targetID).style.height = "75px";
		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = "正在处理文件: "+file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;
	
}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfuploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};