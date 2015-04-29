define([], function() {
	var webmap = {
		item : {
			"title" : "Flexviewer default configuration",
			"extent" : [[-125.4852, 29.1042], [-97.6239, 43.3811]]
		},

		itemData : {
			"operationalLayers" : [{
				"url" : "http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Median_Household_Income/MapServer",
				"visibility" : false,
				"opacity" : 0.5,
				"id" : "layer1",
				"title" : "Demographics",
				"layers" : [{
					"id" : 1,
					"popupInfo" : {
						"title" : "Block Group: {ID}",
						"fieldInfos" : [{
							"fieldName" : "NAME",
							"visible" : false,
						}, {
							"fieldName" : "TOTPOP_CY",
							"label" : "Block group population:",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "MEDHINC_CY",
							"label" : "Median Household Income: $",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "ID",
							"visible" : false,
						}, {
							"fieldName" : "HINC0_25",
							"visible" : false,
						}, {
							"fieldName" : "HINC25_50",
							"visible" : false,
						}, {
							"fieldName" : "HINC50_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC75_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC100_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC150_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC200_CY",
							"visible" : false,
						}, {
							"fieldName" : "MEDHHINC_pct_USAvg",
							"visible" : false,
						}],
						"mediaInfos" : [{
							"title" : "Households by income",
							"type" : "columnchart",
							"value" : {
								"fields" : ["HINC0_25", "HINC25_50", "HINC50_CY", "HINC75_CY", "HINC100_CY", "HINC150_CY", "HINC200_CY"]
							}
						}]
					}
				}, {
					"id" : 2,
					"popupInfo" : {
						"title" : "Tract: {ID}",
						"fieldInfos" : [{
							"fieldName" : "NAME",
							"visible" : false,
						}, {
							"fieldName" : "TOTPOP_CY",
							"label" : "Tract population:",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "MEDHINC_CY",
							"label" : "Median Household Income: $",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "ID",
							"visible" : false,
						}, {
							"fieldName" : "HINC0_25",
							"visible" : false,
						}, {
							"fieldName" : "HINC25_50",
							"visible" : false,
						}, {
							"fieldName" : "HINC50_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC75_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC100_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC150_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC200_CY",
							"visible" : false,
						}, {
							"fieldName" : "MEDHHINC_pct_USAvg",
							"visible" : false,
						}],
						"mediaInfos" : [{
							"title" : "Households by income",
							"type" : "columnchart",
							"value" : {
								"fields" : ["HINC0_25", "HINC25_50", "HINC50_CY", "HINC75_CY", "HINC100_CY", "HINC150_CY", "HINC200_CY"]
							}
						}]
					}
				}, {
					"id" : 3,
					"popupInfo" : {
						"title" : "{NAME}",
						"fieldInfos" : [{
							"fieldName" : "NAME",
							"visible" : false,
						}, {
							"fieldName" : "TOTPOP_CY",
							"label" : "County population:",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "MEDHINC_CY",
							"label" : "Median Household Income: $",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "HINC0_25",
							"visible" : false,
						}, {
							"fieldName" : "HINC25_50",
							"visible" : false,
						}, {
							"fieldName" : "HINC50_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC75_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC100_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC150_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC200_CY",
							"visible" : false,
						}, {
							"fieldName" : "MEDHHINC_pct_USAvg",
							"visible" : false,
						}],
						"mediaInfos" : [{
							"title" : "Households by income",
							"type" : "columnchart",
							"value" : {
								"fields" : ["HINC0_25", "HINC25_50", "HINC50_CY", "HINC75_CY", "HINC100_CY", "HINC150_CY", "HINC200_CY"]
							}
						}]
					}
				}, {
					"id" : 4,
					"popupInfo" : {
						"title" : "{NAME}",
						"fieldInfos" : [{
							"fieldName" : "NAME",
							"visible" : false,
						}, {
							"fieldName" : "TOTPOP_CY",
							"label" : "Population",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "MEDHINC_CY",
							"label" : "Median Household Income: $",
							"visible" : true,
							"format" : {
								"places" : 0,
								"digitSeparator" : true
							}
						}, {
							"fieldName" : "HINC0_25",
							"visible" : false,
						}, {
							"fieldName" : "HINC25_50",
							"visible" : false,
						}, {
							"fieldName" : "HINC50_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC75_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC100_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC150_CY",
							"visible" : false,
						}, {
							"fieldName" : "HINC200_CY",
							"visible" : false,
						}, {
							"fieldName" : "MEDHHINC_pct_USAvg",
							"visible" : false,
						}],
						"mediaInfos" : [{
							"title" : "Households by income",
							"type" : "columnchart",
							"value" : {
								"fields" : ["HINC0_25", "HINC25_50", "HINC50_CY", "HINC75_CY", "HINC100_CY", "HINC150_CY", "HINC200_CY"]
							}
						}]
					}
				}]
			}, {
				"url" : "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Fire/Sheep/FeatureServer/0",
				"visibility" : false,
				"opacity" : 1,
				"id" : "layer2",
				"title" : "Fires",
				"popupInfo" : {
					"title" : "{type}",
					"fieldInfos" : [{
						"fieldName" : "description",
						"label" : "Description",
						"visible" : true
					}]
				}
			}],
			"baseMap" : {
				"baseMapLayers" : [{
					"id" : "defaultBasemap",
					"opacity" : 1,
					"visibility" : true,
					"url" : "http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer"
				}],
				"title" : "Topographic"
			}
		}
	};
	return webmap;
});
