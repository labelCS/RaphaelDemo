;(function($,win){
	function MapEditor(opt)
	{
		// 默认选项
		this._opt = {
			mapUrl : "",			// 获取地图的url
			mapWidth : 0,			// 地图宽度
			mapHeight : 0,			// 地图高度
			newMapWidth : 0,		// 地图缩放后宽度
			newMapHeight : 0,		// 地图缩放后高度
			scale : 0,				// 地图缩放比
			containerId : "",		// 容器id
			containerWidth : 0,		// 容器宽度
			containerHeight : 0,	// 容器高度
			LangSet : "cn",			// 语言设置
			data : null				// 初始数据
		};
		$.extend(this._opt, opt);
		
		// 语言选项
		this._lang = {
			en:{},
			cn:{}
		};
		
		// 主体div的id
		this.paintDivName = "mapEditorBack";
		
	};
	
	MapEditor.prototype = {
		// 加载地图，进行初始化显示
		_init : function(){
			// 计算地图缩放后的宽高
			this._calImgSize();
			
			// 地图初始化
			var domHtml = '<div style="width:80%;float:left;"><div id="'+this.paintDivName+'"></div></div><div style="width:20%;float:left;height:50%;"></div><div style="width:80%;float:left;height:50px;"></div>';
			$("#"+this._opt.containerId).append(domHtml);
			$("#" + this.paintDivName).css({
				"width" : this._opt.newMapWidth + "px",
				"height" : this._opt.newMapHeight + "px",
				"background-image" : this._opt.mapUrl,
				"background-size" : this._opt.newMapWidth + "px " + this._opt.newMapHeight + "px",
				"margin" : "0 auto"
			});
			//创建一个画布  
			this._paper = new Raphael(this.paintDivName, this._opt.newMapWidth, this._opt.newMapHeight);						
			this.paintDivEl = $("#" + this.paintDivName);

			// 绑定点击事件
			this._bindPointClickEvent(this);	

			//var c = this._paper.circle(50, 50, 5);
			//c.attr({"stroke":"#fff","stroke-width":1,"fill":"#bf2f2f"});
			//c.drag(function(dx,dy,x,y){
			//	this.attr({"cx":this.ox+dx,"cy":this.oy+dy});
			//	console.log(1);},function(){this.ox = this.attr("cx");this.oy = this.attr("cy");},function(){});			
			
		},
		
		// 获取缩放比及缩放后的宽高
		_calImgSize : function(){
			// 获取容器宽高
			this._opt.containerWidth = parseInt($("#"+this._opt.containerId).css("width").slice(0, -2))* 8 /10;
			this._opt.containerHeight = parseInt($("#"+this._opt.containerId).css("height").slice(0, -2)) - 50;
			
			// 确定缩放比及缩放后的宽高
			var newWidth, newHeight, imgScale;
			// 以wrapper的高为图片新高
			if (this._opt.containerWidth / this._opt.containerHeight > this._opt.mapWidth / this._opt.mapHeight) {
				newHeight = this._opt.containerHeight;
				imgScale = this._opt.mapHeight / newHeight;
				newWidth = this._opt.mapWidth / imgScale;
			} else {// 以wrapper的宽为图片新宽
				newWidth = this._opt.containerWidth;
				imgScale = this._opt.mapWidth / newWidth;
				newHeight = this._opt.mapHeight / imgScale;
			}
			
			this._opt.newMapWidth = newWidth;
			this._opt.newMapHeight = newHeight;
			this._opt.scale = imgScale;
		},
		
		// 绑定画布的单击事件及画点的移动事件
		_bindPointClickEvent : function(_this){
			_this.paintDivEl.bind("click",function(evt){
				var x = evt.offsetX;  
				var y = evt.offsetY;
				var winX = evt.pageX;
				var winY = evt.pageY;
				var el = _this._paper.getElementByPoint(winX, winY);
				if(el == null){
					var c = _this._paper.circle(x, y, 5);
					c.attr({"stroke":"#fff","stroke-width":1,"fill":"#bf2f2f"});
					c.drag(function(dx,dy,x,y){this.attr({"cx":this.ox+dx,"cy":this.oy+dy});},function(){this.ox = this.attr("cx");this.oy = this.attr("cy");},function(){});
					c.dblclick(function(e){this.remove();});
				}
			});
		},
		
		// 取消画点的单击事件
		_unbindPointClickEvent : function(_this){
			_this.paintDivEl.unbind("click");
		},
		
		// 验证参数是否正确
		_checkIsError : function(){
			return (!this._opt.mapUrl|| !this._opt.dataUrl || !this._opt.floorNo);
		}
	};
	
	var mpe = {
		init : function(opt){
			var hm = new MapEditor(opt);
			hm._init();
			return hm;
		}
	};
	win["mpe"] = mpe;
})(jQuery,window);