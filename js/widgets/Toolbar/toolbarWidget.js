/**
 * toolbarWidget.js
 * 
 * Copyright (c) 2014 Spatial Agent
 * 
 * This file is part of darcMap.
 *	
 * darcMap is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * darcMap is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with darcMap.  If not, see <http://www.gnu.org/licenses/>.
 **/
define(["dojo/_base/declare","dojo/_base/html","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dojo/text!./templates/buttons.html","application/mobileHelper",
		"dijit/form/Button","dojo/dom-construct","dojo/dom-class","dojo/dom-style","dojo/touch","xstyle/css!./css/toolbar.css" ]
,function(declare, html, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, extentTemplate, MobileHelper, Button,domConstruct,domClass,domStyle,touch)
{
	return declare("toolbarWidget",[_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], 
	{
		widgetsInTemplate: true,
        templateString: extentTemplate,
        baseClass: 'widgets_Toolbar',
        buttonClass: 'extentButton',
        leftButtonClass: 'slideLeftButton',
        rightButtonClass:'slideRightButton',
        mobileHelper : new MobileHelper(),
        postCreate: function() 
    	{
    		//initialize the widget
            this.inherited(arguments);     
            this.mobileHelper.collectInfo();
            var availableWidth = this.getLayoutWidth();
        	var widgetDisplayWidth =  34*this.widgets.length;
        		
	    	if ((this.widgets) && (this.widgets.length >0))
            {
            	for (var i in this.widgets)
	        	{ 
	            	var w = this.widgets[i];
	            	var li = domConstruct.create("li");
	            	domConstruct.place(w.domNode,li,'first');
	            	this.toolList.appendChild(li);
	           	}
	        } 
	        
	        this.setLayout();
            var self = this;
			on(this.mobileHelper, "orientationChange", function(e) {
				self.setLayout();
			});  
			on(this.btnScrollRight, touch.press, function(e){
				console.log("touchover");
			    self.moveRight();
			  });
			  on(this.btnScrollRight, touch.release, function(e){
			  	console.log("touchout");
			    self.stopMove();
			  }); 
			  on(this.btnScrollLeft, touch.press, function(e){
			  	console.log("touchover");
			    self.moveLeft();
			  });
			  on(this.btnScrollLeft, touch.release, function(e){
			  	console.log("touchout");
			    self.stopMove();
			  });       
        },
	    setLayout:function()
	    {
	    	if ((this.widgets) && (this.widgets.length >0) &&(this.widgets.length>this.showCount))
            {
		    	var availableWidth = this.getLayoutWidth();
	        	var widgetDisplayWidth =  (34*this.widgets.length)+(this.widgets.length+1);
	        		
			    if (availableWidth<widgetDisplayWidth)
				{ 	
		           	domStyle.set(this.mask,"width",((34*this.showCount)-1)+"px"); 
		           	domStyle.set(this.toolList,"width",(widgetDisplayWidth)+"px"); 
		           	this.createKeyFramesRulesLeftRight((-35*(this.widgets.length-this.showCount)));  
		            domClass.replace(this.btnScrollRight, "scrollButton","scrollButton hidden");
	            	domClass.replace(this.btnScrollLeft, "scrollButton","scrollButton hidden"); 	
	           	} else
	            {
	            	domStyle.set(this.mask,"width",(widgetDisplayWidth)+"px");
	            	this.moveLeft();
	            	domClass.replace(this.btnScrollRight, "scrollButton hidden","scrollButton");
	            	domClass.replace(this.btnScrollLeft, "scrollButton hidden", "scrollButton");
	            }
           }
	    },    
	  	getLayoutWidth:function(){
		    var layoutBox = html.getMarginBox(this.map.id);
		    return layoutBox.w -280;
	 	},
	    moveLeft:function()
	    {
    		var node = this.toolList;
    		domStyle.set(node,"MozAnimation","cssAnimationLeft 1s  1 linear forwards");
    		domStyle.set(node,"WebkitAnimation","cssAnimationLeft 1s  1 linear forwards");
    		domStyle.set(node,"OAnimation","cssAnimationLeft 1s  1 linear forwards");
    		domStyle.set(node,"animation","cssAnimationLeft 1s  1 linear forwards");
    		domStyle.set(node,"MozAnimationPlayState","running");
    		domStyle.set(node,"WebkitAnimationPlayState","running");
    		domStyle.set(node,"OAnimationPlayState","running");
    		domStyle.set(node,"AnimationPlayState","running");
	    	
	    }, 
	    stopMove:function()
	    {
	    	var node = this.toolList;
    		domStyle.set(node,"MozAnimationPlayState","paused");
    		domStyle.set(node,"WebkitAnimationPlayState","paused");
    		domStyle.set(node,"OAnimationPlayState","paused");
    		domStyle.set(node,"AnimationPlayState","paused");	
	    },
	    moveRight:function()
	    {
	    	var node = this.toolList;
    		domStyle.set(node,"MozAnimation","cssAnimationRight 1s  1 linear forwards");
    		domStyle.set(node,"WebkitAnimation","cssAnimationRight 1s  1 linear forwards");
    		domStyle.set(node,"OAnimation","cssAnimationRight 1s  1 linear forwards");
    		domStyle.set(node,"animation","cssAnimationRight 1s  1 linear forwards");
    		domStyle.set(node,"MozAnimationPlayState","running");
    		domStyle.set(node,"WebkitAnimationPlayState","running");
    		domStyle.set(node,"OAnimationPlayState","running");
    		domStyle.set(node,"AnimationPlayState","running");
	    },
	    createKeyFramesRulesLeftRight:function(val)
	    {
	        console.log(val);
	        // gather all stylesheets into an array
	        var head = document.getElementsByTagName("head").item(0);
	        
	        var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-moz-keyframes cssAnimationLeft{'+
			'0%   { left: '+val+'px}'+
			'100% { left: 0px; }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-webkit-keyframes cssAnimationLeft{'+
			'0%   { left: '+val+'px}'+
			'100% { left: 0px; }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@keyframes cssAnimationLeft{'+
			'0%   { left: '+val+'px}'+
			'100% { left: 0px; }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-moz-keyframes cssAnimationRight{'+
			'0%   { left: 0px}'+
			'100% { left: '+val+'px }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode(' @-webkit-keyframes cssAnimationRight{'+
			'0%   { left: 0px}'+
			'100% { left: '+val+'px }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode(' @keyframes cssAnimationRight{'+
			'0%   { left: 0px}'+
			'100% { left: '+val+'px }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
	    },
	    createKeyFramesRulesUpDown:function(val)
	    {
	    	console.log(val);
	        // gather all stylesheets into an array
	        var head = document.getElementsByTagName("head").item(0);
	        
	        var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-moz-keyframes cssAnimationUp{'+
			'0%   { top: '+val+'px}'+
			'100% { top: 0px; }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-webkit-keyframes cssAnimationUp{'+
			'0%   { top: '+val+'px}'+
			'100% { top: 0px; }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode('@-moz-keyframes cssAnimationDown{'+
			'0%   { top: 0px}'+
			'100% { top: '+val+'px }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
			var cssAnimation = document.createElement('style');
			cssAnimation.type = 'text/css';
			var rules = document.createTextNode(' @-webkit-keyframes cssAnimationDown{'+
			'0%   { top: 0px}'+
			'100% { top: '+val+'px }'+
			'}');
			cssAnimation.appendChild(rules);
			head.appendChild(cssAnimation);
	    }
	});
});