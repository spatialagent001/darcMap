/**
 * widgetBase.js
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
define(["dojo/_base/declare",
"application/tabWidgetBase",
"application/floatWidgetBase",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojo/dom-construct",
"dojo/dom-class",
"dojo/_base/lang",
"dojo/on",
"dojo/Evented"
]
,function(declare, _tabWidgetBase, _floatWidgetBase, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, 
	domClass, lang, on, Evented)
{ 

   var initiator = declare(null,
		{
			baseClass:"",
			widget:null,
			buttonTemplate:"",
			constructor: function() {
				this.baseclass = "widget_"+this.randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			},
			createWidget:function(type,props,element)
			{
				//set some widget defaults
				lang.mixin(props, {title: props.config.title,baseClass:this.baseClass,buttonTemplate:this.buttonTemplate});
				if (type == 'tab')
				{		
					this.widget = new tabwidget(props,element);
					this.emit('initializeUI', null);
					return this.widget;	
				}
				else if (type == 'float')
				{
					this.widget = new floatWidget(props,element);
					this.emit('initializeUI', null);
					return this.widget;
				}
				else if (type == 'button')
				{
					this.widget = new buttonWidget(props,element);
					this.emit('initializeUI', null);
					return this.widget;
				}
			},
			randomString: function(length, chars) {
			    var result = '';
			    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
			    return result;
			}
		}
	);
	
	var tabwidget= declare([_tabWidgetBase], 
		{
			widgetsInTemplate: false,        	
        	callerArguments:null,
        	
        	constructor: function(){
				this.callerArguments = arguments[0];
			},
        	postCreate: function() 
			{
				this.inherited(arguments);
	            this.containerTopOffset= (this.config.topOffset && this.mobileHelper.isMobile) ? this.config.topOffset:0;
	            this.tabIconStyle+=" "+this.theme;
	            this.initiateTab();
	            domClass.add(this.cp.containerNode,this.font);
	            lang.mixin(this.callerArguments, {parentContainer: this.cp.containerNode});
			}
		});
	
	var floatWidget = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], 
		{
			widgetsInTemplate: true,
			templateString:"<div></div>",
	        buttonClass: 'toolbarButton',
	        constructor: function(){
				this.callerArguments = arguments[0];
				this.templateString=this.callerArguments.buttonTemplate;//'<div><button data-dojo-type="dijit.form.Button" data-dojo-attach-point="toolbarButton" data-dojo-props="showLabel:false,iconClass:\'toolbarButtonIcon\',baseClass:\'${buttonClass}\'" data-dojo-attach-event="onClick:toggleWidget">Basemaps</button></div>';
			},
	        postCreate: function() 
	        	{      		
		           	//initialize the widget
		            this.inherited(arguments);
		            domClass.add(this.toolbarButton.domNode, "toolbarButtonIcon "+this.theme);
		           
	            	this.fwidget = new floatingDialog(this.callerArguments);
	            	this.fwidget.startup();
		        },
		    buttonClick:function()
		    {
		    	if (this.fwidget.visible)
		    		this.fwidget.close();
		    	else
		    		this.fwidget.show();
		    }
		});
		
		var floatingDialog = declare([_floatWidgetBase], 
			{
				widgetsInTemplate: false,
				constructor: function(){
					this.callerArguments = arguments[0];
				},
	        	postCreate: function() 
	        	{
	        		this.inherited(arguments);
	        		this.floatIconStyle+=" "+this.theme;
	        		 if (this.config.floatTop)
	        			this.top = this.config.floatTop;
	        		if (this.config.floatLeft)
	        			this.left = this.config.floatLeft;
	        		if (this.config.floatHeight)
	        			this.contentHeight = this.config.floatHeight;
	        		if (this.config.floatWidth)
	        			this.contentWidth = this.config.floatWidth;
	        		this.initFloat();
	        		domClass.add(this.floatingPane.containerNode,this.font);
	        		lang.mixin(this.callerArguments, {parentContainer: this.floatingPane.containerNode});      	
	        	}
			});
			
		var buttonWidget = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,Evented], 
		{
			widgetsInTemplate: true,
			templateString:"<div></div>",
	        buttonClass: 'toolbarButton',
	        constructor: function(){
				this.callerArguments = arguments[0];
				this.templateString=this.callerArguments.buttonTemplate;
			},
	        postCreate: function() 
        	{      		
	           	//initialize the widget
	            this.inherited(arguments);
	            domClass.add(this.toolbarButton.domNode, "toolbarButtonIcon "+this.theme);	      
	        },
	        buttonClick:function()
		    {
		    	this.emit('buttonClick', null);
		    }
	        
		});

	return initiator;
});