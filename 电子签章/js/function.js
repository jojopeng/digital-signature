$(document).ready(function(){
	initCircle();      //印章初始化
	makeSign();    //生成默认印章
	$("#shape").change(function(){
		changeShape(this);
		makeSign();
	});
	$("#fivrStar,#cirS,#rectS,#fontS,#color").change(function(){
		changeColor(this);
		makeSign();
	});
	$("#text,#text2,#text3,#text4").blur(function(){
		if(this.id == 'text'){
			inputText1();
		}else if(this.id == 'text2'){
			inputText2();
		}else if(this.id == 'text3'){
			inputText3();
		}else{
			inputText4();
		}
		makeSign();
	})
});
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	var width=canvas.width/2;
	var height=canvas.height/2;

	var colorTest="#f00";    //设置初始字体颜色
	var lineline=3;         //设置初始字体粗细
	var radius=80;         //设置初始圆的半径
	var fontTest="Arial";    //设置初始字体
	var circle_dis_up = 51;   //将圆附文的位置设置为一个全局变量

	var starRadius="24";   //设置五角星的半径
	var textsize=13;      //设置初始字体的大小
	var textsize_rectAngle=13;    //将矩形的字体设为一个全局变量

	//矩形章的全局属性
	var rectAngle_w=90    //设置初始矩形章的宽度--一半
	var rectAngle_h=30    //设置初始矩形章的高度--一半
	var distance_up=8;    //矩形第一排字距离上边框的距离
	var distance_down=12;  //矩形第二排字距离下边框的距离

// 生成印章
var makeSign = function(){
	var dataUrl = document.getElementById("myCanvas").toDataURL();
		$("#saveButton").click(function(){
			$("#imgSrc > p").html(dataUrl);
			$("#imgSrc > img").attr("src",dataUrl);
		});
}

function clear(context){    //清空画布
	context.clearRect(0,0,width*2,height*2);
}

function changeColor(obj){    //changeColor改变的是-- 颜色、字体形状、字体、五角星大小、
	var opt=obj.options[obj.selectedIndex];  //获取选中颜色下拉项的值
	if(opt.text=="常规"||opt.text=="粗体5"||opt.text=="粗体7"){   //获取字体粗细
		lineline=opt.value;
	}else if(opt.text=="Arial"||opt.text=="微软雅黑"||opt.text=="仿宋"||opt.text=="正楷"){
		fontTest=opt.value;
	}else if(opt.text=="型号1"||opt.text=="型号2"||opt.text=="型号3"||opt.text=="型号4"||opt.text=="无"){
		starRadius=opt.value;
	}else if(opt.text=="可写17字（推荐）"||opt.text=="最多可写15字"||opt.text=="最多可写11字"||opt.text=="最多可写9字"){
		radius=opt.value;
		textsize=opt.value-60;      //根据圆的半径推导出字体
		if(textsize>40){          //如下判断使字体显示合理化
			textsize=38;
		}else if(textsize<=20){
			textsize=18;
		}else if(textsize<=30){
			textsize=24;
		}
		else{
			textsize=30;
		}

	}else if(opt.text=="可写0-13字（推荐）"||opt.text=="最多可写15字"||opt.text=="最多可写16字"||opt.text=="最多可写18字"){
		rectAngle_w=opt.value;     //设置矩形的边框
		rectAngle_h=opt.value/3;
	}
	else{                            
		colorTest=opt.value;           //获取画笔颜色
	}

	var confirmFunction;        
	confirmFunction=document.getElementById("shape");  //获取形状对象
	if(confirmFunction.options[confirmFunction.selectedIndex].text=="圆形"){  //形状对象当前的index值
		circle(context);
	}else if(confirmFunction.options[confirmFunction.selectedIndex].text=="椭圆形1"){
		ellipse(context);    //椭圆形1
	}else if(confirmFunction.options[confirmFunction.selectedIndex].text=="椭圆形2"){
		ellipse2(context);    //椭圆形2
	}else if(confirmFunction.options[confirmFunction.selectedIndex].text=="矩形"){
		rectAngle(context);
	}else{                 //正方形
		square(context);
	}
	
}

function initCircle(){    //初始化图形
		circle(context);
	}

