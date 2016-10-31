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
		
	};
	
	MapEditor.prototype = {
		// 加载地图，进行初始化显示
		_init : function(){
			// 计算地图缩放后的宽高
			this._calImgSize();
			
			// 地图初始化
			var domHtml = '<div style="width:80%;float:left;"><div id="mapEditorBack"></div></div><div style="width:20%;float:left;height:50%;"></div><div style="width:80%;float:left;height:50px;"></div>';
			$("#"+this._opt.containerId).append(domHtml);
			$("#mapEditorBack").css({
				"width" : this._opt.newMapWidth + "px",
				"height" : this._opt.newMapHeight + "px",
				"background-image" : this._opt.mapUrl,
				"background-size" : this._opt.newMapWidth + "px " + this._opt.newMapHeight + "px",
				"margin" : "0 auto"
			});
			
			//创建一个画布  
			var paper = new Raphael("mapEditorBack", this._opt.newMapWidth, this._opt.newMapHeight);
			
			//设置一个画图区域  
			var rect = paper.rect(0, 0, this._opt.newMapWidth, this._opt.newMapHeight);  
			rect.attr({"fill":"#eee","fill-opacity":"0"});  
			//绑定区域的鼠标移动事件  
			rect.mousemove(function (event) {  
				var evt = event;  
				var IE = document.all ? true : false;  
				var x, y;  
				if (IE) {  
					x = evt.clientX + document.body.scrollLeft +  
					document.documentElement.scrollLeft;  
					y = evt.clientY + document.body.scrollTop +  
					document.documentElement.scrollTop;  
				}  
				else {  
					x = evt.offsetX;  
					y = evt.offsetY;  
				}  
				// 给区域添加两个属性ox,和oy  
				this.ox = x;  
				this.oy = y;  
			});  
			//区域（即鼠标）开始拖动  
			var start = function () {  
				g_masterPathArray = new Array();  
			};  
			//移动  
			var move = function (dx, dy, x,y) {  
				if (g_masterPathArray.length == 0) {  
					g_masterPathArray[0] = ["M", this.ox, this.oy];  
					//绘制线条  
					g_masterDrawingBox = paper.path(g_masterPathArray);  
					//设置线条宽度  
					g_masterDrawingBox.attr({ stroke: "#000000", "stroke-width": 3 });  
				} else  
					g_masterPathArray[1] = ["L", this.ox, this.oy];  
				//设置线条的path属性值  
				g_masterDrawingBox.attr({ path: g_masterPathArray });  
			};  
			//松下鼠标  
			var up = function () {  
			};  
			rect.drag(move, start, up); 
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