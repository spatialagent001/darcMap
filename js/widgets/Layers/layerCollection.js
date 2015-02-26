/**
 * layerCollection.js
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
define(['dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/aspect', 'dojo/Deferred', 'dojo/DeferredList', './serviceLayer', './serviceWithChildren'], function(declare, array, lang, aspect, Deferred, DeferredList, ServiceLayer, ServiceWithChildren) {

	return declare(null, {
		operationalLayers : null,
		map : null,
		finalLayerCollection : null,
		basemapLayers : null,
		constructor : function(basemapLayers, operLayers, map) {
			this.basemapLayers = basemapLayers;
			this.operationalLayers = operLayers;
			this.map = map;
		},
		init : function() {
			this.layers = [];
			this.finalLayerCollection = [];
			return this.read();
		},
		read : function() {
			var deferred = new Deferred();
			var deferredList;
			var deferreds = [];
			var layerInfos = [];
			var count = 0;
			array.forEach(this.operationalLayers, function(operLayer) {
				layer = this.getClassifiedLayer(operLayer);

				if (layer) {
					layer.orderIndex = count;
					layerInfos.push(layer);
					deferreds.push(layer.init());
					count++;
				}
			}, this);
			this.layers = layerInfos.reverse();
			deferredList = new DeferredList(deferreds);
			deferredList.then(lang.hitch(this, function() {
				deferred.resolve();
				this.createFinalLayerCollection(this.layers).then(lang.hitch(this, function() {
					deferred.resolve();
				}));
			}));
			return deferred;
		},
		getClassifiedLayer : function(operLayer) {
			//determine the type of layer
			if (operLayer.layerObject && operLayer.layerObject.layerInfos) {
				return new ServiceWithChildren(operLayer, this.map);
			} else if (operLayer.layerObject) {
				return new ServiceLayer(operLayer, this.map);
			}
		},
		createFinalLayerCollection : function(layerInfos) {
			var i,
			    id,
			    deferreds = [],
			    deferredList;
			this.finalLayerCollection.length = 0;
			for ( i = 0; i < this.map.graphicsLayerIds.length; i++) {
				id = this.map.graphicsLayerIds[i];
				if (!this._isBasemap(id)) {
					deferreds.push(this.addToFinals(this.findLayer(id, layerInfos), id, true));
				}
			}
			for ( i = 0; i < this.map.layerIds.length; i++) {
				id = this.map.layerIds[i];
				if (!this._isBasemap(id)) {
					deferreds.push(this.addToFinals(this.findLayer(id, layerInfos), id, false));
				}
			}
			deferredList = new DeferredList(deferreds);
			return deferredList;
		},
		addToFinals : function(layerInfo, id, isGraphicLayer) {
			var newLayer;
			var deferred = new Deferred();
			var newLayerInfo;
			deferred.resolve();
			if (layerInfo) {
				if (!layerInfo._addedFlag && (layerInfo.isGraphicLayer === isGraphicLayer)) {
					this.finalLayerCollection.push(layerInfo);
					layerInfo._addedFlag = true;
				}
			} else {
				newLayer = this.map.getLayer(id);
				if (newLayer.type && ((newLayer.type === "Feature Layer") || (newLayer.type === "Table"))) {
					newLayerInfo = this.getClassifiedLayer({
						layerObject : newLayer,
						title : newLayer.title || newLayer.name || newLayer.id || " ",
						id : newLayer.id || " "
					}, this.map);
					this.finalLayerCollection.push(newLayerInfo);
					deferred = newLayerInfo.init();
				}
			}
			return deferred;
		},
		_isBasemap : function(id) {
			var i;
			for ( i = 0; i < this.basemapLayers.length; i++) {
				if (this.basemapLayers[i].id === id) {
					return id;
				}
			}
			return false;
		},
		findLayer : function(id, layers) {
			var i,
			    j;
			for ( i = 0; i < layers.length; i++) {
				for ( j = 0; j < layers[i].subLayers.length; j++) {
					if (layers[i].subLayers[j].id === id) {
						return layers[i];
					}
				}
				//find parentLayer after subLayer.
				if (layers[i].id === id) {
					return layers[i];
				}
			}
			return null;
		},
	});
});
