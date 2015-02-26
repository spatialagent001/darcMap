define([
	"application/listComponent",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on", 
	"dojo/dom",
	"dojo/_base/array",
	"./searchRenderer"
	],
function(ListComponent,declare,lang,domConstruct,domAttr,domClass,on,dom,array,Renderer)
{
	return declare("",[ListComponent],
	{
		postCreate: function() 
    	{
    		this.inherited(arguments);
    	},
    	add:function(item)
		{
			var d = domConstruct.create('div',{},this.domNode);
			var vitem = new Renderer({
         		item:item
         	},d);
         	this.own(on(vitem, "click", lang.hitch(this, this.onClickResult)));
         	this.items.push(vitem);
         	console.log("item added");
		},
		onClickResult: function(item) {
       		console.log("single");
       		this.emit('onItemClick', item);
       },
	});
});