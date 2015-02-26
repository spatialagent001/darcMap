/**
 * serviceRenderer.js
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
  "application/itemRenderer",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/_base/array",
  "./subLayerList",
  "dojo/text!./templates/service.html"
  
], function(ItemRenderer,declare,lang,on,domClass,domStyle,array,List,template){
	
	return declare("",[ItemRenderer], 
	{
		templateString: template,
    	widgetsInTemplate: true,
    	baseClass: "service_renderer",
    	groupOpen:false,
    	postCreate: function() 
    	{
    		this.inherited(arguments);  
    		this.eventClick.remove();
    		this.eventDblClick.remove();
    		if (this.item.visible)
    			domClass.add(this.btnVisibility, "checked");		
    		this.eventVisibility = on(this.btnVisibility, "click", lang.hitch(this, "onVisibilityChange"));
    		if (this.item.subLayers.length>0)
    		{
    			this.eventGroupClick = on(this.btnServiceGroup, "click", lang.hitch(this, "onGroupClick"));
    			this.list = new List().placeAt(this.layersList,'last');
    			this.own(on(this.list, "visibilityChange", lang.hitch(this, "onSubVisibilityChange")));
    		 	this.list.startup();
    	
    		 	for(i = 0; i < this.item.subLayers.length; i++) {
		          this.list.add(this.item.subLayers[i]);
		        }
		        
    		}
    		else
    		{
    			domStyle.set(this.btnServiceGroup, "display", "none");
    		}
    	},
    	onClick: function(evt) {
    		this.emit('click', {item:this.item});
    	},
    	onVisibilityChange:function(evt)
    	{
    		if (evt)
    			evt.stopPropagation();
    		//this.item.visible =evt.currentTarget.checked;
    		if (!this.item.visible)
    		{
    			this.item.setVisibility(true);
    			domClass.add(this.btnVisibility, "checked");	
    		}
    		else
    		{
    			this.item.setVisibility(false);
    			domClass.remove(this.btnVisibility, "checked");	
    		}
    	},
    	onGroupClick:function(evt)
    	{
    		if (evt)
    			evt.stopPropagation();
    		if (this.isGroupOpen)
    		{
    			this.isGroupOpen=false;
    			domClass.replace(this.serviceContainer, "service_renderer collapsed", "service_renderer");
    			domClass.remove(this.btnServiceGroup, "groupIconTurn");
    		}
    		else
    		{
    			this.isGroupOpen=true;
    			domClass.replace(this.serviceContainer, "service_renderer", "service_renderer collapsed");
    			domClass.add(this.btnServiceGroup, "groupIconTurn");
    		}
    	},
    	onSubVisibilityChange:function(evt)
       	{
       		this.item.setSubLayerVisible(evt.subId, evt.visible);
       	}
	});
});