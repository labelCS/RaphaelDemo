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
		
	};
	
	MapEditor.prototype = {
		// ���ص�ͼ�����г�ʼ����ʾ
		_init : function(){
			// �����ͼ���ź�Ŀ��
			this._calImgSize();
			
			// ��ͼ��ʼ��
			var domHtml = '<div style="width:80%;float:left;"><div id="mapEditorBack"></div></div><div style="width:20%;float:left;height:50%;"></div><div style="width:80%;float:left;height:50px;"></div>';
			$("#"+this._opt.containerId).append(domHtml);
			$("#mapEditorBack").css({
				"width" : this._opt.newMapWidth + "px",
				"height" : this._opt.newMapHeight + "px",
				"background-image" : this._opt.mapUrl,
				"background-size" : this._opt.newMapWidth + "px " + this._opt.newMapHeight + "px",
				"margin" : "0 auto"
			});
			
			//����һ������  
			var paper = new Raphael("mapEditorBack", this._opt.newMapWidth, this._opt.newMapHeight);
			
			//����һ����ͼ����  
			var rect = paper.rect(0, 0, this._opt.newMapWidth, this._opt.newMapHeight);  
			rect.attr({"fill":"#eee","fill-opacity":"0"});  
			//�����������ƶ��¼�  
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
				// �����������������ox,��oy  
				this.ox = x;  
				this.oy = y;  
			});  
			//���򣨼���꣩��ʼ�϶�  
			var start = function () {  
				g_masterPathArray = new Array();  
			};  
			//�ƶ�  
			var move = function (dx, dy, x,y) {  
				if (g_masterPathArray.length == 0) {  
					g_masterPathArray[0] = ["M", this.ox, this.oy];  
					//��������  
					g_masterDrawingBox = paper.path(g_masterPathArray);  
					//�����������  
					g_masterDrawingBox.attr({ stroke: "#000000", "stroke-width": 3 });  
				} else  
					g_masterPathArray[1] = ["L", this.ox, this.oy];  
				//����������path����ֵ  
				g_masterDrawingBox.attr({ path: g_masterPathArray });  
			};  
			//�������  
			var up = function () {  
			};  
			rect.drag(move, start, up); 
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