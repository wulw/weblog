/*
 * Created by wulw on 2018-08-05 23:23:15.
 */

(function(){
	var w = document.documentElement.clientWidth,
		h = document.documentElement.clientHeight,
		oC = document.getElementById('mycanvas'),
		cxt = oC.getContext('2d'),
		particleArr = [],
		
		particleNum = 50;
	oC.width = w;
	oC.height = h;
	// 窗口监听
	window.onresize = function(){
		w = window.innerWidth;
		h = window.innerHeight;
		oC.width = w;
		oC.height = h;
	}
	// 创建粒子
	function Particle(){
		
		this.x = parseInt(Math.random()*w);
		this.y = parseInt(Math.random()*h);
		this.rgb = '#ff8080';
		this.vx = parseInt((Math.random()-0.5)*5);
		this.vy = parseInt((Math.random()-0.5)*5);
	}
	
	// 储存粒子
	(function init(){
		for (var i = 0; i < particleNum; i++) {
			particleArr[i] = new Particle();
		}
	})();
	
	(function run(){
		cxt.clearRect(0,0,w,h);
		cxt.fillStyle = '#999';
		cxt.strokeStyle = '#ff8080';
		
		for(var i = 0; i < particleArr.length; i++){
			var item = particleArr[i];
			for(var j = i+1; j<particleArr.length; j++){
				var item2 = particleArr[j];
				var s = Math.pow(item.x-item2.x,2)+Math.pow(item.y-item2.y,2);
				
				if(s<10000){
					
					cxt.beginPath();
					cxt.moveTo(item.x,item.y);
					cxt.lineTo(item2.x,item2.y);
					cxt.stroke();
					cxt.closePath();
				}
			}
			
			cxt.beginPath();
			cxt.arc(item.x,item.y,2,0,Math.PI*2,false);
			cxt.closePath();
			cxt.fill();
			item.x+=item.vx;
			item.y+=item.vy;
			if(item.x >= w || item.x<=0)item.vx *= -1;
			if(item.y >= h || item.y<=0)item.vy *= -1;
			
		}
		requestAnimationFrame(run);
	})();
})();