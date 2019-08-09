window.onload=function()
{
	var c = document.getElementById("mycanvas");
	var littlesize = 32;//小方格尺寸
	var litteyuansizt = 12;//棋子半径
	var clickyu = 14;//点击有效半径
	var celuer = 16;//策略时考虑的范围半径
	var piececolor1= "rgba(255,0,0,1)";//棋子颜色1
	var piececolor2= "rgba(0,255,255,1)";//棋子颜色2
	var pieceuplength = 0;
	var pieceuparray = [];
	var pieceupkexia = [];//可下棋子的对象
	var celuejieguoarray=[];//策略位置结果数组
	var celuejieweidouarray=[];//策略围堵结果数组
	var a1=[],a2=[],a3=[],a4=[],a5=[],a6=[],a7=[],a8=[],a9=[],b1=[],b2=[],b3=[],b4=[],b5=[],b6=[],b7=[],b8=[],b9=[];
	var piecetab = true;
	var isOverWin = false;
	var boxwidth = window.outerWidth;
	var boxheight = window.outerHeight;
	var littleboxwid = parseInt((boxwidth+30)/littlesize);
	var littleboxhei = parseInt((boxheight+30)/littlesize);
	cwidth = c.width = littleboxwid*littlesize;
	cheight = c.height = littleboxhei*littlesize;
	c.style.top=-(cheight-boxheight)/2+'px';
	c.style.marginLeft=-cwidth/2+'px';
	var coffsetLeft = c.offsetLeft;
	var coffsetTop = c.offsetTop;
	var context = c.getContext("2d");
	var linecolor = "red";
	var zhi=0;
	var select = document.getElementsByClassName("top")[0];
	var ainput = select.getElementsByTagName("input");
	var odayinduixiang = document.getElementById('dayinduixiang');
	odayinduixiang.onclick = function()
	{
		console.log(objarr);
	};
	select.style.display="block";
	for(var i=0 ;i<ainput.length;i++)
	{
		ainput[i].onclick=function(ev)
		{
			var zhi = this.value;
			if(zhi == 1)
			{
				piecetab = false;
				fn_duishou();
				select.style.display="none";
			}else{
				select.style.display="none";
				return;
			};
		};
	};
	for(var i=1;i<littleboxhei;i++)
	{
		context.beginPath();
		zhi = i*littlesize;
		context.moveTo(littlesize+0.5,zhi+0.5);
	    context.lineTo(cwidth-littlesize+0.5,zhi+0.5);  
	    context.lineWidth = 1;
	    context.strokeStyle = linecolor;
	    context.stroke();
	};
	for(var i=1;i<littleboxwid;i++)
	{
		context.beginPath();
		zhi = i*littlesize;
		context.moveTo(zhi+0.5,littlesize+0.5);
	    context.lineTo(zhi+0.5,cheight-littlesize+0.5);
	    context.lineWidth = 1;
	    context.strokeStyle = linecolor;
	    context.stroke();
	};
	var objarr=[];
	var indexind = 0;
	for(var i=1;i<littleboxhei;i++)
	{
		for(var j=1;j<littleboxwid;j++)
		{
			indexind++;
			var zhi1 = i*littlesize;
			var zhi2 = j*littlesize;
			var obj={
				xinX:zhi2,
				xinY:zhi1,
				ind:indexind,
				ok:true
			};
			objarr.push(obj);
		};
	};
	//画圆函数1
	function fn_yuan(x,y,color)
	{
		context.beginPath();
		context.arc(x,y,litteyuansizt,0,2*Math.PI,true);
		pieceuplength++;
		context.fillStyle = color;
		context.fill();
	};
	//根据坐标确定位置
	function fn_returnind(x,y,yu)
	{
		for(var i=0;i<objarr.length;i++)
		{
			var obj1 = objarr[i];
			if(x>obj1.xinX-yu && x<obj1.xinX+yu && y>obj1.xinY-yu && y<obj1.xinY+yu)
			{
				return obj1.ind;
			 	break;
			}
		};
		return 0;
	};
	c.onclick=function(ev)
	{
		if(isOverWin){
			myalert("已经结束了");
			$(".again_one").css('display','block')
			$(".again_one").click(function(){
				window.location.reload()
			})
			return;
		};
		if(select.style.display=="block")
		{
			myalert("选择谁先走！");
			return;
		};
		var ev = ev||window.event;
		var x = ev.pageX - coffsetLeft;
		var y = ev.pageY - coffsetTop;
		var clickind = fn_returnind(x,y,clickyu);
		if(clickind == 0){return false;}
		var obj2 = objarr[clickind-1];
		if(obj2.ok)
		{
			if(piecetab)
			{
				fn_yuan(obj2.xinX,obj2.xinY,piececolor2);
				pieceuparray.push(clickind);
				piecetab = obj2.ok=false;
				obj2.player = 'a';
				fn_duishou();
				win(clickind);
			}else{
				myalert("请稍等我还没想好！");
			};
		};
	};
	//把每个对应的序号显示出来
	for(var i=0;i<objarr.length;i++)
	{
		// context.font="12px 微软雅黑";
		// context.fillStyle = 'rgba(0, 0, 0, .4)';
		// context.fillText(i+1,objarr[i].xinX-9,objarr[i].xinY+1);
	};
	function fn_duishou()
	{
		//策略数组
		a1=[];a2=[];a3=[];a4=[];a5=[];a6=[];a7=[];a8=[];a9=[];b1=[];b2=[];b3=[];b4=[];b5=[];b6=[];b7=[];b8=[];b9=[];
		setTimeout(function(){
			if(pieceuplength==0)
			{
				var ind = fn_returnind(cwidth/2,cheight/2,20);
				var obj = objarr[ind];
				fn_yuan(obj.xinX,obj.xinY,piececolor1);
				pieceuparray.push(obj.ind);
				obj.ok=false;
				obj.player = 'b';
			}
			else
			{
				var arr1 = [];
				for(var i=0;i<objarr.length;i++)
				{
					if(objarr[i].player && objarr[i].player == 'b')
					{
						arr1.push(objarr[i]);
					};
				};
				if(arr1.length == 0)
				{
					//console.log(pieceuparray);
					var o1 = objarr[pieceuparray[0]-1];
					o1 = fn_celue(o1.xinX,o1.xinY);
					var arr1 = [];
					for(var p in o1)
					{
						if(o1[p].length==0)
						{}
						else
						{
							arr1.push(o1[p][0]);
						}
					};
					var ind1 = suiji(0,arr1.length-1);
					var ind2 = arr1[ind1]-1;
					fn_yuan(objarr[ind2].xinX,objarr[ind2].xinY,piececolor1);
					objarr[ind2].ok=false;
					objarr[ind2].player = 'b';
					pieceuparray.push(ind2+1);
				}
				else
				{
					fn_uppiece();
				};
			};
			piecetab = true;
		},500);
	};
	//走棋策略
	//删除数组中重复项
	function fn_removearraysub(arr)
	{
		var newArr = [];
		for(var i =0;i<arr.length;i++){
		　　 if(newArr.indexOf(arr[i]) == -1){
		　　　　newArr.push(arr[i]);
		　　};
		};
		return newArr;
	}
	//判断走棋对策
	function fn_uppiece()
	{
		pieceupkexia = [];
		for(var i=0;i<objarr.length;i++)
		{
			var obj1 = objarr[i];
			if(!obj1.ok)
			{
				pieceupkexia.push(obj1.ind);
			};
		};
		fn_celuejieguo(pieceupkexia);
		for(var i=0;i<pieceupkexia.length;i++)
		{
			var ind3 = pieceupkexia[i];
			var obj3 = objarr[ind3-1];
			var o13 = obj3.o1;
			for(var p in o13)
			{
				var arr3 = o13[p];
				if(arr3.length!=0)
				{
					a1.push(arr3[0]);
				};
			};
		};
		a1 = fn_removearraysub(a1);
		a1 = fn_removeduifang(a1);
		fn_celuejieguo(a1);
		//console.log(a1);
		//fn_drawNum(a1,0,0,"x","rgba(255,0,0,1)");
		b1 = a1.slice();
		fn_celuexiayibu(a1,"b");
		fn_hengshuhebing(a1);
		a2 = fn_celue2(a1,1);//策略得到1以上结果数据放入a2数组中；
		a3 = fn_celue2(a2,2);//策略得到2以上结果数据放入a2数组中；
		a4 = fn_celue2(a3,3);//策略得到1以上结果数据放入a2数组中；
		a5 = fn_celue2(a4,4);//策略得到1以上结果数据放入a2数组中；
		fn_zuijia();//则略优势棋子一个；放入a6数组中;
		//fn_drawNum(a9,0,5,"5","rgba(255,0,0,)");
		//fn_drawNum(a8,9,5,"4","rgba(255,0,0,1)");
		//fn_drawNum(a7,9,10,"3","rgba(255,0,0,1)");
		//fn_drawNum(a6,0,0,"2","rgba(255,0,0,1)");
		// console.log(a9);//5
		// console.log(a8);//4
		// console.log(a7);//3
		// console.log(a6);//2

		fn_celuexiayibu(b1,"a");
		fn_hengshuhebing(b1);
		b2 = fn_celue2(b1,1);//策略得到1以上结果数据放入b2数组中；
		b3 = fn_celue2(b2,2);//策略得到2以上结果数据放入b2数组中；
		b4 = fn_celue2(b3,3);//策略得到1以上结果数据放入b2数组中；
		b5 = fn_celue2(b4,4);//策略得到1以上结果数据放入b2数组中；
		fn_zuijiadu();//则略优势棋子一个；放入b6数组中;
		// console.log("hahh");
		// console.log(b9);//5
		// console.log(b8);//4
		// console.log(b7);//3
		// console.log(b6);//2


		if(a9.length!=0)
		{
			if(a9.length!=1)
			{
				var sui1 = fn_returnsuiji(a9);
				fn_luozi(a9[sui1]);
			}
			else
			{
				fn_luozi(a9[0]);
			};
			return;
		}else if(b9.length!=0)
		{
			if(b9.length!=1)
			{
				var sui1 = fn_returnsuiji(b9);
				fn_luozi(b9[sui1]);
			}
			else
			{
				fn_luozi(b9[0]);
			};
			return;
		}else if(a8.length!=0)
		{
			if(a8.length!=1)
			{
				var sui1 = fn_returnsuiji(a8);
				fn_luozi(a8[sui1]);
			}
			else
			{
				fn_luozi(a8[0]);
			};
			return;
		};
		if(b8.length!=0)
		{
			if(b8.length!=1)
			{
				//var sui1 = fn_returnsuiji(b8);
				//fn_luozi(b8[sui1]);
				for(var i= 0;i<b8.length;i++)
				{
					var d1 = fn_dayusan(b8[i]);
					if(d1>=2)
					{
						fn_luozi(b8[i]);
						break;
						return;
					};
				};
			}
			else
			{
				var d1 = fn_dayusan(b8[0]);
				if(d1>=2)
				{
					fn_luozi(b8[0]);
					return;
				};
			};
		};
		if(a7.length!=0)
		{
			if(a7.length!=1)
			{
				for(var i= 0;i<a7.length;i++)
				{
					var d1 = fn_dayusan(a7[i]);
					if(d1>=2)
					{
						fn_luozi(a7[i]);
						break;
						return;
					};
				};
			}
			else
			{
				var d1 = fn_dayusan(a7[0]);
				if(d1>=2)
				{
					fn_luozi(a7[0]);
					return;
				};
			};
		};
		if(b7.length!=0)
		{
			if(b7.length!=1)
			{
				for(var i= 0;i<b7.length;i++)
				{
					var d1 = fn_dayusan(b7[i]);
					if(d1>=2)
					{
						fn_luozi(b7[i]);
						break;
						return;
					};
				};
			}
			else
			{
				var d1 = fn_dayusan(b7[0]);
				if(d1>=2)
				{
					fn_luozi(b7[0]);
					return;
				};
			};
		};
		if(a7.length!=0)
		{
			if(a7.length!=1)
			{
				var sui1 = fn_returnsuiji(a7);
				fn_luozi(a7[sui1]);
			}
			else
			{
				fn_luozi(a7[0]);
			};
			return;
		};
		if(a6.length!=1)
		{
			var sui1 = fn_returnsuiji(a6);
			fn_luozi(a6[sui1]);
		}
		else
		{
			fn_luozi(a6[0]);
		};

	};
	function luoziCelue()
	{
		//fn_drawNum(a6,0,0,"2","rgba(255,0,0,1)");
		// console.log(a8);//4
		// console.log(a7);//3
		// console.log(a6);//2
		var quanju = {};
		quanju.all=true;
		quanju.a4 = true;
		quanju.a3 = true;
		quanju.a2 = true;
		quanju.ind1 = 0;
		while(zuqi)
		{
			if(quanju.a4)
			{
				if(a8.length!=0)
				{
					if(a8.length == 1)
					{	
						quanju.arr1 = fn_returnDirection(a8[0]);
					}
					esle
					{

					};
				}else{
					quanju.a4 = false;
				};
			}
			else if(quanju.a3)
			{
				if(a7.length!=0)
				{
					if(a7.length == 1)
					{	
						quanju.arr1 = fn_returnDirection(a7[0]);
					}
					esle
					{

					};
				}else{
					quanju.a4 = false;
				};
			}
			else if(quanju.a2)
			{
				if(a6.length!=0)
				{
					if(a6.length == 1)
					{	
						quanju.arr1 = fn_returnDirection(a6[0]);
					}
					esle
					{
						quanju.ind1++;
						quanju.arr1 = fn_returnDirection(a6[quanju.ind1]);
					};
				}else{
					quanju.a4 = false;
				};
			};
		};
	};
	//获取是什么方向的策略
	function fn_returnDirection(ind)
	{
		var obj = objarr[ind-1];
		var celue4 = obj.celue4;
		var val = obj.player;
		var arr2 = [];
		var ind=0;
		for(var p in celue4)
		{
			var arr = celue4[p];
			for(var i=0;i<arr.length;i++)
			{
				var obj1 = objarr[arr[i]-1];
				if(obj1.player == val)
				{
					ind++;
				}
				else
				{
					arr2.push(ind);
					ind = 0;
				};
			};
		};
		for(var i=0;i<arr2.length;i++)
		{
			if(arr2[i]>4)
			{
				if(val=="a")
				{
					alert("你赢了！");
					isOverWin = true;
				}else{
					alert("你输了！");
					isOverWin = true;
				};
				break;
			};
		};
	};
	//获取可行范围
	function youjihuiying(arr)
	{

	};
	//赢棋策略
	function win(ind)
	{
		var obj = objarr[ind-1];
		var celue4 = obj.celue4;
		var val = obj.player;
		var arr2 = [];
		var ind=0;
		for(var p in celue4)
		{
			var arr = celue4[p];
			for(var i=0;i<arr.length;i++)
			{
				var obj1 = objarr[arr[i]-1];
				if(obj1.player == val)
				{
					ind++;
				}
				else
				{
					arr2.push(ind);
					ind = 0;
				};
			};
		};
		for(var i=0;i<arr2.length;i++)
		{
			if(arr2[i]>4)
			{
				if(val=="a")
				{
					alert("你赢了！");
					isOverWin = true;
				}else{
					alert("你输了！");
					isOverWin = true;
				};
				break;
			};
		};
	};
	//向指定地点画内容
	function fn_drawNum(arr,x,y,tx,color1)
	{
		for(var i=0;i<arr.length;i++)
		{
			var obj = objarr[arr[i]-1];
			context.font="12px 微软雅黑";
			context.fillStyle = color1;
			context.fillText(tx,obj.xinX-x,obj.xinY-y);
		};
	};
	//判断有几个大于等于3的；
	function fn_dayusan(ind)
	{
		var obj1 = objarr[ind-1];
		var celue2 = obj1.celue2;
		var d1=0;
		for(var p in celue2)
		{
			if(celue2[p]>2)
			{
				d1++;
			};
		};
		return d1;
	};
	//落子
	function fn_luozi(ind)
	{
		if(isOverWin){
			return;
		};
		var obj1 = objarr[ind-1];
		fn_yuan(obj1.xinX,obj1.xinY,piececolor1);
		pieceuparray.push(obj.ind);
		obj1.ok=false;
		obj1.player = 'b';
		piecetab = true;
		win(ind);
	};
	//取随机数
	function fn_returnsuiji(arr)
	{
		return suiji(0,arr.length-1)
	};
	//最紧要堵棋
	function fn_zuijiadu()
	{
		function returnarr(arr)
		{
			var arr1 = [];
			for(var i=0;i<obj.length;i++)
			{
				arr1.push(obj[i]);
			};
			return arr1;
		};
		for(var i=5;i>=2;i--)
		{
			var obj = eval("b"+i);
			if(i == 5)
			{
				b9 = returnarr(obj);
			}else if(i == 4)
			{
				b8 = returnarr(obj);
			}else if(i == 3)
			{
				b7 = returnarr(obj);
			}else if(i == 2)
			{
				b6 = returnarr(obj);
			};
		};
	};
	//策略最佳走棋
	function fn_zuijia()
	{
		function returnarr(arr)
		{
			var arr1= [];
			for(var i=0;i<obj.length;i++)
			{
				arr1.push(obj[i]);
			};
			return arr1;
		};
		for(var i=5;i>=2;i--)
		{
			var obj = eval("a"+i);
			if(i == 5)
			{
				a9 = returnarr(obj);
			}else if(i == 4)
			{
				a8 = returnarr(obj);
			}else if(i == 3)
			{
				a7 = returnarr(obj);
			}else if(i == 2)
			{
				a6 = returnarr(obj);
			};
		};
	}
	//收集大于1策略以上的优势棋子
	function fn_celue2(arr,num)
	{
		var arr1=[];
		for(var i=0;i<arr.length;i++)
		{
			var ind1 = arr[i];
			var obj1 = objarr[ind1-1];
			var celue2 = obj1.celue2;
			var famen = false;
			for(var p in celue2)
			{
				if(celue2[p]>num)
				{
					famen = true;
				};
			};
			if(famen)
			{
				arr1.push(obj1.ind);
			};
		};
		return arr1;
	};
	//得到横竖正斜反斜数据
	function fn_hengshuhebing(arr)
	{
		for(var i=0;i<arr.length;i++)
		{
			var ind1 = arr[i];
			var obj1 = objarr[ind1-1];
			var celue = obj1.celue;
			var o1 = obj1.o1;
			var celue2 = {};
			celue2.heng = celue.zuo+celue.you-1;
			celue2.shu = celue.shang+celue.xia-1;
			celue2.zhengxie = celue.zuoshang+celue.youxia-1;
			celue2.fanxie = celue.youshang+celue.zuoxia-1;
			obj1.celue2 = celue2;
			var celue3 = {};
			celue3.heng = o1.zuo.length+o1.you.length+1;
			celue3.shu = o1.shang.length+o1.xia.length+1;
			celue3.zhengxie = o1.zuoshang.length+o1.youxia.length+1;
			celue3.fanxie = o1.youshang.length+o1.zuoxia.length+1;
			obj1.celue3 = celue3;
			var celue4 = {};
			celue4.heng = o1.zuo.concat(o1.you);
			celue4.heng.push(obj1.ind);
			celue4.shu = o1.shang.concat(o1.xia);
			celue4.shu.push(obj1.ind);
			celue4.zhengxie = o1.zuoshang.concat(o1.youxia);
			celue4.zhengxie.push(obj1.ind);
			celue4.fanxie = o1.youshang.concat(o1.zuoxia);
			celue4.fanxie.push(obj1.ind);
			celue4.heng.sort(function(a,b){return a-b});
			celue4.shu.sort(function(a,b){return a-b});
			celue4.zhengxie.sort(function(a,b){return a-b});
			celue4.fanxie.sort(function(a,b){return a-b});
			obj1.celue4 = celue4;
		};
	};
	//对象策略结果分析得到进一步数据；
	function fn_celuexiayibu(arr,tx)
	{
		for(var i=0;i<arr.length;i++)
		{
			var ind1 = arr[i];
			var obj1 = objarr[ind1-1];
			var o1 = obj1.o1;
			var o2={};
			for(var p in o1)
			{
				o2[p+""]=fn_for1(o1[p],tx);
			};
			obj1.celue=o2;
		};
	};
	//对象策略结果
	function fn_celuejieguo(arr)
	{
		for(var i=0;i<arr.length;i++)
		{
			var ind2 = arr[i];
			var obj2 = objarr[ind2-1];
			var o1 = fn_celue(obj2.xinX,obj2.xinY);
			var o2 ={};
			obj2.o1 = o1;
		};
	};
	//取掉对方数字函数
	function fn_removeduifang(arr)
	{
		var newarr = arr.slice();
		for(var i=0;i<arr.length;i++)
		{
			var ind1 = arr[i];
			var obj1 = objarr[ind1-1];
			if(obj1.player=="a" || obj1.player=="b")
			{
				var ind = newarr.indexOf(ind1);
				newarr.splice(ind,1);
			};
		};
		return newarr;
	};
	//策略双方方数字
	function fn_for1(arr,tx)
	{
		var ind2 =1;
		for(var i=0;i<arr.length;i++)
		{
			var obj2 = objarr[arr[i]-1];
			if(obj2.player==tx)
			{
				ind2 = 1;
				ind2=ind2+(i+1);
			}
			else
			{
				break;
			};
		};

		return ind2;
	};
	//上行策略
	function fn_celue(x,y)
	{
		//上
		var x1=x,y1=y,x2=x,y2=y,x3=x,y3=y,x4=x,y4=y,x5=x,y5=y,x6=x,y6=y,x7=x,y7=y,x8=x,y8=y;
		var arr={};
		arr.shang = [];
		while(y1>littlesize)
		{
			y1 -=littlesize;
			arr.shang.push(fn_returnind(x1,y1,celuer));
		};
		arr.xia = [];
		while(y2<(cheight-littlesize))
		{
			y2 +=littlesize;
			arr.xia.push(fn_returnind(x2,y2,celuer));
		};
		arr.zuo = [];
		while(x3>littlesize)
		{
			x3 -=littlesize;
			arr.zuo.push(fn_returnind(x3,y3,celuer));
		};
		arr.you = [];
		while(x4<(cwidth-littlesize))
		{
			x4 +=littlesize;
			arr.you.push(fn_returnind(x4,y4,celuer));
		};
		arr.zuoshang = [];
		while(x5>littlesize && y5>littlesize)
		{
			x5 -=littlesize;
			y5 -=littlesize;
			arr.zuoshang.push(fn_returnind(x5,y5,celuer));
		};
		arr.zuoxia = [];
		while(x6>littlesize && y6<(cheight-littlesize))
		{
			x6 -=littlesize;
			y6 +=littlesize;
			arr.zuoxia.push(fn_returnind(x6,y6,celuer));
		};
		arr.youshang = [];
		while(x7<(cwidth-littlesize) && y7>littlesize)
		{
			x7 +=littlesize;
			y7 -=littlesize;
			arr.youshang.push(fn_returnind(x7,y7,celuer));
		};
		arr.youxia = [];
		while(x8<(cwidth-littlesize) && y8<(cheight-littlesize))
		{
			x8 +=littlesize;
			y8 +=littlesize;
			arr.youxia.push(fn_returnind(x8,y8,celuer));
		};
		return arr;
	};
};