function changeShape(obj){     //改变形状
	var opt=obj.options[obj.selectedIndex];
	if(opt.text=="圆形"){
		document.getElementById("star").removeAttribute("hidden");    //为圆形章的时候，显示下拉列表
		document.getElementById("circleSize").removeAttribute("hidden");
		document.getElementById("rectAngleSize").setAttribute("hidden","hidden");
		document.getElementById("centerText").setAttribute("hidden","hidden");
		$("#trueText").show();   //正文
		document.getElementById("extraText").removeAttribute("hidden");
		document.getElementById("squareText").setAttribute("hidden","hidden");
		circle(context);
	}else if(opt.text=="椭圆形1"){
		document.getElementById("star").setAttribute("hidden","hidden"); //不是圆形章，隐藏下拉列表
		document.getElementById("circleSize").setAttribute("hidden","hidden");
		document.getElementById("rectAngleSize").setAttribute("hidden","hidden");
		document.getElementById("centerText").removeAttribute("hidden");
		$("#trueText").show();   //正文
		document.getElementById("extraText").removeAttribute("hidden");
		document.getElementById("squareText").setAttribute("hidden","hidden");
		ellipse(context);
	}else if(opt.text=="椭圆形2"){
		document.getElementById("star").removeAttribute("hidden"); //不是圆形章，隐藏下拉列表
		document.getElementById("circleSize").setAttribute("hidden","hidden");
		document.getElementById("rectAngleSize").setAttribute("hidden","hidden");
		document.getElementById("centerText").removeAttribute("hidden");
		$("#trueText").show();   //正文
		document.getElementById("extraText").setAttribute("hidden","hidden");
		document.getElementById("squareText").setAttribute("hidden","hidden");
		ellipse2(context);
	}else if(opt.text=="矩形"){
		document.getElementById("star").setAttribute("hidden","hidden");
		document.getElementById("circleSize").setAttribute("hidden","hidden");
		document.getElementById("rectAngleSize").removeAttribute("hidden");  //矩形章显示它的下来菜单
		document.getElementById("centerText").setAttribute("hidden","hidden");
		$("#trueText").show();  //正文
		document.getElementById("extraText").removeAttribute("hidden");
		document.getElementById("squareText").setAttribute("hidden","hideen");
		rectAngle(context);
	}else{
		document.getElementById("star").setAttribute("hidden","hidden");  //中心五角星
		document.getElementById("circleSize").setAttribute("hidden","hidden"); //圆的大小
		document.getElementById("rectAngleSize").setAttribute("hidden","hidden"); // 矩形的大小
		document.getElementById("centerText").setAttribute("hidden","hidden"); //椭圆章中心文字
		$("#trueText").hide();
		document.getElementById("extraText").setAttribute("hidden","hidden"); //附文
		document.getElementById("squareText").removeAttribute("hidden"); //方形章的文字
		square(context);
	}
}

function circle(context){        //圆形
	clear(context);
	context.lineWidth=lineline;
	context.strokeStyle=colorTest;

	context.beginPath();
	context.arc(width,height,radius,0,Math.PI*2);
	context.stroke();
	// 圆的正文
	text1(context);

	// 圆的附文
	text2(context);

	// 画五角星
	create5star(context,width,height,starRadius,colorTest,0);
}

