/**
 * widget.js
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
"application/baseWidget",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojo/dom-construct",
"dojo/dom-class",
"dojo/_base/lang",
"dojo/on",
"dojo/Evented",
"esri/dijit/BasemapGallery",
"dojo/text!./templates/button.html",
"dojo/text!./templates/widget.html",
"xstyle/css!./css/widget.css"
]
,function(declare, baseWidget, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, domClass, lang, 
	on, Evented, BasemapGallery, buttonTemplate, widgetTemplate)
{ 
	var initiator = declare("",[baseWidget,Evented], 
		{
			baseClass:"widget_BaseSwitcher",
			buttonTemplate:buttonTemplate,
			constructor: function() {
				on(this, "initializeUI", lang.hitch(this,this.initUI));
			},
			initUI:function(item)
			{
            	this.ui = new widgetUI(this.widget.callerArguments);
            	this.ui.startup();
			}
      	});
      	
      	var widgetUI = declare("",[_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin], {
			templateString: widgetTemplate, 
			postCreate: function() {
	    		this.inherited(arguments);
	            if (this.parentContainer) {
	                domConstruct.place(this.domNode, this.parentContainer);
	            }
	            this.initWidget();
	   		},
	   		 initWidget:function()
	    	{
	    		var div = domConstruct.create('div',{class:"theme_"+this.theme, style:"height:93%;width:100%;", id: "basemapDigit"});
	            domConstruct.place(div, this.domNode);
	            
	    		var basemapGallery = new BasemapGallery({
		       		showArcGISBasemaps: true,
			        basemapsGroup: this.getBasemapGroup(),
		    		bingMapsKey: this.config.bingmapskey,
			        map: this.map
				},  domConstruct.create('div',{style:"height:100%;width;100%;"}));
				basemapGallery.startup();
				domConstruct.place(basemapGallery.domNode, div);
				
	    	},
	    	getBasemapGroup:function() 
	    	{				
				//get the basemap group if a custom one is defined or if a hosted or portal app with a custom group.
			    var basemapGroup = null;
			    if (this.config.basemapgroup.title && this.config.basemapgroup.owner) {
			        basemapGroup = {
			            "owner": this.config.basemapgroup.owner,
			            "title": this.config.basemapgroup.title
			        };
			    }else if(this.config.basemapgroup.id){
			        basemapGroup = {
			            "id": this.config.basemapgroup.id
			        };
			   }
		    	return basemapGroup;
			}
		});	
   		return initiator;
});