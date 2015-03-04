{
    "configurationSettings": [
    	{
    	"category": "<b>Theme</b>",
    	"fields": [ 
            {
               "type":"string",
               "fieldName":"theme",
               "tooltip":"Color theme to use",
               "label":"Color Scheme:",
               "options":[
                  {
                     "label":"Black",
                     "value":"black"
                  },
                  {
                     "label":"White",
                     "value":"white"
                  },
                  {
                     "label":"Blue",
                     "value":"blue"
                  },
                  {
                     "label":"Green",
                     "value":"green"
                  }
               ]
            },
            {
               "type":"string",
               "fieldName":"themefont",
               "tooltip":"Font used in titles",
               "label":"Title Font:",
               "options":[
                  {
                     "label":"Englebert",
                     "value":"englebert"
                  },
                  {
                     "label":"Abel",
                     "value":"abel"
                  },
                  {
                     "label":"Open Sans",
                     "value":"openSans"
                  },
                  {
                     "label":"PT Sans Narrow",
                     "value":"ptSansNarrow"
                  }
               ]
            },
            {
               "type":"string",
               "fieldName":"widgetfont",
               "tooltip":"Font used in widgets",
               "label":"Widget Font:",
               "options":[
                  {
                     "label":"Englebert",
                     "value":"englebert"
                  },
                  {
                     "label":"Abel",
                     "value":"abel"
                  },
                  {
                     "label":"Open Sans",
                     "value":"openSans"
                  },
                  {
                     "label":"PT Sans Narrow",
                     "value":"ptSansNarrow"
                  }
               ]
            }		
         ]
    	},
    	{
    	"category": "<b>Widgets</b>",
    	"fields": [ 
            {
            	"type": "boolean",
		        "fieldName": "headerEnabled",
		        "label": "Show Header",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "legendEnabled",
		        "label": "Use Legend Widget",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "baseswitcherEnabled",
		        "label": "Use Basemap Widget",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "geocodeEnabled",
		        "label": "Use Geocoder Widget",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "geolocationEnabled",
		        "label": "Use Geolocation Widget",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "layersWidgetEnabled",
		        "label": "Use Layer Widget",
		        "tooltip": ""
            },
            {
            	"type": "boolean",
		        "fieldName": "searchWidgetEnabled",
		        "label": "Use Search Widget",
		        "tooltip": ""
            },
            {
               "type":"number",
               "fieldName":"widgetTopOffset",
               "label":"Tab Widget top offset:",
               "tooltip":"no header 0, with header 41",
               "placeHolder":"41"
            },
            {
               "type":"string",
               "fieldName":"overideType",
               "label":"Widget Type:",
               "options":[
                  {
                     "label":"",
                     "value":""
                  },
                  {
                     "label":"Tabbed Widget",
                     "value":"tab"
                  },
                  {
                     "label":"Floating Widget",
                     "value":"float"
                  }
               ]
            }	
         ]
    	},
    	{
    	"category": "<b>Header</b>",
        "fields": [ 
            {
               "type":"string",
               "fieldName":"title",
               "label":"Title Text:",
               "tooltip":"",
               "placeHolder":"main title"
            },
            {
               "type":"string",
               "fieldName":"subtitle",
               "label":"SubTitle Text:",
               "tooltip":"",
               "placeHolder":"sub title"
            },
            {
               "type":"string",
               "fieldName":"logo",
               "label":"Logo Url:",
               "tooltip":"image size = 45px x 45px",
               "placeHolder":"ie. http://esri.com/logo.png"
            }
           ]
        
    }],
    "values": {
    	"theme":"black",
    	"headerEnabled":true,
    	"legendEnabled":true,
    	"baseswitcherEnabled":true,
    	"geocodeEnabled":true,
    	"geolocationEnabled":true,
    	"layersWidgetEnabled":true,
    	"searchWidgetEnabled":true,
    	"themefont":"englebert",
        "widgetfont":"openSans",
        "overideType":""
    }
}