function text1(context){    //绘制圆的正文
	var myWordObj = document.getElementById("text");
	var myWord=myWordObj.value;

	//var fillstyle="rgba(100,100,100,0.8)";
	//textsize=25;                    //正文的字体大小 现在用textsize全局变量代替了
	context.lineWidth=lineline-2;        //修改字体是线条合适
	var circle={x:width,y:height,radius:radius-5};
	function drawCircleText(string,start,end){
		var radiusText=circle.radius,
		angleCre=(start-end)/(string.length-1),
		angle=parseFloat(start),     //获取角度的浮点数
		character;
		context.save();
		context.fillStyle=colorTest;   //字体充填颜色
		context.strokeStyle=colorTest;   //渲染颜色
		context.font=textsize+"px "+fontTest;//FangSongHelvetica微软雅黑仿宋
		for(var index=0;index<string.length;index++){
			character=string.charAt(index);
			context.save();
			context.beginPath();
			context.translate(circle.x+Math.cos(angle)*radiusText,circle.y-Math.sin(angle)*radiusText);
			context.rotate(Math.PI/2-angle);
			context.fillText(character,0,0);
			context.strokeText(character,0,0);
			angle-=angleCre;  
			context.restore();
		}
		context.restore();
	}
	if(radius == 80){        //圆的半径为80的情况
		myWord = myWord.slice(0,17);    //对超过的文本进行删除
		myWordObj.setAttribute('maxlength',17);
		myWordObj.setAttribute('value',myWord);
	}else if(radius == 90 ){
		myWord = myWord.slice(0,15);
		myWordObj.setAttribute('maxlength',15);
		myWordObj.setAttribute('value',myWord);
	}else if(radius == 100){
		myWord = myWord.slice(0,11);
		myWordObj.setAttribute('maxlength',11);
		myWordObj.setAttribute('value',myWord);
	}
	else {
		myWord = myWord.slice(0,9);
		myWordObj.setAttribute('maxlength',9);
		myWordObj.setAttribute('value',myWord);
	}
	context.textAlign="center";
	context.textBaseline="top";     //垂直方向上对齐方式
	if(myWord.length<=4){
		drawCircleText(myWord,Math.PI*3/4,Math.PI/4);        //小于10个字符，使用小的弧度
	}else if(myWord.length>=5&&myWord.length<=14){           //小于10个字符，使用小的弧度
		drawCircleText(myWord,Math.PI*13/12,-Math.PI/12);
	}else{
		drawCircleText(myWord,Math.PI*7/6,-Math.PI/6);    //顺时针，起始角度
	}

}


function text2(context){     //绘制圆的附文
	var myWord2Obj = document.getElementById("text2");
	var myWord2=myWord2Obj.value;
	context.lineWidth=lineline-2;  //修改字体是线条合适
	context.fillStyle=colorTest;   //字体充填颜色
	context.strokeStyle=colorTest;
	var textsize=textsize;
	var textsize2=textsize-10;      //根据字体textsize导出textsize2的字体大小
	if(textsize2<=20&&textsize2>15){
		textsize2=18;
	}
	if(textsize2>20){
		textsize2=22;
	}
	context.font=textsize2+"px Arial";//FangSong
	context.textAlign="center";
	context.textBaseline="middle";
	if(radius == 80){        //圆的半径为80的情况
		circle_dis_up = 51;
		myWord2 = myWord2.slice(0,9);
		myWord2Obj.setAttribute('maxlength',9);
		myWord2Obj.setAttribute('value',myWord2);
	}else if(radius == 90 || radius == 100){
		circle_dis_up = 59;
		myWord2 = myWord2.slice(0,8);
		myWord2Obj.setAttribute('maxlength',8);
		myWord2Obj.setAttribute('value',myWord2);
	}else {
		circle_dis_up = 65;
		myWord2 = myWord2.slice(0,7);
		myWord2Obj.setAttribute('maxlength',7);
		myWord2Obj.setAttribute('value',myWord2);
	}

	// circle_dis_up  圆附文的位置
	context.fillText(myWord2,width,height+circle_dis_up);
	context.strokeText(myWord2,width,height+circle_dis_up);
	
}

function ellipse(context){     //画椭圆形1
	
   function drawEllipse(x, y, w, h) {    //绘制外环
             var k = 0.5522848;
             var ox = (w / 2) * k;
             var oy = (h / 2) * k;
             var xe = x + w;
             var ye = y + h;
             var xm = x + w / 2;
             var ym = y + h / 2;
             context.beginPath();
             context.moveTo(x, ym); 
             context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
             context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
             context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
             context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
             context.stroke();
         }
   clear(context);
   context.lineWidth=lineline;      //字体粗细、画笔颜色设为变量
   context.strokeStyle=colorTest;
   drawEllipse(width-90, height-60, 180, 120);   //1.5倍的距离
   ellipseText();
   context.lineWidth=lineline-1;      //内环线条的粗细
   context.strokeStyle=colorTest;
   drawEllipse(width-60, height-37, 120, 74);    //画内环
}
 
