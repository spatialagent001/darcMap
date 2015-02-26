/**
 * listComponent.js
 * 
 * Copyright (c) 2013 Spatial Agent
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
define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dojo/Evented",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on", 
	"dojo/dom",
	"dojo/_base/array",
	"./itemRenderer",
	],
function(declare,_WidgetBase,Evented,lang,domConstruct,domAttr,domClass,on,dom,array,ItemRenderer)
{
	return declare("ListComponent",[_WidgetBase,Evented],
	{
		items:[],
		selectedIndex:-1,
		container:null,
		postCreate: function() 
    	{
    		this.inherited(arguments);
    	},
    	startup:function()
    	{
    		
    	},
    	add:function(item)
		{
			
			var d = domConstruct.create('div',{},this.domNode);
			var vitem = new ItemRenderer({
         		item:item,
         		title:item.title
         	},d);
         	
         	this.own(on(vitem, "click", lang.hitch(this, this.onClickResult)));
         	this.own(on(vitem, "dblclick", lang.hitch(this, this.onDblClickResult)));
         	this.items.push(vitem);
         	console.log("item added");
		},
		clear: function()
		{
        	this.items = [];
        	domConstruct.empty(this.domNode);
        	this.selectedIndex = -1;
      },
      onClickResult: function(item) {
       	console.log("single");
       },
      onDblClickResult: function(item) {
       	console.log("dbl");
       }
       
	});
});