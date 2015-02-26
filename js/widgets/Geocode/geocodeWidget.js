/**
 * geocodeWidget.js
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
define(["dojo/_base/declare","dojo/dom-construct","dojo/on","application/mobileHelper","dijit/_WidgetBase",
"dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin",
"dijit/form/Button","dojo/dom-class","esri/dijit/Geocoder","esri/InfoTemplate",
"dijit/Dialog","dojo/text!./templates/geocodeButton.html",
"xstyle/css!./css/geocode.css"]
,function(declare, domConstruct, on, MobileHelper, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,Button,domClass,Geocoder,InfoTemplate,Dialog,buttonTemplate)
{
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], 
		{
			templateString: buttonTemplate,
			baseClass: 'widgets_Geocode',
        	buttonClass: 'geocodeButton',
        	widgetsInTemplate:true, 
        	formVisible:false,
        	mobileHelper : new MobileHelper(),
        	postCreate: function() {
            	this.inherited(arguments);
            	this.mobileHelper.collectInfo();
            	domClass.add(this.geocodeButton.domNode, "geocodeIcon "+this.theme);
            	this.symbol = new esri.symbol.PictureMarkerSymbol(require.toUrl("widgets/Geocode/images/pointer.png"), 30, 30);
            	this.graphics = new esri.layers.GraphicsLayer({
                id: 'GeocodeGraphics',
                title: "Geocoder Location"
            	});
            
           		this.map.addLayer(this.graphics);
            	this.geocoder = new esri.dijit.Geocoder({
		                map: this.map,
		                autoComplete: true
	            		}, this.geoCodeDigit);
	            this.geocoder.startup();
	            //on(geocoder, "findResults", geocodeResults);
	            //on(geocoder, "select", geocodeSelect);
	            dojo.connect(this.geocoder, "clear", this, 'geocodeClear');
	            dojo.connect(this.geocoder, "select", this, 'geocodeSelect');
	            var self = this;
	            on(this.mobileHelper, "orientationChange", function(e) {
					if ((e.previousWidth<480)&&(e.newWidth>=480)&&(!this.formVisible))
						self.showLocator();
				});  
           	},
           	showLocator: function() {
           		 
           		 if (this.formVisible)
           		 {
           		 	dojo.style(this.geoCodeDigit, "display", "none");
           		 	this.formVisible = false;
           		 }
           		 else
           		 {
           		 	dojo.style(this.geoCodeDigit, "display", "block");
           		 	this.formVisible = true;
           		 }
           		 	
           	},
           	geocodeClear: function(places) {
           		 this.map.infoWindow.hide();
          		 this.graphics.clear();
           	},
           	geocodeSelect: function(item) {
           		
	          var place = {};
	          var attributes,infoTemplate,pt,graphic;
	          pt = item.feature.geometry;
	          place.address = item.name;
	          place.score = item.feature.attributes.Score;
	          // Graphic components
	          attributes = { address:place.address, score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
	          infoTemplate = new InfoTemplate("Geocode Result","${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}");
	          graphic = new esri.Graphic(pt,this.symbol,attributes,infoTemplate);
	          // Add to map
	          this.graphics.add(graphic);
	          var screenPnt = this.map.toScreen(pt);
 			  this.map.infoWindow.setTitle("Geocode Result");
 			  this.map.infoWindow.setContent(place.address+"<br/>Latitude:" +pt.getLatitude().toFixed(2)+"<br/>Longitude:"+ pt.getLongitude().toFixed(2) +"<br/>Score:"+ place.score );
              //this.map.infoWindow.resize(200,150);           
              this.map.infoWindow.show(pt,this.map.getInfoWindowAnchor(pt));
           	}
		});
});