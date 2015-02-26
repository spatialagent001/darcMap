define([
	"application/tabWidgetBase",
    "dojo/ready", 
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/query",
    "esri/arcgis/utils",
    "esri/IdentityManager",
    "widgets/Header/headerWidget",
	"widgets/Legend/widget",
	"widgets/BaseSwitcher/widget",
	"widgets/Geocode/geocodeWidget",
	"widgets/GeoLocation/widget",
	"widgets/Toolbar/toolbarWidget",
	"widgets/Extent/widget",
	"widgets/Search/widget",
	"widgets/Layers/widget",
	"widgets/Starter/widget"
],
function(
	_tabWidgetBase,
    ready, 
    declare,  
    lang, dom, domConstruct, domClass, domStyle, query,
    arcgisUtils,
    IdentityManager,
	HeaderWidget,
	LegendWidget,
	BaseSwitcherWidget,
	GeocodeWidget,
	GeoLocationWidget,
	ToolbarWidget,
	ExtentWidget,
	SearchWidget,
	LayerWidget,
	StarterWidget
) {
	var popupHandler;
	
    return declare("", null, {
        config: {},
        constructor: function(config) {
        	global_theme = config.theme;
        	var ss = document.createElement("link");
    		ss.type = "text/css";
    		ss.rel = "stylesheet";
    		ss.href = "css/" + global_theme+ ".css";
    		document.getElementsByTagName("head")[0].appendChild(ss);
            //config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information. 
            this.config = config;
            query("body").addClass(this.config.themefont);
            ready(lang.hitch(this, function() {
                this._createWebMap();
            }));
        },
        _mapLoaded: function() {
            // Map is ready
            console.log('map loaded');
            this.loadWidgets();
        },
        //create a map by adding layers
        _createMap: function() {
        	//todo
        },
        //create a map based on the input web map id
        _createWebMap: function() {
            arcgisUtils.createMap(this.config.webmap, "mapDiv", {
                mapOptions: {
                    //Optionally define additional map config here for example you can 
                    //turn the slider off, display info windows, disable wraparound 180, slider position and more. 
                },
                bingMapsKey: this.config.bingmapskey
            }).then(lang.hitch(this, function(response) {
                //Once the map is created we get access to the response which provides important info 
                //such as the map, operational layers, popup info and more. This object will also contain
                //any custom options you defined for the template. In this example that is the 'theme' property.
                //Here' we'll use it to update the application to match the specified color theme.  
                console.log(this.config);
                this.map = response.map;
                this.opLayers = response.itemInfo.itemData.operationalLayers;
                this.baseLayers = response.itemInfo.itemData.baseMap.baseMapLayers;
                this.legendLayers = arcgisUtils.getLegendLayers(response);
                if (this.map.loaded) {
                    // do something with the map
                    popupHandler = response.clickEventHandle;
                    this._mapLoaded();
                    
                } else {
                    on(this.map, "load", lang.hitch(this, function() {
                        // do something with the map
                        popupHandler = response.clickEventHandle;
                        this._mapLoaded();
                    }));
                }
                //listen to the widget state change to temporarily disable map popups
                dojo.subscribe("tabWidget.state",lang.hitch(this,function(data){
	            	if (data.state == 'maximized')
	            	{
	            		//dojo.disconnect(popupHandler);
	            		//console.log("Popups should be disabled");
	            	}else if (data.state== 'minimized')
	            	{
	            		//popupHandler = dojo.connect(this.map, "onClick", response.clickEventListener);
	             		//console.log("Popups should be enabled");
	            	} 	 
            	}));
            }), lang.hitch(this, function(error) {
                //an error occurred - notify the user. In this example we pull the string from the 
                //resource.js file located in the nls folder because we've set the application up 
                //for localization. If you don't need to support mulitple languages you can hardcode the 
                //strings here and comment out the call in index.html to get the localization strings. 
                if (this.config && this.config.i18n) {
                    alert(this.config.i18n.map.error + ": " + error.message);
                } else {
                    alert("Unable to create map: " + error.message);
                }
            }));
        },
        
        loadWidgets:function(data){
        	//variable to collect buttons to add to the toolbar
			this.toolbarWidgetList = [];
        	this.tabWidgetIndex = 1;
        	var toolbarEnabled = this.config.toolbarEnabled;
        	if (this.config.headerEnabled == true)
        	{
        		this.headerWidget = new HeaderWidget(
        			{
        				theme:this.config.theme, 
        				title: (this.config.title == "")? this.config.widgets.header.title : this.config.title,
	                	subTitle: (this.config.subtitle == "")? this.config.widgets.header.subtitle : this.config.subtitle,
	                	logo:(this.config.logo == "")? this.config.widgets.header.logo : this.config.logo 
	            	}, 'headerWidgetDiv');
	            this.headerWidget.startup();
        	}
        	
        	if (this.config.geocodeEnabled == true)
        	{
        		var dijcontainer = domConstruct.create('div',{id: "geocodeDijit"});
        		domConstruct.place(dijcontainer, this.map.container);
        		var container = domConstruct.create('div',{id: "geocodeWidgetDiv",class:"toolbarButton"});
        		domConstruct.place(container,  this.map.container);
        		this.geocode= new GeocodeWidget({
	                map: this.map,
	                theme:this.config.theme,
	                font:this.config.widgetfont,
	                geoCodeDigit:'geocodeDijit'
	            }, container);
	            this.geocode.startup();
	            this.toolbarWidgetList.push(this.geocode);
        	}	
        	
	        this.loadCustomWidgets();
	        
            if (toolbarEnabled == true)
        	{ 
            	this.toolbar= new ToolbarWidget({
	                map: this.map,
	                widgets: this.toolbarWidgetList,
	                theme:this.config.theme,
	                showCount: this.config.widgets.toolbar.showCount
	            }, "toolbarWidgetDiv");
	            this.toolbar.startup();
	        }	        
        },
        loadCustomWidgets:function()
        {
        	var props = {map: this.map,theme:this.config.theme,font:this.config.widgetfont};
        	//load 
        	if (this.config.starterWidgetEnabled == true)
        	{
        		this.createWidget(new StarterWidget(),this.config.widgets.starter,props);
        	}
        	if (this.config.baseswitcherEnabled == true)
        	{
        		this.createWidget(new BaseSwitcherWidget(),this.config.widgets.baseswitcher,props);
        	}
        	if (this.config.legendEnabled == true)
        	{
        		this.createWidget(new LegendWidget(),this.config.widgets.legend,props);
        	}
        	if (this.config.layersWidgetEnabled == true)
        	{
        		lang.mixin(props, {layers:this.opLayers,baseMaps:this.baseLayers});
        		this.createWidget(new LayerWidget(),this.config.widgets.layers,props);
        	}
        	if (this.config.searchWidgetEnabled == true)
        	{
        		this.createWidget(new SearchWidget(),this.config.widgets.search,props);
        	}
        	if (this.config.extentWidgetEnabled == true)
        	{
	            this.createWidget(new ExtentWidget(),this.config.widgets.extent,props);
	        }
	        if (this.config.geolocationEnabled == true)
        	{
	            this.createWidget(new GeoLocationWidget(),this.config.widgets.geolocation,props);
	        }
        },
        createWidget:function(base,widgetConfig,properties)
        {
        	if (this.config.overideType!="" && widgetConfig.type!="button")
        		widgetConfig.type =  this.config.overideType;
        		
        	widgetConfig.topOffset = this.config.widgetTopOffset;
        	
        	var props = {map: this.map,theme:this.config.theme,font:this.config.widgetfont};
        	lang.mixin(props, {"config":widgetConfig});
        	lang.mixin(props, properties);
    		var container;
    		if (widgetConfig.type == 'tab')
    			container = domConstruct.create('div',{id: widgetConfig.parentid,class:"tabWidgetDiv"});
	        else
    			container = domConstruct.create('div',{id: widgetConfig.parentid,class:"toolbarButton"});
    		domConstruct.place(container,  this.map.container);
    		var widget=  base.createWidget(widgetConfig.type,props,container);
	        if (widget instanceof _tabWidgetBase){
            	domClass.add(container, "tabWidgetDiv _"+this.tabWidgetIndex);
            	this.tabWidgetIndex++;
            }
            else
            	this.toolbarWidgetList.push(widget);
            
            widget.startup();
        },
        
    });
});