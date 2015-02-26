/**
 * itemRenderer.js
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
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/Evented",
  'dojo/on'
], function(declare,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,lang,Evented,on){
	
	return declare("ItemRenderer",[_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], 
	{
    	templateString: "<div></div>",
    	eventClick:null,
    	eventDblClick:null,
    	postCreate: function() 
    	{
    		this.inherited(arguments);
    		this.initItem();
    	},
    	initItem:function()
    	{
    		this.eventClick = on(this.domNode, "click", lang.hitch(this,this.onClick));
    		this.eventDblClick = on(this.domNode, "dblclick", lang.hitch(this,this.onDblClick));
    	},
    	onClick: function(evt) {
    		this.emit('click', this.item);
    	},
    	onDblClick: function(evt) {
    		this.emit('dblclick', this.item);
    	}
    	
  });
});
