define(["dojo/_base/declare", "dijit/_WidgetBase","dojo/dom-construct","dojo/query","dojo/on",'dojo/dom',"dojo/_base/lang",
"dojo/dom-style","dojo/dom-class","dojox/layout/FloatingPane","dijit/layout/ContentPane","application/mobileHelper" ], 
function(declare, _WidgetBase, domConstruct,query,on,dom,lang,domStyle,domClass,FloatingPane,ContentPane,mobileHelper) {

	return declare([_WidgetBase], {
		parentId:null,
		baseContainer:null,
		title:"Floating Widget",
		mobileHelper : new MobileHelper(),
		floatIconStyle:"floatingPaneIcon",
		minimizeBtn:null,
		maximizeBtn:null,
		closeBtn:null,
		floatingPane:null,
		visible:false,
		minimized:false,
		top:41,
		left:20,
		contentWidth:360,
		contentHeight:400,
		mobileFactor:6,
		maxWidth:999999,
		postCreate : function() {
			this.parentId = dijit.getEnclosingWidget(this.domNode).id;
			this.baseContainer = domConstruct.create('div', {
				class : "float",
				id : this.id+"fPanefloatWidget",
				style : ""
			});
			domConstruct.place(this.baseContainer, this.map.container, 'first');	
		},
		initFloat:function()
		{
			this.mobileHelper.collectInfo();
			if (this.contentWidth>this.mobileHelper.clientWidth)
			{
				this.contentWidth= this.mobileHelper.clientWidth-this.mobileFactor;
				this.left = 0;
				this.top = 41;
				this.contentHeight= ((this.mobileHelper.clientHeight-(this.top+this.mobileFactor)));
			}
			var self = this;
			on(this.mobileHelper, "orientationChange", function(e) {
				if (self.contentWidth>self.mobileHelper.clientWidth)
				{
					var eo = lang.clone(e);
					if (eo.newWidth>this.mobileHelper.clientWidth)
					{
						this.contentWidth= this.mobileHelper.clientWidth-6;
			        	domStyle.set(this.floatingPane.domNode, "width", this.contentWidth+"px");
			        	domStyle.set(this.floatingPane.domNode, "left", "41px");
					}
				}
			});
			this.floatingPane = new FloatingPane({
        	title: "<span class='paneTitleText'>"+this.title+"</span>",
        	resizable: true,
        	dockable: false,
       		closable: false,
        	style: "position:absolute;z-index:1000;top:"+this.top+"px;left:"+this.left+"px;width:"+this.contentWidth+"px;height:"+this.contentHeight+"px;overflow: hidden;visibility:hidden;",
        	id: this.id+"_fPane",
            'class': "floatingPane "+this.baseClass}, this.baseContainer);
			this.floatingPane.hide();
			this.floatingPane.startup();
		
			var lTitlePane = query("#"+this.id+"_fPane"+' .dojoxFloatingPaneTitle')[0];
			
			this.closeBtn= domConstruct.create("div", {
		        class:"closeBtn",
		        style : "width:20px;height:20px;overflow: hidden;"
		    });
		   	on(this.closeBtn,"click",lang.hitch(this,"close"));
		    
		    this.minimizeBtn = domConstruct.create("div", {
		     	class:"minimizeBtn",
		        style : "width:20px;height:20px;overflow: hidden;"
		     });
			on(this.minimizeBtn,"click",lang.hitch(this,"minimize"));
		    
		    this.maximizeBtn= domConstruct.create("div", {
		    	class:"maximizeBtn",
		        style : "width:20px;height:20px;overflow: hidden;visibility:hidden;"	       
		    });
			on(this.maximizeBtn,"click",lang.hitch(this,"maximize"));
			
			domConstruct.place(this.closeBtn, lTitlePane, "after");
		    domConstruct.place(this.minimizeBtn, lTitlePane, "after");
		    domConstruct.place(this.maximizeBtn, lTitlePane, "after");
			var lIconPane = query("#"+this.id+"_fPane")[0];
			var logoDiv = domConstruct.create('div',{class:this.floatIconStyle},lIconPane);
			
			
			
		},
		show:function()
		{		
        	this.floatingPane.bringToTop();
        	this.maximize();
			this.floatingPane.show();
			this.visible = true;
		},
		close:function()
		{
			this.floatingPane.hide();
			this.visible = false;
			if (!this.minimized)
			{
				this.contentWidth = this.floatingPane.domNode.style.width;
	        	this.contentHeight = this.floatingPane.domNode.style.height;
			}
		},
		minimize:function()
		{
			
			//store current sizing
			this.contentTop= this.floatingPane.domNode.style.top;
			this.contentWidth = this.floatingPane.domNode.style.width;
	        this.contentHeight = this.floatingPane.domNode.style.height;
	        this.minimized = true;
			//minmize control
			domStyle.set(this.floatingPane.domNode, "height", "30px");
	        domStyle.set(this.floatingPane.domNode, "width", "180px");
	        
	        domStyle.set(this.floatingPane.domNode, "top",  (this.mobileHelper.clientHeight-33)+"px");
			
	      	//remove resize control
			domStyle.set(this.floatingPane.canvas.children[1],"visibility","hidden");
			//swap buttons
	        domStyle.set(this.minimizeBtn,'visibility', 'hidden');
			domStyle.set(this.maximizeBtn,'visibility', 'visible');
		},
		maximize:function()
		{
			console.log("max"+this.contentWidth);
			//restore control
			domStyle.set(this.floatingPane.domNode, "height", this.contentHeight);
	        domStyle.set(this.floatingPane.domNode, "width", this.contentWidth);
	        domStyle.set(this.floatingPane.domNode, "top",  this.contentTop);
	        this.minimized = false;
	        //domStyle.set(this.floatingPane.canvas.children[0],'height', this.contentHeight);
	        //add resize control
        	domStyle.set(this.floatingPane.canvas.children[1],"visibility","visible");
        	//swap buttons
	        domStyle.set(this.minimizeBtn,'visibility', 'visible');
			domStyle.set(this.maximizeBtn,'visibility', 'hidden');
		}
	});
});