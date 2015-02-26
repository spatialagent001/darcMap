/**
 * headerWidget.js
 * 
 * Copyright (c) 2012 Spatial Agent
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
define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin","dojo/text!./templates/header.html","xstyle/css!./css/header.css"]
,function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,headerTemplate)
{
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], 
	{
		widgetsInTemplate: false,
        templateString: headerTemplate,
        title: "",
        subTitle: "",
        logo:"",
        baseClass: 'widgets_Header',
        postCreate: function() 
        	{
        		
	           	//initialize the widget
	            this.inherited(arguments);
	            var self= this;
	            dojo.query("#"+this.domNode.id+" div").forEach(function(node, idx){ 
	            	if (node.id == "divLogo")
	            	{
	            		dojo.style(node,"backgroundImage","url("+self.logo+")");
	            	}
	            });
	        },
	});
});