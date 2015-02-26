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
"dojo/number",
"esri/InfoTemplate",
"esri/symbols/PictureMarkerSymbol",
"esri/layers/GraphicsLayer",
"esri/geometry/Point",
"esri/SpatialReference",
"esri/geometry/webMercatorUtils",
"esri/graphic",
"dojo/text!./templates/button.html",
"xstyle/css!./css/widget.css"
]
,function(declare, baseWidget, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, domClass, lang, 
	on, Evented, number, InfoTemplate, PictureMarkerSymbol, GraphicsLayer, Point, SpatialReference, webMercatorUtils, Graphic, buttonTemplate)
{ 
	var initiator = declare("",[baseWidget,Evented], 
		{
			baseClass:"widget_GeoLocation",
			buttonTemplate:buttonTemplate,
			geolocation:null,
			constructor: function() {
				on(this, "initializeUI", lang.hitch(this,function(item)
				{
	            	this.geolocation = new geolocation({widget:this.widget});
	            	on(this.widget, "buttonClick", lang.hitch(this,function(item)
					{
		            	this.geolocation.geoLocate();
					}));
				}));
				
			}
      	});
      	
      	var geolocation = declare(null, {
			map:null,
			graphics:null,
			constructor: function() {
				this.map = arguments[0].widget.map;				
			},
			startup: function()
			{
				this.graphics = new GraphicsLayer({
	                id: 'GeoLocationGraphics',
	                title: "GPS Location"
	            });
	            this.symbol = new PictureMarkerSymbol(require.toUrl("widgets/GeoLocation/images/pointer.png"), 30, 30);
            	this.map.addLayer(this.graphics);
			},
			geoLocate: function() {
				if (this.graphics == null)
				{
					this.startup();
				}
				
	            if(navigator && navigator.geolocation) {
	                navigator.geolocation.getCurrentPosition(lang.hitch(this, 'locationSuccess'), lang.hitch(this, 'locationError'));
	            } else {
	                alert("Geolocation not supported by your browser."); 
	            }
	        },
	        locationSuccess: function(event) {
	            this.graphics.clear();
	            var point = Point(event.coords.longitude, event.coords.latitude, new SpatialReference({
	                wkid: 4326
	            }));
	            var wmPoint = webMercatorUtils.geographicToWebMercator(point);
	            this.map.centerAndZoom(wmPoint, 14);
	                    
	            var stats = {
	                    accuracy: (event.coords.accuracy) ? event.coords.accuracy : '',
	                    altitude: (event.coords.altitude) ? event.coords.altitude : '',
	                    altitudeAccuracy: (event.coords.altitudeAccuracy) ? event.coords.altitudeAccuracy : '',
	                    heading: (event.coords.heading) ? event.coords.heading : '',
	                    latitude: (event.coords.latitude) ? number.round(event.coords.latitude,4) : '',
	                    longitude: (event.coords.longitude) ? number.round(event.coords.longitude,4) : '',
	                    speed: (event.coords.speed) ? event.coords.speed : ''
	                };
	                
	            var infoTemplate = new InfoTemplate();
				infoTemplate.setTitle("Location Information");
				var contentString = "Latitude: ${latitude}<br>Longitude: ${longitude}<br>Heading:${heading}<br>Speed:${speed}<br>Accuracy:${accuracy}<br>Altitude:${altitude}<br>Altitude Accuracy:${altitudeAccuracy}";
				infoTemplate.setContent(contentString);
	            
	            var graphic = new Graphic(wmPoint, this.symbol, stats, infoTemplate);
	 			this.graphics.add(graphic);
	 			var screenPnt = this.map.toScreen(wmPoint);
	 			this.map.infoWindow.setTitle("Location Information");
	 			this.map.infoWindow.setContent("Latitude: "+number.round(event.coords.latitude,4)+"<br>Longitude: "+number.round(event.coords.longitude,4)+"<br>Heading:"+event.coords.heading+"<br>Speed:"+event.coords.speed+"<br>Accuracy:"+event.coords.accuracy+"<br>Altitude:"+event.coords.altitude+"<br>Altitude Accuracy:"+event.coords.altitudeAccuracy);
	            this.map.infoWindow.resize(200,150);           
	            this.map.infoWindow.show(wmPoint,this.map.getInfoWindowAnchor(wmPoint));
	         
	        },
	        locationError: function(error) {
	        	alert("There was a problem with getting your location: " + error.message);
	        }
   		 });	
      	
   		 return initiator;
});