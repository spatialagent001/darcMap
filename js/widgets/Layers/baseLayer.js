/**
 * baseLayer.js
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
define(['dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/Deferred', 'dojo/aspect', 'dojo/dom-style', 'dojo/dom-class'], function(declare, array, lang, Deferred, aspect, domStyle, domClass) {
	return declare(null, {
		subLayers : [],
		constructor : function(operLayer, map) {
			this.origininalLayer = operLayer;
			this.map = map;
			this.layer = null;

		},
		init : function() {
			var deferred = new Deferred();
			this.getSubLayers().then(lang.hitch(this, function(subLayers) {
				this.subLayers = subLayers;
				console.log(this.origininalLayer.title + " sublayer count: " + this.subLayers.length);
				this.visible = this.getVisibility();
				this.isGraphicLayer = this.evalGraphicLayer(this.layer);
				this.title = this.origininalLayer.title;
				this.id = this.origininalLayer.id;
				deferred.resolve(this);
				/*this.getLayerDetails().then(lang.hitch(this, function(subLayers) {

				 }));*/
			}));
			return deferred;
		},
		getSubLayers : function(/*operLayer*/ ) {
			var deferred = new Deferred();
			deferred.resolve([]);
			return deferred;
		},
		getLayerDetails : function() {
			var deferred = new Deferred();
			deferred.resolve([]);
			return deferred;
		},
		obtainLayerIndexesInMap : function() {
			var indexes = [];
			var index;
			index = this._getLayerIndexesInMapByLayer(this.layerObject);
			if (index) {
				indexes.push(index);
			}
			return indexes;
		},
		getVisibility : function() {
			return this.origininalLayer.layerObject.visible;
		},
		setVisibility : function(visible) {
			this.visible = visible;
			if (visible) {
				this.layer.show();
			} else {
				this.layer.hide();
			}
		},
		evalGraphicLayer : function(layer) {
			var i;
			console.log(layer.id);
			for ( i = 0; i < this.map.graphicsLayerIds.length; i++) {
				if (this.map.graphicsLayerIds[i] === layer.id) {
					return true;
				}
			}
			return false;
		}
	});
});
