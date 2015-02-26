/**
 * serviceWithChildren.js
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
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Deferred',
  'dojo/_base/array',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'esri/layers/ArcGISTiledMapServiceLayer',
  './baseLayer',
  './subLayer',
], function(declare, lang, Deferred, array, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, BaseLayer, SubLayer) {
  var lyr = declare(BaseLayer, {
    constructor: function( operLayer, map ) {
      this.layer = operLayer.layerObject;
    },
	getSubLayers: function() {
		var subLayers = [];
      	var deferred= new Deferred();
      	var layer = this.origininalLayer.layerObject;
      
	      
		if ( layer instanceof esri.layers.ArcGISDynamicMapServiceLayer) {

			for ( i = 0; i < layer.layerInfos.length; i++) {
				var sublayer = layer.layerInfos[i];
				var subLayerId = layer.id + "_" + sublayer.id;
				console.log(sublayer.id);
				subLayers.push(this.createSubLayer(sublayer, subLayerId, false));
			}

			deferred.resolve(subLayers);
		} else if (layer instanceof ArcGISTiledMapServiceLayer)
		{
			for ( i = 0; i < layer.layerInfos.length; i++) {
				var sublayer = layer.layerInfos[i];
				var subLayerId = layer.id + "_" + sublayer.id;
				console.log(sublayer.id);
				subLayers.push(this.createSubLayer(sublayer, subLayerId, true));
			}
			deferred.resolve(subLayers);
		}else
			deferred.resolve([]);
		
		return deferred;
	},
	createSubLayer: function(subLayer,layerid,isStatic) {
      return new SubLayer(subLayer,layerid,this.map,isStatic);  
    },
    setSubLayerVisible: function(subLayerId, visible) {
      var ary = [], index;
      if (subLayerId !== null) {
      	if (visible) {
      		 ary = lang.clone(this.origininalLayer.layerObject.visibleLayers);
      		 index = array.indexOf(ary, subLayerId);
      		 if(index < 0) {
            	ary.push(subLayerId);
                this.origininalLayer.layerObject.setVisibleLayers(ary);
             }
      	} else {
          ary = lang.clone(this.origininalLayer.layerObject.visibleLayers);
          index = array.indexOf(ary, subLayerId);
          if (index >= 0) {
            ary.splice(index, 1);
          }
          if (ary.length === 0) {
            ary.push(-1);
          }
          this.origininalLayer.layerObject.setVisibleLayers(ary);
        }
      }
    }
  });
  return lyr;
});