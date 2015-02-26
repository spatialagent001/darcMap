define([], function() {
	var webmap = {
        	item:
        	{
        		"title":"Soil Survey Map of USA",
          		"snippet": "This map shows the Soil Survey Geographic (SSURGO) by the United States Department of Agriculture's Natural Resources Conservation Service.",
          		"extent": [[-124.2328,23.3927],[-75.7171,46.9728]]
        	},
        	itemData:
        	{
        		"operationalLayers": [
			        {
			            "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",
			            "id": "World_Boundaries_and_Places_2363",
			            "visibility": true,
			            "opacity": 1,
			            "title": "World Boundaries and Places",
			            
			        },
			        {
			            "url": "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/Soil_Survey_Map/MapServer",
			            "id": "Soil_Survey_Map_652",
			            "visibility": true,
			            "opacity": 1,
			            "title": "USA Soil Survey",
			            
			        },
			        {
			            "url": "http://imagery.arcgisonline.com/ArcGIS/rest/services/LandsatGLS/LandWater/ImageServer",
			            "id": "LandWater_2624",
			            "visibility": false,
			            "opacity": 1,
			            "title": "Land / Water Boundary (453) 1990-2010",
			            
			        },
			        {
			        	 "url": "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Earthquakes/Since_1970/MapServer/0",
			        	 "id": "EarthQuake_123",
			        	 "visibility": false,
			             "opacity": 1,
			             "title": "Earthquakes"
			        },
			        {
            "url": "http://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/stadia/FeatureServer/0",
            "id": "stadia_8384",
            "visibility": true,
            "opacity": 1,
            "mode": 0,
            "title": "NFL Team Stadiums",
          
            "layerDefinition": {
                "drawingInfo": {
                    "renderer": {
                        "type": "simple",
                        "symbol": {
                            "angle": 0,
                            "xoffset": 0,
                            "yoffset": 0,
                            "type": "esriPMS",
                            "url": "http://static.arcgis.com/images/Symbols/PeoplePlaces/Stadium.png",
                            "imageData": "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",
                            "contentType": "image/png",
                            "width": 11.25,
                            "height": 11.25
                        }
                    }
                }
            },
            "popupInfo": {
                "title": "stadia: ",
                "fieldInfos": [
                    {
                        "fieldName": "Stadium",
                        "label": "Stadium",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "Capacity",
                        "label": "Capacity",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": {
                            "places": 0,
                            "digitSeparator": true
                        },
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "City",
                        "label": "City",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "State",
                        "label": "State",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "Team",
                        "label": "Team",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "Lat",
                        "label": "Lat",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": {
                            "places": 2,
                            "digitSeparator": true
                        },
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "Long",
                        "label": "Long",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": {
                            "places": 2,
                            "digitSeparator": true
                        },
                        "stringFieldOption": "textbox"
                    },
                    {
                        "fieldName": "FID",
                        "label": "FID",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": {
                            "places": 0,
                            "digitSeparator": true
                        },
                        "stringFieldOption": "textbox"
                    }
                ],
                "description": null,
                "showAttachments": true,
                "mediaInfos": []
            }}
        		],
          	"baseMap": {
            	"baseMapLayers": [{
                "id": "defaultBasemap",
                "opacity": 1,
                "visibility": true,
                "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
            }],
            "title": "Topographic"
        	},
          	"version": "1.1"
        	}
        };
    return webmap;
});