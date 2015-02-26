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
"esri/request",
"esri/tasks/query",
"esri/tasks/QueryTask",
"./searchList",
"dojo/text!./templates/button.html",
"dojo/text!./templates/widget.html",
"xstyle/css!./css/widget.css"
]
,function(declare, baseWidget, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, domClass, lang, 
	on, Evented, esriRequest, Query, QueryTask, List, buttonTemplate, widgetTemplate)
{ 
	var initiator = declare("",[baseWidget,Evented], 
		{
			baseClass:"widget_Search",
			buttonTemplate:buttonTemplate,
			constructor: function() {
				on(this, "initializeUI", lang.hitch(this,function(item)
				{
	            	this.ui = new widgetUI(this.widget.callerArguments);
	            	this.ui.startup();
	            	
				}));
				
			}
      	});
      	
      	var widgetUI = declare("",[_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin], {
		templateString: widgetTemplate, 
		widgetsInTemplate: true,
		list: null,
    	postCreate: function() {
    		this.inherited(arguments);
            if (this.parentContainer) {
                domConstruct.place(this.domNode, this.parentContainer);
            }
            domClass.add(this.domNode,this.theme);
            this.getList();
            
    	},
    	startup: function()	{
    		 this.list = new List().placeAt(this.searchList,'last');
    		 this.list.startup();
    		 this.own(on(this.list, "onItemClick", lang.hitch(this, this.onSelect)));
    	},
    	onSelect:function(evt)
    	{
    		var query = new Query();
    		query.where = "Stadium = '"+evt.item.title+"'";
    		query.returnGeometry = true;
		    query.outFields = "";
		    query.outSpatialReference = this.map.spatialReference;
    		var self = this;
    		var queryTask = new QueryTask("http://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/stadia/FeatureServer/0");
    		queryTask.execute(query, function(results)
    		{
    			var geom=null;
    			for (var i = 0; i < results.features.length; i++) {
    				geom = results.features[i].geometry;
    			}
    			
    			self.map.centerAndZoom(geom,10);
    		},
    		 function(error){alert(error);});
    	},
    	getList:function()
    	{
    		var url="http://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/stadia/FeatureServer/0/query?where=FID+>0&outFields=Stadium&returnGeometry=false&f=pjson";
    		var request = esriRequest({url:url,handleAs:"json"});
    		var self = this;
    		request.then(
		  		function (data) {
				     self.populateList(data);
			   	},
			  	function (error) {
			    	console.log("Error: ", error.message);
			  	}
			);
		  },
		  populateList:function(data)
		  {
		  	for (var i = 0; i < data.features.length; i++) 
			{
				this.list.add({"title":data.features[i].attributes["Stadium"],"feature":data.features[i]});
			}
		  }
        });
   		return initiator;
});