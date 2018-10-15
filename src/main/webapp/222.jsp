<!DOCTYPE html>
<html>
<head>
<meta content="0" http-equiv="Expires">
<meta content="IE=Edge" http-equiv="X-UA-Compatible">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="yes" name="mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<title>jquery特效-Tab切换及触摸滑动轮播模块</title>
<link href="/statics/css/style.css" rel="stylesheet">
@charset "utf-8";html,body{position:relative;height:100%}*{padding:0;margin:0;border:0;list-style:none;font-weight:400;color:#fff;font-family:microsoft yahei}a,a:hover{text-decoration:none}.container{width:100%;height:100%;background:#000;position:relative;background-size:cover;overflow:hidden}.cd-popup1_g{width:835px;height:397px;background:url(../images/popup-g.png) bottom no-repeat;position:absolute;left:50%;margin-left:-417px;bottom:0;z-index:99999}.cd-popup1{position:fixed;left:0;top:0;height:100%;width:100%;opacity:1;visibility:visible;-webkit-transition:opacity .3s 0s,visibility 0s .3s;-moz-transition:opacity .3s 0s,visibility 0s .3s;transition:opacity .3s 0s,visibility 0s .3s;z-index:999}.cd-popup-container1{position:relative;width:90%;margin:70px auto 0;text-align:center;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px);-webkit-backface-visibility:hidden;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;transition-property:transform;-webkit-transition-duration:.3s;-moz-transition-duration:.3s;transition-duration:.3s}.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.clearfix{zoom:1}.container01{margin:70px auto 0;width:1100px}.slide{width:100%;min-height:410px;overflow:hidden;position:relative}.slide .img{overflow:hidden;position:absolute;transition:width .4s,height .4s,top .4s,left .4s,z-index .4s;text-align:center}.slide .img1{width:60%;height:60%;top:15%;left:0%;z-index:1;opacity:.5;background:url(../images/bg_er.png) no-repeat;background-size:contain}.slide .img2{width:80%;height:80%;top:10%;left:2%;z-index:2;opacity:.7;background:url(../images/bg_er.png) no-repeat;background-size:contain}.slide .img3{width:1000px;height:100%;top:5%;left:4.5%;z-index:3;background:url(../images/bg_er.png) no-repeat;background-size:contain}.slide .img4{width:80%;height:80%;top:10%;left:18%;z-index:2;opacity:.7;background:url(../images/bg_er.png) no-repeat;background-size:contain}.slide .img5{width:60%;height:60%;top:15%;left:40%;z-index:1;opacity:.5;background:url(../images/bg_er.png) no-repeat;background-size:contain}.slide-bt{position:absolute;left:50%;top:0;z-index:10;margin-left:-430px!important;width:850px!important}.slide-bt span{display:block;width:160px;height:41px;background:url(../images/bg2.png) no-repeat;float:left;margin:5px;line-height:41px}.slide .slide-bt .on{background:url(../images/bg2_on.png) no-repeat}.slide .poster-btn{position:absolute;top:0;z-index:10;cursor:pointer;height:410px;width:100px}.slide .poster-next-btn{right:0}.slide .poster-prev-btn{left:0}.qyxx{margin:180px auto 0;font-size:50px}
</link>
</head>
<body>
<div class="container">
<div class="cd-popup1">
<div class="cd-popup1_g"></div>
<div class="cd-popup-container1">
<div class="container01">
<div style=" margin-bottom:50px;height:60px;"></div>
<div id="slide" class="slide" alt="star" style="height: 616px;">
<div class="img img1" data-slide-imgid="0">
<div class="img img2" data-slide-imgid="1" onclick="left()">
<div class="img img3" data-slide-imgid="2">
<div class="img img4" data-slide-imgid="3" onclick="right()">
<div class="img img5" data-slide-imgid="4">
<div class="slide-bt" style="width: 800px; margin-left: -275px;">
<div class="poster-btn poster-prev-btn" onclick="left()"></div>
<div class="poster-btn poster-next-btn" onclick="right()"></div>
</div>
</div>
</div>
</div>
</div>
<script src="http://www.jq22.com/jquery/jquery-1.10.2.js">
<script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js">
<script src="js/PicCarousel.js">
</body>
</html>