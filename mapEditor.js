;(function($,win){
	function MapEditor(opt)
	{
		// Ĭ��ѡ��
		this._opt = {
			mapUrl : "",			// ��ȡ��ͼ��url
			mapWidth : 0,			// ��ͼ���
			mapHeight : 0,			// ��ͼ�߶�
			newMapWidth : 0,		// ��ͼ���ź���
			newMapHeight : 0,		// ��ͼ���ź�߶�
			scale : 0,				// ��ͼ���ű�
			containerId : "",		// ����id
			containerWidth : 0,		// �������
			containerHeight : 0,	// �����߶�
			LangSet : "cn",			// ��������
			data : null				// ��ʼ����
		};
		$.extend(this._opt, opt);
		
		// ����ѡ��
		this._lang = {
			en:{},
			cn:{}
		};
		
		// ����div��id
		this.paintDivName = "mapEditorBack";
		
	};
	
	MapEditor.prototype = {
		// ���ص�ͼ�����г�ʼ����ʾ
		_init : function(){
			// �����ͼ���ź�Ŀ��
			this._calImgSize();
			
			// ��ͼ��ʼ��
			var domHtml = '<div style="width:80%;float:left;"><div id="'+this.paintDivName+'"></div></div><div style="width:20%;float:left;height:50%;"></div><div style="width:80%;float:left;height:50px;"></div>';
			$("#"+this._opt.containerId).append(domHtml);
			$("#" + this.paintDivName).css({
				"width" : this._opt.newMapWidth + "px",
				"height" : this._opt.newMapHeight + "px",
				"background-image" : this._opt.mapUrl,
				"background-size" : this._opt.newMapWidth + "px " + this._opt.newMapHeight + "px",
				"margin" : "0 auto"
			});
			//����һ������  
			this._paper = new Raphael(this.paintDivName, this._opt.newMapWidth, this._opt.newMapHeight);						
			this.paintDivEl = $("#" + this.paintDivName);

			// �󶨵���¼�
			this._bindPointClickEvent(this);	

			//var c = this._paper.circle(50, 50, 5);
			//c.attr({"stroke":"#fff","stroke-width":1,"fill":"#bf2f2f"});
			//c.drag(function(dx,dy,x,y){
			//	this.attr({"cx":this.ox+dx,"cy":this.oy+dy});
			//	console.log(1);},function(){this.ox = this.attr("cx");this.oy = this.attr("cy");},function(){});			
			
		},
		
		// ��ȡ���űȼ����ź�Ŀ��
		_calImgSize : function(){
			// ��ȡ�������
			this._opt.containerWidth = parseInt($("#"+this._opt.containerId).css("width").slice(0, -2))* 8 /10;
			this._opt.containerHeight = parseInt($("#"+this._opt.containerId).css("height").slice(0, -2)) - 50;
			
			// ȷ�����űȼ����ź�Ŀ��
			var newWidth, newHeight, imgScale;
			// ��wrapper�ĸ�ΪͼƬ�¸�
			if (this._opt.containerWidth / this._opt.containerHeight > this._opt.mapWidth / this._opt.mapHeight) {
				newHeight = this._opt.containerHeight;
				imgScale = this._opt.mapHeight / newHeight;
				newWidth = this._opt.mapWidth / imgScale;
			} else {// ��wrapper�Ŀ�ΪͼƬ�¿�
				newWidth = this._opt.containerWidth;
				imgScale = this._opt.mapWidth / newWidth;
				newHeight = this._opt.mapHeight / imgScale;
			}
			
			this._opt.newMapWidth = newWidth;
			this._opt.newMapHeight = newHeight;
			this._opt.scale = imgScale;
		},
		
		// �󶨻����ĵ����¼���������ƶ��¼�
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
		
		// ȡ������ĵ����¼�
		_unbindPointClickEvent : function(_this){
			_this.paintDivEl.unbind("click");
		},
		
		// ��֤�����Ƿ���ȷ
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