function ellipse2(context){                 //绘制内环
	function drawEllipse(x, y, w, h) {
             var k = 0.5522848;
             var ox = (w / 2) * k;
             var oy = (h / 2) * k;
             var xe = x + w;
             var ye = y + h;
             var xm = x + w / 2;
             var ym = y + h / 2;
             context.beginPath();
             context.moveTo(x, ym); 
             context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
             context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
             context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
             context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
             context.stroke();
         }
   clear(context);
   context.lineWidth=lineline;      //字体粗细、画笔颜色设为变量
   context.strokeStyle=colorTest;
   drawEllipse(width-90, height-60, 180, 120);   //1.5倍的距离
   ellipseText2();
   create5star(context,width,height,starRadius,colorTest,0);
}

function ellipseText(){     //绘制椭圆形1的文本
	var myWord=document.getElementById("text").value;
	var myWord2=document.getElementById("text2").value;
	var myWord3=document.getElementById("text3").value;
	document.getElementById("text").setAttribute("maxlength",15);
	myWord = myWord.slice(0,15);
	context.lineWidth=lineline-2;        //修改字体是线条合适
	var circle={x:width,y:height,radius:55};
	function drawEllipseText(string,start,end){   //绘制 上半环
		var radiusText=circle.radius,
		angleCre=(start-end)/(string.length-1),
		angle=parseFloat(start);     //获取角度的浮点数
		var character;
		context.save();
 		context.scale(1.4,0.9);
		context.fillStyle=colorTest;     //字体充填颜色
		context.strokeStyle=colorTest;   //渲染颜色
		context.font=15+"px "+fontTest;  //FangSongHelvetica微软雅黑仿宋
		for(var index=0;index<string.length;index++){
			character=string.charAt(index);
			context.save();
			context.beginPath();
			context.translate(circle.x-40+Math.cos(angle)*radiusText,circle.y+16-Math.sin(angle)*radiusText);
			context.rotate(Math.PI/2-angle);
			context.fillText(character,0,0);
			context.strokeText(character,0,0);
			angle-=angleCre;  
			context.restore();
		}
		context.restore();
		
	}
	function drawEllipseText2(string,start,end){   //绘制 下半环
		var radiusText=circle.radius,
		angleCre=(start-end)/(string.length-1),
		angle=parseFloat(start);     //获取角度的浮点数
		var character;
		context.save();
 		context.scale(1.4,0.9);      //压缩圆后，圆的外轮廓跟起始点的距离都压缩了
		context.fillStyle=colorTest;     //字体充填颜色
		context.strokeStyle=colorTest;   //渲染颜色
		context.font=14+"px "+fontTest;  //FangSongHelvetica微软雅黑仿宋
		for(var index=0;index<string.length;index++){
			character=string.charAt(index);
			context.save();
			context.beginPath();
			context.translate(circle.x-40+Math.cos(angle)*radiusText,circle.y+16-Math.sin(angle)*radiusText);
			context.rotate(Math.PI/2-angle+Math.PI);
			context.fillText(character,0,0);
			context.strokeText(character,0,0);
			angle-=angleCre;  
			context.restore();
		}
		context.restore();
	}
	context.textAlign="center";
	context.textBaseline="middle";     //垂直方向上对齐方式

	drawEllipseText(myWord,Math.PI,0);  //椭圆上环文字的显示范围
	if(myWord2.length<=5){     //小于5个字符的显示区间
		drawEllipseText2(myWord2,-Math.PI*2/3,-Math.PI/3);   //椭圆下环文字的显示范围
	}else{
		drawEllipseText2(myWord2,-Math.PI*5/6,-Math.PI/6);   //椭圆下环文字的显示范围
	}
	

	//椭圆形的正文文字显示
	context.font=9+"px "+fontTest;//设置字体格式
	context.strokeStyle=colorTest;   //渲染颜色
	context.fillStyle=colorTest;     //字体充填颜色
	context.fillText(myWord3,width,height);  //fillText文字的属性为自动由中心向两端伸缩
	context.strokeText(myWord3,width,height);
}

