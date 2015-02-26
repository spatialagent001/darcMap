define([
  "application/itemRenderer",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/_base/array",
  "dojo/text!./templates/renderer.html"
  
], function(ItemRenderer,declare,lang,on,domClass,domStyle,array,template){
	
	return declare("",[ItemRenderer], 
	{
		templateString: template,
    	widgetsInTemplate: true,
    	baseClass: "search_renderer",
    	postCreate: function() 
    	{
    		this.inherited(arguments);
    		
    	},
    	onClick: function(evt) {
    		console.log("click");
    		this.emit('click', {item:this.item});
    	},
	});
});