define(["config/webmap"], function(webmap) {
    //Default configuration settings for the applciation. This is where you'll define things like a bing maps key, 
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings
    //and url parameters.
    var defaults = {
        "appid": "",
        "webmap":"27c9ecee70ef43f28bbd550f838428de",   
        "oauthappid": null,
        //Group templates must support a group url parameter. This will contain the id of the group. 
        //group: "",
        //Enter the url to the proxy if needed by the applcation. See the 'Using the proxy page' help topic for details
        //http://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
        "proxyurl": "",
        //Example of a template specific property. If your template had several color schemes
        //you could define the default here and setup configuration settings to allow users to choose a different
        //color theme.  
        "theme": "black",
        "themefont":"englebert",
        "widgetfont":"opensans",
        "bingmapskey": "", //Enter the url to your organizations bing maps key if you want to use bing basemaps
        "sharinghost": location.protocol + "//" + "www.arcgis.com", //Defaults to arcgis.com. Set this value to your portal or organization host name. 
    	//all widgets
    	"widgetTopOffset":41,
    	//header template dynamic configuration
    	"headerEnabled":true,
    	"title":"",
    	"subtitle":"",
    	"logo":"",
    	//legend dynamic configuration
    	"legendEnabled":true,
    	"baseswitcherEnabled":true,
    	//geocode location dynamic configuration
    	"geocodeEnabled":true,
    	//get GPS location
    	"geolocationEnabled":true,
    	"toolbarEnabled":true,
    	"extentWidgetEnabled":false,
    	"searchWidgetEnabled":true,
    	"layersWidgetEnabled":true,
    	"starterWidgetEnabled":false,
    	"overideType":"tab",
    	widgets:
		{
			header:
			{
				title:"darcMap",
				subtitle:"Pocket Map Template",
				logo:"js/widgets/Header/images/logo_sm.png"
			},
			legend:
			{
				title:'Legend',
				type:"float",
				parentid:'legendWidgetDiv',
				floatHeight:480,
				floatWidth:360,
				floatLeft:100,
				floatTop:100,
			},
			layers:
			{
				title:'Layers',
				type:'tab',
				parentid:'layersWidgetDiv',
				floatHeight:480,
				floatWidth:360,
				floatLeft:100,
				floatTop:100
			},
			baseswitcher:
			{
				title:'Basemap',
				type:'tab',
				parentid:'baseSwitcherWidgetDiv',
				floatHeight:480,
				floatWidth:360,
				floatLeft:100,
				floatTop:100,
				bingmapskey:null,
			 	basemapgroup: 
			 	{
	          		title: null,
	          		owner: null
		        }
			},
			geocode:
			{
			},
			toolbar:
			{
				showCount:2
			},
			search:
			{
				title:'Search',
				type:'tab',
				parentid:'searchWidgetDiv',
				floatHeight:480,
				floatWidth:360,
				floatLeft:100,
				floatTop:100,
			},
			extent:
			{
				title:'Exent',
				type:'button',
				parentid:'extentWidgetDiv'
			},
			geolocation:
			{
				title:'GPS Location',
				type:'button',
				parentid:'geoLocationWidgetDiv'
			},
			starter:
			{
				title:'Starter Widget',
				type:'tab',
				parentid:'starterWidgetDiv',
				floatHeight:480,
				floatWidth:360,
				floatLeft:100,
				floatTop:100,
			}
		}	
    };
    return defaults;
});