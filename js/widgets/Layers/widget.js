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

define(["dojo/_base/declare", "application/baseWidget", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/dom-construct", "dojo/dom-class", "dojo/_base/lang", "dojo/on", 'dojo/_base/array', "dojo/Evented", "./layerCollection", "./serviceList", "dojo/text!./templates/button.html", "dojo/text!./templates/widget.html", "xstyle/css!./css/widget.css"], function(declare, baseWidget, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, domClass, lang, on, array, Evented, LayerCollection, List, buttonTemplate, widgetTemplate) {
	var initiator = declare("", [baseWidget, Evented], {
		baseClass : "widget_Layers",
		buttonTemplate : buttonTemplate,
		constructor : function() {
			on(this, "initializeUI", lang.hitch(this, function(item) {
				this.ui = new widgetUI(this.widget.callerArguments);
				this.ui.startup();
			}));
		}
	});

	var widgetUI = declare("", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : widgetTemplate,
		postCreate : function() {
			this.inherited(arguments);
			if (this.parentContainer) {
				domConstruct.place(this.domNode, this.parentContainer);
			}
			domClass.add(this.domNode,this.theme);
		},
		startup : function() {
			this.list = new List().placeAt(this.listControl, 'last');
			this.list.startup();
			mapLayers = this.getMapLayers();
			this.operLayerInfos = new LayerCollection(mapLayers.basemapLayers, mapLayers.operationalLayers, this.map);
			this.operLayerInfos.init().then(lang.hitch(this, function() {
				this.addLayersToUI();
			}));
		},
		//build an object of basemaps and operational layers
		getMapLayers : function() {
			var basemapLayers = [];
			var operLayers = [];
			var layer;
			for (var i = 0; i < this.layers.length; i++) {
				var layer = this.layers[i];
				var title = layer.label || layer.title || layer.name || layer.id;
				operLayers.push({
					layerObject : layer.layerObject,
					title : layer.label || layer.title || layer.name || layer.id || " ",
					id : layer.id || " "
				});
			}

			for (var i = 0; i < this.baseMaps.length; i++) {
				var layer = this.baseMaps[i];
				basemapLayers.push({
					layerObject : layer.layerObject,
					id : layer.id || " "
				});

			}
			return {
				basemapLayers : basemapLayers || [],
				operationalLayers : operLayers || []
			};

		},
		addLayersToUI : function() {
			//reSort list to the reverse of the original order
			this.operLayerInfos.finalLayerCollection.sort(function(obj1, obj2) {
				return obj2.orderIndex - obj1.orderIndex;
			});
			var self = this;
			array.forEach(this.operLayerInfos.finalLayerCollection, function(layer) {
				self.list.add(layer);
			}, this);
		},
	});
	return initiator;
});
