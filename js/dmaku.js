$(document).ready(function() {
		var canvas = document.getElementById("c");
		var ctx = canvas.getContext("2d");
		var c = $("#c");
		var x,y,w,h,cx,cy,l;
		var y = [];
		var b = {
			n:100,
			c:false,    //  颜色  如果是false 则是随机渐变颜色
			bc:'#000000',   //  背景颜色
			r:0.9, 
			o:0.05,
			a:1,
			s:20,
		}
		var bx = 0,by = 0,vx = 0,vy = 0;
		var td = 0;
		var p = 0;
		var hs = 0;
		re();
		var color,color2;
		if(b.c){
			color2 = b.c;
		}else{
			color = Math.random()*360;
		}
		
		$(window).resize(function(){
			re();
		});
		var tp=true;
		function begin(){
			if(tp){
				if(!b.c){
					color+=.1;
					color2 = 'hsl('+color+',100%,80%)';
				}
				ctx.globalAlpha = 1;
				ctx.fillStyle = b.bc;
				ctx.fillRect(0,0,w,h);
				for(var i=0;i<y.length;i++){
					ctx.globalAlpha = y[i].o;
					ctx.fillStyle = color2;
					ctx.beginPath();
					ctx.arc(y[i].x,y[i].y,y[i].r,0,Math.PI*2);
					ctx.closePath();
					ctx.fill();
					y[i].r+=b.r;
					y[i].o-=b.o;
					if(y[i].o<=0){
						y.splice(i,1);
						i--;
					};
				}
			}else {
				if(!b.c){
					color+=.1;
					color2 = 'hsl('+color+',100%,80%)';
				}
				ctx.globalAlpha = 0.2;
				ctx.fillStyle = b.bc;
				ctx.fillRect(0,0,w,h);
				for(var i=0;i<y.length;i++){
					ctx.globalAlpha = y[i].o;
					ctx.strokeStyle = color2;
					ctx.beginPath();
					ctx.lineWidth = 2;
					ctx.moveTo(y[i].x,y[i].y);
					ctx.lineTo((y[i].wx+y[i].x)/2+Math.random()*20,(y[i].wy+y[i].y)/2+Math.random()*20);
					ctx.lineTo(y[i].wx,y[i].wy);
					ctx.closePath();
					ctx.stroke();
					y[i].o-=b.o;
					if(y[i].o<=0){
						y.splice(i,1);
						i--;
					};
				}
			}
			window.requestAnimationFrame(begin);
		}
		function re(){
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w;
			canvas.height = 0.9*h;
			cx = w/2;
			cy = 0.55*h;
		};
		document.onmousemove = function(e){
			cx = e.pageX-c.offset().left;
			cy = e.pageY - 0.05*canvas.height - c.offset().top;
			if(tp){
				y.push({x:cx,y:cy,r:b.r,o:1,v:0});
			}else {
				y.push({x:cx+((Math.random()-.5)*30),y:cy+((Math.random()-.5)*30),o:1,wx:cx,wy:cy});
			}
		};
		/*c.mousedown(function(){
			c.on('mousemove',function(e){
				cx = e.pageX-c.offset().left;
				cy = e.pageY-c.offset().top;
				y.push({x:cx,y:cy,r:b.r,o:1});
			});
			c.on('mouseup',function(){
				c.off('mouseup');
				c.off('mousemove');
				c.off('moseleave');
			});
			c.on('mouseleave',function(){
				c.off('mouseup');
				c.off('mousemove');
				c.off('moseleave');
			});
		});*/
		$("#btn1").click(function(){
			tp = !tp;	
			y=[];
		});
		(function() {
			var lastTime = 0;
			var vendors = ['webkit', 'moz'];
			for(var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
				window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
											  window[vendors[xx] + 'CancelRequestAnimationFrame'];
			}
		
			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
					var id = window.setTimeout(function() {
						callback(currTime + timeToCall);
					}, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}
			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			}
		}());
		begin();
	});