function ellipseText2(){      //绘制椭圆形2的文本
	var myWord=document.getElementById("text").value;
	var myWord2=document.getElementById("text2").value;
	var myWord3=document.getElementById("text3").value;
	context.lineWidth=lineline-2;        //修改字体是线条合适
	var circle={x:width,y:height,radius:55};

	function drawEllipseText(string,start,end){   //绘制 上半环
		var radiusText=circle.radius,
		angleCre=(start-end)/(string.length-1),
		angle=parseFloat(start);     //获取角度的浮点数
		var character;
		context.save();
 		context.scale(1.4,0.9);
		context.fillStyle=colorTest;     //字体充填颜色
		context.strokeStyle=colorTest;   //渲染颜色
		context.font=15+"px "+fontTest;  //FangSongHelvetica微软雅黑仿宋
		for(var index=0;index<string.length;index++){
			character=string.charAt(index);
			context.save();
			context.beginPath();
			context.translate(circle.x-40+Math.cos(angle)*radiusText,circle.y+16-Math.sin(angle)*radiusText);
			context.rotate(Math.PI/2-angle);
			context.fillText(character,0,0);
			context.strokeText(character,0,0);
			angle-=angleCre;  
			context.restore();
		}
		context.restore();
		
	}

	context.textAlign="center";
	context.textBaseline="middle";     //垂直方向上对齐方式

	drawEllipseText(myWord,Math.PI,0);  //椭圆上环文字的显示范围
	context.font=9+"px "+fontTest;//设置字体格式
	context.strokeStyle=colorTest;   //渲染颜色
	context.fillStyle=colorTest;     //字体充填颜色
	context.fillText(myWord3,width,height+35);  //fillText文字的属性为自动由中心向两端伸缩
	context.strokeText(myWord3,width,height+35);
}

function rectAngle(context){   //画矩形
	clear(context);
	context.lineWidth=lineline-1;
	context.strokeStyle=colorTest;
	context.beginPath();
	context.strokeRect(width-rectAngle_w,height-rectAngle_h,rectAngle_w*2,rectAngle_h*2);   
	//距离矩形左上角的x,y坐标,矩形的宽/高度,以像素计
	context.stroke();
	rectAngleText();
}

function square(context){    //画正方形
	clear(context);
	context.lineWidth=lineline;
	context.strokeStyle=colorTest;
	context.beginPath();
	context.strokeRect(width-56,height-56,112,112);
	context.stroke(); 
	squareText(context);
}

function squareText(context){   //绘制正方形的文字
	myWord4=document.getElementById("text4").value;  //正方形章的文字
	//var character;
	context.font=45+"px "+fontTest;//设置字体格式
	context.strokeStyle=colorTest;   //渲染颜色
	context.fillStyle=colorTest;     //字体充填颜色
	for(var index=0; index<myWord4.length; index++){
		var character=myWord4.charAt(index);
		if(index==0){
			context.fillText(character,width+28,height-28);  
			//fillText文字的属性为自动由中心向两端伸缩
			// context.strokeText(character,width+28,height-28);
		}else if(index==1){
			context.fillText(character,width+28,height+28);  
			//fillText文字的属性为自动由中心向两端伸缩
			//context.strokeText(character,width+45,height+45);
		}else if(index==2){
			context.fillText(character,width-28,height-28);  
			//fillText文字的属性为自动由中心向两端伸缩
			//context.strokeText(character,width-45,height-45);
		}else{
			context.fillText(character,width-28,height+28);  
			//fillText文字的属性为自动由中心向两端伸缩
			//context.strokeText(character,width-45,height+45);
		}
	}
}

function inputText4(){   //印章正文的值改变事件
	var newText4=document.getElementById("text4").value;
	document.getElementById("text4").setAttribute("value",newText4);
	clear(context);      //清空画布，重新绘制

	
	var confirmShape;        
	confirmShape=document.getElementById("shape");  //获取形状对象
	if(confirmShape.options[confirmShape.selectedIndex].text=="圆形"){  //形状对象当前的index值
		circle(context);
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形1"){
		ellipse(context);    //椭圆形1
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形2"){
		ellipse2(context);    //椭圆形2
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="矩形"){
		rectAngle(context);
	}else{                 //正方形
		square(context);
	}
}



function inputText1(){   //印章正文的值改变事件
	var newText1=document.getElementById("text").value;
	document.getElementById("text").setAttribute("value",newText1);
	clear(context);      //清空画布，重新绘制
	var confirmShape;        
	confirmShape=document.getElementById("shape");  //获取形状对象
	if(confirmShape.options[confirmShape.selectedIndex].text=="圆形"){  //形状对象当前的index值
		circle(context);
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形1"){
		ellipse(context);    //椭圆形1
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形2"){
		ellipse2(context);    //椭圆形2
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="矩形"){
		rectAngle(context);
	}else{                 //正方形
		square(context)
	}
	return canvas;
}

