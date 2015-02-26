/**
 * serviceList.js
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
define([
	"application/listComponent",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on", 
	"dojo/dom",
	"dojo/_base/array",
	"./serviceRenderer"
	],
function(ListComponent,declare,lang,domConstruct,domAttr,domClass,on,dom,array,Renderer)
{
	return declare("",[ListComponent],
	{
		postCreate: function() 
    	{
    		this.inherited(arguments);
    	},
    	add:function(item)
		{
			var d = domConstruct.create('div',{},this.domNode);
			var vitem = new Renderer({
         		item:item
         	},d);
         	this.own(on(vitem, "click", lang.hitch(this, this.onClickResult)));
         	this.items.push(vitem);
         	console.log("item added");
		},
		onClickResult: function(item) {
       		console.log("single");
       		this.emit('onItemClick', item);
       },
	});
});