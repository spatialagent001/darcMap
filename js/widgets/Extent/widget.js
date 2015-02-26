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
"dojo/text!./templates/button.html",
"xstyle/css!./css/widget.css"
]
,function(declare, baseWidget, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, domClass, lang, 
	on, Evented, buttonTemplate)
{ 
	var initiator = declare("",[baseWidget,Evented], 
		{
			baseClass:"widget_Extent",
			buttonTemplate:buttonTemplate,
			constructor: function() {
				on(this, "initializeUI", lang.hitch(this,function(item)
				{
	            	on(this.widget, "buttonClick", lang.hitch(this,function(item)
					{
		            	var xmax = this.widget.map.extent.xmax;
				    	var ymax =  this.widget.map.extent.ymax;
				    	var xmin =  this.widget.map.extent.xmin;
				    	var ymin =  this.widget.map.extent.ymin;
				    	alert(xmin+","+ymin+","+xmax+","+ymax);
					}));
				}));
				
			}
      	});
      	
      	
   		 return initiator;
});