function inputText2(){    //印章的附文值改变事件
	var newText2=document.getElementById("text2").value;
	document.getElementById("text2").setAttribute("value",newText2);
	clear(context);
	
	var confirmShape;      //确定要绘制的形状   
	confirmShape=document.getElementById("shape");  //获取形状对象
	if(confirmShape.options[confirmShape.selectedIndex].text=="圆形"){  //形状对象当前的index值
		circle(context);
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形1"){
		ellipse(context);    //椭圆形1
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形2"){
		ellipse2(context);    //椭圆形2
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="矩形"){
		rectAngle(context);
	}else{                 //正方形
		square(context)
	}
}

function inputText3(){    //印章的附文值改变事件
	var newText3=document.getElementById("text3").value;
	document.getElementById("text3").setAttribute("value",newText3);
	clear(context);
	
	var confirmShape;      //确定要绘制的形状   
	confirmShape=document.getElementById("shape");  //获取形状对象
	if(confirmShape.options[confirmShape.selectedIndex].text=="圆形"){  //形状对象当前的index值
		circle(context);
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形1"){
		ellipse(context);    //椭圆形1
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="椭圆形2"){
		ellipse2(context);    //椭圆形2
	}else if(confirmShape.options[confirmShape.selectedIndex].text=="矩形"){
		rectAngle(context);
	}else{                 //正方形
		square(context)
	}
}

function create5star(context,sx,sy,radius,color,rotato){    //画五角星
	context.strokeStyle="#f00";
	context.save();       //保存当前状态，使用restore()可以返回到当前状态
	context.fillStyle=color;  //设置图形填充颜色
	context.translate(sx,sy);//移动坐标原点  
	context.rotate(Math.PI+rotato);//旋转 
	context.beginPath();//创建路径 
	//var x = Math.sin(0);  
//	var y= Math.cos(0);  
	var dig = Math.PI/5 *4;  
	for(var i = 0;i< 5;i++){   //画五角星的五条边  
		var x = Math.sin(i*dig);  
		var y = Math.cos(i*dig);  
		context.lineTo(x*radius,y*radius);  
	}   
	context.closePath();    
	context.fill();  //充填当前路径的内部
	context.restore();   
} 
function rectAngleText(){      //绘制矩形的正文和附文
	var textObj = document.getElementById("text");
	var text2Obj = document.getElementById("text2");
	var myWord=textObj.value;   //获取正文
	var myWord2=text2Obj.value;  //获取附文
	context.lineWidth=lineline-2;  //修改字体使线条合适
	context.fillStyle=colorTest;   //字体充填颜色
	context.strokeStyle=colorTest;  //字体渲染颜色
	// textsize_rectAngle=13;      //初始化字体为13
	var textsizeR=textsize_rectAngle=13;      //根据字体textsize导出矩形正文的字体大小
	var textsizeRF=textsizeR-4; //根据矩形字体的大小推导出附文字体的大小

	if(rectAngle_w == 102){
		distance_up = 10;
		distance_down = 14;
		textObj.setAttribute("maxlength","15");
		text2Obj.setAttribute("maxlength","12");
	}else if(rectAngle_w == 111){
		distance_up = 12;
		distance_down = 14;
		textObj.setAttribute("maxlength","16");
		text2Obj.setAttribute("maxlength","13");
	}else if(rectAngle_w == 120){
		distance_up = 8;
		distance_down = 18;
		textObj.setAttribute("maxlength","18");
		text2Obj.setAttribute("maxlength","15");
	}else{
		distance_up = 8;
		distance_down = 12;
		textObj.setAttribute("maxlength","13");
		text2Obj.setAttribute("maxlength","10");
	}

	context.textAlign="center";
	context.textBaseline="middle";
	//绘制矩形章的正文
	context.font=textsizeR+"px "+fontTest;//设置字体格式
	context.fillText(myWord,width,height-distance_up);    //距离上边框20
	context.strokeText(myWord,width,height-distance_up);
	//绘制矩形章的附文
	context.font=textsizeRF+"px "+fontTest;
	context.fillText(myWord2,width,height+distance_down);
	context.strokeText(myWord2,width,height+distance_down);   //距离下边框20
}