/**
 * subLayer.js
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
define(['dojo/_base/declare'], function(declare) {
	return declare(null, {
		constructor : function(subLayerInfo, id, map, staticLayer) {
			this.originLayerInfo = subLayerInfo;
			this.map = map;
			this.id = id || " ";
			this.staticLayer = staticLayer;
			this.init();
		},
		init : function() {
			this.title = this.originLayerInfo.label || this.originLayerInfo.title || this.originLayerInfo.name || this.originLayerInfo.id || " ";
			this.visible = this.originLayerInfo.defaultVisibility;
			this.subId = this.originLayerInfo.id;
		},
		getVisibility : function() {
			return this.visible;
		},
		setVisibility : function(visible) {
			this.visible = visible;
		}
	});
});
