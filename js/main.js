/*
* @Author: Think
* @Date:   2018-07-29 23:10:45
* @Last Modified by:   Think
* @Last Modified time: 2018-07-30 22:10:08
*/
var canvas = document.getElementsByTagName('canvas')[0],
	drawingLineObj = {
		ctx:canvas.getContext('2d'),
		colorBoard:document.getElementById('colorBoard'),
		cleanBoard:document.getElementById('cleanBoard'),
		eraser:document.getElementById('eraser'),
		rescind:document.getElementById('rescind'),
		line: document.getElementById('line'),
		arrImage:[],
		bool:true,
		c_x:canvas.offsetLeft,
		c_y:canvas.offsetTop,
		Width:canvas.width,
		Height:canvas.height,
		init:function(){
	      this.ctx.lineCap = 'round';
	      this.ctx.lineJoin = 'round';
	      this.draw();
	      this.btnFn();
		},
		draw:function(){
			var self = this;
			this.addEvent(canvas,"mousedown",function(e){
				drawingLineObj.drawing(e);
			})



		},
		btnFn(){
			var self =  this;
			self.addEvent(self.colorBoard,'change',function(e){
				drawingLineObj.changeColor(e);
			});
			self.addEvent(self.line,'change',function(e){
				drawingLineObj.lineWidth(e);
			});
			self.addEvent(self.cleanBoard,'click',function(e){
				drawingLineObj.manageE(e,'clean');
			});
			self.addEvent(self.eraser,'click',function(e){
				drawingLineObj.manageE(e,"eraser");
			});
			self.addEvent(self.rescind,'click',function(e){
				drawingLineObj.manageE(e,'rescind');
			})


		},
		drawing:function(e){
			var e = e || window.event,
			   target = e.target || e.srcElement,
			   m_x = e.pageX - this.c_x,
			   m_y = e.pageY - this.c_y,
			   self = this;
			   self.bool = true;
			   self.ctx.beginPath();
			   self.ctx.moveTo(m_x, m_y);
			   self.ctx.lineWidth = self.line["value"];
			   self.addEvent(canvas,"mousemove",function(e){
			    	drawingLineObj.liningTo(e);
			    });
			   self.addEvent(canvas,'mouseup',function(e){
			   	   drawingLineObj.cancelDraw(e);
			   });
			   self.addEvent(canvas,'mouseleave',function(e){
			   	   drawingLineObj.cancelDraw(e);
			   })
			   var imgData = self.ctx.getImageData(0,0,self.Width,self.Height);
			       self.arrImage.push(imgData);

		},
		liningTo:function(e){
			var c_x = this.c_x,
			    c_y = this.c_y;
			if(this.bool){
				this.ctx.lineTo(e.pageX - c_x,e.pageY - c_y);
				this.ctx.stroke();
			}


		},
		cancelDraw:function(e){
			this.ctx.closePath();
			this.bool = false;
		},
		changeColor:function(e){
			var self = this,
			    value = self.getValue(e,"value");
			    self.ctx.strokeStyle = value;

		},
		lineWidth:function(e){
		   var self = this,
			    value = self.getValue(e,"value");
			    self.ctx.lineWidth = value;

		},
		getValue:function(elem,type){
			var e = elem || window.Element,
			    target = e.target || e.srcElement;
			    return target[type];

		},
		manageE:function(e,type){
			var self = this;
			switch(type){
				case "clean":
				self.ctx.clearRect(0,0,self.Width,self.Height);
				break;
				case "eraser":
				self.ctx.strokeStyle = "#ffffff";
				break;
				case "rescind":
                self.ctx.putImageData(self.arrImage.pop(),0,0,0,0,self.Width,self.Height);
				break;
			}

		},
		addEvent:function(elem,type,handle){
			if(!elem.nodeType){
				return false;
			}
			if(elem.addEventListener){
				elem.addEventListener(type,handle,false);
			}else if(elem.attachEvent){
				elem.attachEvent("on" + type,handle);
			}else{
				elem["on" + type] = handle;
			}

		}

	};

drawingLineObj.init();