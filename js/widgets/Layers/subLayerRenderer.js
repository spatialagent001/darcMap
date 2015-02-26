/**
 * subLayerRenderer.js
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
define(["application/itemRenderer", "dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dojo/dom-class", "dojo/dom-style", "dojo/_base/array", "dojo/text!./templates/layer.html"], function(ItemRenderer, declare, lang, on, domClass, domStyle, array, template) {
	return declare("", [ItemRenderer], {
		templateString : template,
		widgetsInTemplate : true,
		baseClass : "layer_renderer",
		postCreate : function() {
			this.inherited(arguments);
			this.eventClick.remove();
			this.eventDblClick.remove();
			if (!this.item.staticLayer) {
				if (this.item.visible)
					domClass.add(this.btnVisibility, "checked");
				this.eventVisibility = on(this.btnVisibility, "click", lang.hitch(this, "onVisibilityChange"));
			} else {
				domStyle.set(this.btnVisibility, "display", "none");
			}
		},
		onVisibilityChange : function(evt) {
			if (evt)
				evt.stopPropagation();

			if (!this.item.visible) {
				this.item.setVisibility(true);
				domClass.add(this.btnVisibility, "checked");
			} else {
				this.item.setVisibility(false);
				domClass.remove(this.btnVisibility, "checked");
			}

			this.emit('visibilityChange', this.item);
		}
	});
}); 